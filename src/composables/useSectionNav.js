import { ref } from "vue";

const sections = ref([]); // [{ key, label }]
const activeKey = ref(null);

let observer = null;
let rafId = null;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animatedScrollTo(targetY, duration = 650) {
  if (rafId) cancelAnimationFrame(rafId);

  if (prefersReducedMotion()) {
    window.scrollTo(0, targetY);
    return Promise.resolve();
  }

  const startY = window.scrollY;
  const diff = targetY - startY;
  const startTime = performance.now();

  return new Promise((resolve) => {
    function step(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + diff * easeInOutCubic(t));

      if (t < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        rafId = null;
        resolve();
      }
    }
    rafId = requestAnimationFrame(step);
  });
}

function scrollTo(key) {
  const el = document.querySelector(`[data-snap-section][data-key="${key}"]`);
  if (!el) return Promise.resolve();
  const headerOffset = 62;
  const targetY = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  return animatedScrollTo(Math.max(targetY, 0));
}

function jump(delta) {
  const idx = sections.value.findIndex((s) => s.key === activeKey.value);
  const next = sections.value[idx + delta];
  if (!next) return;
  scrollTo(next.key);
}

// 홈 탭에 들어갈 때 data-snap-section 요소들을 스캔해서
// 스크롤 위치에 따라 activeKey를 실시간으로 갱신하는 옵저버를 건다.
// (사이드 도트 내비게이션 하이라이트 + 히어로 스크롤 커서 표시용 — 휠 스크롤 자체는 그대로 브라우저 기본 동작을 따른다)
function init() {
  const els = Array.from(document.querySelectorAll("[data-snap-section]"));
  sections.value = els.map((el) => ({ key: el.dataset.key, label: el.dataset.label }));
  if (els.length) activeKey.value = els[0].dataset.key;

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
  if (rafId) cancelAnimationFrame(rafId);
}

export function useSectionNav() {
  return { sections, activeKey, init, teardown, scrollTo, jump };
}
