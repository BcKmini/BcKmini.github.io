<script setup>
defineProps({ project: { type: Object, required: true } });
const emit = defineEmits(["open"]);

function onImgError(e) {
  e.target.remove();
}

function openLink(e, url) {
  e.stopPropagation();
  window.open(url, "_blank", "noopener");
}
</script>

<template>
  <li
    class="console-row"
    tabindex="0"
    role="button"
    :aria-haspopup="'dialog'"
    @click="emit('open', project)"
    @keydown.enter.prevent="emit('open', project)"
    @keydown.space.prevent="emit('open', project)"
  >
    <span class="cr-accent"></span>

    <div class="cr-thumb" :style="!project.thumb ? { background: project.thumbGradient } : {}">
      <img v-if="project.thumb" :src="project.thumb" alt="" loading="lazy" @error="onImgError" />
      <span v-else class="cr-thumb-fallback">{{ project.num }}</span>
    </div>

    <div class="cr-main">
      <div class="cr-head">
        <span class="svc-dot"></span>
        <span class="cr-name">{{ project.service }}</span>
        <span class="cr-status">active (exited)</span>
      </div>
      <h3 class="cr-title">{{ project.title }}</h3>
      <p class="cr-tags">
        <span><b>period</b> {{ project.meta.split(" · ")[0] }}</span>
        <span><b>role</b> {{ project.meta.split(" · ")[1] }}</span>
        <span v-if="project.meta.split(' · ')[2]"><b>team</b> {{ project.meta.split(" · ")[2] }}</span>
      </p>
      <p class="cr-desc">{{ project.desc }}</p>
      <ul class="chips cr-chips">
        <li v-for="c in project.chips" :key="c">{{ c }}</li>
      </ul>

      <div class="cr-foot">
        <span class="cr-metric" v-if="project.stats[0]"><b>{{ project.stats[0].value }}</b>{{ project.stats[0].label }}</span>
        <button type="button" class="cr-link" @click="openLink($event, project.link)">source ↗</button>
        <span class="cr-view">자세히 보기 <span class="proj-open">＋</span></span>
      </div>
    </div>
  </li>
</template>
