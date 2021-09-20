export default function initFetchBitcoin() {}

fetch('https://blockchain.info/ticker')
  .then((response) => response.json())
  .then((bitcoin) => {
    const btcValue = document.querySelector('.btc-preco');
    /* Mil reais em bitcoin */
    btcValue.innerText = (1000 / bitcoin.BRL.buy).toFixed(4);
  })
  .catch((erro) => {
    console.log(Error(erro));
  });
