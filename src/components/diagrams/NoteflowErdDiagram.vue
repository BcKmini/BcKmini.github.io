<template>
  <div class="m-diagram">
    <svg viewBox="0 0 640 300" role="img" aria-label="NoteFlow 데이터 모델 다이어그램">
      <defs><marker id="ar-nfe" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>
      <rect x="264" y="8" width="112" height="46" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="320" y="28" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--accent)">User</text>
      <text x="320" y="44" text-anchor="middle" font-size="9.5" fill="var(--muted)">u_id · email · provider</text>

      <line x1="320" y1="54" x2="320" y2="86" stroke="var(--muted)" marker-end="url(#ar-nfe)"/>
      <rect x="248" y="90" width="144" height="46" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="320" y="110" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">Folder</text>
      <text x="320" y="126" text-anchor="middle" font-size="9.5" fill="var(--muted)">parent_id (self FK · 트리)</text>
      <path d="M392 113 q26 0 26 -20 q0 -20 -26 -20" fill="none" stroke="var(--muted)" marker-end="url(#ar-nfe)"/>

      <line x1="248" y1="113" x2="140" y2="113" stroke="var(--muted)"/>
      <line x1="140" y1="113" x2="140" y2="172" stroke="var(--muted)" marker-end="url(#ar-nfe)"/>
      <line x1="320" y1="136" x2="320" y2="172" stroke="var(--muted)" marker-end="url(#ar-nfe)"/>
      <line x1="392" y1="113" x2="500" y2="113" stroke="var(--muted)"/>
      <line x1="500" y1="113" x2="500" y2="172" stroke="var(--muted)" marker-end="url(#ar-nfe)"/>

      <rect x="60" y="176" width="160" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="140" y="197" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">Checklist</text>
      <text x="140" y="214" text-anchor="middle" font-size="9.5" fill="var(--muted)">title · is_clear</text>

      <rect x="240" y="176" width="160" height="52" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="320" y="197" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">Note</text>
      <text x="320" y="214" text-anchor="middle" font-size="9.5" fill="var(--muted)">title · content · is_favorite</text>

      <rect x="420" y="176" width="160" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="500" y="197" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">File</text>
      <text x="500" y="214" text-anchor="middle" font-size="9.5" fill="var(--muted)">note_id · saved_path</text>

      <line x1="320" y1="228" x2="500" y2="228" stroke="var(--muted)" stroke-dasharray="3 3"/>
      <line x1="500" y1="228" x2="500" y2="240" stroke="var(--muted)" stroke-dasharray="3 3" marker-end="url(#ar-nfe)"/>
      <text x="320" y="252" text-anchor="middle" font-size="9.5" font-style="italic" fill="var(--muted)">Note 1 : N File — 첨부파일 연결</text>

      <text x="320" y="278" text-anchor="middle" font-size="10" fill="var(--muted)">GET /api/v1/folders (트리+노트) · POST /files/ocr · POST /notes/{id}/generate-quiz</text>
    </svg>
  </div>
</template>
