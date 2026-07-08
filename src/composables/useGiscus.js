import { watch } from "vue";
import { useTheme } from "./useTheme";

// 배포 후 https://giscus.app 에서 BcKmini/BcKmini.github.io 저장소로 발급받은
// data-repo-id / data-category-id 값으로 아래 두 줄을 교체해야 방명록이 동작합니다.
const GISCUS_REPO_ID = "REPLACE_WITH_REPO_ID";
const GISCUS_CATEGORY_ID = "REPLACE_WITH_CATEGORY_ID";

let loaded = false;

export function useGiscus() {
  const { isDark } = useTheme();

  function load(mountEl) {
    if (loaded) return;
    loaded = true;

    if (GISCUS_REPO_ID.startsWith("REPLACE")) {
      mountEl.innerHTML = `<p class="status-text">방명록 설정이 아직 완료되지 않았습니다.</p>`;
      return;
    }

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", "BcKmini/BcKmini.github.io");
    script.setAttribute("data-repo-id", GISCUS_REPO_ID);
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", GISCUS_CATEGORY_ID);
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", "portfolio-guestbook");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", isDark.value ? "dark_dimmed" : "light");
    script.setAttribute("data-lang", "ko");
    mountEl.appendChild(script);

    watch(isDark, (dark) => {
      const iframe = document.querySelector("iframe.giscus-frame");
      if (!iframe) return;
      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme: dark ? "dark_dimmed" : "light" } } },
        "https://giscus.app"
      );
    });
  }

  return { load };
}
