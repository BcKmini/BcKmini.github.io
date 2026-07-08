<script setup>
import { ref, onMounted } from "vue";
import { useSectionNav } from "../composables/useSectionNav";

const avatar = "https://avatars.githubusercontent.com/u/151009045?v=4";
const show = ref(false);
const { activeKey, jump } = useSectionNav();

onMounted(() => requestAnimationFrame(() => (show.value = true)));

function onMove(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
  card.style.setProperty("--tilt-x", `${y}deg`);
  card.style.setProperty("--tilt-y", `${x}deg`);
}
function onLeave(e) {
  e.currentTarget.style.setProperty("--tilt-x", "0deg");
  e.currentTarget.style.setProperty("--tilt-y", "0deg");
}
</script>

<template>
  <div class="hero" data-snap-section data-key="hero" data-label="홈">
    <div class="hero-blobs" aria-hidden="true">
      <span class="blob blob-a"></span>
      <span class="blob blob-b"></span>
      <span class="blob blob-c"></span>
    </div>

    <div class="hero-text" :class="{ mounted: show }">
      <div class="term-window hero-term reveal-line">
        <div class="term-bar">
          <span class="term-dot term-dot-red"></span>
          <span class="term-dot term-dot-amber"></span>
          <span class="term-dot term-dot-green"></span>
          <span class="term-bar-title">mini@portfolio: ~</span>
        </div>
        <div class="hero-term-body">
          <p class="tline"><span class="tprompt">$</span> whoami</p>
          <p class="tout">김경민 — <strong>Cloud Platform Engineer</strong></p>
          <p class="tline"><span class="tprompt">$</span> cat mission.txt</p>
          <p class="tout tout-desc">
            AI와 클라우드를 <em>하나의 흐름</em>으로 잇는 개발자입니다. 멀티모달 플랫폼 개발 경험으로
            AI 워크로드의 특성을 이해하고, 클라우드 네이티브 구조 위에서 안정적으로 배포·운영합니다.
            기술적 제약 없이 비즈니스가 확장되는 <strong>AI Native 환경</strong>이 목표입니다.
          </p>
          <p class="tline"><span class="tprompt">$</span> cat contact.env<span class="tcursor"></span></p>
        </div>
      </div>

      <div class="config-block reveal-line">
        <a href="https://github.com/BcKmini" target="_blank" rel="noopener">
          <span class="cfg-key">GITHUB</span><span class="cfg-eq">=</span><span class="cfg-val">github.com/BcKmini ↗</span>
        </a>
        <a href="https://velog.io/@mi_nini/posts" target="_blank" rel="noopener">
          <span class="cfg-key">BLOG</span><span class="cfg-eq">=</span><span class="cfg-val">velog.io/@mi_nini ↗</span>
        </a>
        <a href="mailto:akkn920@naver.com">
          <span class="cfg-key">EMAIL</span><span class="cfg-eq">=</span><span class="cfg-val">akkn920@naver.com</span>
        </a>
        <a href="tel:010-2204-0546">
          <span class="cfg-key">PHONE</span><span class="cfg-eq">=</span><span class="cfg-val">010-2204-0546</span>
        </a>
      </div>
    </div>

    <div class="avatar-frame" @mousemove="onMove" @mouseleave="onLeave">
      <div class="avatar-term">
        <span class="term-dot term-dot-red"></span>
        <span class="term-dot term-dot-amber"></span>
        <span class="term-dot term-dot-green"></span>
      </div>
      <img class="avatar" :src="avatar" alt="김경민 프로필 사진" />
    </div>

    <button
      type="button"
      class="scroll-cue"
      :class="{ hide: activeKey !== 'hero' }"
      aria-label="다음 섹션으로 스크롤"
      @click="jump(1)"
    >
      <span class="scroll-cue-label">Scroll</span>
      <span class="scroll-cue-chevron">⌄</span>
    </button>
  </div>
</template>
