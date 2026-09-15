import { ref } from "vue";

const TABS = ["home", "blog", "stats", "resume", "uses"];

function readTab() {
  const t = new URLSearchParams(location.search).get("tab");
  return TABS.includes(t) ? t : "home";
}

const tab = ref(readTab());

export function useTab() {
  function goTo(name) {
    if (!TABS.includes(name)) name = "home";
    tab.value = name;
    history.pushState(null, "", `?tab=${name}`);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function initPopstate() {
    window.addEventListener("popstate", () => {
      tab.value = readTab();
    });
  }

  return { tab, goTo, initPopstate };
}
