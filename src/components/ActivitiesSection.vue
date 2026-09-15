<script setup>
import { activities } from "../data/activities";
import { vReveal } from "../composables/useReveal";
import { useLocale } from "../composables/useLocale";

const { t } = useLocale();
</script>

<template>
  <div class="section" v-reveal data-snap-section data-key="activities" :data-label="t('교육·활동', 'Education·Activities')">
    <h2 class="sec"><span>06.</span> {{ t("교육 · 활동", "Education · Activities") }}</h2>
    <div class="term-window">
      <div class="term-bar">
        <span class="term-dot term-dot-red"></span>
        <span class="term-dot term-dot-amber"></span>
        <span class="term-dot term-dot-green"></span>
        <span class="term-bar-title">cat activities.log</span>
      </div>
      <ul class="git-log">
        <li v-for="a in activities" :key="a.title" class="git-row">
          <div class="git-graph">
            <span class="git-dot"></span>
            <span class="git-line"></span>
          </div>
          <div class="git-content">
            <p class="git-meta"><span class="git-date">{{ a.date }}</span></p>
            <h3>
              <a v-if="a.link" :href="a.link" target="_blank" rel="noopener">{{ t(a.title, a.title_en) }} ↗</a>
              <template v-else>{{ t(a.title, a.title_en) }}</template>
            </h3>
            <p>{{ t(a.desc, a.desc_en) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
