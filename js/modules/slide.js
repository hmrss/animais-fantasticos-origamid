import debounce from './debounce.js';

export class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper);
    this.slide = document.querySelector(slide);
    this.dist = {
      finalPosition: 0,
      finalPositionAux: 0,
      startX: 0,
      movement: 0,
    };
    this.activeClass = 'active';
    this.changeEvent = new Event('changeEvent');
  }

  checkEvent(event, type) {
    return [
      event.type === type,
      event.type === type ? event.clientX : event.changedTouches[0].clientX,
    ];
  }

  transition(active) {
    this.slide.style.transition = active ? 'transform 0.3s' : '';
  }

  moveSlide(distX) {
    // Armazena a posicao final para ser atribuido ao mouseup
    this.dist.finalPositionAux = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(event) {
    const [mousedown, startX] = this.checkEvent(event, 'mousedown');

    if (mousedown) {
      event.preventDefault();
    }

    this.dist.startX = startX;
    // mousemove momento em que o mouse é movido
    this.wrapper.addEventListener(
      mousedown ? 'mousemove' : 'touchmove',
      this.onMove,
    );
    this.transition(false);
  }

  onMove(event) {
    const [_, startX] = this.checkEvent(event, 'mousemove');

    const finalPosition = this.updatePosition(startX);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const [mouseup, _] = this.checkEvent(event, 'mouseup');

    this.wrapper.removeEventListener(
      mouseup ? 'mousemove' : 'touchmove',
      this.onMove,
    );
    this.dist.finalPosition = this.dist.finalPositionAux;
    this.transition(true);
    this.changeSlideOnEnd();
  }

  changeSlideOnEnd() {
    if (this.dist.movement > 0 && this.dist.movement > 120) {
      this.activeNextSlide();
    } else if (this.dist.movement < 0 && this.dist.movement < 120) {
      this.activePrevSlide();
    } else {
      this.changeSlide(this.index.active);
    }
  }

  addSlideEvents() {
    // mousedown momento do click
    this.wrapper.addEventListener('mousedown', this.onStart);
    // mousedown momento ao soltar o botao do click
    this.wrapper.addEventListener('mouseup', this.onEnd);

    this.wrapper.addEventListener('touchstart', this.onStart);
    this.wrapper.addEventListener('touchend', this.onEnd);
  }

  // Slides Config

  // calculo para colocar a imagem no centro da tela
  slidePosition({ offsetWidth, offsetLeft }) {
    // margin = tamanho visivel do wrapper na tela - tamanho da imagem
    const margin = (this.wrapper.offsetWidth - offsetWidth) / 2;
    return (offsetLeft - margin) * -1;
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return { position, element };
    });
  }

  slidesIndexNav(index) {
    const last = this.slideArray.length - 1;

    this.index = {
      prev: index - 1 < 0 ? index : index - 1,
      active: index,
      next: index === last ? index : index + 1,
    };
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position);
    this.slidesIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
    this.changeActiveClass();
    this.wrapper.dispatchEvent(this.changeEvent);
  }

  changeActiveClass() {
    this.slideArray.forEach((item) =>
      item.element.classList.remove(this.activeClass),
    );
    this.slideArray[this.index.active].element.classList.add(this.activeClass);
  }

  activePrevSlide() {
    this.changeSlide(this.index.prev);
  }

  activeNextSlide() {
    this.changeSlide(this.index.next);
  }

  onResize() {
    setTimeout(() => {
      this.slidesConfig();
      this.changeSlide(this.index.active);
    }, 100);
  }

  addResizeEvent() {
    window.addEventListener('resize', this.onResize);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onResize = debounce(this.onResize.bind(this), 250);
    this.activePrevSlide = this.activePrevSlide.bind(this);
    this.activeNextSlide = this.activeNextSlide.bind(this);
  }

  init() {
    this.bindEvents();
    this.transition(true);
    this.addSlideEvents();
    this.slidesConfig();
    this.addResizeEvent();
    this.changeSlide(0);
    return this;
  }
}

export default class SlideNav extends Slide {
  // constructor(wrapper, slide) {
  constructor(...args) {
    super(...args);
    this.bindControlEvents();
  }

  addArrow(prev, next) {
    this.prevElement = document.querySelector(prev);
    this.nextElement = document.querySelector(next);
    this.addArrowEvent();
  }

  addArrowEvent() {
    this.prevElement.addEventListener('click', this.activePrevSlide);
    this.nextElement.addEventListener('click', this.activeNextSlide);
  }

  createControl() {
    const control = document.createElement('ul');
    control.dataset.control = 'slide';
    this.slideArray.forEach((item, index) => {
      control.innerHTML += `<li><a href="#slide${index + 1}">${
        index + 1
      }</a></li>`;
    });
    this.wrapper.appendChild(control);
    return control;
  }

  eventControl(item, index) {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      this.changeSlide(index);
    });
    this.wrapper.addEventListener('changeEvent', this.activeControlItem);
  }

  activeControlItem() {
    this.controlArray.forEach((item) =>
      item.classList.remove(this.activeClass),
    );
    this.controlArray[this.index.active].classList.add(this.activeClass);
  }

  addControl(customControl) {
    this.control =
      document.querySelector(customControl) || this.createControl();
    this.controlArray = [...this.control.children];
    this.activeControlItem();
    this.controlArray.forEach(this.eventControl);
  }

  bindControlEvents() {
    this.eventControl = this.eventControl.bind(this);
    this.activeControlItem = this.activeControlItem.bind(this);
  }
}
