<script setup>
defineProps({ project: { type: Object, required: true } });
const emit = defineEmits(["open"]);

function onMove(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  card.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

function onImgError(e) {
  e.target.remove();
}
</script>

<template>
  <article
    class="proj-card"
    tabindex="0"
    role="button"
    :aria-haspopup="'dialog'"
    @click="emit('open', project)"
    @keydown.enter.prevent="emit('open', project)"
    @keydown.space.prevent="emit('open', project)"
    @mousemove="onMove"
  >
    <div class="svc-strip">
      <span class="svc-dot"></span>
      <span class="svc-name">{{ project.service }}</span>
      <span class="svc-status">active (exited)</span>
    </div>

    <div class="proj-thumb" :data-label="project.label" :style="!project.thumb ? { background: project.thumbGradient } : {}">
      <span>{{ project.tag }}</span>
      <img v-if="project.thumb" :src="project.thumb" alt="" loading="lazy" @error="onImgError" />
    </div>
    <div class="proj-body">
      <div class="proj-card-top">
        <span class="proj-num">{{ project.num }}</span>
        <span class="proj-open">＋</span>
      </div>
      <h3>{{ project.title }}</h3>
      <p class="proj-card-meta">{{ project.meta }}</p>
      <p class="proj-card-desc">{{ project.desc }}</p>
      <ul class="chips">
        <li v-for="c in project.chips" :key="c">{{ c }}</li>
      </ul>
    </div>
  </article>
</template>
