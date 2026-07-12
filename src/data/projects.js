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
      { key: "pipeline", label: "생성 파이프라인", component: "noteflowPipeline" },
    ],
    tech: [
      {
        name: "FastAPI + Background Tasks",
        desc: "업로드하고 나면 화면이 한참 멈춰 있다가 타임아웃이 나는 증상이 있었습니다. 찾아보니 OCR·STT 같은 무거운 연산이 API 요청 처리 자체를 막고 있었고, 이 연산을 백그라운드 작업으로 분리해 업로드는 바로 응답하고 처리는 뒤에서 돌아가게 바꿨습니다. 무거운 연산이 도는 중에도 다른 요청이 막히지 않게 됐습니다.",
      },
      {
        name: "OpenAI Whisper + PyMuPDF",
        desc: "한국어 강의 음성을 텍스트로 바꿔보니 전공 용어 같은 고유명사가 자꾸 틀리게 나왔습니다. Whisper의 디코딩 옵션과 오디오 전처리 방식을 하나씩 바꿔가며 테스트해 인식 정확도를 90% 이상으로 끌어올렸고, 문서는 PyMuPDF로 따로 텍스트를 뽑아 음성 내용과 하나의 지식으로 합쳤습니다.",
      },
      {
        name: "LangChain + 프롬프트 엔지니어링",
        desc: "요약본으로 예상 문제를 만들게 했더니 내용에 없는 걸 지어내는 경우가 있었습니다. 예시를 몇 개 미리 보여주고(Few-shot), 모델이 만든 초안을 스스로 한 번 더 검토하게 하는 단계를 추가했더니 오류율이 15% 줄고 생성 시간도 20초 이내로 유지됐습니다.",
      },
      {
        name: "Vite + Electron + JWT/OAuth",
        desc: "처음엔 웹과 데스크톱 앱을 따로 만들려다가, 로그인 로직을 두 번 만들고 두 번 고쳐야 한다는 걸 깨닫고 방향을 바꿨습니다. 같은 빌드 결과물을 웹과 Electron 둘 다에서 쓸 수 있게 구조를 잡고, 구글·네이버·카카오 로그인 처리를 공통 모듈로 묶어 어디서 로그인해도 같은 코드가 처리하게 했습니다.",
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
        desc: "질문을 LLM에 통째로 넘겼더니 자주 바뀌는 공지 내용과 고정된 FAQ가 섞여서 답변 신뢰도가 낮았습니다. FAQ부터 정확히 매칭해보고, 없으면 내부 문서를 검색하고, 그래도 없으면 실시간 웹 검색까지 가는 3단계 순서로 나눴더니 정보를 찾는 시간이 80% 줄었습니다.",
      },
      {
        name: "FAISS + BM25 하이브리드 리트리버",
        desc: "의미 기반 검색(FAISS)만 썼더니 지명·사업명 같은 고유명사를 자꾸 놓쳤습니다. 키워드 매칭(BM25)을 같이 써서 두 방식을 0.7:0.3으로 섞고 재랭킹 단계를 하나 더 붙였더니 답변 정확도가 65% 좋아졌습니다.",
      },
      {
        name: "Redis 캐시 (TTL 600초)",
        desc: "같은 질문이 반복해서 들어오는 패턴을 확인하고, 매번 LLM을 다시 부르는 대신 캐시에서 바로 응답하게 했습니다. 반복 질문은 LLM 호출 없이 즉시 응답이 나가서, 동시에 여러 명이 물어봐도 응답이 밀리지 않았습니다.",
      },
      {
        name: "Whisper STT + edge-tts",
        desc: "고령층 사용자는 타이핑 기반 챗봇을 어려워한다는 이야기를 듣고, 음성으로 묻고 음성으로 답을 들을 수 있게 STT·TTS를 붙였습니다. 타이핑 없이도 챗봇의 모든 기능을 그대로 쓸 수 있게 됐습니다.",
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
    chips: ["YOLO11", "OpenCV", "FFmpeg", "Flask"],
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
        name: "청크 업로드 + 세션 오프셋",
        desc: "수십 GB짜리 영상을 업로드하다가 중간에 끊기면 처음부터 다시 올려야 하는 문제가 있었습니다. 여러 조각으로 나눠 올리고, 세션별로 이미 올라간 크기를 서버에 기록해뒀다가 끊긴 지점부터 이어 올릴 수 있게 바꿨더니 50GB 이상 영상도 업로드 성공률 100%를 유지했습니다.",
      },
      {
        name: "FFmpeg 트랜스코딩 파이프라인",
        desc: "현장 CCTV 영상이 SEC·AVI 같은 비표준 포맷이라 브라우저에서 재생도 안 되고 분석 코드도 프레임을 못 읽는 문제가 있었습니다. 업로드가 끝나면 바로 표준 포맷(H.264 MP4)으로 변환하는 단계를 앞단에 넣어서 해결했습니다.",
      },
      {
        name: "YOLO11 + 진행률 추적",
        desc: "영상 하나를 프레임 추출부터 탐지까지 처리하는 데 시간이 걸려서, 그동안 사용자는 화면이 멈춘 건지 알 수 없는 문제가 있었습니다. 프레임 추출·탐지 단계마다 진행률을 DB에 기록해 화면에서 폴링으로 보여주게 했고, 처리 자체도 24시간 분량 영상을 30분 만에 끝내도록 최적화했습니다(수작업 대비 4.5배).",
      },
      {
        name: "타임라인 편집 UI + 익스포트",
        desc: "모델이 가끔 구간을 놓치거나 잘못 잡는데 이걸 고칠 방법이 없으면 결과를 그대로 쓸 수 없었습니다. 연구원이 직접 드래그로 구간을 수정할 수 있는 편집 화면을 만들고, 확정된 구간은 MP4·CSV·JSON으로 한 번에 내려받을 수 있게 했습니다.",
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
        desc: "처음엔 주소·날씨·고도를 사용자가 직접 입력하게 했는데, 매번 다 채우는 게 번거로워 보였습니다. 좌표만 찍으면 카카오맵과 기상 API가 나머지 정보를 자동으로 채워주게 바꿨더니 수동 입력이 60% 줄었습니다.",
      },
      {
        name: "지수 백오프 + 메모리 캐싱",
        desc: "외부 API가 느려질 때마다 우리 서버까지 같이 타임아웃 나는 걸 보고, 재시도 로직과 동일 좌표·시간대 캐싱을 넣었습니다. 운영하는 동안 외부 장애가 서비스 전체로 번진 적은 0건이었습니다.",
      },
      {
        name: "Pydantic 스키마 정규화",
        desc: "사용자 입력, 지도 좌표, 기상 데이터가 각각 형식이 달라서 그대로 저장하면 나중에 비교가 안 됐습니다. 들어오는 시점에 하나의 규격으로 검증·정규화하는 단계를 넣었더니 생태 데이터 일치율이 75%까지 올라갔습니다.",
      },
      {
        name: "도메인 분리 아키텍처",
        desc: "처음엔 코드가 한 파일에 다 몰려 있어서 API 하나만 바뀌어도 파일 전체를 다시 훑어야 했습니다. FastAPI로 옮기면서 Router·Model·Schema로 역할을 나눴더니, 바뀐 부분만 해당 계층 파일에서 바로 찾아볼 수 있게 됐습니다.",
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
        desc: "전국 의료기관 중에서 반경 검색을 하면 2초 넘게 걸렸습니다. 전체 테이블을 다 훑고 있다는 걸 확인하고, 좌표를 공간 인덱스로 잡을 수 있는 타입으로 바꿔 인덱스를 태웠더니 0.3초로 줄었습니다(85% 단축).",
      },
      {
        name: "RBAC 권한 격리 (Personal · Hospital · Pharmacy)",
        desc: "환자·병원·약국이 같은 시스템을 쓰다 보니 서로의 정보에 접근할 수 있으면 안 되는 상황이었습니다. 세 역할을 테이블부터 분리하고 엔드포인트 단위로 접근을 막았고, 처방전은 다운로드가 끝나면 파일과 DB 기록을 바로 지워서 남아있는 자료가 유출될 여지를 없앴습니다.",
      },
      {
        name: "FK 제약 + 진료 기반 리뷰 인증",
        desc: "아무나 리뷰를 남길 수 있게 하면 실제로 이용하지 않은 사람도 후기를 쓸 수 있다는 문제가 있었습니다. 처방·조제 이력이 있는 사람만 리뷰를 쓸 수 있게 테이블을 연결해서 막았고, 그 결과 허위 후기로 인한 데이터 결함률은 0%였습니다.",
      },
    ],
    link: "https://github.com/BcKmini/Database",
  },
];
