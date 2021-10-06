export default function fetchBitcoin(url, target, value) {
  fetch(url)
    .then((response) => response.json())
    .then((bitcoin) => {
      const btcValue = document.querySelector(target);
      /* Value em reais */
      btcValue.innerText = (value / bitcoin.BRL.sell).toFixed(4);
    })
    .catch((erro) => {
      console.log(Error(erro));
    });
}
