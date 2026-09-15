<script setup>
import { onMounted } from "vue";
import { useTab } from "./composables/useTab";
import { useTheme } from "./composables/useTheme";
import { useVisitCounter } from "./composables/useVisitCounter";
import { useBootSequence } from "./composables/useBootSequence";
import BootSequence from "./components/BootSequence.vue";
import ScrollProgress from "./components/ScrollProgress.vue";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import HomeView from "./components/HomeView.vue";
import BlogView from "./components/BlogView.vue";
import StatsView from "./components/StatsView.vue";
import ResumeView from "./components/ResumeView.vue";

const { tab, initPopstate } = useTab();
const { init: initTheme } = useTheme();
const { recordVisit } = useVisitCounter();
const { done: bootDone } = useBootSequence();

initTheme();
initPopstate();

onMounted(() => recordVisit());
</script>

<template>
  <Transition name="boot-fade">
    <BootSequence v-if="!bootDone" />
  </Transition>
  <ScrollProgress />
  <AppHeader />
  <main class="container">
    <Transition name="fade-slide" mode="out-in">
      <HomeView v-if="tab === 'home'" key="home" />
      <BlogView v-else-if="tab === 'blog'" key="blog" />
      <ResumeView v-else-if="tab === 'resume'" key="resume" />
      <StatsView v-else key="stats" />
    </Transition>
  </main>
  <AppFooter />
</template>
