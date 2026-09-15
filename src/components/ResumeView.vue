<script setup>
import { experience } from "../data/experience";
import { projects } from "../data/projects";
import { awards } from "../data/awards";
import { certificates } from "../data/certificates";
import { categories, stack } from "../data/stack";
import { useLocale } from "../composables/useLocale";
import { useTab } from "../composables/useTab";

const { t } = useLocale();
const { goTo } = useTab();

const stackLines = categories.map((c) => ({
  label: c.label,
  names: stack.filter((s) => s.cat === c.key).map((s) => s.name).join(", "),
}));

function printResume() {
  window.print();
}
</script>

<template>
  <div class="resume-view">
    <div class="resume-actions no-print">
      <a href="?tab=home" class="resume-back" @click.prevent="goTo('home')">← {{ t("홈으로", "Back to home") }}</a>
      <button type="button" class="resume-download" @click="printResume">
        $ curl -O resume.pdf <span class="resume-download-icon">↓</span>
      </button>
    </div>

    <article class="resume-sheet">
      <header class="resume-head">
        <h1>{{ t("김경민", "Kyoungmin Kim") }}</h1>
        <p class="resume-role">{{ t("AI Native 환경을 구현하는 Cloud Platform Engineer 지향", "Aspiring Cloud Platform Engineer building AI-native environments") }}</p>
        <p class="resume-contact">
          github.com/BcKmini · velog.io/@mi_nini · akkn920@naver.com · 010-2204-0546
        </p>
      </header>

      <section class="resume-section">
        <h2>{{ t("기술 스택", "Skills") }}</h2>
        <dl class="resume-skills">
          <template v-for="l in stackLines" :key="l.label">
            <dt>{{ l.label }}</dt>
            <dd>{{ l.names }}</dd>
          </template>
        </dl>
      </section>

      <section class="resume-section">
        <h2>{{ t("경험", "Experience") }}</h2>
        <ul class="resume-list">
          <li v-for="e in experience" :key="e.title + e.date">
            <p class="resume-item-head"><b>{{ t(e.title, e.title_en) }}</b><span>{{ e.date }}</span></p>
            <p>{{ t(e.desc || e.descHtml, e.desc_en || e.descHtml_en)?.replace(/<[^>]+>/g, "") }}</p>
          </li>
        </ul>
      </section>

      <section class="resume-section">
        <h2>{{ t("프로젝트", "Projects") }}</h2>
        <ul class="resume-list">
          <li v-for="p in projects" :key="p.id">
            <p class="resume-item-head"><b>{{ t(p.title, p.title_en) }}</b><span>{{ t(p.meta, p.meta_en) }}</span></p>
            <p>{{ t(p.desc, p.desc_en) }}</p>
            <p class="resume-chips">{{ p.chips.join(" · ") }}</p>
          </li>
        </ul>
      </section>

      <section class="resume-section">
        <h2>{{ t("수상 및 공모전", "Awards & Contests") }}</h2>
        <ul class="resume-list">
          <li v-for="a in awards" :key="a.title">
            <p class="resume-item-head">
              <b>{{ t(a.title, a.title_en) }}<template v-if="a.tag"> — {{ t(a.tag.text, a.tag.text_en) }}</template></b>
              <span>{{ a.date }}</span>
            </p>
            <p>{{ t(a.desc, a.desc_en) }}</p>
          </li>
        </ul>
      </section>

      <section class="resume-section">
        <h2>{{ t("자격증", "Certificates") }}</h2>
        <ul class="resume-list resume-list-compact">
          <li v-for="c in certificates" :key="c.title">
            <p class="resume-item-head"><b>{{ t(c.title, c.title_en) }}</b><span>{{ c.date }}</span></p>
          </li>
        </ul>
      </section>
    </article>
  </div>
</template>
