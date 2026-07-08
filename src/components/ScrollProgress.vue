<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const progress = ref(0);

function onScroll() {
  const h = document.documentElement;
  const scrollable = h.scrollHeight - h.clientHeight;
  progress.value = scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0;
}

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <div class="scroll-progress" :style="{ width: progress + '%' }" aria-hidden="true"></div>
</template>
