export default function initAnimacaoScroll() {
  const sections = document.querySelectorAll("[data-anime='scroll']");
  const halfView = window.innerHeight * 0.75;

  function animaSroll() {
    sections.forEach((section) => {
      const { top } = section.getBoundingClientRect();
      const isSectionVisible = top - halfView < 0;

      if (isSectionVisible) section.classList.add("ativo");
    });
  }

  animaSroll();

  window.addEventListener("scroll", animaSroll);
}
