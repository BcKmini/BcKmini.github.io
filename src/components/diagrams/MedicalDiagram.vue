<template>
  <div class="m-diagram">
    <svg viewBox="0 0 640 342" role="img" aria-label="종합 의료 관리 서비스 아키텍처 다이어그램">
      <defs><marker id="ar-md" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>
      <rect x="24" y="8" width="180" height="48" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="114" y="28" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">환자</text>
      <text x="114" y="45" text-anchor="middle" font-size="10" fill="var(--muted)">기관 검색 · 처방전 수령</text>
      <rect x="230" y="8" width="180" height="48" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="320" y="28" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">의사 (병원)</text>
      <text x="320" y="45" text-anchor="middle" font-size="10" fill="var(--muted)">진료 · 처방 발급</text>
      <rect x="436" y="8" width="180" height="48" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="526" y="28" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">약사 (약국)</text>
      <text x="526" y="45" text-anchor="middle" font-size="10" fill="var(--muted)">조제 처리</text>
      <line x1="114" y1="56" x2="114" y2="90" stroke="var(--muted)" marker-end="url(#ar-md)"/>
      <line x1="320" y1="56" x2="320" y2="90" stroke="var(--muted)" marker-end="url(#ar-md)"/>
      <line x1="526" y1="56" x2="526" y2="90" stroke="var(--muted)" marker-end="url(#ar-md)"/>
      <rect x="24" y="94" width="592" height="54" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="320" y="116" text-anchor="middle" font-size="13" font-weight="700" fill="var(--accent)">PHP Backend — 역할별 테이블 분리</text>
      <text x="320" y="135" text-anchor="middle" font-size="10" fill="var(--muted)">personal_tbl · hospital_tbl · pharmacy_tbl · 세션에 사용자 유형 저장</text>
      <line x1="169" y1="148" x2="169" y2="182" stroke="var(--muted)" marker-end="url(#ar-md)"/>
      <line x1="473" y1="148" x2="473" y2="182" stroke="var(--muted)" marker-end="url(#ar-md)"/>
      <rect x="24" y="186" width="290" height="54" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="169" y="208" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--accent)">가입 승인 절차</text>
      <text x="169" y="226" text-anchor="middle" font-size="10" fill="var(--muted)">병원·약국은 관리자 승인 전 로그인 차단</text>
      <rect x="330" y="186" width="286" height="54" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="473" y="208" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">Kakao Map 연동</text>
      <text x="473" y="226" text-anchor="middle" font-size="10" fill="var(--muted)">장소 검색 위젯으로 병원·약국 위치 표시</text>
      <line x1="169" y1="240" x2="169" y2="274" stroke="var(--muted)" marker-end="url(#ar-md)"/>
      <rect x="24" y="278" width="400" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="224" y="299" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">처방전 삭제</text>
      <text x="224" y="318" text-anchor="middle" font-size="10" fill="var(--muted)">환자 요청 시 DB 처방전 데이터 즉시 삭제</text>
      <line x1="424" y1="304" x2="444" y2="304" stroke="var(--muted)" marker-end="url(#ar-md)"/>
      <rect x="448" y="278" width="168" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="532" y="299" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">리뷰 · 별점</text>
      <text x="532" y="318" text-anchor="middle" font-size="10" fill="var(--muted)">기관별 후기 등록</text>
    </svg>
  </div>
</template>
