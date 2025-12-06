
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}


const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      event.preventDefault();
      const offset = 70; 
      const topPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: topPosition,
        behavior: "smooth",
      });
    }
  });
});


(() => {
  const bug = document.getElementById("bug");
  if (!bug) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  let rafId = null;
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  function animate() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    bug.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${currentX * -0.15}deg)`;
    rafId = requestAnimationFrame(animate);
  }

  function onMove(e) {
    const rect = bug.getBoundingClientRect();
    const bugCenterX = rect.left + rect.width / 2;
    const bugCenterY = rect.top + rect.height / 2;

    const dx = e.clientX - bugCenterX;
    const dy = e.clientY - bugCenterY;

    targetX = clamp(-dx * 0.06, -22, 22);
    targetY = clamp(-dy * 0.06, -18, 18);

    if (!rafId) rafId = requestAnimationFrame(animate);
  }

  function onLeave() {
    targetX = 0;
    targetY = 0;

    if (!rafId) rafId = requestAnimationFrame(animate);

    setTimeout(() => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      bug.style.transform = "";
    }, 700);
  }

  bug.addEventListener("mousemove", onMove);
  bug.addEventListener("mouseleave", onLeave);
})();
