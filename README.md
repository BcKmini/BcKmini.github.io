# 김경민 포트폴리오

Vue 3 + Vite로 만든 포트폴리오 사이트. GitHub Actions가 push마다 자동으로 빌드해 GitHub Pages에 배포합니다.

## 로컬에서 개발

```bash
npm install
npm run dev       # 개발 서버
npm run build     # dist/ 로 프로덕션 빌드
npm run preview   # 빌드 결과 로컬 미리보기
```

## 배포

`main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 자동으로 빌드 후 GitHub Pages(`https://bckmini.github.io`)에 배포합니다. 별도 수동 배포 작업은 필요 없습니다.

## 구조

```
src/
  data/         프로젝트·경험·수상·자격증·기술스택 데이터
  components/   화면 구성 요소 (섹션별 .vue)
  composables/  테마, 탭 라우팅, 방문 카운터, 방명록 등 로직
public/assets/  이미지·PDF 등 정적 파일
```

## 내용 수정

- 자기소개: `src/components/HeroSection.vue`
- 프로젝트: `src/data/projects.js` (카드 추가 시 `src/components/diagrams/`에 아키텍처 다이어그램 컴포넌트도 함께 추가)
- 경험·수상·자격증: `src/data/experience.js`, `awards.js`, `certificates.js`
- 기술 스택: `src/data/stack.js`
- 색상·테마: `src/style.css` 상단 `:root` / `[data-theme="dark"]` 변수

## 방명록 설정 (giscus)

배포 후 `BcKmini/BcKmini.github.io` 저장소에서 Settings → Discussions를 켜고, https://giscus.app 에서 발급받은 `repo-id`/`category-id` 값을 `src/composables/useGiscus.js`의 `GISCUS_REPO_ID`, `GISCUS_CATEGORY_ID`에 채워 넣으면 방명록이 활성화됩니다.
