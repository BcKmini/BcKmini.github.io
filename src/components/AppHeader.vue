<script setup>
import { ref, watch, nextTick } from "vue";
import { useTab } from "../composables/useTab";
import { useTheme } from "../composables/useTheme";
import { useLocale } from "../composables/useLocale";

const { tab, goTo } = useTab();
const { isDark, toggle } = useTheme();
const { locale, toggleLocale } = useLocale();

const navLinks = [
  { key: "home", label: "~/home" },
  { key: "blog", label: "~/blog" },
  { key: "stats", label: "~/stats" },
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

// ============ 커맨드 입력 ============
const cmdInput = ref("");
const cmdError = ref("");
let errorTimer = null;

const COMMANDS = {
  home: "home", about: "home", whoami: "home",
  blog: "blog", posts: "blog", velog: "blog",
  stats: "stats", top: "stats", monitor: "stats",
};

function runCommand() {
  const raw = cmdInput.value.trim().toLowerCase();
  cmdInput.value = "";
  if (!raw) return;

  if (raw === "help") {
    cmdError.value = "commands: home · blog · stats";
  } else if (COMMANDS[raw]) {
    goTo(COMMANDS[raw]);
    return;
  } else {
    cmdError.value = `command not found: ${raw}`;
  }

  clearTimeout(errorTimer);
  errorTimer = setTimeout(() => (cmdError.value = ""), 2200);
}
</script>

<template>
  <header class="site-header term-window">
    <div class="term-bar">
      <span class="term-dot term-dot-red"></span>
      <span class="term-dot term-dot-amber"></span>
      <span class="term-dot term-dot-green"></span>
      <span class="term-bar-title">mini@portfolio: ~</span>
      <button class="lang-toggle" :aria-label="locale === 'ko' ? 'Switch to English' : '한국어로 전환'" @click="toggleLocale">
        <span class="lang-icon">{{ locale === "ko" ? "EN" : "KO" }}</span>
      </button>
      <button class="theme-toggle" :aria-label="isDark ? '라이트 모드로 전환' : '다크 모드로 전환'" @click="toggle">
        <span class="theme-icon">{{ isDark ? "☾" : "☀" }}</span>
      </button>
    </div>

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

      <form class="cmd-form" @submit.prevent="runCommand">
        <span class="cmd-prompt">$</span>
        <input
          v-model="cmdInput"
          class="cmd-input"
          type="text"
          placeholder="type a command…"
          autocomplete="off"
          spellcheck="false"
        />
        <Transition name="fade-slide">
          <span v-if="cmdError" class="cmd-error">{{ cmdError }}</span>
        </Transition>
      </form>
    </div>
  </header>
</template>
