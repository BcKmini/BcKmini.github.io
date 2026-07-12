<template>
  <div class="m-diagram">
    <svg viewBox="0 0 640 380" role="img" aria-label="NoteFlow 학습 콘텐츠 생성 파이프라인 다이어그램">
      <defs><marker id="ar-nfp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>
      <rect x="24" y="8" width="592" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="320" y="29" text-anchor="middle" font-size="13" font-weight="700" fill="var(--text)">업로드 — 음성 · 이미지 · 문서</text>
      <text x="320" y="48" text-anchor="middle" font-size="10" fill="var(--muted)">Whisper STT · OCR · PyMuPDF 인제스션</text>
      <line x1="320" y1="60" x2="320" y2="94" stroke="var(--muted)" marker-end="url(#ar-nfp)"/>
      <rect x="24" y="98" width="592" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="320" y="119" text-anchor="middle" font-size="13" font-weight="700" fill="var(--text)">텍스트 청크 분할</text>
      <text x="320" y="138" text-anchor="middle" font-size="10" fill="var(--muted)">12,000자 단위 · 1,200자 오버랩</text>
      <line x1="320" y1="150" x2="320" y2="184" stroke="var(--muted)" marker-end="url(#ar-nfp)"/>
      <rect x="24" y="188" width="592" height="54" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="320" y="210" text-anchor="middle" font-size="13" font-weight="700" fill="var(--accent)">LangChain Map-Reduce 요약</text>
      <text x="320" y="229" text-anchor="middle" font-size="10" fill="var(--muted)">청크별 요약 → 병합, 완성도 검증 최대 3회 재시도</text>
      <line x1="320" y1="242" x2="320" y2="276" stroke="var(--muted)" marker-end="url(#ar-nfp)"/>
      <rect x="24" y="280" width="286" height="54" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="167" y="302" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">슬라이드 정규화</text>
      <text x="167" y="320" text-anchor="middle" font-size="10" fill="var(--muted)">8~40매로 재번호 매김</text>
      <line x1="310" y1="307" x2="326" y2="307" stroke="var(--muted)" marker-end="url(#ar-nfp)"/>
      <rect x="330" y="280" width="286" height="54" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="473" y="302" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">예상 문제 생성</text>
      <text x="473" y="320" text-anchor="middle" font-size="10" fill="var(--muted)">Few-shot + Self-Refinement</text>
      <line x1="320" y1="334" x2="320" y2="346" stroke="var(--muted)" marker-end="url(#ar-nfp)"/>
      <text x="320" y="364" text-anchor="middle" font-size="10" fill="var(--muted)">→ 노트로 저장, 오류율 15%↓ · 생성 지연 20초 이내</text>
    </svg>
  </div>
</template>
