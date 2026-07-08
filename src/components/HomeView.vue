<script setup>
import HeroSection from "./HeroSection.vue";
import StackSection from "./StackSection.vue";
import ProjectsSection from "./ProjectsSection.vue";
import ExperienceSection from "./ExperienceSection.vue";
import AwardsSection from "./AwardsSection.vue";
import CertificatesSection from "./CertificatesSection.vue";
import ActivitiesSection from "./ActivitiesSection.vue";
</script>

<template>
  <section class="tab-panel active">
    <HeroSection />
    <StackSection />
    <ProjectsSection />
    <ExperienceSection />
    <AwardsSection />
    <CertificatesSection />
    <ActivitiesSection />
  </section>
</template>
