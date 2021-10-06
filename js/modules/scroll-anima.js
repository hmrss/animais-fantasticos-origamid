export default class ScrollAnima {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    this.halfView = window.innerHeight * 0.75;
    this.distance = {};

    this.checkDistance = this.checkDistance.bind(this);
  }

  /** Armazena os topos das secoes em relacao ao topo da pagina */
  getDistance() {
    this.distance = [...this.sections].map((_section) => {
      // offsetTop - Distancia da secao ao topo
      const [section, offsetTop] = [
        _section,
        Math.floor(_section.offsetTop - this.halfView),
      ];
      return { section, offsetTop };
    });
  }

  checkDistance() {
    this.distance.forEach(({ section, offsetTop }) => {
      // pageYOffset - Posicao do scroll
      const isSectionVisible = window.pageYOffset > offsetTop;

      section.classList[isSectionVisible ? 'add' : 'remove']('ativo');

      // if (isSectionVisible) {
      //   section.classList.add('ativo');
      // } else if (section.classList.contains('ativo')) {
      //   section.classList.remove('ativo');
      // }
    });
  }

  stop() {
    window.removeEventListener('scroll', this.checkDistance);
    return this;
  }

  activeAll() {
    this.distance.forEach(({ section, offsetTop }) => {
      section.classList.add('ativo');
    });
    return this;
  }

  init() {
    if (this.sections.length) {
      this.getDistance();
      this.checkDistance();
      window.addEventListener('scroll', this.checkDistance);
    }
    return this;
  }
}
