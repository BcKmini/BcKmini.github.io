<script setup>
import { ref } from "vue";
import { useLocale } from "../composables/useLocale";

defineProps({ project: { type: Object, required: true } });
const emit = defineEmits(["open"]);
const { t } = useLocale();

const expanded = ref(false);

function onMove(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  card.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

function onImgError(e) {
  e.target.remove();
}

function openLink(e, url) {
  e.stopPropagation();
  window.open(url, "_blank", "noopener");
}
</script>

<template>
  <article class="proj-card" @mousemove="onMove">
    <div
      class="proj-thumb"
      :data-label="project.label"
      :style="!project.thumb ? { background: project.thumbGradient } : {}"
      role="button"
      tabindex="0"
      :aria-haspopup="'dialog'"
      @click="emit('open', project)"
      @keydown.enter.prevent="emit('open', project)"
      @keydown.space.prevent="emit('open', project)"
    >
      <span>{{ t(project.tag, project.tag_en) }}</span>
      <img v-if="project.thumb" :src="project.thumb" alt="" loading="lazy" @error="onImgError" />

      <div class="svc-badge">
        <span class="svc-dot"></span>
        <span class="svc-name">{{ project.service }}</span>
      </div>
      <span class="svc-status-badge">exited</span>
    </div>

    <div class="proj-body">
      <div class="proj-card-top">
        <span class="proj-num">{{ project.num }}</span>
        <button
          type="button"
          class="proj-open"
          :class="{ 'is-open': expanded }"
          :aria-expanded="expanded"
          :aria-label="t('상세 내용 펼치기', 'Expand details')"
          @click="expanded = !expanded"
        >⌄</button>
      </div>
      <h3>{{ t(project.title, project.title_en) }}</h3>
      <p class="proj-card-meta">{{ t(project.meta, project.meta_en) }}</p>
      <p class="proj-card-desc" :class="{ clamp: !expanded }">{{ t(project.desc, project.desc_en) }}</p>

      <div class="proj-expand" :class="{ open: expanded }">
        <div class="proj-expand-inner">
          <ul class="chips">
            <li v-for="c in project.chips" :key="c">{{ c }}</li>
          </ul>
          <div class="cr-foot">
            <span class="cr-metric" v-if="project.stats[0]"><b>{{ project.stats[0].value }}</b>{{ t(project.stats[0].label, project.stats[0].label_en) }}</span>
            <button type="button" class="cr-link" @click="openLink($event, project.link)">source ↗</button>
            <button type="button" class="cr-view" @click="emit('open', project)">
              {{ t("자세히 보기", "View details") }}<span class="cr-view-icon">＋</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
