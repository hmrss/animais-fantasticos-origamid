export default function initModal() {
  const botaoAbrir = document.querySelector('[data-modal="abrir"]');
  const botaoFechar = document.querySelector('[data-modal="fechar"]');
  const containerModal = document.querySelector('[data-modal="container"]');

  if (botaoAbrir && botaoFechar && containerModal) {
    function toggleModal(event) {
      event.preventDefault();
      containerModal.classList.toggle("ativo");
    }

    function cliqueForaModal(event) {
      if (event.target === this) toggleModal(event);
    }

    function addEvent(...elements) {
      elements.forEach(({ element, evento, func }) => {
        element.addEventListener(evento, func);
      });
    }

    addEvent(
      { element: botaoAbrir, evento: "click", func: toggleModal },
      { element: botaoFechar, evento: "click", func: toggleModal },
      { element: containerModal, evento: "click", func: cliqueForaModal },
    );
  }
}
