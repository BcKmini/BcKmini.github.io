<script setup>
import { ref, computed } from "vue";
import { categories, stack, stackNotes } from "../data/stack";
import { vReveal } from "../composables/useReveal";
import { useLocale } from "../composables/useLocale";

const { t } = useLocale();
const active = ref("all");

const visibleStack = computed(() =>
  active.value === "all" ? stack : stack.filter((s) => s.cat === active.value)
);
const visibleNotes = computed(() =>
  active.value === "all" ? stackNotes : stackNotes.filter((n) => n.cat === active.value)
);

function onError(e) {
  e.target.style.display = "none";
}
</script>

<template>
  <div class="section" v-reveal data-snap-section data-key="stack" :data-label="t('스택', 'Stack')">
    <h2 class="sec"><span>01.</span> {{ t("기술 스택", "Tech Stack") }}</h2>

    <div class="stack-filters">
      <button
        v-for="c in categories"
        :key="c.key"
        type="button"
        class="filter-chip"
        :class="{ active: active === c.key }"
        @click="active = c.key"
      >{{ c.label }}</button>
    </div>

    <div class="term-window stack-panel">
      <div class="term-bar">
        <span class="term-dot term-dot-red"></span>
        <span class="term-dot term-dot-amber"></span>
        <span class="term-dot term-dot-green"></span>
        <span class="term-bar-title">stack --list --category={{ active }}</span>
      </div>
      <div class="stack-panel-body">
        <ul class="stack-grid-all">
          <li v-for="(item, i) in visibleStack" :key="item.name + i" class="tech">
            <img :src="item.icon" alt="" loading="lazy" :class="{ 'inv-dark': item.invert }" @error="onError" />
            <span>{{ item.name }}</span>
          </li>
        </ul>

        <div v-if="visibleNotes.length" class="skill-notes stack-notes">
          <p v-for="n in visibleNotes" :key="n.label"><b>{{ n.label }}</b> {{ t(n.text, n.text_en) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
