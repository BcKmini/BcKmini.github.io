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
      <ul class="git-log">
        <li v-for="a in awards" :key="a.title" class="git-row" :class="{ 'git-row-live': isOngoing(a) }">
          <div class="git-graph">
            <span class="git-dot" :class="{ live: isOngoing(a) }"></span>
            <span class="git-line"></span>
          </div>
          <div class="git-content">
            <p class="git-meta">
              <span class="git-date">{{ a.date }}</span>
              <span v-if="isOngoing(a)" class="live-pill"><span class="live-pill-dot"></span>{{ t("진행중", "Ongoing") }}</span>
            </p>
            <h3>
              <a v-if="a.link" :href="a.link" target="_blank" rel="noopener">{{ t(a.title, a.title_en) }} ↗</a>
              <template v-else>{{ t(a.title, a.title_en) }}</template>
              <em v-if="a.tag" class="tag" :class="`tag-${a.tag.type}`">{{ t(a.tag.text, a.tag.text_en) }}</em>
            </h3>
            <p v-if="a.host" class="row-host">{{ t(a.host, a.host_en) }}</p>
            <p>{{ t(a.desc, a.desc_en) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
