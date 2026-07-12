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
        name: "StreamingResponse 스트리밍 응답",
        desc: "요약이 다 끝난 뒤에 한 번에 결과를 보내면, 긴 문서일수록 사용자는 그동안 아무 반응 없는 화면만 보고 있어야 하는 문제가 있었습니다. LLM 요약을 StreamingResponse로 바꿔서 생성되는 대로 조금씩 전달했고, 전체 처리가 끝나기 전에도 진행 상황을 눈으로 볼 수 있게 됐습니다.",
      },
      {
        name: "Whisper(로컬) + PyMuPDF",
        desc: "음성 인식을 외부 API로 계속 호출하면 사용량이 늘수록 비용이 커지는 문제가 있어, Whisper 모델을 서버에 직접 올려 로컬에서 돌리는 방식을 택했습니다. 문서는 PyMuPDF로 따로 텍스트를 뽑아 음성 내용과 하나의 지식으로 합쳤습니다.",
      },
      {
        name: "자체 호스팅 LLM(Qwen3-4B) 문제 생성",
        desc: "예상 문제 생성에도 외부 API를 쓰면 호출량이 늘수록 비용이 커지는 문제가 있어, Qwen3-4B 모델을 직접 GPU에 분산 로드해서 썼습니다. 텍스트에서 '핵심 요점' 부분만 추출해 프롬프트에 넣고, 반드시 JSON 배열만 출력하도록 시스템 프롬프트를 짜서 파싱 실패를 줄였습니다.",
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
      { value: "3개", label: "외부 API 연동" },
    ],
    diagrams: [
      { key: "flow", label: "아키텍처", component: "bird" },
      { key: "erd", label: "데이터 모델", component: "birdErd" },
      { key: "cache", label: "좌표 확보 흐름", component: "birdCache" },
    ],
    tech: [
      {
        name: "외부 API 통합 (Kakao Map + OpenWeatherMap)",
        desc: "처음엔 주소·날씨·고도를 사용자가 직접 입력하게 했는데, 매번 다 채우는 게 번거로워 보였습니다. 좌표만 찍으면 카카오맵과 기상 API가 나머지 정보를 자동으로 채워주게 바꿨더니 수동 입력이 60% 줄었습니다.",
      },
      {
        name: "좌표별 메모리 캐싱 + 예외 처리",
        desc: "같은 좌표를 다시 조회할 때도 매번 외부 API를 새로 부르고 있다는 걸 확인하고, 좌표를 키로 결과를 메모리에 캐싱해 중복 호출을 줄였습니다. API 호출이 실패해도 화면이 깨지지 않고 '정보를 가져올 수 없음' 메시지로 대체되도록 예외 처리도 넣었습니다.",
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
    chips: ["PHP", "MySQL", "JavaScript", "Kakao Map API"],
    stats: [
      { value: "3-Role", label: "회원 유형 분리 (환자·병원·약국)" },
      { value: "승인제", label: "병원·약국 가입 심사" },
    ],
    diagrams: [
      { key: "flow", label: "아키텍처", component: "medical" },
      { key: "erd", label: "데이터 모델", component: "medicalErd" },
    ],
    tech: [
      {
        name: "역할별 회원 테이블 + 승인 절차",
        desc: "환자·병원·약국이 같은 로그인 화면을 쓰지만 서로 권한이 달라야 하는 문제가 있었습니다. 역할별로 테이블(personal_tbl·hospital_tbl·pharmacy_tbl)을 나누고 로그인 시 세션에 사용자 유형을 저장했고, 병원·약국 계정은 관리자 승인 전까지 로그인이 막히도록 승인 플래그를 넣었습니다.",
      },
      {
        name: "처방전 삭제 기능",
        desc: "처방전을 계속 남겨두고 싶어하지 않는 환자도 있을 거라 생각해서, 요청하면 DB에서 처방전 데이터를 바로 지우는 기능을 별도로 만들었습니다.",
      },
      {
        name: "Kakao Map 병원·약국 찾기",
        desc: "근처 병원·약국을 이름으로 하나하나 찾아야 하는 게 불편해 보여서, Kakao Map의 장소 검색 위젯을 붙여 지도에서 위치와 정보를 바로 확인할 수 있게 했습니다.",
      },
    ],
    link: "https://github.com/BcKmini/Database",
  },
];
