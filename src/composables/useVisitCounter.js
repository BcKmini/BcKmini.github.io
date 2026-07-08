const COUNTER = "https://abacus.jasoncameron.dev";
const COUNTER_NS = "bckmini-portfolio";

function dayKey(offset) {
  const d = new Date();
  d.setDate(d.getDate() - offset);
  return `d-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

async function counterGet(key) {
  try {
    const res = await fetch(`${COUNTER}/get/${COUNTER_NS}/${key}`);
    if (!res.ok) return 0;
    return (await res.json()).value ?? 0;
  } catch {
    return 0;
  }
}

// 방문자별 고유 ID를 발급해 같은 사람은 하루 1회만 집계
// (새로고침·탭 재열기·재접속해도 당일에는 다시 올라가지 않음)
function recordVisit() {
  try {
    if (!localStorage.getItem("visitor-id")) {
      const vid = crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem("visitor-id", vid);
      fetch(`${COUNTER}/hit/${COUNTER_NS}/visitors`).catch(() => {});
    }

    const today = dayKey(0);
    if (localStorage.getItem("last-visit") !== today) {
      localStorage.setItem("last-visit", today);
      fetch(`${COUNTER}/hit/${COUNTER_NS}/total`).catch(() => {});
      fetch(`${COUNTER}/hit/${COUNTER_NS}/${today}`).catch(() => {});
    }
  } catch {
    /* localStorage 차단(시크릿 모드 등) 시 집계 생략 */
  }
}

async function fetchStats() {
  const days = [6, 5, 4, 3, 2, 1, 0];
  const [total, visitors, ...daily] = await Promise.all([
    counterGet("total"),
    counterGet("visitors"),
    ...days.map((o) => counterGet(dayKey(o))),
  ]);

  const dailyLabeled = days.map((offset, i) => {
    const d = new Date();
    d.setDate(d.getDate() - offset);
    return { label: `${d.getMonth() + 1}/${d.getDate()}`, value: daily[i] };
  });

  return {
    total,
    visitors,
    today: daily[6],
    week: daily.reduce((a, b) => a + b, 0),
    daily: dailyLabeled,
  };
}

export function useVisitCounter() {
  return { recordVisit, fetchStats };
}
