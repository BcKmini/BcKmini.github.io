<template>
  <div class="m-diagram">
    <svg viewBox="0 0 640 344" role="img" aria-label="동영상 타임라인 검출 서비스 아키텍처 다이어그램">
      <defs><marker id="ar-cc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>
      <rect x="24" y="8" width="592" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="320" y="29" text-anchor="middle" font-size="13" font-weight="700" fill="var(--text)">브라우저 클라이언트 (Vanilla JS + Service Worker)</text>
      <text x="320" y="48" text-anchor="middle" font-size="10" fill="var(--muted)">1MB 청크 업로드 · 세션 오프셋 검증 · 이어올리기 — 50GB+ 성공률 100%</text>
      <line x1="320" y1="60" x2="320" y2="94" stroke="var(--muted)" marker-end="url(#ar-cc)"/>
      <rect x="24" y="98" width="592" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="320" y="119" text-anchor="middle" font-size="13" font-weight="700" fill="var(--text)">FastAPI Backend</text>
      <text x="320" y="138" text-anchor="middle" font-size="10" fill="var(--muted)">업로드 세션 관리 · 타임라인 API · MySQL 저장</text>
      <line x1="169" y1="150" x2="169" y2="184" stroke="var(--muted)" marker-end="url(#ar-cc)"/>
      <line x1="473" y1="150" x2="473" y2="184" stroke="var(--muted)" marker-end="url(#ar-cc)"/>
      <rect x="24" y="188" width="290" height="54" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="169" y="210" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--accent)">FFmpeg 트랜스코딩</text>
      <text x="169" y="228" text-anchor="middle" font-size="10" fill="var(--muted)">SEC·AVI → H.264 MP4 자동 변환</text>
      <rect x="330" y="188" width="286" height="54" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="473" y="210" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--accent)">YOLO11 추론 큐</text>
      <text x="473" y="228" text-anchor="middle" font-size="10" fill="var(--muted)">비동기 격리 · 24시간 영상 30분 분석</text>
      <line x1="169" y1="242" x2="169" y2="276" stroke="var(--muted)" marker-end="url(#ar-cc)"/>
      <line x1="473" y1="242" x2="473" y2="276" stroke="var(--muted)" marker-end="url(#ar-cc)"/>
      <rect x="24" y="280" width="290" height="54" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="169" y="302" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">타임라인 생성 · 편집</text>
      <text x="169" y="320" text-anchor="middle" font-size="10" fill="var(--muted)">5초 이내 구간 자동 병합 · 드래그 보정</text>
      <line x1="314" y1="307" x2="326" y2="307" stroke="var(--muted)" marker-end="url(#ar-cc)"/>
      <rect x="330" y="280" width="286" height="54" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="473" y="302" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">익스포트</text>
      <text x="473" y="320" text-anchor="middle" font-size="10" fill="var(--muted)">MP4 클립 · CSV · JSON 일괄 다운로드</text>
    </svg>
  </div>
</template>
