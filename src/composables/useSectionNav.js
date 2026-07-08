import { ref } from "vue";

const sections = ref([]); // [{ key, label }]
const activeKey = ref(null);

let observer = null;
let rafId = null;
let wheelLocked = false;
let wheelUnlockTimer = null;

const DESKTOP_MQ = "(min-width: 901px)";
const isDesktop = () => window.matchMedia(DESKTOP_MQ).matches;
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
    return Promise.resolve();
  }

  const root = document.documentElement;
  root.classList.add("snap-suspend");

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
        root.classList.remove("snap-suspend");
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
  // 모달이 열려 있을 땐(overflow:hidden) 섹션 이동을 무시
  if (document.body.style.overflow === "hidden") return;
  const idx = sections.value.findIndex((s) => s.key === activeKey.value);
  const next = sections.value[idx + delta];
  if (!next) return;

  wheelLocked = true;
  scrollTo(next.key).then(() => {
    clearTimeout(wheelUnlockTimer);
    wheelUnlockTimer = setTimeout(() => (wheelLocked = false), 80);
  });
}

// 마우스 휠: 섹션 내부는 자연 스크롤을 그대로 두되, 스크롤 방향으로 더 이상
// 내용이 없는 "경계"에 도달한 순간에만 다음/이전 섹션으로 한 번에 스냅 이동한다.
function onWheel(e) {
  if (!isDesktop() || wheelLocked) return;
  if (document.body.style.overflow === "hidden") return; // 모달 열림

  const el = document.querySelector(`[data-snap-section][data-key="${activeKey.value}"]`);
  if (!el) return;

  const headerOffset = 62;
  const rect = el.getBoundingClientRect();
  const atBottom = rect.bottom - headerOffset <= window.innerHeight + 2;
  const atTop = rect.top >= headerOffset - 2;

  if (e.deltaY > 0 && atBottom) {
    e.preventDefault();
    jump(1);
  } else if (e.deltaY < 0 && atTop) {
    e.preventDefault();
    jump(-1);
  }
}

// 홈 탭에 들어갈 때 data-snap-section 요소들을 스캔해서
// 스크롤 위치에 따라 activeKey를 실시간으로 갱신하는 옵저버를 건다.
function init() {
  const els = Array.from(document.querySelectorAll("[data-snap-section]"));
  sections.value = els.map((el) => ({ key: el.dataset.key, label: el.dataset.label }));
  if (els.length) activeKey.value = els[0].dataset.key;

  document.documentElement.classList.add("snap-home");
  window.addEventListener("wheel", onWheel, { passive: false });

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
  window.removeEventListener("wheel", onWheel);
  document.documentElement.classList.remove("snap-home", "snap-suspend");
}

export function useSectionNav() {
  return { sections, activeKey, init, teardown, scrollTo, jump };
}
