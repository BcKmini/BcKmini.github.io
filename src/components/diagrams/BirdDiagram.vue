<template>
  <div class="m-diagram">
    <svg viewBox="0 0 640 356" role="img" aria-label="야생동물 데이터 수집 서비스 아키텍처 다이어그램">
      <defs><marker id="ar-cb" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>
      <rect x="24" y="8" width="592" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="320" y="29" text-anchor="middle" font-size="13" font-weight="700" fill="var(--text)">React 클라이언트</text>
      <text x="320" y="48" text-anchor="middle" font-size="10" fill="var(--muted)">관찰 기록 작성 · 사진/영상/음성 업로드 · 지도 좌표 선택</text>
      <line x1="320" y1="60" x2="320" y2="94" stroke="var(--muted)" marker-end="url(#ar-cb)"/>
      <rect x="24" y="98" width="592" height="58" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="320" y="122" text-anchor="middle" font-size="13" font-weight="700" fill="var(--text)">FastAPI Backend — 도메인 계층 분리</text>
      <text x="320" y="141" text-anchor="middle" font-size="10" fill="var(--muted)">Router · Schema(Pydantic 정규화) · Model(SQLAlchemy)</text>
      <line x1="164" y1="156" x2="164" y2="190" stroke="var(--muted)" marker-end="url(#ar-cb)"/>
      <line x1="472" y1="156" x2="472" y2="190" stroke="var(--muted)" marker-end="url(#ar-cb)"/>
      <rect x="24" y="194" width="280" height="54" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="164" y="216" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--accent)">Kakao Map 역지오코딩</text>
      <text x="164" y="234" text-anchor="middle" font-size="10" fill="var(--muted)">좌표 → 주소 자동 변환</text>
      <rect x="328" y="194" width="288" height="54" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="472" y="216" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--accent)">OpenWeatherMap</text>
      <text x="472" y="234" text-anchor="middle" font-size="10" fill="var(--muted)">기온 · 강수 · 풍속 결합</text>
      <text x="320" y="270" text-anchor="middle" font-size="10" font-style="italic" fill="var(--muted)">Open-Elevation API로 고도 결합 · 좌표별 메모리 캐싱으로 중복 호출 방지</text>
      <line x1="320" y1="248" x2="320" y2="288" stroke="var(--muted)" stroke-dasharray="3 3" marker-end="url(#ar-cb)"/>
      <rect x="170" y="292" width="300" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="320" y="313" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">MySQL</text>
      <text x="320" y="332" text-anchor="middle" font-size="10" fill="var(--muted)">observations 1 : N comments</text>
    </svg>
  </div>
</template>
