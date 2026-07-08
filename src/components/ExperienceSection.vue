<script setup>
import { experience } from "../data/experience";
import { vReveal } from "../composables/useReveal";

function monthKey(str) {
  const [y, m] = str.split("-").map(Number);
  return y * 12 + (m - 1);
}
const now = new Date();
const nowKey = monthKey(`${now.getFullYear()}-${now.getMonth() + 1}`);

function isOngoing(item) {
  const start = monthKey(item.start);
  const end = item.end ? monthKey(item.end) : Infinity;
  return nowKey >= start && nowKey <= end;
}
</script>

<template>
  <div class="section" v-reveal>
    <h2 class="sec"><span>03.</span> 경험</h2>
    <ul class="rows">
      <li v-for="item in experience" :key="item.title + item.date" class="row">
        <span class="row-date">{{ item.date }}</span>
        <div class="row-body">
          <h3>
            {{ item.title }}
            <em v-if="isOngoing(item)" class="tag tag-live">진행중</em>
          </h3>
          <p v-if="item.descHtml" v-html="item.descHtml"></p>
          <p v-else>{{ item.desc }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
