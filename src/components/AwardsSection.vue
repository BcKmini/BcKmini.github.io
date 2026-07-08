<script setup>
import { awards } from "../data/awards";
import { vReveal } from "../composables/useReveal";
</script>

<template>
  <div class="section" v-reveal data-snap-section data-key="awards" data-label="수상">
    <h2 class="sec"><span>04.</span> 수상 및 공모전</h2>
    <div class="term-window">
      <div class="term-bar">
        <span class="term-dot term-dot-red"></span>
        <span class="term-dot term-dot-amber"></span>
        <span class="term-dot term-dot-green"></span>
        <span class="term-bar-title">cat awards.log</span>
      </div>
      <ul class="rows rows-in-term">
        <li v-for="a in awards" :key="a.title" class="row">
          <span class="row-date">{{ a.date }}</span>
          <div class="row-body">
            <h3>
              <a v-if="a.link" :href="a.link" target="_blank" rel="noopener">{{ a.title }} ↗</a>
              <template v-else>{{ a.title }}</template>
              <em v-if="a.tag" class="tag" :class="`tag-${a.tag.type}`">{{ a.tag.text }}</em>
            </h3>
            <p v-if="a.host" class="row-host">{{ a.host }}</p>
            <p>{{ a.desc }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
