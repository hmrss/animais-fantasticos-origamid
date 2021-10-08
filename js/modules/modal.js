export default class Modal {
  constructor(botaoAbrir, botaoFechar, containerModal) {
    this.botaoAbrir = document.querySelector(botaoAbrir);
    this.botaoFechar = document.querySelector(botaoFechar);
    this.containerModal = document.querySelector(containerModal);
  }

  toggleModal() {
    this.containerModal.classList.toggle('ativo');
  }

  eventToggleModal(event) {
    event.preventDefault();
    this.toggleModal();
  }

  clickOut(event) {
    /**
     * event.target é exatamente onde ocorreu o click. Caso o click ocorra
     * no container do modal (e nao dentro do modal), o mesmo é fechado.
     * */
    if (event.target === this.containerModal) {
      this.toggleModal();
    }
  }

  addModalEvents() {
    /**
     * Opcao 1: Mantendo o this com arrow function
     * Usar arrow function pegando o event e passando para a callback
     * (eventToggleModal) o event, pois o this será a propria class.
     * Caso usar this.botaoAbrir.addEventListener('click', this.eventToggleModal)
     * o this será o <a data-modal="abrir" href="login.html">Login →</a>
     */
    this.botaoAbrir.addEventListener('click', (event) =>
      this.eventToggleModal(event),
    );
    this.botaoFechar.addEventListener('click', (event) =>
      this.eventToggleModal(event),
    );
    this.containerModal.addEventListener('click', (event) =>
      this.clickOut(event),
    );
    /**
     * Opcao 2: Manter o this utilizando o bind no constructor.
     * Dessa maneira pode chamar o callback diretamente sem a necessidade
     * de usar arrow function
     * this.eventToggleModal = this.eventToggleModal.bind(this);
     * this.clickOut = this.clickOut.bind(this);
     * Caso nao adicione o bind, o this sera o objeto
     * <a data-modal="abrir" href="login.html">Login →</a>
     *
     * addModalEvents() {
     *   this.botaoAbrir.addEventListener('click', this.eventToggleModal);
     *   this.botaoFechar.addEventListener('click', this.eventToggleModal);
     *   this.containerModal.addEventListener('click', this.clickOut);
     * }
     */
  }

  init() {
    if (this.botaoAbrir && this.botaoFechar && this.containerModal) {
      this.addModalEvents();
    }
    return this;
  }
}
