<script setup>
import { ref, computed, onMounted } from "vue";
import { categories, stack, stackNotes } from "../data/stack";
import { useLocale } from "../composables/useLocale";

const { t } = useLocale();

const TILE_META = {
  aitools: { size: "feature", color: "rose" },
  cloud: { size: "wide", color: "amber" },
  collab: { size: "wide", color: "violet" },
};
const TILE_KEYS = Object.keys(TILE_META);

const groupsByKey = computed(() => {
  const map = {};
  TILE_KEYS.forEach((key) => {
    const cat = categories.find((c) => c.key === key);
    map[key] = {
      key,
      ...TILE_META[key],
      label: cat.label,
      items: stack.filter((s) => s.cat === key),
      notes: stackNotes.filter((n) => n.cat === key),
    };
  });
  return map;
});

const STORAGE_KEY = "uses-tile-order";
const order = ref([...TILE_KEYS]);

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Array.isArray(saved) && saved.length === TILE_KEYS.length && saved.every((k) => TILE_KEYS.includes(k))) {
      order.value = saved;
    }
  } catch {
    /* ignore malformed localStorage */
  }
});

const orderedGroups = computed(() => order.value.map((k) => groupsByKey.value[k]));

const draggingKey = ref(null);
const overKey = ref(null);

function onDragStart(key, e) {
  draggingKey.value = key;
  e.dataTransfer.effectAllowed = "move";
}
function onDragEnd() {
  draggingKey.value = null;
  overKey.value = null;
}
function onDrop(targetKey) {
  if (draggingKey.value && draggingKey.value !== targetKey) {
    const next = [...order.value];
    const from = next.indexOf(draggingKey.value);
    const to = next.indexOf(targetKey);
    next.splice(from, 1);
    next.splice(to, 0, draggingKey.value);
    order.value = next;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  onDragEnd();
}
function resetOrder() {
  order.value = [...TILE_KEYS];
  localStorage.removeItem(STORAGE_KEY);
}

function onError(e) {
  e.target.style.display = "none";
}
</script>

<template>
  <section class="tab-panel active">
    <div class="blog-head uses-head">
      <p class="eyebrow">{{ t("워크플로우", "Workflow") }}</p>
      <h1>{{ t("지금 이렇게 일합니다", "How I work right now") }}</h1>
      <p class="lede">{{ t("자주 쓰는 도구들이에요. 카드를 드래그하면 순서를 바꿀 수 있습니다.", "The tools I reach for most. Drag a card to reorder it — this layout is yours to rearrange.") }}</p>
      <button type="button" class="uses-reset" @click="resetOrder">{{ t("↺ 순서 초기화", "↺ Reset order") }}</button>
    </div>

    <div class="uses-grid">
      <div
        v-for="g in orderedGroups"
        :key="g.key"
        class="uses-tile"
        :data-size="g.size"
        :data-color="g.color"
        :class="{ 'is-dragging': draggingKey === g.key, 'is-over': overKey === g.key && draggingKey && draggingKey !== g.key }"
        draggable="true"
        @dragstart="onDragStart(g.key, $event)"
        @dragover.prevent="overKey = g.key"
        @dragleave="overKey === g.key && (overKey = null)"
        @drop="onDrop(g.key)"
        @dragend="onDragEnd"
      >
        <div class="uses-tile-head">
          <p class="uses-tile-title">{{ g.label }}</p>
          <span class="uses-tile-handle" :title="t('드래그해서 순서 변경', 'Drag to reorder')">⠿⠿</span>
        </div>
        <ul class="uses-tile-icons">
          <li v-for="item in g.items" :key="item.name">
            <img :src="item.icon" alt="" loading="lazy" :class="{ 'inv-dark': item.invert }" @error="onError" />
            <span>{{ item.name }}</span>
          </li>
        </ul>
        <p v-if="g.notes.length" class="uses-tile-note">{{ t(g.notes[0].text, g.notes[0].text_en) }}</p>
      </div>
    </div>
  </section>
</template>
