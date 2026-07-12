<template>
  <div class="m-diagram">
    <svg viewBox="0 0 640 300" role="img" aria-label="야생동물 데이터 수집 서비스 좌표 확보 흐름 다이어그램">
      <defs><marker id="ar-cbc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>
      <rect x="24" y="8" width="592" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="320" y="29" text-anchor="middle" font-size="13" font-weight="700" fill="var(--text)">상세 페이지 진입 — 좌표(lat, lon) 확인</text>
      <text x="320" y="48" text-anchor="middle" font-size="10" fill="var(--muted)">좌표가 없고 주소만 있는 기록도 존재</text>
      <line x1="320" y1="60" x2="320" y2="94" stroke="var(--muted)" marker-end="url(#ar-cbc)"/>
      <rect x="24" y="98" width="290" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="169" y="119" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">좌표 없음</text>
      <text x="169" y="138" text-anchor="middle" font-size="10" fill="var(--muted)">Kakao Geocoder로 주소 → 좌표 변환</text>
      <rect x="330" y="98" width="286" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="473" y="119" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">좌표 있음</text>
      <text x="473" y="138" text-anchor="middle" font-size="10" fill="var(--muted)">바로 다음 단계로</text>
      <line x1="169" y1="150" x2="169" y2="184" stroke="var(--muted)" marker-end="url(#ar-cbc)"/>
      <line x1="473" y1="150" x2="473" y2="184" stroke="var(--muted)" marker-end="url(#ar-cbc)"/>
      <rect x="24" y="188" width="592" height="52" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="320" y="209" text-anchor="middle" font-size="13" font-weight="700" fill="var(--accent)">캐시 확인 (좌표 문자열을 키로 사용)</text>
      <text x="320" y="228" text-anchor="middle" font-size="10" fill="var(--muted)">있으면 즉시 반환 · 없으면 고도·날씨 API 병렬 호출 후 캐시에 저장</text>
      <line x1="320" y1="240" x2="320" y2="252" stroke="var(--muted)" marker-end="url(#ar-cbc)"/>
      <text x="320" y="270" text-anchor="middle" font-size="10" fill="var(--muted)">실패 시 화면은 깨지지 않고 "정보를 가져올 수 없음"으로 대체</text>
    </svg>
  </div>
</template>
