<script setup>
import { ref, watch, onMounted, nextTick } from "vue";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard.vue";
import ProjectModal from "./ProjectModal.vue";
import { vReveal } from "../composables/useReveal";
import { useLocale } from "../composables/useLocale";
import { useProjectFocus } from "../composables/useProjectFocus";

const { t } = useLocale();
const active = ref(null);
const highlightedTech = ref(null);
const { focusProjectId, highlightTech } = useProjectFocus();
let hlTimer = null;

function syncUrl(project) {
  const params = new URLSearchParams(location.search);
  if (project) params.set("project", project.id);
  else params.delete("project");
  const qs = params.toString();
  history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
}

function open(project) {
  active.value = project;
  syncUrl(project);
}

function close() {
  active.value = null;
  syncUrl(null);
}

function navigate(delta) {
  if (!active.value) return;
  const idx = projects.findIndex((p) => p.id === active.value.id);
  const next = projects[(idx + delta + projects.length) % projects.length];
  open(next);
}

function matchesTech(project, name) {
  const n = name.toLowerCase();
  return project.chips.some((c) => {
    const cl = c.toLowerCase();
    return cl === n || cl.includes(n) || n.includes(cl);
  });
}

watch(
  focusProjectId,
  (v) => {
    if (!v) return;
    const p = projects.find((x) => x.id === v.id);
    if (p) open(p);
  },
  { immediate: true }
);

watch(
  highlightTech,
  (v) => {
    if (!v) return;
    highlightedTech.value = v.name;
    nextTick(() => {
      const section = document.querySelector('[data-key="projects"]');
      const firstMatch = projects.find((p) => matchesTech(p, v.name));
      const target = firstMatch ? document.querySelector(`[data-proj-id="${firstMatch.id}"]`) : section;
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    clearTimeout(hlTimer);
    hlTimer = setTimeout(() => (highlightedTech.value = null), 2200);
  },
  { immediate: true }
);

onMounted(() => {
  if (active.value) return;
  const id = new URLSearchParams(location.search).get("project");
  const found = id && projects.find((p) => p.id === id);
  if (found) active.value = found;
});
</script>

<template>
  <div class="section" v-reveal data-snap-section data-key="projects" :data-label="t('프로젝트', 'Projects')">
    <h2 class="sec"><span>02.</span> {{ t("프로젝트", "Projects") }}</h2>
    <p class="sec-sub">{{ t("사진을 누르면 자세한 아키텍처와 기술 설명을 볼 수 있고, 화살표를 누르면 요약을 펼쳐볼 수 있습니다.", "Tap the photo for the full architecture and tech write-up, or the arrow to expand the summary.") }}</p>

    <div class="proj-grid">
      <ProjectCard
        v-for="p in projects"
        :key="p.id"
        :project="p"
        :data-proj-id="p.id"
        :highlighted="highlightedTech ? matchesTech(p, highlightedTech) : false"
        @open="open"
      />
    </div>
  </div>

  <Teleport to="body">
    <Transition name="modal">
      <ProjectModal v-if="active" :project="active" @close="close" @navigate="navigate" />
    </Transition>
  </Teleport>
</template>
