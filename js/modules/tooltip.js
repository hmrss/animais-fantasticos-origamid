export default class Tooltip {
  constructor(tooltips) {
    this.tooltips = document.querySelectorAll(tooltips);
    this.tooltipBox;
    //bind quando utilizar como callback
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }
  //Ao mover o mouse,
  onMouseMove({ pageY, pageX }) {
    this.tooltipBox.style.top = `${pageY + 20}px`;
    //caso a tooltipBox ultrapasse a visibilidade da janela do lado direito
    if (pageX + 240 > window.innerWidth) {
      this.tooltipBox.style.left = `${pageX - 180}px`;
    } else {
      this.tooltipBox.style.left = `${pageX + 20}px`;
    }
    //caso a tooltipBox ultrapasse a visibilidade da janela do lado esquerdo
    if (pageX < 180) {
      this.tooltipBox.style.left = `${pageX + 20}px`;
    }
  }
  // Ao tirar o mouse, exclui os eventos de onMouseLeave e onMouseMove
  onMouseLeave({ currentTarget }) {
    this.tooltipBox.remove();

    currentTarget.removeEventListener('mouseleave', this.onMouseLeave);
    currentTarget.removeEventListener('mousemove', this.onMouseMove);
  }
  // Ao passar o mouse, adiciona os eventos de onMouseMove e onMouseLeave
  onMouseOver({ currentTarget }) {
    // Cria a tooltip box e coloca em uma propriedade this.tooltipBox
    this.criarTooltipBox(currentTarget);
    currentTarget.addEventListener('mousemove', this.onMouseMove);
    currentTarget.addEventListener('mouseleave', this.onMouseLeave);
  }
  // Criacaco da tooltip e insere no body
  criarTooltipBox(element) {
    const text = element.getAttribute('aria-label');

    this.tooltipBox = document.createElement('div');
    this.tooltipBox.classList.add('tooltip');
    this.tooltipBox.innerText = text;
    document.body.appendChild(this.tooltipBox);
  }
  // Adiciona os eventos
  addToolTipsEvent() {
    this.tooltips.forEach((item) => {
      item.addEventListener('mouseover', this.onMouseOver);
    });
  }

  init() {
    if (this.tooltips.length) {
      this.addToolTipsEvent();
    }
    return this;
  }
}
