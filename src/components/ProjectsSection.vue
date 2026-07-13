<script setup>
import { ref } from "vue";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard.vue";
import ProjectModal from "./ProjectModal.vue";
import { vReveal } from "../composables/useReveal";
import { useLocale } from "../composables/useLocale";

const { t } = useLocale();
const active = ref(null);
</script>

<template>
  <div class="section" v-reveal data-snap-section data-key="projects" :data-label="t('프로젝트', 'Projects')">
    <h2 class="sec"><span>02.</span> {{ t("프로젝트", "Projects") }}</h2>
    <p class="sec-sub">{{ t("사진을 누르면 자세한 아키텍처와 기술 설명을 볼 수 있고, 화살표를 누르면 요약을 펼쳐볼 수 있습니다.", "Tap the photo for the full architecture and tech write-up, or the arrow to expand the summary.") }}</p>

    <div class="proj-grid">
      <ProjectCard v-for="p in projects" :key="p.id" :project="p" @open="active = $event" />
    </div>
  </div>

  <Teleport to="body">
    <Transition name="modal">
      <ProjectModal v-if="active" :project="active" @close="active = null" />
    </Transition>
  </Teleport>
</template>
