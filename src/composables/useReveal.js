// v-reveal 커스텀 디렉티브 — 뷰포트에 들어오면 한 번만 fade-up
export const vReveal = {
  mounted(el) {
    if (!("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.08 }
    );
    io.observe(el);
  },
};
