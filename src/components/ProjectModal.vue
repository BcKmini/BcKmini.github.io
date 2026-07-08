<script setup>
import { onMounted, onUnmounted, computed } from "vue";
import NoteflowDiagram from "./diagrams/NoteflowDiagram.vue";
import CctvDiagram from "./diagrams/CctvDiagram.vue";
import HodongDiagram from "./diagrams/HodongDiagram.vue";
import BirdDiagram from "./diagrams/BirdDiagram.vue";
import MedicalDiagram from "./diagrams/MedicalDiagram.vue";

const props = defineProps({ project: { type: Object, required: true } });
const emit = defineEmits(["close"]);

const diagrams = {
  noteflow: NoteflowDiagram,
  cctv: CctvDiagram,
  hodong: HodongDiagram,
  bird: BirdDiagram,
  medical: MedicalDiagram,
};
const DiagramComp = computed(() => diagrams[props.project.diagram]);

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
    <div class="modal" role="dialog" aria-modal="true">
      <button class="modal-close" aria-label="닫기" @click="emit('close')">✕</button>
      <div class="modal-content">
        <p class="m-num">Project {{ project.num }}</p>
        <h3>{{ project.title }}</h3>
        <p class="m-meta">{{ project.meta }}</p>
        <p class="m-desc">{{ project.desc }}</p>
        <ul class="chips">
          <li v-for="c in project.chips" :key="c">{{ c }}</li>
        </ul>

        <ul class="m-stats">
          <li v-for="s in project.stats" :key="s.label"><b>{{ s.value }}</b><span>{{ s.label }}</span></li>
        </ul>

        <figure v-if="project.thumb" class="m-shot">
          <img :src="project.thumb" :alt="project.title + ' 화면'" loading="lazy" @error="($event) => ($event.target.closest('figure').style.display = 'none')" />
        </figure>

        <h4>아키텍처</h4>
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
