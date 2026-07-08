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

// 네이티브 smooth-scroll은 CSS scroll-snap과 동시에 걸리면 도착 직전에
// 스냅 엔진이 위치를 다시 보정하면서 살짝 튀는 현상이 생긴다.
// 애니메이션 동안은 snap을 잠시 꺼두고 직접 easing으로 스크롤한 뒤 복원한다.
function animatedScrollTo(targetY, duration = 650) {
  if (rafId) cancelAnimationFrame(rafId);

  if (prefersReducedMotion()) {
    window.scrollTo(0, targetY);
    return;
  }

  const root = document.documentElement;
  root.classList.add("snap-suspend");

  const startY = window.scrollY;
  const diff = targetY - startY;
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutCubic(t));

    if (t < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      rafId = null;
      root.classList.remove("snap-suspend");
    }
  }
  rafId = requestAnimationFrame(step);
}

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
  if (rafId) cancelAnimationFrame(rafId);
  document.documentElement.classList.remove("snap-home", "snap-suspend");
}

function scrollTo(key) {
  const el = document.querySelector(`[data-snap-section][data-key="${key}"]`);
  if (!el) return;
  const headerOffset = 62;
  const targetY = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  animatedScrollTo(Math.max(targetY, 0));
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
