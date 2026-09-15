<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useLocale } from "../composables/useLocale";

const { t } = useLocale();
const visible = ref(false);

function onScroll() {
  visible.value = window.scrollY > 600;
}

function toTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <Transition name="fade-slide">
    <button
      v-if="visible"
      type="button"
      class="scroll-top-btn no-print"
      :aria-label="t('맨 위로', 'Scroll to top')"
      @click="toTop"
    >↑</button>
  </Transition>
</template>
