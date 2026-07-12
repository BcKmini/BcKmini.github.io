<template>
  <div class="m-diagram">
    <svg viewBox="0 0 640 262" role="img" aria-label="종합 의료 관리 서비스 데이터 모델 다이어그램">
      <defs><marker id="ar-mde" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>
      <rect x="16" y="8" width="180" height="72" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="106" y="28" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">Personal</text>
      <text x="106" y="45" text-anchor="middle" font-size="9" fill="var(--muted)">p_id · p_idnumber</text>
      <text x="106" y="60" text-anchor="middle" font-size="9" fill="var(--muted)">p_disease · p_mobile</text>
      <text x="106" y="74" text-anchor="middle" font-size="9" fill="var(--muted)">p_height · p_weight</text>

      <rect x="230" y="8" width="180" height="72" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="320" y="28" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">Hospital</text>
      <text x="320" y="45" text-anchor="middle" font-size="9" fill="var(--muted)">h_id · h_idnumber</text>
      <text x="320" y="60" text-anchor="middle" font-size="9" fill="var(--muted)">h_major (진료과)</text>
      <text x="320" y="74" text-anchor="middle" font-size="9" fill="var(--muted)">h_workingaddress</text>

      <rect x="444" y="8" width="180" height="72" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="534" y="28" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">Pharmacy</text>
      <text x="534" y="45" text-anchor="middle" font-size="9" fill="var(--muted)">ph_id · ph_idnumber</text>
      <text x="534" y="60" text-anchor="middle" font-size="9" fill="var(--muted)">ph_workingaddress</text>
      <text x="534" y="74" text-anchor="middle" font-size="9" fill="var(--muted)">ph_mobile</text>

      <line x1="106" y1="80" x2="106" y2="110" stroke="var(--muted)" marker-end="url(#ar-mde)"/>
      <line x1="320" y1="80" x2="230" y2="114" stroke="var(--muted)" marker-end="url(#ar-mde)"/>
      <line x1="534" y1="80" x2="360" y2="118" stroke="var(--muted)" marker-end="url(#ar-mde)"/>

      <rect x="150" y="118" width="340" height="60" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="320" y="140" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--accent)">Review</text>
      <text x="320" y="158" text-anchor="middle" font-size="9.5" fill="var(--muted)">place_name · rating · content</text>
      <text x="320" y="173" text-anchor="middle" font-size="9.5" fill="var(--muted)">author · review_date</text>

      <text x="320" y="204" text-anchor="middle" font-size="10" fill="var(--muted)">기관명(place_name) 기준으로 리뷰 등록</text>
      <text x="320" y="224" text-anchor="middle" font-size="10" font-style="italic" fill="var(--muted)">병원·약국 위치는 Kakao Map 장소 검색 위젯으로 표시</text>
    </svg>
  </div>
</template>
