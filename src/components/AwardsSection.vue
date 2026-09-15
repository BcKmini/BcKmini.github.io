<script setup>
import { awards } from "../data/awards";
import { isOngoing } from "../composables/useOngoing";
import { vReveal } from "../composables/useReveal";
import { useLocale } from "../composables/useLocale";

const { t } = useLocale();
</script>

<template>
  <div class="section" v-reveal data-snap-section data-key="awards" :data-label="t('수상', 'Awards')">
    <h2 class="sec"><span>04.</span> {{ t("수상 및 공모전", "Awards & Contests") }}</h2>
    <div class="award-grid">
      <article v-for="a in awards" :key="a.title" class="award-card" :class="{ 'award-card-live': isOngoing(a) }">
        <div class="award-card-top">
          <span class="award-date">{{ a.date }}</span>
          <span v-if="isOngoing(a)" class="live-pill"><span class="live-pill-dot"></span>{{ t("진행중", "Ongoing") }}</span>
          <em v-else-if="a.tag" class="tag" :class="`tag-${a.tag.type}`">{{ t(a.tag.text, a.tag.text_en) }}</em>
        </div>
        <h3>
          <a v-if="a.link" :href="a.link" target="_blank" rel="noopener">{{ t(a.title, a.title_en) }} ↗</a>
          <template v-else>{{ t(a.title, a.title_en) }}</template>
        </h3>
        <p v-if="a.host" class="award-host">{{ t(a.host, a.host_en) }}</p>
        <p class="award-desc">{{ t(a.desc, a.desc_en) }}</p>
      </article>
    </div>
  </div>
</template>
