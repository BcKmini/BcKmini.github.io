<script setup>
import { certificates } from "../data/certificates";
import { vReveal } from "../composables/useReveal";
import { useLocale } from "../composables/useLocale";

const { t } = useLocale();
</script>

<template>
  <div class="section" v-reveal data-snap-section data-key="certs" :data-label="t('자격증', 'Certificates')">
    <h2 class="sec"><span>05.</span> {{ t("자격증", "Certificates") }}</h2>
    <div class="term-window">
      <div class="term-bar">
        <span class="term-dot term-dot-red"></span>
        <span class="term-dot term-dot-amber"></span>
        <span class="term-dot term-dot-green"></span>
        <span class="term-bar-title">cert --list --verified</span>
      </div>
      <ul class="rows rows-in-term">
        <li v-for="c in certificates" :key="c.title" class="row">
          <span class="row-date">{{ c.date }}</span>
          <div class="row-body">
            <h3>{{ t(c.title, c.title_en) }}</h3>
            <p>{{ t(c.host, c.host_en) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
