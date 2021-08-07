function initTabNav() {
  const tabmenu = document.querySelectorAll("[data-tab='menu'] li");
  const tabcontent = document.querySelectorAll("[data-tab='content'] section");

  function activeTab(index) {
    tabcontent.forEach((content) => content.classList.remove("ativo"));
    const direction = tabcontent[index].dataset.anime;

    tabcontent[index].classList.add("ativo");
    tabcontent[index].classList.add(direction);
  }

  tabmenu.forEach((li, i) => {
    li.addEventListener("click", () => activeTab(i));
  });
}

function initAccordion() {
  const accordionList = document.querySelectorAll(
    '[data-anime="accordion"] dt',
  );

  function activeAccordion() {
    this.classList.toggle("ativo");
    this.nextElementSibling.classList.toggle("ativo");
  }

  accordionList.forEach((item) => {
    item.addEventListener("click", activeAccordion);
  });
}

function initScrollSuave() {
  const linksInternos = document.querySelectorAll(
    '[data-menu="suave"] a[href^="#"]',
  );

  function scrollToSection(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    const section = document.querySelector(href);
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    //Forma alternativa
    // const topSection = section.offsetTop;
    // window.scrollTo({
    //   top: section.offsetTop,
    //   behavior: "smooth",
    // });
  }

  linksInternos.forEach((link) => {
    link.addEventListener("click", scrollToSection);
  });
}

function initAnimacaoScroll() {
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

initTabNav();
initAccordion();
initScrollSuave();
initAnimacaoScroll();
