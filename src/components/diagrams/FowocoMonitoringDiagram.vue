<template>
  <div class="m-diagram">
    <svg viewBox="0 0 640 340" role="img" aria-label="FOWOCO 모니터링 스택 아키텍처 다이어그램">
      <defs><marker id="ar-fwm" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>

      <rect x="24" y="8" width="592" height="46" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="320" y="27" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text)">fowoco 네임스페이스 — client / server / ai / postgres</text>
      <text x="320" y="44" text-anchor="middle" font-size="9.5" fill="var(--muted)">서버는 /actuator/prometheus를 Basic Auth로 노출 (server#177/#178 대응)</text>

      <line x1="150" y1="54" x2="150" y2="86" stroke="var(--muted)" marker-end="url(#ar-fwm)"/>
      <line x1="490" y1="54" x2="490" y2="86" stroke="var(--muted)" marker-end="url(#ar-fwm)"/>

      <rect x="24" y="90" width="252" height="54" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="150" y="110" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text)">node-exporter · kube-state-metrics</text>
      <text x="150" y="128" text-anchor="middle" font-size="9.5" fill="var(--muted)">노드 리소스 + k8s 오브젝트 상태</text>

      <rect x="364" y="90" width="252" height="54" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="490" y="110" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--text)">Grafana Alloy</text>
      <text x="490" y="128" text-anchor="middle" font-size="9.5" fill="var(--muted)">loki.source.kubernetes — API로 로그 스트리밍</text>

      <line x1="150" y1="144" x2="150" y2="178" stroke="var(--muted)" marker-end="url(#ar-fwm)"/>
      <line x1="490" y1="144" x2="490" y2="178" stroke="var(--muted)" marker-end="url(#ar-fwm)"/>

      <rect x="24" y="182" width="252" height="54" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="150" y="202" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">Prometheus</text>
      <text x="150" y="220" text-anchor="middle" font-size="9.5" fill="var(--muted)">TSDB 10일 보존 · Basic Auth로 server scrape</text>

      <rect x="364" y="182" width="252" height="54" rx="10" fill="var(--bg)" stroke="var(--accent)"/>
      <text x="490" y="202" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">Loki</text>
      <text x="490" y="220" text-anchor="middle" font-size="9.5" fill="var(--muted)">7일 보존 · Recreate 배포(RWO PVC)</text>

      <line x1="150" y1="236" x2="240" y2="270" stroke="var(--muted)" marker-end="url(#ar-fwm)"/>
      <line x1="490" y1="236" x2="400" y2="270" stroke="var(--muted)" marker-end="url(#ar-fwm)"/>

      <rect x="200" y="274" width="240" height="54" rx="10" fill="var(--bg)" stroke="var(--border)"/>
      <text x="320" y="296" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--text)">Grafana</text>
      <text x="320" y="314" text-anchor="middle" font-size="9.5" fill="var(--muted)">메트릭 + 로그를 한 화면에서 조회</text>
    </svg>
  </div>
</template>
