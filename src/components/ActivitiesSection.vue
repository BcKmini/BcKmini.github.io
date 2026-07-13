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
      <ul class="rows rows-in-term">
        <li v-for="a in activities" :key="a.title" class="row">
          <span class="row-date">{{ a.date }}</span>
          <div class="row-body">
            <h3>{{ t(a.title, a.title_en) }}</h3>
            <p>{{ t(a.desc, a.desc_en) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
