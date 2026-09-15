import { ref } from "vue";

// 다른 화면(커맨드 팔레트, 기술 스택 아이콘)에서 프로젝트 섹션에 있는
// 특정 프로젝트를 열거나 하이라이트하도록 요청하기 위한 공용 상태.
// tab/sections와 같은 싱글턴 ref 패턴 — 값이 바뀔 때뿐 아니라, 값이
// 이미 설정된 채로 ProjectsSection이 새로 마운트되는 경우(다른 탭에서
// 넘어온 직후)도 잡아내야 하므로 소비 측에서 watch(..., {immediate:true})로 사용한다.
const focusProjectId = ref(null);
const highlightTech = ref(null);

export function useProjectFocus() {
  function openProject(id) {
    focusProjectId.value = { id, ts: Date.now() };
  }
  function highlightByTech(name) {
    highlightTech.value = { name, ts: Date.now() };
  }
  return { focusProjectId, openProject, highlightTech, highlightByTech };
}
