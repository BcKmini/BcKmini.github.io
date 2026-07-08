<script setup>
import { ref, computed, onMounted } from "vue";
import { useGiscus } from "../composables/useGiscus";

const VELOG_RSS = "https://api.rss2json.com/v1/api.json?rss_url=" +
  encodeURIComponent("https://v2.velog.io/rss/@mi_nini");

const posts = ref([]);
const status = ref("loading"); // loading | ok | error
const activeSeries = ref("all");
const giscusEl = ref(null);
const { load: loadGiscus } = useGiscus();

function extractSeries(title) {
  const m = title.match(/^(.+?)\s*\d+주차/);
  return m ? m[1].trim() : "기타";
}

function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || "").trim();
}

const seriesList = computed(() => {
  const set = [];
  posts.value.forEach((p) => {
    const s = extractSeries(p.title);
    if (!set.includes(s)) set.push(s);
  });
  return set;
});

const filtered = computed(() =>
  activeSeries.value === "all"
    ? posts.value
    : posts.value.filter((p) => extractSeries(p.title) === activeSeries.value)
);

function cardData(item) {
  const thumb = item.thumbnail || (item.description.match(/<img[^>]+src="([^"]+)"/) || [])[1];
  const date = (item.pubDate || "").slice(0, 10).replace(/-/g, ".");
  const snippet = stripHtml(item.description).slice(0, 120);
  return { thumb, date, snippet };
}

onMounted(async () => {
  try {
    const res = await fetch(VELOG_RSS);
    const data = await res.json();
    if (data.status !== "ok" || !Array.isArray(data.items) || !data.items.length) {
      throw new Error("no posts");
    }
    posts.value = data.items;
    status.value = "ok";
  } catch {
    status.value = "error";
  }

  if (giscusEl.value) loadGiscus(giscusEl.value);
});
</script>

<template>
  <section class="tab-panel active">
    <div class="blog-head">
      <p class="eyebrow">Writing</p>
      <h1>블로그</h1>
      <p class="lede">
        배운 것을 기록합니다.
        <a class="inline-link" href="https://velog.io/@mi_nini/posts" target="_blank" rel="noopener">velog.io/@mi_nini ↗</a>
      </p>
    </div>

    <div v-if="seriesList.length > 1" class="blog-filters">
      <button
        type="button"
        class="filter-chip"
        :class="{ active: activeSeries === 'all' }"
        @click="activeSeries = 'all'"
      >전체 · {{ posts.length }}</button>
      <button
        v-for="s in seriesList"
        :key="s"
        type="button"
        class="filter-chip"
        :class="{ active: activeSeries === s }"
        @click="activeSeries = s"
      >{{ s }} · {{ posts.filter((p) => extractSeries(p.title) === s).length }}</button>
    </div>

    <div class="term-window">
      <div class="term-bar">
        <span class="term-dot term-dot-red"></span>
        <span class="term-dot term-dot-amber"></span>
        <span class="term-dot term-dot-green"></span>
        <span class="term-bar-title">tail -f velog.log</span>
      </div>
      <div class="blog-grid">
        <p v-if="status === 'loading'" class="status-text">글을 불러오는 중…</p>
        <p v-else-if="status === 'error'" class="status-text">
          글을 불러오지 못했습니다.
          <a class="inline-link" href="https://velog.io/@mi_nini/posts" target="_blank" rel="noopener">Velog에서 보기 ↗</a>
        </p>
        <p v-else-if="!filtered.length" class="status-text">해당 시리즈의 글이 없습니다.</p>
        <template v-else>
          <a
            v-for="item in filtered"
            :key="item.link"
            class="blog-card"
            :href="item.link"
            target="_blank"
            rel="noopener"
          >
            <img
              v-if="cardData(item).thumb"
              class="blog-thumb"
              :src="cardData(item).thumb"
              alt=""
              loading="lazy"
              @error="($event) => ($event.target.outerHTML = '<div class=\'blog-thumb-fallback\'>&lt;/&gt;</div>')"
            />
            <div v-else class="blog-thumb-fallback">&lt;/&gt;</div>
            <div class="blog-body">
              <span class="blog-date">{{ cardData(item).date }}</span>
              <h3 class="blog-title">{{ item.title }}</h3>
              <p class="blog-snippet">{{ cardData(item).snippet }}</p>
            </div>
          </a>
        </template>
      </div>
    </div>

    <div class="section guestbook">
      <h2 class="sec"><span>✍</span> 방명록</h2>
      <p class="sec-sub">방문 기록을 남겨주세요. GitHub 계정으로 남기며, 영구 저장됩니다.</p>
      <div ref="giscusEl" class="giscus-wrap"></div>
    </div>
  </section>
</template>
