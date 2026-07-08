<script setup>
import { onMounted, onUnmounted, nextTick } from "vue";
import { useSectionNav } from "../composables/useSectionNav";
import HeroSection from "./HeroSection.vue";
import StackSection from "./StackSection.vue";
import ProjectsSection from "./ProjectsSection.vue";
import ExperienceSection from "./ExperienceSection.vue";
import AwardsSection from "./AwardsSection.vue";
import CertificatesSection from "./CertificatesSection.vue";
import SectionDots from "./SectionDots.vue";

const { init, teardown, jump } = useSectionNav();

function onKeydown(e) {
  if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); jump(1); }
  if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); jump(-1); }
}

onMounted(async () => {
  await nextTick();
  init();
  window.addEventListener("keydown", onKeydown);
});
onUnmounted(() => {
  teardown();
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <section class="tab-panel active">
    <SectionDots />
    <HeroSection />
    <StackSection />
    <ProjectsSection />
    <ExperienceSection />
    <AwardsSection />
    <CertificatesSection />
  </section>
</template>
