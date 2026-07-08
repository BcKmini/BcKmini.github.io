<script setup>
import { ref, watch, nextTick } from "vue";
import { useTab } from "../composables/useTab";
import { useTheme } from "../composables/useTheme";

const { tab, goTo } = useTab();
const { isDark, toggle } = useTheme();

const navLinks = [
  { key: "home", label: "홈" },
  { key: "blog", label: "블로그" },
  { key: "stats", label: "통계" },
];

const navRef = ref(null);
const thumb = ref({ left: 0, width: 0, opacity: 0 });

function moveThumb() {
  nextTick(() => {
    const el = navRef.value?.querySelector(`[data-key="${tab.value}"]`);
    if (!el) return;
    thumb.value = { left: el.offsetLeft, width: el.offsetWidth, opacity: 1 };
  });
}

watch(tab, moveThumb, { immediate: true });
window.addEventListener("resize", moveThumb);
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <a href="?tab=home" class="logo" @click.prevent="goTo('home')">Mini<span class="logo-dot">.</span></a>

      <nav class="tabs" ref="navRef">
        <span class="tabs-thumb" :style="{ left: thumb.left + 'px', width: thumb.width + 'px', opacity: thumb.opacity }"></span>
        <a
          v-for="link in navLinks"
          :key="link.key"
          :data-key="link.key"
          href="?tab=home"
          class="tab"
          :class="{ active: tab === link.key }"
          @click.prevent="goTo(link.key)"
        >{{ link.label }}</a>
      </nav>

      <button class="theme-toggle" :aria-label="isDark ? '라이트 모드로 전환' : '다크 모드로 전환'" @click="toggle">
        <span class="theme-icon" :class="{ spin: true }">{{ isDark ? "☾" : "☀" }}</span>
      </button>
    </div>
  </header>
</template>
