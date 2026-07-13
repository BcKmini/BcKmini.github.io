<script setup>
import { useSectionNav } from "../composables/useSectionNav";
import { useLocale } from "../composables/useLocale";

const { sections, activeKey, scrollTo } = useSectionNav();
const { t } = useLocale();
</script>

<template>
  <nav v-if="sections.length" class="section-dots" :aria-label="t('섹션 바로가기', 'Jump to section')">
    <button
      v-for="s in sections"
      :key="s.key"
      type="button"
      class="dot"
      :class="{ active: activeKey === s.key }"
      :aria-label="s.label"
      @click="scrollTo(s.key)"
    >
      <span class="dot-label">{{ s.label }}</span>
    </button>
  </nav>
</template>
