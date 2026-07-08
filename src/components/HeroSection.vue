<script setup>
import { ref, onMounted } from "vue";

const avatar = "https://avatars.githubusercontent.com/u/151009045?v=4";
const show = ref(false);

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
      <p class="eyebrow reveal-line">Cloud Platform Engineer</p>
      <h1>
        <span class="reveal-line">AI와 클라우드를</span><br />
        <span class="reveal-line"><em>하나의 흐름</em>으로 잇는</span><br />
        <span class="reveal-line">개발자 김경민입니다.</span>
      </h1>
      <p class="lede reveal-line">
        멀티모달 플랫폼 개발 경험으로 AI 워크로드의 특성을 이해하고,
        이를 클라우드 네이티브 구조 위에서 안정적으로 배포·운영합니다.
        기술적 제약 없이 비즈니스가 확장되는 <strong>AI Native 환경</strong>이 목표입니다.
      </p>

      <div class="contact-card reveal-line">
        <a href="https://github.com/BcKmini" target="_blank" rel="noopener">
          <span>GitHub</span><b>github.com/BcKmini ↗</b>
        </a>
        <a href="https://velog.io/@mi_nini/posts" target="_blank" rel="noopener">
          <span>Blog</span><b>velog.io/@mi_nini ↗</b>
        </a>
        <a href="mailto:akkn920@naver.com">
          <span>Email</span><b>akkn920@naver.com</b>
        </a>
        <a href="tel:010-2204-0546">
          <span>Phone</span><b>010-2204-0546</b>
        </a>
      </div>
    </div>

    <div class="avatar-frame" @mousemove="onMove" @mouseleave="onLeave">
      <img class="avatar" :src="avatar" alt="김경민 프로필 사진" />
    </div>
  </div>
</template>
