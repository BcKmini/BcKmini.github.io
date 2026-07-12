<script setup>
import { ref, onMounted } from "vue";
import { useSectionNav } from "../composables/useSectionNav";

const avatar = "/assets/profile.jpg";
const show = ref(false);
const { activeKey, jump } = useSectionNav();

const toast = ref(null);
let toastTimer = null;

async function copyValue(value, label) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = value;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
  toast.value = label;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toast.value = null), 1800);
}

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
          <p class="tout">김경민</p>
          <p class="tline"><span class="tprompt">$</span> cat about.txt</p>
          <p class="tout tout-desc">
            개발자 김경민의 프로젝트, 기술 스택, 경력을 정리한 포트폴리오 사이트입니다.
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
        <button type="button" class="cfg-copy" @click="copyValue('akkn920@naver.com', 'EMAIL')">
          <span class="cfg-key">EMAIL</span><span class="cfg-eq">=</span><span class="cfg-val">akkn920@naver.com</span>
        </button>
        <button type="button" class="cfg-copy" @click="copyValue('010-2204-0546', 'PHONE')">
          <span class="cfg-key">PHONE</span><span class="cfg-eq">=</span><span class="cfg-val">010-2204-0546</span>
        </button>
        <button type="button" class="cfg-copy" @click="copyValue('_m_i_n_i', 'DISCORD')">
          <span class="cfg-key">DISCORD</span><span class="cfg-eq">=</span><span class="cfg-val">_m_i_n_i</span>
        </button>
      </div>
    </div>

    <Transition name="copy-toast-fade">
      <div v-if="toast" class="copy-toast">
        <span class="copy-toast-dot"></span>{{ toast }} 클립보드에 복사됨
      </div>
    </Transition>

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
