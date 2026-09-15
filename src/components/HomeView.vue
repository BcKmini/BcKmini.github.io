<script setup>
import { onMounted, onUnmounted } from "vue";
import HeroSection from "./HeroSection.vue";
import StackSection from "./StackSection.vue";
import ProjectsSection from "./ProjectsSection.vue";
import ExperienceSection from "./ExperienceSection.vue";
import AwardsSection from "./AwardsSection.vue";
import CredentialsSection from "./CredentialsSection.vue";
import SectionDots from "./SectionDots.vue";
import { useSectionNav } from "../composables/useSectionNav";

const { init, teardown } = useSectionNav();
onMounted(init);
onUnmounted(teardown);
</script>

<template>
  <section class="tab-panel active">
    <HeroSection />
    <StackSection />
    <ProjectsSection />
    <ExperienceSection />
    <AwardsSection />
    <CredentialsSection />
    <SectionDots />
  </section>
</template>
