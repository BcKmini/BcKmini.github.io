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

    <div class="term-window">
      <div class="term-bar">
        <span class="term-dot term-dot-red"></span>
        <span class="term-dot term-dot-amber"></span>
        <span class="term-dot term-dot-green"></span>
        <span class="term-bar-title">cloud services list --region=all</span>
      </div>
      <div class="console-head">
        <span class="ch-svc">SERVICE</span>
        <span class="ch-meta">DETAILS</span>
        <span class="ch-status">STATUS</span>
      </div>
      <ul class="console-list">
        <ProjectCard v-for="p in projects" :key="p.id" :project="p" @open="active = $event" />
      </ul>
    </div>
  </div>

  <Teleport to="body">
    <Transition name="modal">
      <ProjectModal v-if="active" :project="active" @close="active = null" />
    </Transition>
  </Teleport>
</template>
