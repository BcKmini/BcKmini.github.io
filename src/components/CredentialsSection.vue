<script setup>
import { certificates } from "../data/certificates";
import { activities } from "../data/activities";
import { vReveal } from "../composables/useReveal";
import { useLocale } from "../composables/useLocale";

const { t } = useLocale();
</script>

<template>
  <div class="section" v-reveal data-snap-section data-key="credentials" :data-label="t('자격·활동', 'Credentials')">
    <h2 class="sec"><span>05.</span> {{ t("자격 · 활동", "Certificates · Activities") }}</h2>

    <div class="cred-sub">
      <h3 class="cred-sub-title">{{ t("자격증", "Certificates") }}</h3>
      <ul class="cert-grid">
        <li v-for="c in certificates" :key="c.title" class="cert-badge">
          <p class="cert-badge-title">{{ t(c.title, c.title_en) }}</p>
          <p class="cert-badge-meta">{{ t(c.host, c.host_en) }} · {{ c.date }}</p>
        </li>
      </ul>
    </div>

    <div class="cred-sub cred-sub-tight">
      <h3 class="cred-sub-title">{{ t("활동", "Activities") }}</h3>
      <ul class="plain-list">
        <li v-for="a in activities" :key="a.title" class="plain-row">
          <span class="plain-row-date">{{ a.date }}</span>
          <div class="plain-row-body">
            <p class="plain-row-title">
              <a v-if="a.link" :href="a.link" target="_blank" rel="noopener">{{ t(a.title, a.title_en) }} ↗</a>
              <template v-else>{{ t(a.title, a.title_en) }}</template>
            </p>
            <p class="plain-row-desc">{{ t(a.desc, a.desc_en) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
