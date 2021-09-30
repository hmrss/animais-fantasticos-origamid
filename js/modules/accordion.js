export default class Accordion {
  constructor(list) {
    this.accordionList = document.querySelectorAll(list);
    this.activeClass = 'ativo';
  }

  toggleAccordion(item) {
    item.classList.toggle(this.activeClass);
    item.nextElementSibling.classList.toggle(this.activeClass);
  }

  init() {
    if (this.accordionList.length) {
      this.accordionList.forEach((item) => {
        item.addEventListener('click', () => this.toggleAccordion(item));
      });
      this.toggleAccordion(this.accordionList[0]);
    }
    return this;
  }
}
