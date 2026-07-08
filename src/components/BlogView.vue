<script setup>
import { ref, computed, onMounted } from "vue";
import { useGiscus } from "../composables/useGiscus";

const VELOG_USERNAME = "mi_nini";

// Velog GraphQL은 CORS를 열어주지 않아서 프록시로 감싸 전체 글(최대 60개)을 가져오고,
// 실패하면 rss2json(최대 10개)로 폴백한다.
const GQL_QUERY =
  "query Posts($username: String, $limit: Int){ posts(username:$username, limit:$limit){ title short_description thumbnail released_at url_slug } }";

function velogGraphqlUrl() {
  const params = new URLSearchParams({
    query: GQL_QUERY,
    variables: JSON.stringify({ username: VELOG_USERNAME, limit: 60 }),
  });
  return `https://v2.velog.io/graphql?${params.toString()}`;
}

const CORS_PROXIES = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
];

const RSS2JSON =
  "https://api.rss2json.com/v1/api.json?rss_url=" +
  encodeURIComponent(`https://v2.velog.io/rss/@${VELOG_USERNAME}`);

const posts = ref([]);
const status = ref("loading"); // loading | ok | error
const activeSeries = ref("all");
const sortOrder = ref("new"); // new | old
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

async function fetchViaGraphql() {
  const target = velogGraphqlUrl();
  for (const wrap of CORS_PROXIES) {
    try {
      const res = await fetch(wrap(target));
      if (!res.ok) continue;
      const data = await res.json();
      const list = data?.data?.posts;
      if (!Array.isArray(list) || !list.length) continue;

      return list.map((p) => ({
        title: p.title,
        link: `https://velog.io/@${VELOG_USERNAME}/${encodeURIComponent(p.url_slug)}`,
        date: p.released_at.slice(0, 10),
        thumb: p.thumbnail || null,
        snippet: (p.short_description || "").slice(0, 120),
      }));
    } catch {
      continue;
    }
  }
  return null;
}

async function fetchViaRss2json() {
  const res = await fetch(RSS2JSON);
  const data = await res.json();
  if (data.status !== "ok" || !Array.isArray(data.items) || !data.items.length) {
    throw new Error("no posts");
  }
  return data.items.map((item) => {
    const thumb = item.thumbnail || (item.description.match(/<img[^>]+src="([^"]+)"/) || [])[1];
    return {
      title: item.title,
      link: item.link,
      date: (item.pubDate || "").slice(0, 10),
      thumb: thumb || null,
      snippet: stripHtml(item.description).slice(0, 120),
    };
  });
}

const seriesList = computed(() => {
  const set = [];
  posts.value.forEach((p) => {
    const s = extractSeries(p.title);
    if (!set.includes(s)) set.push(s);
  });
  return set;
});

const filtered = computed(() => {
  const bySeries =
    activeSeries.value === "all"
      ? posts.value
      : posts.value.filter((p) => extractSeries(p.title) === activeSeries.value);
  const sorted = [...bySeries].sort((a, b) =>
    sortOrder.value === "new" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)
  );
  return sorted;
});

function fmt(date) {
  return date.replace(/-/g, ".");
}

onMounted(async () => {
  try {
    const viaGraphql = await fetchViaGraphql();
    posts.value = viaGraphql ?? (await fetchViaRss2json());
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

    <div class="blog-toolbar">
      <div v-if="seriesList.length > 1" class="blog-filters">
        <button
          type="button"
          class="filter-chip"
          :class="{ active: activeSeries === 'all' }"
          @click="activeSeries = 'all'"
        >all · {{ posts.length }}</button>
        <button
          v-for="s in seriesList"
          :key="s"
          type="button"
          class="filter-chip"
          :class="{ active: activeSeries === s }"
          @click="activeSeries = s"
        >{{ s }} · {{ posts.filter((p) => extractSeries(p.title) === s).length }}</button>
      </div>

      <div v-if="posts.length" class="blog-sort">
        <button type="button" class="filter-chip" :class="{ active: sortOrder === 'new' }" @click="sortOrder = 'new'">최신순</button>
        <button type="button" class="filter-chip" :class="{ active: sortOrder === 'old' }" @click="sortOrder = 'old'">오래된순</button>
      </div>
    </div>

    <div class="term-window">
      <div class="term-bar">
        <span class="term-dot term-dot-red"></span>
        <span class="term-dot term-dot-amber"></span>
        <span class="term-dot term-dot-green"></span>
        <span class="term-bar-title">tail -f velog.log --lines={{ posts.length || '…' }}</span>
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
              v-if="item.thumb"
              class="blog-thumb"
              :src="item.thumb"
              alt=""
              loading="lazy"
              @error="($event) => ($event.target.outerHTML = '<div class=\'blog-thumb-fallback\'>&lt;/&gt;</div>')"
            />
            <div v-else class="blog-thumb-fallback">&lt;/&gt;</div>
            <div class="blog-body">
              <span class="blog-date">{{ fmt(item.date) }}</span>
              <h3 class="blog-title">{{ item.title }}</h3>
              <p class="blog-snippet">{{ item.snippet }}</p>
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
