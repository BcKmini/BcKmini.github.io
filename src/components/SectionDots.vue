<script setup>
import { useSectionNav } from "../composables/useSectionNav";

const { sections, activeKey, scrollTo } = useSectionNav();
</script>

<template>
  <nav v-if="sections.length" class="section-dots" aria-label="섹션 바로가기">
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
