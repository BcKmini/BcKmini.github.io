import { ref } from "vue";

const BOOT_LINES_KO = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "김경민 — Cloud Platform Engineer" },
  { type: "gap" },
  { type: "cmd", text: "systemctl status portfolio.service" },
  { type: "raw", text: "● portfolio.service — AI Native 환경을 지향하는 개발자" },
  { type: "raw", text: "     Active: active (running)" },
  { type: "gap" },
  { type: "cmd", text: "ls services/" },
  { type: "raw", text: "noteflow.service  hodong-chatbot.service  cctv-timeline.service" },
  { type: "raw", text: "collection-bird.service  medical-service.service" },
  { type: "gap" },
  { type: "cmd", text: "./boot-ui.sh" },
  { type: "out", text: "Booting portfolio UI…" },
];

const BOOT_LINES_EN = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "Kyoungmin Kim — Cloud Platform Engineer" },
  { type: "gap" },
  { type: "cmd", text: "systemctl status portfolio.service" },
  { type: "raw", text: "● portfolio.service — a developer aiming for an AI-native workflow" },
  { type: "raw", text: "     Active: active (running)" },
  { type: "gap" },
  { type: "cmd", text: "ls services/" },
  { type: "raw", text: "noteflow.service  hodong-chatbot.service  cctv-timeline.service" },
  { type: "raw", text: "collection-bird.service  medical-service.service" },
  { type: "gap" },
  { type: "cmd", text: "./boot-ui.sh" },
  { type: "out", text: "Booting portfolio UI…" },
];

const done = ref(sessionStorage.getItem("boot-seen") === "1");
const skip = ref(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

function finish() {
  done.value = true;
  sessionStorage.setItem("boot-seen", "1");
}

export function useBootSequence(locale = "ko") {
  return { BOOT_LINES: locale === "en" ? BOOT_LINES_EN : BOOT_LINES_KO, done, skip, finish };
}
