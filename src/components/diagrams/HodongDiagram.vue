<template>
  <div class="m-diagram">
    <svg viewBox="0 0 640 348" role="img" aria-label="호동이 챗봇 아키텍처 다이어그램">
      <defs><marker id="ar-hd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>
      <rect x="24" y="8" width="592" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="320" y="29" text-anchor="middle" font-size="13" font-weight="700" fill="var(--text)">사용자 질의</text>
      <text x="320" y="48" text-anchor="middle" font-size="10" fill="var(--muted)">텍스트 입력 · 음성 (Whisper STT)</text>
      <line x1="224" y1="60" x2="224" y2="94" stroke="var(--muted)" marker-end="url(#ar-hd)"/>
      <rect x="24" y="98" width="400" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="224" y="119" text-anchor="middle" font-size="13" font-weight="700" fill="var(--text)">FastAPI /api/chat</text>
      <text x="224" y="138" text-anchor="middle" font-size="10" fill="var(--muted)">비동기 처리 · CORS 화이트리스트</text>
      <line x1="424" y1="124" x2="444" y2="124" stroke="var(--muted)" marker-start="url(#ar-hd)" marker-end="url(#ar-hd)"/>
      <rect x="448" y="98" width="168" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="532" y="119" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">Redis 캐시</text>
      <text x="532" y="138" text-anchor="middle" font-size="10" fill="var(--muted)">TTL 600초 즉시 응답</text>
      <line x1="224" y1="150" x2="224" y2="184" stroke="var(--muted)" marker-end="url(#ar-hd)"/>
      <rect x="24" y="188" width="176" height="58" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="112" y="210" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">① FAQ 정밀 매칭</text>
      <text x="112" y="228" text-anchor="middle" font-size="10" fill="var(--muted)">고정 민원 즉시 응답</text>
      <line x1="200" y1="217" x2="216" y2="217" stroke="var(--muted)" marker-end="url(#ar-hd)"/>
      <rect x="220" y="188" width="204" height="58" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="322" y="210" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">② RAG 검색</text>
      <text x="322" y="228" text-anchor="middle" font-size="10" fill="var(--muted)">FAISS 0.7 + BM25 0.3 · 재랭킹</text>
      <line x1="424" y1="217" x2="440" y2="217" stroke="var(--muted)" marker-end="url(#ar-hd)"/>
      <rect x="444" y="188" width="172" height="58" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="530" y="210" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">③ 실시간 웹 검색</text>
      <text x="530" y="228" text-anchor="middle" font-size="10" fill="var(--muted)">최신 공지·사업 대응</text>
      <line x1="224" y1="246" x2="224" y2="280" stroke="var(--muted)" marker-end="url(#ar-hd)"/>
      <rect x="24" y="284" width="400" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="224" y="305" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">LLM 응답 생성</text>
      <text x="224" y="324" text-anchor="middle" font-size="10" fill="var(--muted)">프롬프트 템플릿 · 팩트 체크(verifier)</text>
      <line x1="424" y1="310" x2="444" y2="310" stroke="var(--muted)" marker-end="url(#ar-hd)"/>
      <rect x="448" y="284" width="168" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="532" y="305" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">edge-tts</text>
      <text x="532" y="324" text-anchor="middle" font-size="10" fill="var(--muted)">한국어 음성 응답 출력</text>
    </svg>
  </div>
</template>
