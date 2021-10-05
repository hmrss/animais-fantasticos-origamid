import AnimaNumeros from './anima-numero.js';

export default function initFetchAnimais() {
  const url = './animaisapi.json';

  function createAnimal({ specie, total }) {
    const div = document.createElement('div');
    div.classList.add('numero-animal');
    div.innerHTML = `<h3>${specie}</h3><span data-numero>${total}</span>`;
    return div;
  }

  async function fetchAnimais(_url) {
    try {
      const animaisResponse = await fetch(_url);
      const dataAnimais = await animaisResponse.json();
      const numerosGrid = document.querySelector('.numeros-grid');

      dataAnimais.forEach((animal) => {
        const divAnimal = createAnimal(animal);
        numerosGrid.appendChild(divAnimal);
      });

      const animaNumeros = new AnimaNumeros(
        '[data-numero]',
        '.numeros',
        'ativo',
      );
      animaNumeros.init();
    } catch (e) {
      console.log(Error(e));
    }
  }

  fetchAnimais(url);
}
