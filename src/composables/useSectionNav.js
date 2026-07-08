import { ref } from "vue";

const sections = ref([]); // [{ key, label }]
const activeKey = ref(null);

let observer = null;

// 홈 탭에 들어갈 때 data-snap-section 요소들을 스캔해서
// 스크롤 위치에 따라 activeKey를 실시간으로 갱신하는 옵저버를 건다.
function init() {
  const els = Array.from(document.querySelectorAll("[data-snap-section]"));
  sections.value = els.map((el) => ({ key: el.dataset.key, label: el.dataset.label }));
  if (els.length) activeKey.value = els[0].dataset.key;

  document.documentElement.classList.add("snap-home");

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeKey.value = entry.target.dataset.key;
      });
    },
    { threshold: 0.5 }
  );
  els.forEach((el) => observer.observe(el));
}

function teardown() {
  observer?.disconnect();
  observer = null;
  document.documentElement.classList.remove("snap-home");
}

function scrollTo(key) {
  const el = document.querySelector(`[data-snap-section][data-key="${key}"]`);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function jump(delta) {
  // 모달이 열려 있을 땐(overflow:hidden) 섹션 이동 키를 무시
  if (document.body.style.overflow === "hidden") return;
  const idx = sections.value.findIndex((s) => s.key === activeKey.value);
  const next = sections.value[idx + delta];
  if (next) scrollTo(next.key);
}

export function useSectionNav() {
  return { sections, activeKey, init, teardown, scrollTo, jump };
}
