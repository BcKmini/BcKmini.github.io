export const projects = [
  {
    id: "noteflow",
    num: "01",
    label: "NoteFlow",
    service: "noteflow.service",
    tag: "AI Learning Platform",
    thumb: "/assets/noteflow.png",
    thumbGradient: "linear-gradient(135deg, #fb7185, #e11d48 55%, #9f1239)",
    title: "AI 기반 학습 플랫폼 'NoteFlow'",
    meta: "2025.04 – 2025.10 · Tech Lead · 팀 3명 · 졸업작품",
    desc: "음성(Whisper)·이미지(OCR)·LLM을 하나로 묶은 실시간 지식 관리 및 학습 콘텐츠 자동 생성 플랫폼",
    chips: ["FastAPI", "Whisper", "LangChain", "React", "Electron"],
    stats: [
      { value: "-15%", label: "LLM 문제 오류율" },
      { value: "90%+", label: "한국어 STT 정확도" },
      { value: "<20초", label: "문제 생성 지연" },
    ],
    diagrams: [
      { key: "flow", label: "아키텍처", component: "noteflow" },
      { key: "erd", label: "데이터 모델", component: "noteflowErd" },
    ],
    tech: [
      {
        name: "FastAPI + Background Tasks",
        desc: "PDF OCR·Whisper STT 같은 무거운 AI 연산이 API 프로세스를 블로킹해 타임아웃이 나는 문제를, 업로드 응답은 즉시 반환하고 추론은 백그라운드 워커로 넘기는 비동기 구조로 해결. 대용량 처리 중에도 메인 API 가용성을 유지했습니다.",
      },
      {
        name: "OpenAI Whisper + PyMuPDF",
        desc: "한국어 강의 음성의 고유명사 인식률이 낮아 디코딩 파라미터를 튜닝하고 오디오 전처리를 정교화 — 인식 정확도 90% 이상 확보. 문서는 PyMuPDF 기반 인제스션 엔진으로 이원화해 음성·문서를 하나의 마크다운 지식으로 통합했습니다.",
      },
      {
        name: "LangChain + 프롬프트 엔지니어링",
        desc: "요약본 기반 예상 문제 생성 시 발생하는 할루시네이션을 Few-shot 예시 주입과 Self-Refinement(모델이 초안을 스스로 검증·교정) 루프로 제어 — 문제 오류율 15% 감소, 생성 지연 20초 이내.",
      },
      {
        name: "Vite + Electron + JWT/OAuth",
        desc: "웹과 데스크톱 앱이 같은 빌드 산출물을 공유하는 크로스 플랫폼 구조를 설계하고, 소셜 로그인 3사(Google/Naver/Kakao)와 JWT 인증 인터셉터를 공통 모듈로 묶어 환경에 상관없이 동일한 인증 흐름을 유지했습니다.",
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
    meta: "2025.07 – 2025.08 · Tech Lead · 팀 4명 · 공공기관 연계",
    desc: "공공 데이터를 통합해 반복 민원을 자동 응대하는 RAG 기반 민원 챗봇",
    chips: ["LangChain", "FAISS", "Redis", "Docker"],
    stats: [
      { value: "+65%", label: "답변 정확도" },
      { value: "-80%", label: "정보 획득 시간" },
      { value: "-30%", label: "민원 응대 부담" },
    ],
    diagrams: [
      { key: "flow", label: "요청 흐름", component: "hodong" },
      { key: "pipeline", label: "인덱싱 파이프라인", component: "hodongPipeline" },
    ],
    tech: [
      {
        name: "다층 응답 라우팅 설계",
        desc: "고정 FAQ와 수시로 바뀌는 공지·웹 데이터가 섞여 있어 단일 LLM 호출로는 신뢰성이 안 나오는 상황 — FAQ 정밀 매칭 → 내부 문서 RAG → 실시간 웹 검색 순서의 3단 라우팅으로 할루시네이션을 최소화하고 정보 획득 시간을 80% 단축했습니다.",
      },
      {
        name: "FAISS + BM25 하이브리드 리트리버",
        desc: "의미 검색(FAISS)만으로는 지명·사업명 같은 고유명사를 놓쳐서 키워드 매칭(BM25)을 0.7:0.3으로 결합하고 CrossEncoder 재랭킹을 얹음 — 답변 정확도 65% 개선. 공공 문서 구조에 맞는 청크 크기·오버랩도 실험으로 도출했습니다.",
      },
      {
        name: "Redis 캐시 (TTL 600초)",
        desc: "같은 민원 질의가 반복되는 특성을 이용해 엔드포인트 단에서 캐시로 즉시 응답 — LLM API 호출 비용을 줄이면서 동시 접속에도 지연 없는 서빙을 달성했습니다.",
      },
      {
        name: "Whisper STT + edge-tts",
        desc: "고령층 등 디지털 취약계층이 타이핑 없이 쓸 수 있도록 음성 입출력 파이프라인을 연동해 대민 서비스로서의 접근성을 확보했습니다.",
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
    meta: "2025.04 – 2025.06 · Lead Backend · 팀 2명 · 국립생태원 연계",
    desc: "야생동물(고라니 등) CCTV 영상에서 객체 출현 구간을 자동 검출해 타임라인으로 정리하는 분석 자동화 서비스",
    chips: ["YOLO11", "OpenCV", "FFmpeg", "FastAPI"],
    stats: [
      { value: "100%", label: "50GB+ 업로드 성공률" },
      { value: "4.5×", label: "분석 속도 (24h→30분)" },
      { value: "-40%", label: "서버 자원 점유율" },
    ],
    diagrams: [
      { key: "flow", label: "아키텍처", component: "cctv" },
      { key: "erd", label: "데이터 모델", component: "cctvErd" },
    ],
    tech: [
      {
        name: "Service Worker + 청크 업로드",
        desc: "수십 GB짜리 관찰 영상이 업로드 도중 끊기는 문제를 1MB 단위 청크 + 세션 오프셋 검증 API로 해결 — 중단돼도 이어올리기가 가능해 50GB 이상 영상 업로드 성공률 100%.",
      },
      {
        name: "FFmpeg 트랜스코딩 파이프라인",
        desc: "현장 CCTV의 비표준 확장자(SEC·AVI)가 브라우저 재생도, OpenCV 프레임 추출도 막는 병목이라 업로드 완료 즉시 H.264 MP4로 자동 변환하는 인코딩 단계를 파이프라인 앞단에 배치했습니다.",
      },
      {
        name: "YOLO11 + 비동기 큐",
        desc: "프레임별 객체 탐지가 메인 스레드를 점유해 서버가 멎는 문제를 추론 전용 백그라운드 큐로 격리하고, 5초 이내 출현 구간을 자동 병합해 DB 쓰기 오버헤드를 줄임 — 자원 점유율 40% 안정화, 24시간 영상을 30분에 분석(수작업 대비 4.5배).",
      },
      {
        name: "타임라인 편집 UI + 익스포트",
        desc: "모델이 놓친 구간을 연구원이 직접 보정할 수 있도록 드래그 편집 타임라인을 만들고, 확정 구간을 MP4 클립·CSV·JSON으로 일괄 내보내 외부 통계 분석과 연계되게 했습니다.",
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
    meta: "2025.04 – 2025.05 · Lead Backend · 팀 3명",
    desc: "지리정보(GIS)와 실시간 기상 데이터를 결합한 야생동물 관찰 데이터 수집 플랫폼",
    chips: ["FastAPI", "SQLAlchemy", "OpenWeatherMap", "Kakao Map"],
    stats: [
      { value: "-60%", label: "사용자 수동 입력" },
      { value: "75%", label: "생태 데이터 일치율" },
      { value: "0건", label: "외부 장애 전파" },
    ],
    diagrams: [
      { key: "flow", label: "아키텍처", component: "bird" },
      { key: "erd", label: "데이터 모델", component: "birdErd" },
    ],
    tech: [
      {
        name: "외부 API 통합 (Kakao Map + OpenWeatherMap)",
        desc: "관찰 좌표만 찍으면 주소·기온·강수·풍속·고도가 자동으로 붙도록 역지오코딩과 기상 API를 연동 — 사용자 수동 입력을 60% 줄였습니다.",
      },
      {
        name: "지수 백오프 + 메모리 캐싱",
        desc: "외부 서비스 응답 지연이 메인 서버 타임아웃으로 번지는 문제를 재시도 로직과 동일 좌표·시간대 캐싱으로 차단 — 서드파티 장애가 시스템으로 전파되지 않게 했습니다.",
      },
      {
        name: "Pydantic 스키마 정규화",
        desc: "포맷이 제각각인 사용자 입력·지도 좌표·기상 데이터를 단일 규격으로 검증·정규화하는 인제스션 파이프라인을 설계 — 생태 데이터 일치율 75% 달성.",
      },
      {
        name: "도메인 분리 아키텍처",
        desc: "한 파일에 얽혀 있던 프로토타입을 FastAPI로 마이그레이션하며 Router·Model·Schema 계층으로 재구조화 — 프론트엔드와의 협업 속도와 유지보수성을 크게 올렸습니다.",
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
    meta: "2024.04 – 2024.06 · Lead Backend & Data · 팀 3명",
    desc: "병원-약국-환자 데이터를 통합한 의료 정보 관리 플랫폼",
    chips: ["PHP", "MySQL", "JavaScript", "Kakao Map API", "공공데이터 API"],
    stats: [
      { value: "0.3초", label: "반경 검색 (-85%)" },
      { value: "3-Role", label: "RBAC 권한 격리" },
      { value: "0%", label: "데이터 결함률" },
    ],
    diagrams: [
      { key: "flow", label: "아키텍처", component: "medical" },
      { key: "erd", label: "데이터 모델", component: "medicalErd" },
    ],
    tech: [
      {
        name: "MySQL 공간 인덱스",
        desc: "전국 수만 건 의료기관의 반경 검색이 풀 테이블 스캔으로 2초 이상 걸리던 것을 좌표를 포인트 타입으로 정규화하고 공간 인덱스 + MBR 연산으로 최적화 — 응답 0.3초(85% 단축).",
      },
      {
        name: "RBAC 권한 격리 (Personal · Hospital · Pharmacy)",
        desc: "환자(Personal)·병원(Hospital)·약국(Pharmacy) 3개 테이블을 역할별로 분리하고 엔드포인트 수준에서 상호 데이터 접근을 격리. 처방전은 다운로드 완료 즉시 DB 메타데이터와 파일을 영구 삭제하는 휘발성 저장으로 유출 리스크를 원천 차단했습니다.",
      },
      {
        name: "FK 제약 + 진료 기반 리뷰 인증",
        desc: "처방 발급·조제 완료 이력을 리뷰 테이블과 조인해 실제 이용자만 평가를 남기게 하는 검증 가드레일 구현 — 허위 후기를 막고 데이터 결함률 0%를 유지했습니다.",
      },
    ],
    link: "https://github.com/BcKmini/Database",
  },
];
