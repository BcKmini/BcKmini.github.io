<template>
  <div class="m-diagram">
    <svg viewBox="0 0 640 320" role="img" aria-label="FOWOCO 업무 자동화 흐름 다이어그램">
      <defs><marker id="ar-fw" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>

      <rect x="24" y="8" width="180" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="114" y="29" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">HR 담당자</text>
      <text x="114" y="48" text-anchor="middle" font-size="10" fill="var(--muted)">체류·서류 업무 요청</text>

      <rect x="230" y="8" width="180" height="52" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="320" y="29" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--accent)">FOWOCO Agent</text>
      <text x="320" y="48" text-anchor="middle" font-size="10" fill="var(--muted)">의도 분석 · 초안 준비</text>

      <rect x="436" y="8" width="180" height="52" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="526" y="29" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">외국인 근로자</text>
      <text x="526" y="48" text-anchor="middle" font-size="10" fill="var(--muted)">모국어 안내 · 응답</text>

      <line x1="204" y1="34" x2="226" y2="34" stroke="var(--muted)" marker-end="url(#ar-fw)"/>
      <line x1="410" y1="34" x2="432" y2="34" stroke="var(--muted)" marker-end="url(#ar-fw)"/>

      <line x1="320" y1="60" x2="320" y2="94" stroke="var(--muted)" marker-end="url(#ar-fw)"/>

      <rect x="24" y="98" width="115" height="60" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="81" y="120" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text)">1. 기한 감지</text>
      <text x="81" y="138" text-anchor="middle" font-size="9.5" fill="var(--muted)">체류·서류 만료 추적</text>

      <rect x="149" y="98" width="115" height="60" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="206" y="115" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text)">2. Intent 분석</text>
      <text x="206" y="132" text-anchor="middle" font-size="9.5" fill="var(--muted)">필수정보 탐지·</text>
      <text x="206" y="146" text-anchor="middle" font-size="9.5" fill="var(--muted)">재질문</text>

      <rect x="274" y="98" width="115" height="60" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="331" y="115" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text)">3. 문서·안내</text>
      <text x="331" y="132" text-anchor="middle" font-size="9.5" fill="var(--muted)">HWPX 초안 +</text>
      <text x="331" y="146" text-anchor="middle" font-size="9.5" fill="var(--muted)">다국어 번역</text>

      <rect x="399" y="98" width="115" height="60" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="456" y="115" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text)">4. HR 승인</text>
      <text x="456" y="132" text-anchor="middle" font-size="9.5" fill="var(--muted)">근거 확인 후</text>
      <text x="456" y="146" text-anchor="middle" font-size="9.5" fill="var(--muted)">담당자 검토</text>

      <rect x="524" y="98" width="92" height="60" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="570" y="115" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text)">5. 응답</text>
      <text x="570" y="132" text-anchor="middle" font-size="9.5" fill="var(--muted)">근로자 회신 ·</text>
      <text x="570" y="146" text-anchor="middle" font-size="9.5" fill="var(--muted)">후속 업무</text>

      <line x1="139" y1="128" x2="145" y2="128" stroke="var(--muted)" marker-end="url(#ar-fw)"/>
      <line x1="264" y1="128" x2="270" y2="128" stroke="var(--muted)" marker-end="url(#ar-fw)"/>
      <line x1="389" y1="128" x2="395" y2="128" stroke="var(--muted)" marker-end="url(#ar-fw)"/>
      <line x1="514" y1="128" x2="520" y2="128" stroke="var(--muted)" marker-end="url(#ar-fw)"/>

      <line x1="320" y1="158" x2="320" y2="192" stroke="var(--muted)" marker-end="url(#ar-fw)"/>

      <rect x="24" y="196" width="592" height="70" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="320" y="217" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">인프라: k3s(AWS EC2) + Terraform + Traefik(HTTPS)</text>
      <text x="320" y="236" text-anchor="middle" font-size="10" fill="var(--muted)">GitHub Actions 배포 파이프라인 · Prometheus/Grafana 모니터링</text>
      <text x="320" y="253" text-anchor="middle" font-size="10" fill="var(--muted)">livenessProbe·PVC·OOM 등 실운영 장애 다수 발견·수정</text>
    </svg>
  </div>
</template>
