export const projects = [
  {
    id: "fowoco",
    num: "00",
    label: "FOWOCO",
    service: "fowoco.service",
    tag: "HR SaaS Platform",
    thumb: "/assets/fowoco.jpg",
    title: "E-9 외국인근로자 HR Operations 'FOWOCO'",
    title_en: "E-9 Foreign Worker HR Operations Platform 'FOWOCO'",
    meta: "2026.07 – 2026.08 · Frontend 핵심개발 + Infra 전담(DevOps/SRE) · 팀 8명",
    meta_en: "Jul 2026 – Aug 2026 · Frontend core dev + sole Infra owner (DevOps/SRE) · Team of 8",
    desc: "Agent가 체류·계약·서류 업무의 절차와 근거를 준비하고, 담당자가 검토·승인·제출을 수행하는 HR 운영 플랫폼",
    desc_en: "An HR operations platform where an AI agent prepares the process and evidence for stay/contract/document tasks, and staff review, approve, and file them",
    chips: ["React", "TypeScript", "Spring Boot", "AWS", "Terraform", "Kubernetes (k3s)", "Prometheus/Grafana"],
    stats: [
      { value: "0 add/0 destroy", label: "AWS 인프라 Terraform 편입 (무중단)", label_en: "AWS infra imported into Terraform (zero downtime)" },
      { value: "~5분", label: "백업 스냅샷 복구 검증 소요 시간", label_en: "Time to verify a backup restores" },
      { value: "3%", label: "실측 노드 사용률 (오판했던 '한계' 대비)", label_en: "Actual node usage (vs. misjudged 'maxed out')" },
    ],
    diagrams: [
      { key: "flow", label: "업무 자동화 흐름", label_en: "Task Automation Flow", component: "fowoco" },
      { key: "monitoring", label: "모니터링 아키텍처", label_en: "Monitoring Architecture", component: "fowocoMonitoring" },
    ],
    tech: [
      {
        name: "Terraform으로 AWS 인프라 전체 코드화",
        desc: "AWS 리소스가 전부 콘솔로 수동 생성돼 있어 상태를 코드로 추적할 수 없었습니다. terraform import로 기존 리소스를 하나도 건드리지 않고 그대로 state에 편입시켰고(plan 결과 0 add / 0 destroy), DLM 백업 대상이 태그 하나로 결정된다는 걸 확인해 코드에 명시적으로 박아뒀습니다. 보안그룹에 description을 붙이면 AWS 프로바이더가 delete+recreate로 처리해 라이브 SG가 순간 끊긴다는 것도 이 과정에서 확인하고 일부러 비워뒀습니다.",
        desc_en: "Every AWS resource had been created by hand through the console with nothing tracked as code. I brought it all into Terraform via `terraform import` without touching a single resource — plan showed 0 add / 0 destroy — and pinned the tag DLM uses to pick backup targets explicitly in code. Also found the AWS provider treats a security-group description change as delete+recreate, which would briefly drop a live SG, so I left those blank on purpose.",
      },
      {
        name: "Prometheus+Grafana 모니터링 스택 구축",
        desc: "장애가 나도 kubectl로 파드를 하나씩 들여다보는 것 말고는 볼 방법이 없었습니다. 별도 monitoring 네임스페이스에 node-exporter·kube-state-metrics·Prometheus·Grafana를 새로 올렸는데, 기존 노드(2 vCPU/8GiB) 여유를 kubectl top으로 먼저 확인한 뒤 각 컴포넌트를 20~200m CPU, 30~256Mi 메모리 수준으로 최소화해 운영 워크로드를 침범하지 않게 설계했습니다.",
        desc_en: "With no observability, the only way to check anything was kubectl, pod by pod. I stood up node-exporter, kube-state-metrics, Prometheus, and Grafana in an isolated namespace, first checking headroom on the existing node (2 vCPU/8GiB) with kubectl top, then sizing each component down to 20-200m CPU / 30-256Mi memory so monitoring wouldn't eat into production.",
      },
      {
        name: "Promtail 장애 진단 → Grafana Alloy 교체",
        desc: "Loki+Promtail로 로그 수집을 붙였는데 파드 디스커버리가 'Starting provider' 로그를 찍은 뒤 조용히 멈췄습니다. RBAC 권한, API 직접 접근, 로그 파일 글롭 패턴, 버전 2개까지 하나씩 배제하며 원인을 좁혀 Promtail 자체의 디스커버리 버그로 결론 내렸고, 공식 후속인 Grafana Alloy로 교체해 문제를 해결했습니다.",
        desc_en: "After wiring up Loki+Promtail for log collection, pod discovery silently died right after logging 'Starting provider.' I ruled out RBAC, direct API access, the log-glob pattern, and two Promtail versions one at a time, traced it to a bug in Promtail's own discovery implementation, and switched to its official successor, Grafana Alloy.",
      },
      {
        name: "GitHub Actions 상태체크 + rollout 오탐 진단",
        desc: "ai 서버 배포가 반복 실패했는데 코드 문제인지 인프라 문제인지 구분이 안 됐습니다. 10분마다 HTTP 헬스체크와 실제 kubectl 파드 상태를 함께 확인하는 status-check 워크플로우를 만들어 이벤트 로그를 직접 봤더니, BGE-M3+reranker 모델이 반영되며 이미지가 5GB로 커져 pull에만 7분 넘게 걸리는 게 원인이었습니다(7m22s, 4.97GB 확인). 타임아웃을 180초에서 600초로 늘려 오탐을 없앴습니다.",
        desc_en: "The ai server's deploys kept failing and it wasn't clear whether the cause was code or infra. I built a status-check workflow checking real kubectl pod status alongside an HTTP health check every 10 minutes, and the event log showed the image had grown to 5GB once the BGE-M3+reranker model got baked in, taking over 7 minutes just to pull (confirmed: 7m22s, 4.97GB). Raised the timeout from 180s to 600s and the false alarm went away.",
      },
      {
        name: "k3s 실운영 장애 진단·수정",
        desc: "배포는 됐지만 livenessProbe 부재, probe timeout 기본값 문제, PVC fsGroup 누락으로 파일 업로드가 조용히 실패하는 문제, AI 서버 OOMKilled 등이 서비스를 하나씩 망가뜨리고 있었습니다. 로그와 kubectl 상태를 대조해 원인을 찾아 고치고, 모든 워크로드에 resource requests/limits를 설정했습니다.",
        desc_en: "The app was deployed, but a missing livenessProbe, a too-short default probe timeout, a PVC missing fsGroup that silently broke file uploads, and the AI server getting OOMKilled were each breaking things one at a time. I diagnosed each by cross-checking logs against kubectl status and set requests/limits on every workload.",
      },
      {
        name: "백업 복구 리허설 + 노드 용량 재해석",
        desc: "백업은 매일 쌓이고 있었지만 실제로 복구되는지 검증된 적이 없었습니다. 별도 dev 인스턴스에서 최신 스냅샷으로 볼륨을 만들어 SSM으로 읽기 전용 마운트해 postgres·서버 파일 데이터가 온전한지 직접 확인했습니다(약 5분 내 완료). 별개로 `kubectl describe node`의 limits 합계만 보고 CPU 여유가 없다고 오판했던 것도, kubectl top으로 실사용률이 3%에 불과하다는 걸 실측해 정정하고 근거 없는 리사이즈를 막았습니다.",
        desc_en: "Snapshots were piling up daily with no verification they'd actually restore. I spun up a volume from the latest snapshot on a separate dev instance, mounted it read-only via SSM, and confirmed the postgres and server file data was intact (about 5 minutes end to end). Separately, I'd misread `kubectl describe node`'s limits total as no CPU headroom — corrected it with kubectl top showing real usage at 3%, heading off an unnecessary resize.",
      },
      {
        name: "라이브 QA로 찾은 Server 버그 2건",
        desc: "근로자 보안 링크 발급이 특정 업무카드에서 계속 422로 실패해 원인을 추적하니, 데모 시드가 실제 로직으로는 나올 수 없는 상태(승인 이력 없이 WAITING_WORKER)를 만들고 있었습니다. 시드 전이 경로에 승인 단계를 추가해 고쳤고, 로그아웃 상태로 재검증하다 두 번째 버그도 찾았습니다 — 근로자가 로그인 없이 쓰는 공개 API 3개가 다른 컨트롤러와 다르게 /api/v1 접두사 없이 매핑돼, 실제 배포 환경에서는 근로자가 링크에 아예 접속할 수 없었습니다.",
        desc_en: "Issuing a worker security link kept failing with 422 on certain task cards, and tracing it back showed the demo seed was faking a state real application logic could never produce (WAITING_WORKER with no approval history) — fixed by adding the missing approval step. Re-verifying while logged out surfaced a second bug: three public worker APIs were mapped without the /api/v1 prefix every other controller had, so in the real deployment workers couldn't reach their links at all.",
      },
      {
        name: "mock → 실데이터 전환 + 근로자 보안 링크",
        desc: "업무함 화면이 mock 데이터라 실제로 쓸 수 없었고, 사이드바에 근로자 메뉴가 아예 빠져 있어 목록에 들어갈 방법도 없었습니다. Server API로 전면 전환하고 근로자 등록·서류 업로드를 workers API에 연동했으며, 로그인 없이 접근하는 보안 링크 발급·재발급 기능을 만들어 SOLAPI로 실제 SMS 발송까지 연결했습니다.",
        desc_en: "The task screen ran on mock data, and the worker menu was missing entirely from the sidebar — there was no way in. I switched everything to the real Server API, wired up worker registration and document uploads to the workers API, and built the no-login worker security link issue/reissue flow connected to real SMS delivery via SOLAPI.",
      },
    ],
    link: "https://github.com/fowoco",
  },
  {
    id: "noteflow",
    num: "01",
    label: "NoteFlow",
    service: "noteflow.service",
    tag: "AI Learning Platform",
    thumb: "/assets/noteflow.png",
    thumbGradient: "linear-gradient(135deg, #fb7185, #e11d48 55%, #9f1239)",
    title: "AI 기반 학습 플랫폼 'NoteFlow'",
    title_en: "AI-based Learning Platform 'NoteFlow'",
    meta: "2025.04 – 2025.10 · Tech Lead · 팀 3명 · 졸업작품",
    meta_en: "Apr 2025 – Oct 2025 · Tech Lead · Team of 3 · Capstone project",
    desc: "음성(Whisper)·이미지(OCR)·LLM을 하나로 묶은 실시간 지식 관리 및 학습 콘텐츠 자동 생성 플랫폼",
    desc_en: "A real-time knowledge-management platform that combines voice (Whisper), image (OCR), and an LLM into one pipeline to auto-generate study content",
    chips: ["FastAPI", "Whisper", "LangChain", "React", "Electron"],
    stats: [
      { value: "90%+", label: "한국어 STT 정확도", label_en: "Korean STT accuracy" },
      { value: "<20초", label: "문제 생성 지연", label_en: "Question generation latency" },
    ],
    diagrams: [
      { key: "flow", label: "아키텍처", label_en: "Architecture", component: "noteflow" },
      { key: "erd", label: "데이터 모델", label_en: "Data Model", component: "noteflowErd" },
      { key: "pipeline", label: "생성 파이프라인", label_en: "Generation Pipeline", component: "noteflowPipeline" },
    ],
    tech: [
      {
        name: "StreamingResponse 스트리밍 응답",
        desc: "요약이 다 끝난 뒤에 한 번에 결과를 보내면, 긴 문서일수록 사용자는 그동안 아무 반응 없는 화면만 보고 있어야 하는 문제가 있었습니다. LLM 요약을 StreamingResponse로 바꿔서 생성되는 대로 조금씩 전달했고, 전체 처리가 끝나기 전에도 진행 상황을 눈으로 볼 수 있게 됐습니다.",
        desc_en:
          "Sending the whole summary at once after it finished meant users stared at a frozen screen the longer the document was. Switched the LLM summary to a StreamingResponse so results arrive as they're generated, making progress visible before the whole job finishes.",
      },
      {
        name: "Whisper(로컬) + PyMuPDF",
        desc: "음성 인식을 외부 API로 계속 호출하면 사용량이 늘수록 비용이 커지는 문제가 있어, Whisper 모델을 서버에 직접 올려 로컬에서 돌리는 방식을 택했습니다. 문서는 PyMuPDF로 따로 텍스트를 뽑아 음성 내용과 하나의 지식으로 합쳤습니다.",
        desc_en:
          "Calling an external API for speech recognition gets more expensive as usage grows, so I loaded the Whisper model directly on the server and ran it locally instead. Documents are parsed separately with PyMuPDF and merged with the transcript into one knowledge base.",
      },
      {
        name: "자체 호스팅 LLM(Qwen3-4B) 문제 생성",
        desc: "예상 문제 생성에도 외부 API를 쓰면 호출량이 늘수록 비용이 커지는 문제가 있어, Qwen3-4B 모델을 직접 GPU에 분산 로드해서 썼습니다. 텍스트에서 '핵심 요점' 부분만 추출해 프롬프트에 넣고, 반드시 JSON 배열만 출력하도록 시스템 프롬프트를 짜서 파싱 실패를 줄였습니다.",
        desc_en:
          "Question generation had the same cost problem with external APIs, so I loaded a Qwen3-4B model directly, distributed across multiple GPUs. I extract only the 'key points' section for the prompt and force JSON-array-only output in the system prompt to cut down on parsing failures.",
      },
      {
        name: "Vite + Electron + JWT/OAuth",
        desc: "처음엔 웹과 데스크톱 앱을 따로 만들려다가, 로그인 로직을 두 번 만들고 두 번 고쳐야 한다는 걸 깨닫고 방향을 바꿨습니다. 같은 빌드 결과물을 웹과 Electron 둘 다에서 쓸 수 있게 구조를 잡고, 구글·네이버·카카오 로그인 처리를 공통 모듈로 묶어 어디서 로그인해도 같은 코드가 처리하게 했습니다.",
        desc_en:
          "Originally planned to build the web and desktop apps separately, then realized that meant implementing and maintaining login logic twice. Restructured things so the same build output works for both web and Electron, and unified Google/Naver/Kakao login into one shared module so the same code handles login regardless of platform.",
      },
    ],
    link: "https://github.com/KU-NoteFlow",
  },
  {
    id: "hodong",
    num: "02",
    label: "Hodong-i",
    service: "hodong-chatbot.service",
    tag: "RAG Chatbot",
    thumb: "https://raw.githubusercontent.com/KT-TeamProject-11/.github/main/profile/assets/main.png",
    title: "천안 도시재생지원센터 '호동이' 챗봇",
    title_en: "Cheonan Urban Regeneration Support Center 'Hodong-i' Chatbot",
    meta: "2025.07 – 2025.08 · Tech Lead · 팀 4명 · 공공기관 연계",
    meta_en: "Jul 2025 – Aug 2025 · Tech Lead · Team of 4 · Public-sector partnership",
    desc: "공공 데이터를 통합해 반복 민원을 자동 응대하는 RAG 기반 민원 챗봇",
    desc_en: "A RAG-based civil-complaint chatbot that integrates public data to automatically handle repetitive inquiries",
    chips: ["LangChain", "FAISS", "Redis", "Docker"],
    stats: [
      { value: "+65%", label: "답변 정확도", label_en: "Answer accuracy" },
      { value: "-80%", label: "정보 획득 시간", label_en: "Time to find information" },
      { value: "-30%", label: "민원 응대 부담", label_en: "Complaint-handling workload" },
    ],
    diagrams: [
      { key: "flow", label: "요청 흐름", label_en: "Request Flow", component: "hodong" },
      { key: "pipeline", label: "인덱싱 파이프라인", label_en: "Indexing Pipeline", component: "hodongPipeline" },
    ],
    tech: [
      {
        name: "다층 응답 라우팅 설계",
        desc: "질문을 LLM에 통째로 넘겼더니 자주 바뀌는 공지 내용과 고정된 FAQ가 섞여서 답변 신뢰도가 낮았습니다. FAQ부터 정확히 매칭해보고, 없으면 내부 문서를 검색하고, 그래도 없으면 실시간 웹 검색까지 가는 3단계 순서로 나눴더니 정보를 찾는 시간이 80% 줄었습니다.",
        desc_en:
          "Handing questions straight to an LLM mixed frequently-changing notices with fixed FAQs, so answer reliability was low. Splitting it into a 3-stage order — exact FAQ match first, then internal document search, then live web search as a last resort — cut the time to find information by 80%.",
      },
      {
        name: "FAISS + BM25 하이브리드 리트리버",
        desc: "의미 기반 검색(FAISS)만 썼더니 지명·사업명 같은 고유명사를 자꾸 놓쳤습니다. 키워드 매칭(BM25)을 같이 써서 두 방식을 0.7:0.3으로 섞고 재랭킹 단계를 하나 더 붙였더니 답변 정확도가 65% 좋아졌습니다.",
        desc_en:
          "Semantic search (FAISS) alone kept missing proper nouns like place and program names. Adding keyword matching (BM25) alongside it at a 0.7:0.3 blend, plus a reranking step, improved answer accuracy by 65%.",
      },
      {
        name: "Redis 캐시 (TTL 600초)",
        desc: "같은 질문이 반복해서 들어오는 패턴을 확인하고, 매번 LLM을 다시 부르는 대신 캐시에서 바로 응답하게 했습니다. 반복 질문은 LLM 호출 없이 즉시 응답이 나가서, 동시에 여러 명이 물어봐도 응답이 밀리지 않았습니다.",
        desc_en:
          "Noticed the same questions kept coming in, so instead of re-calling the LLM every time, added a cache that answers instantly for repeats. Repeated questions now skip the LLM call entirely, so answers stay fast even with several people asking at once.",
      },
      {
        name: "Whisper STT + edge-tts",
        desc: "고령층 사용자는 타이핑 기반 챗봇을 어려워한다는 이야기를 듣고, 음성으로 묻고 음성으로 답을 들을 수 있게 STT·TTS를 붙였습니다. 타이핑 없이도 챗봇의 모든 기능을 그대로 쓸 수 있게 됐습니다.",
        desc_en:
          "Heard that older users find typing-based chatbots hard to use, so added STT/TTS so people can ask and hear answers by voice. Every feature of the chatbot is now usable without typing at all.",
      },
    ],
    link: "https://github.com/KT-TeamProject-11",
  },
  {
    id: "cctv",
    num: "03",
    label: "CCTV Timeline",
    service: "cctv-timeline.service",
    tag: "Video Analysis",
    thumb: "https://raw.githubusercontent.com/KU-AILAB/CCTV_Timeline/main/assets/timeline_marking.png",
    title: "동영상 타임라인 검출 서비스",
    title_en: "Video Timeline Detection Service",
    meta: "2025.04 – 2025.06 · Lead Backend · 팀 2명 · 국립생태원 연계",
    meta_en: "Apr 2025 – Jun 2025 · Lead Backend · Team of 2 · National Institute of Ecology partnership",
    desc: "야생동물(고라니 등) CCTV 영상에서 객체 출현 구간을 자동 검출해 타임라인으로 정리하는 분석 자동화 서비스",
    desc_en: "An analysis-automation service that detects wildlife (e.g. water deer) appearances in CCTV footage and organizes them into a timeline",
    chips: ["YOLO11", "OpenCV", "FFmpeg", "Flask"],
    stats: [
      { value: "100%", label: "50GB+ 업로드 성공률", label_en: "50GB+ upload success rate" },
      { value: "4.5×", label: "분석 속도 (24h→30분)", label_en: "Analysis speed (24h→30min)" },
      { value: "-40%", label: "서버 자원 점유율", label_en: "Server resource usage" },
    ],
    diagrams: [
      { key: "flow", label: "아키텍처", label_en: "Architecture", component: "cctv" },
      { key: "erd", label: "데이터 모델", label_en: "Data Model", component: "cctvErd" },
    ],
    tech: [
      {
        name: "청크 업로드 + 세션 오프셋",
        desc: "수십 GB짜리 영상을 업로드하다가 중간에 끊기면 처음부터 다시 올려야 하는 문제가 있었습니다. 여러 조각으로 나눠 올리고, 세션별로 이미 올라간 크기를 서버에 기록해뒀다가 끊긴 지점부터 이어 올릴 수 있게 바꿨더니 50GB 이상 영상도 업로드 성공률 100%를 유지했습니다.",
        desc_en:
          "Uploading tens of GBs of footage meant starting over from scratch if the connection dropped midway. Switched to uploading in chunks, with the server tracking how much of each session had already landed so it could resume from the break point — keeping the success rate at 100% even for 50GB+ videos.",
      },
      {
        name: "FFmpeg 트랜스코딩 파이프라인",
        desc: "현장 CCTV 영상이 SEC·AVI 같은 비표준 포맷이라 브라우저에서 재생도 안 되고 분석 코드도 프레임을 못 읽는 문제가 있었습니다. 업로드가 끝나면 바로 표준 포맷(H.264 MP4)으로 변환하는 단계를 앞단에 넣어서 해결했습니다.",
        desc_en:
          "Field CCTV footage came in non-standard formats like SEC/AVI that wouldn't play in the browser or get read frame-by-frame by the analysis code. Solved it by transcoding to a standard format (H.264 MP4) right after upload, before anything else touches the file.",
      },
      {
        name: "YOLO11 + 진행률 추적",
        desc: "영상 하나를 프레임 추출부터 탐지까지 처리하는 데 시간이 걸려서, 그동안 사용자는 화면이 멈춘 건지 알 수 없는 문제가 있었습니다. 프레임 추출·탐지 단계마다 진행률을 DB에 기록해 화면에서 폴링으로 보여주게 했고, 처리 자체도 24시간 분량 영상을 30분 만에 끝내도록 최적화했습니다(수작업 대비 4.5배).",
        desc_en:
          "Processing a single video from frame extraction through detection takes time, and users had no way to tell if the screen had just frozen. Logged progress to the DB at each stage for the frontend to poll, and optimized the pipeline itself to process 24 hours of footage in 30 minutes (4.5x faster than doing it by hand).",
      },
      {
        name: "타임라인 편집 UI + 익스포트",
        desc: "모델이 가끔 구간을 놓치거나 잘못 잡는데 이걸 고칠 방법이 없으면 결과를 그대로 쓸 수 없었습니다. 연구원이 직접 드래그로 구간을 수정할 수 있는 편집 화면을 만들고, 확정된 구간은 MP4·CSV·JSON으로 한 번에 내려받을 수 있게 했습니다.",
        desc_en:
          "The model occasionally misses or misidentifies a segment, and with no way to fix that the output wasn't usable as-is. Built an editing screen where researchers can drag-correct segments, then export the finalized ranges as MP4 clips, CSV, and JSON in one batch.",
      },
    ],
    link: "https://github.com/KU-AILAB/CCTV_Timeline",
  },
  {
    id: "bird",
    num: "04",
    label: "Collection Bird",
    service: "collection-bird.service",
    tag: "GIS Data Platform",
    thumb: "https://raw.githubusercontent.com/KU-AILAB/Collection-bird/main/server/assets/main.png",
    title: "야생동물 데이터 수집 서비스",
    title_en: "Wildlife Observation Data Collection Service",
    meta: "2025.04 – 2025.05 · Lead Backend · 팀 3명",
    meta_en: "Apr 2025 – May 2025 · Lead Backend · Team of 3",
    desc: "지리정보(GIS)와 실시간 기상 데이터를 결합한 야생동물 관찰 데이터 수집 플랫폼",
    desc_en: "A wildlife-observation data collection platform combining geographic information (GIS) with live weather data",
    chips: ["FastAPI", "SQLAlchemy", "OpenWeatherMap", "Kakao Map"],
    stats: [
      { value: "-60%", label: "사용자 수동 입력", label_en: "Manual user input" },
      { value: "75%", label: "생태 데이터 일치율", label_en: "Ecological data consistency" },
      { value: "3개", label: "외부 API 연동", label_en: "External APIs integrated" },
    ],
    diagrams: [
      { key: "flow", label: "아키텍처", label_en: "Architecture", component: "bird" },
      { key: "erd", label: "데이터 모델", label_en: "Data Model", component: "birdErd" },
      { key: "cache", label: "좌표 확보 흐름", label_en: "Coordinate Resolution Flow", component: "birdCache" },
    ],
    tech: [
      {
        name: "외부 API 통합 (Kakao Map + OpenWeatherMap)",
        desc: "처음엔 주소·날씨·고도를 사용자가 직접 입력하게 했는데, 매번 다 채우는 게 번거로워 보였습니다. 좌표만 찍으면 카카오맵과 기상 API가 나머지 정보를 자동으로 채워주게 바꿨더니 수동 입력이 60% 줄었습니다.",
        desc_en:
          "Originally had users type in address, weather, and elevation by hand, which felt tedious to fill out every time. Changed it so tapping a coordinate on the map lets Kakao Map and the weather API auto-fill the rest — cutting manual input by 60%.",
      },
      {
        name: "좌표별 메모리 캐싱 + 예외 처리",
        desc: "같은 좌표를 다시 조회할 때도 매번 외부 API를 새로 부르고 있다는 걸 확인하고, 좌표를 키로 결과를 메모리에 캐싱해 중복 호출을 줄였습니다. API 호출이 실패해도 화면이 깨지지 않고 '정보를 가져올 수 없음' 메시지로 대체되도록 예외 처리도 넣었습니다.",
        desc_en:
          "Noticed the same coordinates were triggering a fresh external API call every single time they were looked up. Added an in-memory cache keyed by coordinates to cut duplicate calls, plus exception handling so a failed call degrades gracefully to a 'data unavailable' message instead of breaking the screen.",
      },
      {
        name: "Pydantic 스키마 정규화",
        desc: "사용자 입력, 지도 좌표, 기상 데이터가 각각 형식이 달라서 그대로 저장하면 나중에 비교가 안 됐습니다. 들어오는 시점에 하나의 규격으로 검증·정규화하는 단계를 넣었더니 생태 데이터 일치율이 75%까지 올라갔습니다.",
        desc_en:
          "User input, map coordinates, and weather data each came in different formats, which made later comparisons impossible if stored as-is. Added a validation/normalization step at ingestion into one consistent schema, which raised ecological-data consistency to 75%.",
      },
      {
        name: "도메인 분리 아키텍처",
        desc: "처음엔 코드가 한 파일에 다 몰려 있어서 API 하나만 바뀌어도 파일 전체를 다시 훑어야 했습니다. FastAPI로 옮기면서 Router·Model·Schema로 역할을 나눴더니, 바뀐 부분만 해당 계층 파일에서 바로 찾아볼 수 있게 됐습니다.",
        desc_en:
          "Code originally lived in one big file, so even a single API change meant re-reading the whole thing. Migrating to FastAPI and splitting responsibilities into Router/Model/Schema layers means changes can now be traced to just the relevant layer's file.",
      },
    ],
    link: "https://github.com/KU-AILAB/Collection-bird",
  },
  {
    id: "medical",
    num: "05",
    label: "Medical Service",
    service: "medical-service.service",
    tag: "Healthcare Platform",
    thumb: "/assets/medical.png",
    title: "종합 의료 관리 서비스",
    title_en: "Integrated Medical Management Service",
    meta: "2024.04 – 2024.06 · Lead Backend & Data · 팀 3명",
    meta_en: "Apr 2024 – Jun 2024 · Lead Backend & Data · Team of 3",
    desc: "병원-약국-환자 데이터를 통합한 의료 정보 관리 플랫폼",
    desc_en: "A medical information management platform integrating hospital, pharmacy, and patient data",
    chips: ["PHP", "MySQL", "JavaScript", "Kakao Map API"],
    stats: [
      { value: "3-Role", label: "회원 유형 분리 (환자·병원·약국)", label_en: "Member types separated (patient/hospital/pharmacy)" },
      { value: "승인제", label: "병원·약국 가입 심사", label_en: "Hospital/pharmacy sign-up screening" },
    ],
    diagrams: [
      { key: "flow", label: "아키텍처", label_en: "Architecture", component: "medical" },
      { key: "erd", label: "데이터 모델", label_en: "Data Model", component: "medicalErd" },
    ],
    tech: [
      {
        name: "역할별 회원 테이블 + 승인 절차",
        desc: "환자·병원·약국이 같은 로그인 화면을 쓰지만 서로 권한이 달라야 하는 문제가 있었습니다. 역할별로 테이블(personal_tbl·hospital_tbl·pharmacy_tbl)을 나누고 로그인 시 세션에 사용자 유형을 저장했고, 병원·약국 계정은 관리자 승인 전까지 로그인이 막히도록 승인 플래그를 넣었습니다.",
        desc_en:
          "Patients, hospitals, and pharmacies shared the same login screen but needed different permissions. Split them into separate tables (personal_tbl / hospital_tbl / pharmacy_tbl), stored the user type in the session at login, and added an approval flag so hospital/pharmacy accounts can't log in until an admin approves them.",
      },
      {
        name: "처방전 삭제 기능",
        desc: "처방전을 계속 남겨두고 싶어하지 않는 환자도 있을 거라 생각해서, 요청하면 DB에서 처방전 데이터를 바로 지우는 기능을 별도로 만들었습니다.",
        desc_en:
          "Figured some patients wouldn't want their prescription records to stick around indefinitely, so I built a dedicated feature that lets them request immediate deletion of the prescription data from the DB.",
      },
      {
        name: "Kakao Map 병원·약국 찾기",
        desc: "근처 병원·약국을 이름으로 하나하나 찾아야 하는 게 불편해 보여서, Kakao Map의 장소 검색 위젯을 붙여 지도에서 위치와 정보를 바로 확인할 수 있게 했습니다.",
        desc_en:
          "Looking up nearby hospitals/pharmacies by name one at a time seemed inconvenient, so I added the Kakao Map place-search widget so location and info show up directly on the map.",
      },
    ],
    link: "https://github.com/BcKmini/Database",
  },
];
