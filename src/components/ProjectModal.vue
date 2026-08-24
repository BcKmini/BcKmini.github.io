<script setup>
import { onMounted, onUnmounted, computed, ref, watch } from "vue";
import NoteflowDiagram from "./diagrams/NoteflowDiagram.vue";
import NoteflowErdDiagram from "./diagrams/NoteflowErdDiagram.vue";
import NoteflowPipelineDiagram from "./diagrams/NoteflowPipelineDiagram.vue";
import CctvDiagram from "./diagrams/CctvDiagram.vue";
import CctvErdDiagram from "./diagrams/CctvErdDiagram.vue";
import HodongDiagram from "./diagrams/HodongDiagram.vue";
import HodongPipelineDiagram from "./diagrams/HodongPipelineDiagram.vue";
import BirdDiagram from "./diagrams/BirdDiagram.vue";
import BirdErdDiagram from "./diagrams/BirdErdDiagram.vue";
import BirdCacheDiagram from "./diagrams/BirdCacheDiagram.vue";
import MedicalDiagram from "./diagrams/MedicalDiagram.vue";
import MedicalErdDiagram from "./diagrams/MedicalErdDiagram.vue";
import FowocoDiagram from "./diagrams/FowocoDiagram.vue";
import FowocoMonitoringDiagram from "./diagrams/FowocoMonitoringDiagram.vue";
import { useLocale } from "../composables/useLocale";

const props = defineProps({ project: { type: Object, required: true } });
const emit = defineEmits(["close"]);
const { t } = useLocale();

const diagramComponents = {
  noteflow: NoteflowDiagram,
  noteflowErd: NoteflowErdDiagram,
  noteflowPipeline: NoteflowPipelineDiagram,
  cctv: CctvDiagram,
  cctvErd: CctvErdDiagram,
  hodong: HodongDiagram,
  hodongPipeline: HodongPipelineDiagram,
  bird: BirdDiagram,
  birdErd: BirdErdDiagram,
  birdCache: BirdCacheDiagram,
  medical: MedicalDiagram,
  medicalErd: MedicalErdDiagram,
  fowoco: FowocoDiagram,
  fowocoMonitoring: FowocoMonitoringDiagram,
};

const activeDiagram = ref(props.project.diagrams[0].key);
watch(() => props.project, (p) => (activeDiagram.value = p.diagrams[0].key));

const DiagramComp = computed(() => {
  const d = props.project.diagrams.find((d) => d.key === activeDiagram.value);
  return diagramComponents[d.component];
});

function onKeydown(e) {
  if (e.key === "Escape") emit("close");
}
onMounted(() => {
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", onKeydown);
});
onUnmounted(() => {
  document.body.style.overflow = "";
  document.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal term-window" role="dialog" aria-modal="true">
      <div class="term-bar">
        <span class="term-dot term-dot-red"></span>
        <span class="term-dot term-dot-amber"></span>
        <span class="term-dot term-dot-green"></span>
        <span class="term-bar-title">{{ project.service }}</span>
        <button class="modal-close" :aria-label="t('닫기', 'Close')" @click="emit('close')">✕</button>
      </div>
      <div class="modal-content">
        <p class="m-num">Project {{ project.num }} · <span class="svc-status-inline">active (exited)</span></p>
        <h3>{{ t(project.title, project.title_en) }}</h3>
        <p class="m-meta">{{ t(project.meta, project.meta_en) }}</p>

        <p class="term-label"><span class="tprompt">$</span> cat description.md</p>
        <p class="m-desc">{{ t(project.desc, project.desc_en) }}</p>
        <ul class="chips">
          <li v-for="c in project.chips" :key="c">{{ c }}</li>
        </ul>

        <p class="term-label"><span class="tprompt">$</span> ./metrics.sh</p>
        <ul class="m-stats">
          <li v-for="s in project.stats" :key="s.label"><b>{{ s.value }}</b><span>{{ t(s.label, s.label_en) }}</span></li>
        </ul>

        <figure v-if="project.thumb" class="m-shot">
          <img :src="project.thumb" :alt="t(project.title, project.title_en) + t(' 화면', ' screenshot')" loading="lazy" @error="($event) => ($event.target.closest('figure').style.display = 'none')" />
        </figure>

        <h4>{{ t("아키텍처 & 데이터 모델", "Architecture & Data Model") }}</h4>
        <div class="diagram-tabs">
          <button
            v-for="d in project.diagrams"
            :key="d.key"
            type="button"
            class="filter-chip"
            :class="{ active: activeDiagram === d.key }"
            @click="activeDiagram = d.key"
          >{{ t(d.label, d.label_en) }}</button>
        </div>
        <component :is="DiagramComp" />

        <h4>{{ t("사용 기술과 이유", "Tech Choices & Reasoning") }}</h4>
        <dl class="tech-dl">
          <template v-for="item in project.tech" :key="item.name">
            <dt>{{ item.name }}</dt>
            <dd>{{ t(item.desc, item.desc_en) }}</dd>
          </template>
        </dl>

        <a class="m-link" :href="project.link" target="_blank" rel="noopener">{{ t("GitHub에서 보기", "View on GitHub") }} ↗</a>
      </div>
    </div>
  </div>
</template>
