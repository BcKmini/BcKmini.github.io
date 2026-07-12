<script setup>
import { experience } from "../data/experience";
import { isOngoing } from "../composables/useOngoing";
import { vReveal } from "../composables/useReveal";
</script>

<template>
  <div class="section" v-reveal data-snap-section data-key="experience" data-label="실무경험">
    <h2 class="sec"><span>03.</span> 실무 경험</h2>
    <p class="sec-sub">구체적인 역할과 산출물이 있는 경험입니다. 짧은 교육 이수·활동 이력은 아래 "교육 · 활동"에 따로 정리했습니다.</p>

    <div class="term-window">
      <div class="term-bar">
        <span class="term-dot term-dot-red"></span>
        <span class="term-dot term-dot-amber"></span>
        <span class="term-dot term-dot-green"></span>
        <span class="term-bar-title">git log --oneline --graph experience/</span>
      </div>
      <ul class="git-log">
        <li v-for="item in experience" :key="item.title + item.date" class="git-row" :class="{ 'git-row-live': isOngoing(item) }">
          <div class="git-graph">
            <span class="git-dot" :class="{ live: isOngoing(item) }"></span>
            <span class="git-line"></span>
          </div>
          <div class="git-content">
            <p class="git-meta">
              <span class="git-date">{{ item.date }}</span>
              <span v-if="isOngoing(item)" class="live-pill"><span class="live-pill-dot"></span>진행중</span>
            </p>
            <h3>
              {{ item.title }}
              <em v-if="item.type" class="tag tag-accent">{{ item.type }}</em>
            </h3>
            <p v-if="item.descHtml" v-html="item.descHtml"></p>
            <p v-else>{{ item.desc }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
