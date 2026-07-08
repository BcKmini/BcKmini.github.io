<script setup>
import { ref } from "vue";
import { useStatsGate } from "../composables/useStatsGate";
import { useVisitCounter } from "../composables/useVisitCounter";

const { authed, error, tryPassword } = useStatsGate();
const { fetchStats } = useVisitCounter();

const pw = ref("");
const stats = ref(null);

async function submit() {
  const ok = await tryPassword(pw.value);
  pw.value = "";
  if (ok) loadStats();
}

async function loadStats() {
  stats.value = await fetchStats();
}

if (authed.value) loadStats();

function maxIndex(daily) {
  let idx = 0;
  daily.forEach((d, i) => {
    if (d.value > daily[idx].value) idx = i;
  });
  return idx;
}
</script>

<template>
  <section class="tab-panel active">
    <div class="blog-head">
      <p class="eyebrow">Analytics</p>
      <h1>방문 통계</h1>
      <p class="lede">이 사이트의 방문 기록입니다.</p>
    </div>

    <div v-if="!authed" class="stats-gate">
      <div class="stats-gate-card">
        <span class="stats-gate-icon">🔒</span>
        <h3>관리자 전용 페이지입니다</h3>
        <p>방문 통계는 관리자만 볼 수 있어요. 비밀번호를 입력해 주세요.</p>
        <form @submit.prevent="submit">
          <input v-model="pw" type="password" placeholder="비밀번호" autocomplete="off" />
          <button type="submit">확인</button>
        </form>
        <p v-if="error" class="stats-error">비밀번호가 올바르지 않습니다.</p>
      </div>
    </div>

    <div v-else>
      <ul class="v-tiles">
        <li><b>{{ stats ? stats.total.toLocaleString() : "–" }}</b><span>누적 방문</span></li>
        <li><b>{{ stats ? stats.visitors.toLocaleString() : "–" }}</b><span>고유 방문자</span></li>
        <li><b>{{ stats ? stats.today.toLocaleString() : "–" }}</b><span>오늘 방문</span></li>
        <li><b>{{ stats ? stats.week.toLocaleString() : "–" }}</b><span>최근 7일</span></li>
      </ul>
      <p class="v-note">방문자별 고유 ID 기준으로 하루 1회만 집계됩니다 — 새로고침해도 늘어나지 않아요.</p>

      <div class="v-chart-card">
        <h4>최근 7일 방문 추이</h4>
        <div v-if="!stats" class="v-chart"><p class="status-text">불러오는 중…</p></div>
        <div v-else class="v-chart" role="img" aria-label="최근 7일 일별 방문 수 막대 차트">
          <div
            v-for="(d, i) in stats.daily"
            :key="d.label"
            class="v-col"
            :data-tip="`${d.label} · ${d.value.toLocaleString()}회`"
          >
            <span class="v-val" :class="{ show: i === maxIndex(stats.daily) && d.value > 0 }">{{ d.value }}</span>
            <div class="v-bar" :style="{ height: Math.max((d.value / Math.max(...stats.daily.map((x) => x.value), 1)) * 100, 2) + '%' }"></div>
            <span class="v-day">{{ d.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
