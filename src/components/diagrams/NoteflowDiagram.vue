<template>
  <div class="m-diagram">
    <svg viewBox="0 0 640 352" role="img" aria-label="NoteFlow 아키텍처 다이어그램">
      <defs><marker id="ar-nf" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>
      <g>
        <rect x="24" y="8" width="170" height="50" rx="10" fill="var(--bg)" stroke="var(--border)"/>
        <text x="109" y="29" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">React · Vite 웹</text>
        <text x="109" y="46" text-anchor="middle" font-size="10" fill="var(--muted)">마크다운 에디터</text>
        <rect x="214" y="8" width="170" height="50" rx="10" fill="var(--bg)" stroke="var(--border)"/>
        <text x="299" y="29" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">Electron 데스크톱</text>
        <text x="299" y="46" text-anchor="middle" font-size="10" fill="var(--muted)">동일 빌드 공유</text>
        <rect x="404" y="8" width="212" height="50" rx="10" fill="var(--bg)" stroke="var(--border)"/>
        <text x="510" y="29" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">OAuth · JWT 인증</text>
        <text x="510" y="46" text-anchor="middle" font-size="10" fill="var(--muted)">Google · Naver · Kakao</text>
      </g>
      <line x1="109" y1="58" x2="109" y2="94" stroke="var(--muted)" marker-end="url(#ar-nf)"/>
      <line x1="299" y1="58" x2="299" y2="94" stroke="var(--muted)" marker-end="url(#ar-nf)"/>
      <line x1="510" y1="58" x2="510" y2="94" stroke="var(--muted)" marker-end="url(#ar-nf)"/>
      <rect x="24" y="98" width="592" height="58" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="320" y="122" text-anchor="middle" font-size="13" font-weight="700" fill="var(--text)">FastAPI Backend</text>
      <text x="320" y="141" text-anchor="middle" font-size="10" fill="var(--muted)">auth · note · folder · file 라우터 — Background Tasks 비동기 처리</text>
      <line x1="124" y1="156" x2="124" y2="192" stroke="var(--muted)" marker-end="url(#ar-nf)"/>
      <line x1="334" y1="156" x2="334" y2="192" stroke="var(--muted)" marker-end="url(#ar-nf)"/>
      <line x1="530" y1="156" x2="530" y2="192" stroke="var(--muted)" marker-end="url(#ar-nf)"/>
      <g>
        <rect x="24" y="196" width="200" height="54" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
        <text x="124" y="218" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--accent)">Whisper STT</text>
        <text x="124" y="236" text-anchor="middle" font-size="10" fill="var(--muted)">한국어 음성 → 텍스트 (90%+)</text>
        <rect x="244" y="196" width="180" height="54" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
        <text x="334" y="218" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--accent)">OCR 엔진</text>
        <text x="334" y="236" text-anchor="middle" font-size="10" fill="var(--muted)">PyMuPDF · Tesseract</text>
        <rect x="444" y="196" width="172" height="54" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
        <text x="530" y="218" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--accent)">LLM · LangChain</text>
        <text x="530" y="236" text-anchor="middle" font-size="10" fill="var(--muted)">요약 · 예상 문제 생성</text>
      </g>
      <line x1="320" y1="250" x2="320" y2="286" stroke="var(--muted)" marker-end="url(#ar-nf)"/>
      <rect x="200" y="290" width="240" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="320" y="312" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">MySQL</text>
      <text x="320" y="330" text-anchor="middle" font-size="10" fill="var(--muted)">SQLAlchemy ORM · 노트/폴더/파일</text>
    </svg>
  </div>
</template>
