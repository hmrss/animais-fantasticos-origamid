import initAnimaNumeros from "./anima-numero.js";

export default function initFetchAnimais() {
  const url = "./animaisapi.json";
  async function fetchAnimais(url) {
    try {
      const animaisResponse = await fetch(url);
      const dataAnimais = await animaisResponse.json();
      const numerosGrid = document.querySelector(".numeros-grid");

      dataAnimais.forEach((animal) => {
        const divAnimal = createAnimal(animal);
        numerosGrid.appendChild(divAnimal);
      });
      initAnimaNumeros();
    } catch (e) {
      console.log(Error(e));
    }
  }

  function createAnimal({ specie, total }) {
    const div = document.createElement("div");
    div.classList.add("numero-animal");
    div.innerHTML = `<h3>${specie}</h3><span data-numero>${total}</span>`;
    return div;
  }

  fetchAnimais(url);
}
