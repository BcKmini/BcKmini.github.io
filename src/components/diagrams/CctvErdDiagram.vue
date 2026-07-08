<template>
  <div class="m-diagram">
    <svg viewBox="0 0 640 260" role="img" aria-label="CCTV 타임라인 데이터 모델 다이어그램">
      <defs><marker id="ar-cce" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>
      <rect x="24" y="8" width="150" height="52" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="99" y="29" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">users</text>
      <text x="99" y="46" text-anchor="middle" font-size="9.5" fill="var(--muted)">id · username</text>

      <line x1="174" y1="24" x2="230" y2="24" stroke="var(--muted)" marker-end="url(#ar-cce)"/>
      <rect x="234" y="8" width="190" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="329" y="29" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">upload_sessions</text>
      <text x="329" y="46" text-anchor="middle" font-size="9.5" fill="var(--muted)">total_size · uploaded_size</text>

      <line x1="99" y1="60" x2="99" y2="94" stroke="var(--muted)" marker-end="url(#ar-cce)"/>
      <rect x="24" y="98" width="150" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="99" y="119" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">videos</text>
      <text x="99" y="136" text-anchor="middle" font-size="9.5" fill="var(--muted)">filename · progress%</text>

      <line x1="174" y1="124" x2="230" y2="124" stroke="var(--muted)" marker-end="url(#ar-cce)"/>
      <rect x="234" y="98" width="240" height="60" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="354" y="119" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">detections</text>
      <text x="354" y="136" text-anchor="middle" font-size="9.5" fill="var(--muted)">start_time · end_time (초)</text>
      <text x="354" y="150" text-anchor="middle" font-size="9.5" fill="var(--muted)">species · confidence(%)</text>

      <line x1="354" y1="158" x2="354" y2="190" stroke="var(--muted)" marker-end="url(#ar-cce)"/>
      <rect x="200" y="194" width="308" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="354" y="215" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">5초 이내 구간 자동 병합</text>
      <text x="354" y="232" text-anchor="middle" font-size="9.5" fill="var(--muted)">탐지 대상: 고라니(YOLO11) — 모델 교체로 타 종 확장 가능</text>
    </svg>
  </div>
</template>
