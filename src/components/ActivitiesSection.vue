<script setup>
import { activities } from "../data/activities";
import { vReveal } from "../composables/useReveal";
</script>

<template>
  <div class="section" v-reveal data-snap-section data-key="activities" data-label="교육·활동">
    <h2 class="sec"><span>06.</span> 교육 · 활동</h2>
    <div class="term-window">
      <div class="term-bar">
        <span class="term-dot term-dot-red"></span>
        <span class="term-dot term-dot-amber"></span>
        <span class="term-dot term-dot-green"></span>
        <span class="term-bar-title">cat activities.log</span>
      </div>
      <ul class="rows rows-in-term">
        <li v-for="a in activities" :key="a.title" class="row">
          <span class="row-date">{{ a.date }}</span>
          <div class="row-body">
            <h3>{{ a.title }}</h3>
            <p>{{ a.desc }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
