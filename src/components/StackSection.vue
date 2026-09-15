<script setup>
import { computed, reactive } from "vue";
import { categories, stack, stackNotes } from "../data/stack";
import { vReveal } from "../composables/useReveal";
import { useLocale } from "../composables/useLocale";
import { useProjectFocus } from "../composables/useProjectFocus";

const { t } = useLocale();
const { highlightByTech } = useProjectFocus();

const groups = computed(() =>
  categories.map((c) => ({
    ...c,
    items: stack.filter((s) => s.cat === c.key),
    notes: stackNotes.filter((n) => n.cat === c.key),
  }))
);

const openKeys = reactive(new Set());

function toggle(key) {
  if (openKeys.has(key)) openKeys.delete(key);
  else openKeys.add(key);
}

function expandAll() {
  categories.forEach((c) => openKeys.add(c.key));
}

function collapseAll() {
  openKeys.clear();
}

function onError(e) {
  e.target.style.display = "none";
}
</script>

<template>
  <div class="section" v-reveal data-snap-section data-key="stack" :data-label="t('스택', 'Stack')">
    <h2 class="sec"><span>01.</span> {{ t("기술 스택", "Tech Stack") }}</h2>

    <div class="term-window stack-panel">
      <div class="term-bar">
        <span class="term-dot term-dot-red"></span>
        <span class="term-dot term-dot-amber"></span>
        <span class="term-dot term-dot-green"></span>
        <span class="term-bar-title">tree ./stack</span>
      </div>
      <div class="stack-panel-body">
        <div class="stack-toolbar">
          <button type="button" class="stack-toolbar-btn" @click="expandAll">{{ t("전체 펼치기", "Expand all") }}</button>
          <button type="button" class="stack-toolbar-btn" @click="collapseAll">{{ t("전체 접기", "Collapse all") }}</button>
        </div>

        <div v-for="g in groups" :key="g.key" class="stack-group" :class="{ open: openKeys.has(g.key) }">
          <button type="button" class="stack-group-label" :aria-expanded="openKeys.has(g.key)" @click="toggle(g.key)">
            <span class="stack-group-chevron">▸</span>
            <span class="stack-group-branch">./</span>{{ g.label }}<span class="stack-group-count">{{ g.items.length }}</span>
          </button>
          <div class="stack-group-collapse">
            <div class="stack-group-collapse-inner">
              <ul class="stack-grid-all">
                <li v-for="(item, i) in g.items" :key="item.name + i">
                  <button
                    type="button"
                    class="tech"
                    :title="t(`관련 프로젝트 보기`, `See related projects`)"
                    @click="highlightByTech(item.name)"
                  >
                    <img :src="item.icon" alt="" loading="lazy" :class="{ 'inv-dark': item.invert }" @error="onError" />
                    <span>{{ item.name }}</span>
                  </button>
                </li>
              </ul>
              <div v-if="g.notes.length" class="skill-notes stack-notes">
                <p v-for="n in g.notes" :key="n.label"><b>{{ n.label }}</b> {{ t(n.text, n.text_en) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
