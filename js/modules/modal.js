export default function initModal() {
  function returnElementByAttibute(...attributes) {
    return attributes.map((attribute) => document.querySelector(attribute));
  }

  const [botaoAbrir, botaoFechar, containerModal] = returnElementByAttibute(
    '[data-modal="abrir"]',
    '[data-modal="fechar"]',
    '[data-modal="container"]',
  );

  if (botaoAbrir && botaoFechar && containerModal) {
    function toggleModal(event) {
      event.preventDefault();
      containerModal.classList.toggle("ativo");
    }

    function clickOut(event) {
      if (event.target === this) toggleModal(event);
    }

    function addEvent(...elements) {
      elements.forEach(({ element, event, funcCb }) => {
        element.addEventListener(event, funcCb);
      });
    }

    addEvent(
      { element: botaoAbrir, event: "click", funcCb: toggleModal },
      { element: botaoFechar, event: "click", funcCb: toggleModal },
      { element: containerModal, event: "click", funcCb: clickOut },
    );
  }
}
