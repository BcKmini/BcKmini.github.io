<script setup>
import { computed } from "vue";
import { categories, stack, stackNotes } from "../data/stack";
import { vReveal } from "../composables/useReveal";
import { useLocale } from "../composables/useLocale";
import { useTheme } from "../composables/useTheme";

const { t } = useLocale();
const { isDark } = useTheme();

const groups = computed(() =>
  categories.map((c) => ({
    ...c,
    items: stack.filter((s) => s.cat === c.key),
    notes: stackNotes.filter((n) => n.cat === c.key),
  }))
);

const chartColor = computed(() => (isDark.value ? "fb7185" : "e11d48"));
const chartSrc = computed(() => `https://ghchart.rshah.org/${chartColor.value}/BcKmini`);

function onError(e) {
  e.target.style.display = "none";
}
</script>

<template>
  <div class="section" v-reveal data-snap-section data-key="stack" :data-label="t('스택', 'Stack')">
    <h2 class="sec"><span>01.</span> {{ t("기술 스택", "Tech Stack") }}</h2>

    <div class="term-window stack-panel">
      <div class="term-bar">
        <span class="term-dot term-dot-red"></span>
        <span class="term-dot term-dot-amber"></span>
        <span class="term-dot term-dot-green"></span>
        <span class="term-bar-title">tree ./stack</span>
      </div>
      <div class="stack-panel-body">
        <div v-for="g in groups" :key="g.key" class="stack-group">
          <p class="stack-group-label"><span class="stack-group-branch">./</span>{{ g.label }}<span class="stack-group-count">{{ g.items.length }}</span></p>
          <ul class="stack-grid-all">
            <li v-for="(item, i) in g.items" :key="item.name + i" class="tech">
              <img :src="item.icon" alt="" loading="lazy" :class="{ 'inv-dark': item.invert }" @error="onError" />
              <span>{{ item.name }}</span>
            </li>
          </ul>
          <div v-if="g.notes.length" class="skill-notes stack-notes">
            <p v-for="n in g.notes" :key="n.label"><b>{{ n.label }}</b> {{ t(n.text, n.text_en) }}</p>
          </div>
        </div>

        <div class="stack-group">
          <p class="stack-group-label"><span class="stack-group-branch">./</span>github/activity.svg</p>
          <a class="stack-github-chart" href="https://github.com/BcKmini" target="_blank" rel="noopener">
            <img :src="chartSrc" :alt="t('GitHub 커밋 활동 그래프', 'GitHub commit activity graph')" loading="lazy" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
