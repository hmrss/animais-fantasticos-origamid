export default class ScrollSuave {
  constructor(links, options) {
    this.linksInternos = document.querySelectorAll(links);
    if (this.options === undefined) {
      this.options = { behavior: 'smooth', block: 'start' };
    } else {
      this.options = options;
    }

    this.scrollToSection = this.scrollToSection.bind(this);
  }

  scrollToSection(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    const section = document.querySelector(href);
    section.scrollIntoView(this.options);

    /* Forma alternativa
     *  const topSection = section.offsetTop;
     *    window.scrollTo({
     *    top: section.offsetTop,
     *    behavior: "smooth",
     *  });
     */
  }

  addLinkEvent() {
    this.linksInternos.forEach((link) => {
      /* O this abaixo em this.scrollToSection refere-se ao link e não ao
       * objeto ScrollSuave. Por isso é colocado no constructor o
       * this.scrollToSection = this.scrollToSection.bind(this).
       */
      link.addEventListener('click', this.scrollToSection);
    });
  }

  init() {
    if (this.linksInternos.length) {
      this.addLinkEvent();
    }
    return this;
  }
}
