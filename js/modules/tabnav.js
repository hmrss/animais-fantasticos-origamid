export default class TabNav {
  constructor(menu, content) {
    // Menu com as imagens
    this.tabmenu = document.querySelectorAll(menu);
    // Conteudo que sera exibido ao clicar na imagem
    this.tabcontent = document.querySelectorAll(content);
    this.activeClass = 'ativo';
  }

  // Ativa a tab de acordo com o index passado
  activeTab(index) {
    // direction = valor do tipo da animacao para adicionar a class ao css
    const direction = this.tabcontent[index].dataset.anime;
    // remove a class de todas os conteudos
    this.tabcontent.forEach((content) =>
      content.classList.remove(this.activeClass),
    );
    // ativa o conteudo ao index passado
    this.tabcontent[index].classList.add(this.activeClass, direction);
  }

  // Adiciona os eventos de click as imagens
  addEvent() {
    this.tabmenu.forEach((li, i) => {
      li.addEventListener('click', () => this.activeTab(i));
    });
  }

  init() {
    if (this.tabmenu.length && this.tabcontent.length) {
      this.activeTab(0); // ativa a primeira imagem
      this.addEvent();
    }
    return this;
  }
}
