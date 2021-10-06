export default class ScrollAnima {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    this.halfView = window.innerHeight * 0.75;

    this.animaSroll = this.animaSroll.bind(this);
  }

  animaSroll() {
    this.sections.forEach((section) => {
      const { top } = section.getBoundingClientRect();
      const isSectionVisible = top - this.halfView < 0;

      if (isSectionVisible) {
        section.classList.add('ativo');
      } else if (section.classList.contains('ativo')) {
        section.classList.remove('ativo');
      }
    });
  }

  init() {
    this.animaSroll();
    window.addEventListener('scroll', this.animaSroll);
  }
}
