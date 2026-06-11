document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -36px",
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const noticeButton = document.querySelector(".notice-toggle");
  const noticePanel = document.querySelector("#notice-panel");

  noticeButton.addEventListener("click", () => {
    const isExpanded = noticeButton.getAttribute("aria-expanded") === "true";

    noticeButton.setAttribute("aria-expanded", String(!isExpanded));
    noticePanel.hidden = isExpanded;
  });
});
