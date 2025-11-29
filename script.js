// Coloca o ano atual no rodapé
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Scroll suave para links internos do menu
const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      event.preventDefault();
      const offset = 70; // compensar header fixo
      const topPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: topPosition,
        behavior: "smooth",
      });
    }
  });
});
