<script setup>
import { certificates } from "../data/certificates";
import { vReveal } from "../composables/useReveal";
</script>

<template>
  <div class="section" v-reveal data-snap-section data-key="certs" data-label="자격증">
    <h2 class="sec"><span>05.</span> 자격증</h2>
    <ul class="rows">
      <li v-for="c in certificates" :key="c.title" class="row">
        <span class="row-date">{{ c.date }}</span>
        <div class="row-body">
          <h3>{{ c.title }}</h3>
          <p>{{ c.host }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
