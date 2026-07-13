import { ref, watch } from "vue";

const stored = typeof localStorage !== "undefined" ? localStorage.getItem("locale") : null;
const locale = ref(stored === "en" ? "en" : "ko");

watch(locale, (v) => {
  if (typeof localStorage !== "undefined") localStorage.setItem("locale", v);
  if (typeof document !== "undefined") document.documentElement.setAttribute("lang", v);
});
if (typeof document !== "undefined") document.documentElement.setAttribute("lang", locale.value);

export function useLocale() {
  function toggleLocale() {
    locale.value = locale.value === "ko" ? "en" : "ko";
  }
  function t(ko, en) {
    return locale.value === "en" ? (en ?? ko) : ko;
  }
  return { locale, toggleLocale, t };
}
