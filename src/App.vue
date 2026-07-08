<script setup>
import { onMounted } from "vue";
import { useTab } from "./composables/useTab";
import { useTheme } from "./composables/useTheme";
import { useVisitCounter } from "./composables/useVisitCounter";
import ScrollProgress from "./components/ScrollProgress.vue";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import HomeView from "./components/HomeView.vue";
import BlogView from "./components/BlogView.vue";
import StatsView from "./components/StatsView.vue";

const { tab, initPopstate } = useTab();
const { init: initTheme } = useTheme();
const { recordVisit } = useVisitCounter();

initTheme();
initPopstate();

onMounted(() => recordVisit());
</script>

<template>
  <ScrollProgress />
  <AppHeader />
  <main class="container">
    <Transition name="fade-slide" mode="out-in">
      <HomeView v-if="tab === 'home'" key="home" />
      <BlogView v-else-if="tab === 'blog'" key="blog" />
      <StatsView v-else key="stats" />
    </Transition>
  </main>
  <AppFooter />
</template>
