<template>
  <div class="m-diagram">
    <svg viewBox="0 0 640 250" role="img" aria-label="야생동물 데이터 수집 서비스 데이터 모델 다이어그램">
      <defs><marker id="ar-cbe" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>
      <rect x="24" y="20" width="330" height="150" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="189" y="42" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--accent)">observations</text>
      <text x="46" y="64" font-size="9.5" fill="var(--muted)">species_category · species_name</text>
      <text x="46" y="80" font-size="9.5" fill="var(--muted)">habitat_type · observation_date</text>
      <text x="46" y="96" font-size="9.5" fill="var(--muted)">latitude · longitude · location</text>
      <text x="46" y="112" font-size="9.5" fill="var(--muted)">image_url · video_url · audio_url</text>
      <text x="46" y="128" font-size="9.5" fill="var(--muted)">memo · created_at</text>
      <text x="46" y="150" font-size="9.5" font-style="italic" fill="var(--muted)">↳ 저장 시 날씨·고도 API 결과 결합</text>

      <line x1="354" y1="95" x2="390" y2="95" stroke="var(--muted)" marker-end="url(#ar-cbe)"/>
      <text x="372" y="86" text-anchor="middle" font-size="9" fill="var(--muted)">1:N</text>
      <rect x="394" y="45" width="222" height="100" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="505" y="67" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">comments</text>
      <text x="416" y="89" font-size="9.5" fill="var(--muted)">observation_id (FK)</text>
      <text x="416" y="105" font-size="9.5" fill="var(--muted)">username · content</text>
      <text x="416" y="121" font-size="9.5" fill="var(--muted)">created_at</text>

      <text x="320" y="200" text-anchor="middle" font-size="10" fill="var(--muted)">/api/observations (검색·필터) · /api/observations/{id}/comments</text>
      <text x="320" y="220" text-anchor="middle" font-size="10" font-style="italic" fill="var(--muted)">한국어 / 영어 UI 토글 지원</text>
    </svg>
  </div>
</template>
