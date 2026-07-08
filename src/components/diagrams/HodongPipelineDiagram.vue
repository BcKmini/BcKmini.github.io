<template>
  <div class="m-diagram">
    <svg viewBox="0 0 640 300" role="img" aria-label="호동이 챗봇 인덱싱 파이프라인 다이어그램">
      <defs><marker id="ar-hp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>
      <rect x="24" y="8" width="176" height="58" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="112" y="30" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">크롤러</text>
      <text x="112" y="47" text-anchor="middle" font-size="9.5" fill="var(--muted)">SEEDS + 로컬 이미지 인제스트</text>
      <text x="112" y="60" text-anchor="middle" font-size="9.5" fill="var(--muted)">OCR (Paddle · Tesseract)</text>

      <line x1="200" y1="37" x2="234" y2="37" stroke="var(--muted)" marker-end="url(#ar-hp)"/>
      <rect x="238" y="8" width="176" height="58" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="326" y="30" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">data/clean</text>
      <text x="326" y="47" text-anchor="middle" font-size="9.5" fill="var(--muted)">정제된 텍스트 · 이미지</text>
      <text x="326" y="60" text-anchor="middle" font-size="9.5" fill="var(--muted)">OCR 결과 MD 첨부</text>

      <line x1="414" y1="37" x2="448" y2="37" stroke="var(--muted)" marker-end="url(#ar-hp)"/>
      <rect x="452" y="8" width="164" height="58" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="534" y="30" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">build_index.py</text>
      <text x="534" y="47" text-anchor="middle" font-size="9.5" fill="var(--muted)">e5-large-v2 임베딩</text>
      <text x="534" y="60" text-anchor="middle" font-size="9.5" fill="var(--muted)">FAISS + BM25 인덱스</text>

      <line x1="534" y1="66" x2="534" y2="100" stroke="var(--muted)" marker-end="url(#ar-hp)"/>
      <rect x="24" y="104" width="592" height="58" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="320" y="126" text-anchor="middle" font-size="13" font-weight="700" fill="var(--accent)">Retriever — VEC_WEIGHT 0.7 : BM25_WEIGHT 0.3</text>
      <text x="320" y="145" text-anchor="middle" font-size="10" fill="var(--muted)">RETRIEVER_K=12 상위 문서 선택</text>

      <line x1="320" y1="162" x2="320" y2="196" stroke="var(--muted)" marker-end="url(#ar-hp)"/>
      <rect x="140" y="200" width="360" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="320" y="221" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">CrossEncoder Reranker (선택)</text>
      <text x="320" y="238" text-anchor="middle" font-size="9.5" fill="var(--muted)">mxbai-rerank-base-v1 · RERANK_TOP_N=4</text>

      <line x1="320" y1="252" x2="320" y2="264" stroke="var(--muted)" marker-end="url(#ar-hp)"/>
      <text x="320" y="282" text-anchor="middle" font-size="10" fill="var(--muted)">→ 프롬프트 구성 → OpenAI gpt-4o-mini 호출 → JSON 응답</text>
    </svg>
  </div>
</template>
