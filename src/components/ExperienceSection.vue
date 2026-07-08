<script setup>
import { experience } from "../data/experience";
import { isOngoing } from "../composables/useOngoing";
import { vReveal } from "../composables/useReveal";

// 커밋 해시처럼 보이는 짧은 hex — 항목 내용 기반으로 항상 같은 값이 나오도록 결정론적으로 생성
function fakeHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h.toString(16).padStart(7, "0").slice(0, 7);
}
</script>

<template>
  <div class="section" v-reveal data-snap-section data-key="experience" data-label="경험">
    <h2 class="sec"><span>03.</span> 경험</h2>

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
              <span class="git-hash">{{ fakeHash(item.title + item.date) }}</span>
              <span class="git-date">{{ item.date }}</span>
              <span v-if="isOngoing(item)" class="live-pill"><span class="live-pill-dot"></span>진행중</span>
            </p>
            <h3>{{ item.title }}</h3>
            <p v-if="item.descHtml" v-html="item.descHtml"></p>
            <p v-else>{{ item.desc }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
