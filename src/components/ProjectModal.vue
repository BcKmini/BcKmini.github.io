<script setup>
import { onMounted, onUnmounted, computed, ref, watch } from "vue";
import NoteflowDiagram from "./diagrams/NoteflowDiagram.vue";
import NoteflowErdDiagram from "./diagrams/NoteflowErdDiagram.vue";
import CctvDiagram from "./diagrams/CctvDiagram.vue";
import CctvErdDiagram from "./diagrams/CctvErdDiagram.vue";
import HodongDiagram from "./diagrams/HodongDiagram.vue";
import HodongPipelineDiagram from "./diagrams/HodongPipelineDiagram.vue";
import BirdDiagram from "./diagrams/BirdDiagram.vue";
import BirdErdDiagram from "./diagrams/BirdErdDiagram.vue";
import MedicalDiagram from "./diagrams/MedicalDiagram.vue";
import MedicalErdDiagram from "./diagrams/MedicalErdDiagram.vue";

const props = defineProps({ project: { type: Object, required: true } });
const emit = defineEmits(["close"]);

const diagramComponents = {
  noteflow: NoteflowDiagram,
  noteflowErd: NoteflowErdDiagram,
  cctv: CctvDiagram,
  cctvErd: CctvErdDiagram,
  hodong: HodongDiagram,
  hodongPipeline: HodongPipelineDiagram,
  bird: BirdDiagram,
  birdErd: BirdErdDiagram,
  medical: MedicalDiagram,
  medicalErd: MedicalErdDiagram,
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
        <button class="modal-close" aria-label="닫기" @click="emit('close')">✕</button>
      </div>
      <div class="modal-content">
        <p class="m-num">Project {{ project.num }} · <span class="svc-status-inline">active (exited)</span></p>
        <h3>{{ project.title }}</h3>
        <p class="m-meta">{{ project.meta }}</p>

        <p class="term-label"><span class="tprompt">$</span> cat description.md</p>
        <p class="m-desc">{{ project.desc }}</p>
        <ul class="chips">
          <li v-for="c in project.chips" :key="c">{{ c }}</li>
        </ul>

        <p class="term-label"><span class="tprompt">$</span> ./metrics.sh</p>
        <ul class="m-stats">
          <li v-for="s in project.stats" :key="s.label"><b>{{ s.value }}</b><span>{{ s.label }}</span></li>
        </ul>

        <figure v-if="project.thumb" class="m-shot">
          <img :src="project.thumb" :alt="project.title + ' 화면'" loading="lazy" @error="($event) => ($event.target.closest('figure').style.display = 'none')" />
        </figure>

        <h4>아키텍처 &amp; 데이터 모델</h4>
        <div class="diagram-tabs">
          <button
            v-for="d in project.diagrams"
            :key="d.key"
            type="button"
            class="filter-chip"
            :class="{ active: activeDiagram === d.key }"
            @click="activeDiagram = d.key"
          >{{ d.label }}</button>
        </div>
        <component :is="DiagramComp" />

        <h4>사용 기술과 이유</h4>
        <dl class="tech-dl">
          <template v-for="t in project.tech" :key="t.name">
            <dt>{{ t.name }}</dt>
            <dd>{{ t.desc }}</dd>
          </template>
        </dl>

        <a class="m-link" :href="project.link" target="_blank" rel="noopener">GitHub에서 보기 ↗</a>
      </div>
    </div>
  </div>
</template>
