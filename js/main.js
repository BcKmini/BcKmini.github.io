// ============ 탭 전환 (?tab= 쿼리 기반) ============
const TABS = ["home", "blog", "stats"];

function activateTab(name) {
  if (!TABS.includes(name)) name = "home";

  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `tab-${name}`);
  });
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tabLink === name);
  });

  if (name === "blog") loadBlogPosts();
  if (name === "stats") openStats();
}

function currentTab() {
  return new URLSearchParams(location.search).get("tab") || "home";
}

document.querySelectorAll("[data-tab-link]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const name = link.dataset.tabLink;
    history.pushState(null, "", `?tab=${name}`);
    activateTab(name);
    window.scrollTo({ top: 0 });
  });
});

window.addEventListener("popstate", () => activateTab(currentTab()));

// ============ Velog 블로그 카드 ============
const VELOG_RSS = "https://api.rss2json.com/v1/api.json?rss_url=" +
  encodeURIComponent("https://v2.velog.io/rss/@mi_nini");

let blogLoaded = false;

function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || "").trim();
}

async function loadBlogPosts() {
  if (blogLoaded) return;
  blogLoaded = true;

  const grid = document.getElementById("blog-grid");

  try {
    const res = await fetch(VELOG_RSS);
    const data = await res.json();
    if (data.status !== "ok" || !Array.isArray(data.items)) throw new Error("rss error");

    grid.innerHTML = "";
    data.items.forEach((item) => {
      const card = document.createElement("a");
      card.className = "blog-card";
      card.href = item.link;
      card.target = "_blank";
      card.rel = "noopener";

      const thumb = item.thumbnail ||
        (item.description.match(/<img[^>]+src="([^"]+)"/) || [])[1];

      const date = (item.pubDate || "").slice(0, 10).replace(/-/g, ".");
      const snippet = stripHtml(item.description).slice(0, 120);

      card.innerHTML = `
        ${thumb
          ? `<img class="blog-thumb" src="${thumb}" alt="" loading="lazy" />`
          : `<div class="blog-thumb-fallback">&lt;/&gt;</div>`}
        <div class="blog-body">
          <span class="blog-date">${date}</span>
          <h3 class="blog-title"></h3>
          <p class="blog-snippet"></p>
        </div>`;
      card.querySelector(".blog-title").textContent = item.title;
      card.querySelector(".blog-snippet").textContent = snippet;

      // 썸네일 로드 실패 시 폴백으로 교체
      const img = card.querySelector(".blog-thumb");
      if (img) img.addEventListener("error", () => {
        const fb = document.createElement("div");
        fb.className = "blog-thumb-fallback";
        fb.textContent = "</>";
        img.replaceWith(fb);
      });

      grid.appendChild(card);
    });

    if (!grid.children.length) throw new Error("no posts");
  } catch {
    grid.innerHTML =
      `<p class="blog-status">글을 불러오지 못했습니다. ` +
      `<a class="inline-link" href="https://velog.io/@mi_nini/posts" target="_blank" rel="noopener">Velog에서 보기 ↗</a></p>`;
  }
}

const COUNTER = "https://abacus.jasoncameron.dev";
const COUNTER_NS = "bckmini-portfolio";

function dayKey(offset) {
  const d = new Date();
  d.setDate(d.getDate() - offset);
  return `d-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function counterGet(key) {
  try {
    const res = await fetch(`${COUNTER}/get/${COUNTER_NS}/${key}`);
    if (!res.ok) return 0;
    return (await res.json()).value ?? 0;
  } catch {
    return 0;
  }
}

// 방문 집계 — 방문자별 ID를 부여해 같은 사람은 하루 1회만 집계
// (새로고침·탭 재열기·재접속해도 당일에는 다시 올라가지 않음)
(function countVisit() {
  try {
    // 최초 방문 시 고유 ID 발급 → 고유 방문자 1회 집계
    if (!localStorage.getItem("visitor-id")) {
      const vid = crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem("visitor-id", vid);
      fetch(`${COUNTER}/hit/${COUNTER_NS}/visitors`).catch(() => {});
    }

    // 같은 날 재방문/새로고침은 무시하고 날짜가 바뀌었을 때만 집계
    const today = dayKey(0);
    if (localStorage.getItem("last-visit") !== today) {
      localStorage.setItem("last-visit", today);
      fetch(`${COUNTER}/hit/${COUNTER_NS}/total`).catch(() => {});
      fetch(`${COUNTER}/hit/${COUNTER_NS}/${today}`).catch(() => {});
    }
  } catch {
    /* localStorage 차단(시크릿 모드 등) 시 집계 생략 */
  }
})();

// ============ 통계 접근 잠금 (관리자 전용) ============
// 원문 비밀번호는 저장하지 않고 salt + SHA-256 해시만 비교
const STATS_HASH = "d0239a7fba0b7a5d3dfce4829f52c8969aa584755f80e65e9d1abe4e40a46524";
const STATS_SALT = "bckmini-stats::";

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function openStats() {
  const authed = sessionStorage.getItem("stats-auth") === STATS_HASH;
  document.getElementById("stats-gate").hidden = authed;
  document.getElementById("stats-content").hidden = !authed;
  if (authed) loadVisitStats();
  else document.getElementById("stats-pw").focus();
}

document.getElementById("stats-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("stats-pw");
  const error = document.getElementById("stats-error");
  const hash = await sha256Hex(STATS_SALT + input.value);

  if (hash === STATS_HASH) {
    sessionStorage.setItem("stats-auth", hash);
    error.hidden = true;
    input.value = "";
    openStats();
  } else {
    error.hidden = false;
    input.value = "";
    input.focus();
  }
});

let statsLoaded = false;

async function loadVisitStats() {
  if (statsLoaded) return;
  statsLoaded = true;

  const days = [6, 5, 4, 3, 2, 1, 0];
  const [total, visitors, ...daily] = await Promise.all([
    counterGet("total"),
    counterGet("visitors"),
    ...days.map((o) => counterGet(dayKey(o))),
  ]);

  document.getElementById("v-total").textContent = total.toLocaleString();
  document.getElementById("v-visitors").textContent = visitors.toLocaleString();
  document.getElementById("v-today").textContent = daily[6].toLocaleString();
  document.getElementById("v-week").textContent =
    daily.reduce((a, b) => a + b, 0).toLocaleString();

  const max = Math.max(...daily, 1);
  const maxIdx = daily.lastIndexOf(Math.max(...daily));
  const chart = document.getElementById("v-chart");
  chart.innerHTML = "";

  days.forEach((offset, i) => {
    const d = new Date();
    d.setDate(d.getDate() - offset);
    const label = `${d.getMonth() + 1}/${d.getDate()}`;
    const col = document.createElement("div");
    col.className = "v-col";
    col.dataset.tip = `${label} · ${daily[i].toLocaleString()}회`;
    col.innerHTML = `
      <span class="v-val${i === maxIdx && daily[i] > 0 ? " show" : ""}">${daily[i]}</span>
      <div class="v-bar" style="height:${Math.max((daily[i] / max) * 100, 2)}%"></div>
      <span class="v-day">${label}</span>`;
    chart.appendChild(col);
  });
}

// ============ 프로젝트 모달 ============
const overlay = document.getElementById("modal-overlay");
const modalContent = document.getElementById("modal-content");

function openModal(templateId) {
  const tpl = document.getElementById(templateId);
  if (!tpl) return;
  modalContent.replaceChildren(tpl.content.cloneNode(true));
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
  overlay.querySelector(".modal-close").focus();
}

function closeModal() {
  overlay.hidden = true;
  document.body.style.overflow = "";
}

document.querySelectorAll(".proj-card").forEach((card) => {
  card.addEventListener("click", () => openModal(card.dataset.modal));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(card.dataset.modal);
    }
  });
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

overlay.querySelector(".modal-close").addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !overlay.hidden) closeModal();
});

// ============ 다크모드 토글 ============
const root = document.documentElement;
const saved = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (saved === "dark" || (!saved && prefersDark)) {
  root.setAttribute("data-theme", "dark");
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  if (isDark) {
    root.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  } else {
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
});

// ============ 섹션 스크롤 리빌 ============
const io = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 })
  : null;

document.querySelectorAll(".section").forEach((section) => {
  if (io) io.observe(section);
  else section.classList.add("in");
});

// 초기 탭 활성화 (블로그 직접 진입 시 로드 포함)
activateTab(currentTab());
