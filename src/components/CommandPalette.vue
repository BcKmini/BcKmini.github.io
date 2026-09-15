<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted, watch } from "vue";
import { useCommandPalette } from "../composables/useCommandPalette";
import { useTab } from "../composables/useTab";
import { useTheme } from "../composables/useTheme";
import { useLocale } from "../composables/useLocale";
import { useProjectFocus } from "../composables/useProjectFocus";
import { projects } from "../data/projects";

const { isOpen, close, toggle } = useCommandPalette();
const { goTo } = useTab();
const { isDark, toggle: toggleTheme } = useTheme();
const { locale, toggleLocale, t } = useLocale();
const { openProject } = useProjectFocus();

const query = ref("");
const selected = ref(0);
const inputEl = ref(null);
const listEl = ref(null);

const staticItems = computed(() => [
  { id: "home", label: t("홈", "Home"), hint: "~/home", action: () => goTo("home") },
  { id: "blog", label: t("블로그", "Blog"), hint: "~/blog", action: () => goTo("blog") },
  { id: "resume", label: t("이력서", "Resume"), hint: "~/resume", action: () => goTo("resume") },
  { id: "stats", label: t("방문 통계", "Visitor stats"), hint: "~/stats", action: () => goTo("stats") },
  { id: "github", label: "GitHub", hint: "github.com/BcKmini ↗", action: () => window.open("https://github.com/BcKmini", "_blank", "noopener") },
  { id: "velog", label: "Velog", hint: "velog.io/@mi_nini ↗", action: () => window.open("https://velog.io/@mi_nini/posts", "_blank", "noopener") },
  { id: "contact", label: t("이메일 보내기", "Send an email"), hint: "akkn920@naver.com", action: () => (window.location.href = "mailto:akkn920@naver.com") },
  { id: "theme", label: t("테마 전환", "Toggle theme"), hint: isDark.value ? "dark → light" : "light → dark", action: () => toggleTheme() },
  { id: "lang", label: t("언어 전환", "Toggle language"), hint: locale.value === "ko" ? "KO → EN" : "EN → KO", action: () => toggleLocale() },
]);

const projectItems = computed(() =>
  projects.map((p) => ({
    id: `project-${p.id}`,
    label: t(p.title, p.title_en),
    hint: p.service,
    action: () => {
      openProject(p.id);
      goTo("home");
    },
  }))
);

const allItems = computed(() => [...staticItems.value, ...projectItems.value]);

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return allItems.value;
  return allItems.value.filter((i) => `${i.label} ${i.hint}`.toLowerCase().includes(q));
});

watch(filtered, () => {
  selected.value = 0;
});

watch(isOpen, async (v) => {
  if (!v) return;
  query.value = "";
  selected.value = 0;
  await nextTick();
  inputEl.value?.focus();
});

function run(item) {
  item.action();
  close();
}

function scrollSelectedIntoView() {
  nextTick(() => {
    const el = listEl.value?.querySelector(".cmdk-item.active");
    el?.scrollIntoView({ block: "nearest" });
  });
}

function onKeydown(e) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    toggle();
    return;
  }
  if (!isOpen.value) return;
  if (e.key === "Escape") {
    close();
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    selected.value = Math.min(selected.value + 1, filtered.value.length - 1);
    scrollSelectedIntoView();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    selected.value = Math.max(selected.value - 1, 0);
    scrollSelectedIntoView();
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (filtered.value[selected.value]) run(filtered.value[selected.value]);
  }
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => window.removeEventListener("keydown", onKeydown));
</script>

<template>
  <Teleport to="body">
    <Transition name="palette-fade">
      <div v-if="isOpen" class="cmdk-overlay" @click.self="close">
        <div class="cmdk-panel term-window" role="dialog" aria-modal="true">
          <div class="cmdk-input-row">
            <span class="cmdk-prompt">$</span>
            <input
              ref="inputEl"
              v-model="query"
              class="cmdk-input"
              type="text"
              :placeholder="t('명령 또는 페이지 검색…', 'Search a command or page…')"
              autocomplete="off"
              spellcheck="false"
            />
            <span class="cmdk-esc">ESC</span>
          </div>
          <ul ref="listEl" class="cmdk-list">
            <li v-if="!filtered.length" class="cmdk-empty">{{ t("결과 없음", "No results") }}</li>
            <li
              v-for="(item, i) in filtered"
              :key="item.id"
              class="cmdk-item"
              :class="{ active: i === selected }"
              @mouseenter="selected = i"
              @click="run(item)"
            >
              <span class="cmdk-item-glyph">›</span>
              <span class="cmdk-item-label">{{ item.label }}</span>
              <span class="cmdk-item-hint">{{ item.hint }}</span>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
