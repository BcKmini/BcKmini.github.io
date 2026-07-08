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

  if (name === "blog") {
    loadBlogPosts();
    loadGiscus();
  }
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

// ============ 기술 스택 필터 칩 ============
document.querySelectorAll(".stack-filters .filter-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const cat = chip.dataset.cat;

    document.querySelectorAll(".stack-filters .filter-chip").forEach((c) =>
      c.classList.toggle("active", c === chip)
    );

    document.querySelectorAll(".stack-grid-all .tech").forEach((item) => {
      item.hidden = cat !== "all" && item.dataset.cat !== cat;
    });

    document.querySelectorAll(".stack-notes p").forEach((note) => {
      note.hidden = cat !== "all" && note.dataset.cat !== cat;
    });
  });
});

// ============ Velog 블로그 카드 ============
const VELOG_RSS = "https://api.rss2json.com/v1/api.json?rss_url=" +
  encodeURIComponent("https://v2.velog.io/rss/@mi_nini");

let blogLoaded = false;
let allBlogItems = [];
let activeSeries = "all";

function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || "").trim();
}

// "KT-A 12주차 / AWS, Kubernetes" → "KT-A" 시리즈로 묶기
function extractSeries(title) {
  const m = title.match(/^(.+?)\s*\d+주차/);
  return m ? m[1].trim() : "기타";
}

function renderBlogFilters(items) {
  const wrap = document.getElementById("blog-filters");
  const series = [];
  items.forEach((item) => {
    const s = extractSeries(item.title);
    if (!series.includes(s)) series.push(s);
  });

  if (series.length <= 1) {
    wrap.hidden = true;
    return;
  }

  wrap.hidden = false;
  wrap.innerHTML = "";

  const addChip = (label, value) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-chip";
    btn.dataset.value = value;
    if (value === activeSeries) btn.classList.add("active");
    btn.textContent = label;
    btn.addEventListener("click", () => {
      activeSeries = value;
      wrap.querySelectorAll(".filter-chip").forEach((c) =>
        c.classList.toggle("active", c.dataset.value === value)
      );
      renderBlogCards(allBlogItems);
    });
    wrap.appendChild(btn);
  };

  addChip(`all · ${items.length}`, "all");
  series.forEach((s) => {
    const count = items.filter((i) => extractSeries(i.title) === s).length;
    addChip(`${s} · ${count}`, s);
  });
}

function renderBlogCards(items) {
  const grid = document.getElementById("blog-grid");
  grid.innerHTML = "";

  const filtered = activeSeries === "all"
    ? items
    : items.filter((item) => extractSeries(item.title) === activeSeries);

  filtered.forEach((item) => {
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

  if (!filtered.length) {
    grid.innerHTML = `<p class="blog-status">해당 시리즈의 글이 없습니다.</p>`;
  }
}

async function loadBlogPosts() {
  if (blogLoaded) return;
  blogLoaded = true;

  const grid = document.getElementById("blog-grid");

  try {
    const res = await fetch(VELOG_RSS);
    const data = await res.json();
    if (data.status !== "ok" || !Array.isArray(data.items)) throw new Error("rss error");
    if (!data.items.length) throw new Error("no posts");

    allBlogItems = data.items;
    renderBlogFilters(allBlogItems);
    renderBlogCards(allBlogItems);
  } catch {
    grid.innerHTML =
      `<p class="blog-status">글을 불러오지 못했습니다. ` +
      `<a class="inline-link" href="https://velog.io/@mi_nini/posts" target="_blank" rel="noopener">Velog에서 보기 ↗</a></p>`;
  }
}

// ============ 방명록 (giscus — GitHub Discussions 기반, 영구 저장) ============
// 배포 후 https://giscus.app 에서 BcKmini/BcKmini.github.io 저장소로 발급받은
// data-repo-id / data-category-id 값으로 아래 두 줄을 교체해야 방명록이 동작합니다.
const GISCUS_REPO_ID = "REPLACE_WITH_REPO_ID";
const GISCUS_CATEGORY_ID = "REPLACE_WITH_CATEGORY_ID";

let giscusLoaded = false;

function loadGiscus() {
  if (giscusLoaded) return;
  giscusLoaded = true;

  const mount = document.getElementById("giscus-comments");
  if (GISCUS_REPO_ID.startsWith("REPLACE")) {
    mount.innerHTML = `<p class="blog-status">방명록 설정이 아직 완료되지 않았습니다.</p>`;
    return;
  }

  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.async = true;
  script.crossOrigin = "anonymous";
  script.setAttribute("data-repo", "BcKmini/BcKmini.github.io");
  script.setAttribute("data-repo-id", GISCUS_REPO_ID);
  script.setAttribute("data-category", "General");
  script.setAttribute("data-category-id", GISCUS_CATEGORY_ID);
  script.setAttribute("data-mapping", "specific");
  script.setAttribute("data-term", "portfolio-guestbook");
  script.setAttribute("data-strict", "0");
  script.setAttribute("data-reactions-enabled", "1");
  script.setAttribute("data-emit-metadata", "0");
  script.setAttribute("data-input-position", "top");
  script.setAttribute("data-theme", root.getAttribute("data-theme") === "dark" ? "dark_dimmed" : "light");
  script.setAttribute("data-lang", "ko");
  mount.appendChild(script);
}

function syncGiscusTheme(isDark) {
  const iframe = document.querySelector("iframe.giscus-frame");
  if (!iframe) return;
  iframe.contentWindow.postMessage(
    { giscus: { setConfig: { theme: isDark ? "dark_dimmed" : "light" } } },
    "https://giscus.app"
  );
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
  syncGiscusTheme(!isDark);
});

// ============ "진행중" 자동 배지 ============
// data-start/data-end(YYYY-MM)를 가진 항목을 방문 시점의 실제 날짜와 비교해
// 오늘이 그 구간 안에 있으면 자동으로 "진행중" 배지를 붙인다.
// 값을 수정할 필요 없이 날짜가 지나면 배지가 저절로 붙거나 사라진다.
function markOngoing() {
  const monthKey = (y, m) => y * 12 + (m - 1);
  const now = new Date();
  const nowKey = monthKey(now.getFullYear(), now.getMonth() + 1);

  const parseKey = (str) => {
    const [y, m] = str.split("-").map(Number);
    return monthKey(y, m);
  };

  document.querySelectorAll("[data-start]").forEach((el) => {
    const start = parseKey(el.dataset.start);
    const end = el.dataset.end ? parseKey(el.dataset.end) : Infinity;
    const h3 = el.querySelector("h3");
    if (!h3 || h3.querySelector(".tag-live")) return;

    if (nowKey >= start && nowKey <= end) {
      const tag = document.createElement("em");
      tag.className = "tag tag-live";
      tag.textContent = "진행중";
      h3.appendChild(tag);
    }
  });
}

markOngoing();

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
