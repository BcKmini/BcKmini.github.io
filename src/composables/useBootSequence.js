import { ref } from "vue";

function formatLastLogin(date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dd = String(date.getDate()).padStart(2, " ");
  const hh = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${days[date.getDay()]} ${months[date.getMonth()]} ${dd} ${hh}:${mi}:${ss} ${date.getFullYear()}`;
}

function buildBootLines() {
  return [
    { type: "cmd", text: "ssh kyoungmin@portfolio" },
    { type: "raw", text: `Last login: ${formatLastLogin(new Date())}` },
    { type: "out", text: "Welcome to portfolio-server" },
    { type: "gap" },
    { type: "cmd", text: "systemctl status portfolio.service" },
    { type: "raw", text: "● portfolio.service - Kyoungmin Kim's Portfolio" },
    { type: "raw", text: "     Active: active (running)" },
    { type: "gap" },
    { type: "cmd", text: "ls services/" },
    { type: "raw", text: "noteflow.service  hodong-chatbot.service  cctv-timeline.service" },
    { type: "raw", text: "collection-bird.service  medical-service.service" },
    { type: "gap" },
    { type: "cmd", text: "./boot-ui.sh" },
    { type: "out", text: "Booting portfolio UI…" },
  ];
}

const done = ref(sessionStorage.getItem("boot-seen") === "1");
const skip = ref(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

function finish() {
  done.value = true;
  sessionStorage.setItem("boot-seen", "1");
}

export function useBootSequence() {
  return { BOOT_LINES: buildBootLines(), done, skip, finish };
}
