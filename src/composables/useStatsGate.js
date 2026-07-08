import { ref } from "vue";

// 원문 비밀번호는 저장하지 않고 salt + SHA-256 해시만 비교
const STATS_HASH = "d0239a7fba0b7a5d3dfce4829f52c8969aa584755f80e65e9d1abe4e40a46524";
const STATS_SALT = "bckmini-stats::";

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function useStatsGate() {
  const authed = ref(sessionStorage.getItem("stats-auth") === STATS_HASH);
  const error = ref(false);

  async function tryPassword(pw) {
    const hash = await sha256Hex(STATS_SALT + pw);
    if (hash === STATS_HASH) {
      sessionStorage.setItem("stats-auth", hash);
      authed.value = true;
      error.value = false;
      return true;
    }
    error.value = true;
    return false;
  }

  return { authed, error, tryPassword };
}
