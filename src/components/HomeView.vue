<script setup>
import HeroSection from "./HeroSection.vue";
import ProjectsSection from "./ProjectsSection.vue";
import ExperienceSection from "./ExperienceSection.vue";
import StackSection from "./StackSection.vue";
import AwardsSection from "./AwardsSection.vue";
import CertificatesSection from "./CertificatesSection.vue";
import ActivitiesSection from "./ActivitiesSection.vue";
</script>

<template>
  <section class="tab-panel active">
    <HeroSection />
    <ProjectsSection />
    <ExperienceSection />
    <StackSection />
    <AwardsSection />
    <CertificatesSection />
    <ActivitiesSection />
  </section>
</template>
