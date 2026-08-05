<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useBootSequence } from "../composables/useBootSequence";
import { useLocale } from "../composables/useLocale";

const { t } = useLocale();
const { BOOT_LINES, done, skip, finish } = useBootSequence();
const rendered = ref([]); // 화면에 그려진 줄들 (완성된 텍스트만)
const typingLine = ref(""); // 현재 타이핑 중인 줄
const typingType = ref("cmd");
let cancelled = false;

function sleep(ms) {
  return new Promise((resolve) => {
    const t = setTimeout(resolve, ms);
    if (cancelled) { clearTimeout(t); resolve(); }
  });
}

async function play() {
  for (const line of BOOT_LINES) {
    if (cancelled) break;

    if (line.type === "gap") {
      rendered.value.push({ type: "gap" });
      await sleep(120);
      continue;
    }

    typingType.value = line.type;
    typingLine.value = "";
    const speed = line.type === "cmd" ? 26 : 8;

    for (let i = 0; i < line.text.length; i++) {
      if (cancelled) break;
      typingLine.value += line.text[i];
      await sleep(speed);
    }

    rendered.value.push({ type: line.type, text: line.text });
    typingLine.value = "";
    await sleep(line.type === "cmd" ? 160 : 60);
  }

  if (!cancelled) {
    await sleep(400);
    finish();
  }
}

function skipNow() {
  cancelled = true;
  finish();
}

onMounted(() => {
  if (skip.value || done.value) {
    finish();
    return;
  }
  window.addEventListener("keydown", skipNow);
  play();
});
onUnmounted(() => {
  cancelled = true;
  window.removeEventListener("keydown", skipNow);
});
</script>

<template>
  <div v-if="!done" class="boot-overlay" @click="skipNow">
    <div class="boot-window">
      <div class="term-bar">
        <span class="term-dot term-dot-red"></span>
        <span class="term-dot term-dot-amber"></span>
        <span class="term-dot term-dot-green"></span>
        <span class="term-bar-title">mini@portfolio: ~</span>
      </div>
      <div class="boot-body">
        <p v-for="(l, i) in rendered" :key="i" :class="['boot-line', `boot-${l.type}`]">
          <template v-if="l.type === 'cmd'">
            <span class="boot-prompt">$</span> {{ l.text }}
          </template>
          <template v-else-if="l.type === 'out'">
            <span class="boot-arrow">&gt;</span> {{ l.text }}
          </template>
          <template v-else>{{ l.text }}</template>
        </p>
        <p v-if="typingLine" :class="['boot-line', `boot-${typingType}`]">
          <span v-if="typingType === 'cmd'" class="boot-prompt">$</span>
          <span v-else-if="typingType === 'out'" class="boot-arrow">&gt;</span>
          {{ typingLine }}<span class="boot-cursor"></span>
        </p>
      </div>
      <button type="button" class="boot-skip" @click.stop="skipNow">{{ t("건너뛰기 →", "Skip →") }}</button>
    </div>
  </div>
</template>
