function initTabNav() {
  const tabmenu = document.querySelectorAll(".js-tabmenu li");
  const tabcontent = document.querySelectorAll(".js-tabcontent section");

  function activeTab(index) {
    tabcontent.forEach((content) => content.classList.remove("ativo"));
    tabcontent[index].classList.add("ativo");
  }

  tabmenu.forEach((li, i) => {
    li.addEventListener("click", () => activeTab(i));
  });
}

function initAccordion() {
  const accordionList = document.querySelectorAll(".js-accordion dt");

  function activeAccordion() {
    this.classList.toggle("ativo");
    this.nextElementSibling.classList.toggle("ativo");
  }

  accordionList.forEach((item) => {
    item.addEventListener("click", activeAccordion);
  });
}

function initScrollSuave() {
  const linksInternos = document.querySelectorAll('.js-menu a[href^="#"]');

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
  const sections = document.querySelectorAll(".js-scroll");
  const halfView = window.innerHeight * 0.75;

  function animaSroll() {
    sections.forEach((section) => {
      const { top } = section.getBoundingClientRect();
      console.log(section.getBoundingClientRect());
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
