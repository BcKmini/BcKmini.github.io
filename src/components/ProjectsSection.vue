<script setup>
import { ref } from "vue";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard.vue";
import ProjectModal from "./ProjectModal.vue";
import { vReveal } from "../composables/useReveal";

const active = ref(null);
</script>

<template>
  <div class="section" v-reveal data-snap-section data-key="projects" data-label="프로젝트">
    <h2 class="sec"><span>02.</span> 프로젝트</h2>
    <p class="sec-sub">카드를 누르면 사용 기술과 문제 해결 과정을 자세히 볼 수 있습니다.</p>

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
