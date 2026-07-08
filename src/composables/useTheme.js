import { ref, watchEffect } from "vue";

const isDark = ref(false);

export function useTheme() {
  function init() {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    isDark.value = saved === "dark" || (!saved && prefersDark);
  }

  watchEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark.value ? "dark" : "light");
  });

  function toggle() {
    isDark.value = !isDark.value;
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
  }

  return { isDark, init, toggle };
}
