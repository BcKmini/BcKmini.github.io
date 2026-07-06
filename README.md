# 김경민 포트폴리오

순수 HTML/CSS/JS로 만든 정적 포트폴리오 사이트. 빌드 과정 없이 GitHub Pages에 바로 배포됩니다.

## 로컬에서 보기

`index.html`을 브라우저로 열면 됩니다.

## GitHub Pages 배포

기존 `BcKmini.github.io` 레포에 이 폴더 내용을 푸시하면 `https://bckmini.github.io`에서 바로 서비스됩니다.

```bash
git clone https://github.com/BcKmini/BcKmini.github.io.git
# 이 폴더의 index.html, css/, js/, README.md 를 레포로 복사 후
git add .
git commit -m "Replace portfolio site"
git push
```

## 내용 수정

- 자기소개·타임라인: `index.html`의 `tab-home` 섹션
- 프로젝트 카드: `index.html`의 `tab-portfolio` 섹션 (카드 하나 복사해서 추가)
- 색상·테마: `css/style.css` 상단의 CSS 변수
