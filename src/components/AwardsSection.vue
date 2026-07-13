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
    <div class="term-window">
      <div class="term-bar">
        <span class="term-dot term-dot-red"></span>
        <span class="term-dot term-dot-amber"></span>
        <span class="term-dot term-dot-green"></span>
        <span class="term-bar-title">cat awards.log</span>
      </div>
      <ul class="rows rows-in-term">
        <li v-for="a in awards" :key="a.title" class="row" :class="{ 'row-live': isOngoing(a) }">
          <span class="row-date"><span class="row-dot" :class="{ live: isOngoing(a) }"></span>{{ a.date }}</span>
          <div class="row-body">
            <h3>
              <a v-if="a.link" :href="a.link" target="_blank" rel="noopener">{{ t(a.title, a.title_en) }} ↗</a>
              <template v-else>{{ t(a.title, a.title_en) }}</template>
              <em v-if="a.tag" class="tag" :class="`tag-${a.tag.type}`">{{ t(a.tag.text, a.tag.text_en) }}</em>
              <span v-if="isOngoing(a)" class="live-pill"><span class="live-pill-dot"></span>{{ t("진행중", "Ongoing") }}</span>
            </h3>
            <p v-if="a.host" class="row-host">{{ t(a.host, a.host_en) }}</p>
            <p>{{ t(a.desc, a.desc_en) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
