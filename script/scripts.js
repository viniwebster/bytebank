import selecionaCotacao from "./imprimeCotacao.js";
import btnMenu from "./btnMenu.js";

const graficoDolar = document.getElementById('graficoDolar');

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dolar',
        data: [],
        borderWidth: 1
      }]
    },
  });

  /* async function conectaAPI() {
    const conecta = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL')
    const conectaTraduzido = await conecta.json();

    let tempo = geraHorario();
    let valor = conectaTraduzido.USDBRL.ask

    adicionarDados(graficoParaDolar, tempo, valor);
    imprimeCotacao('Dolar', valor)

    console.log(conectaTraduzido);
  } */

/*   setInterval(() => conectaAPI(), 5000) */

function geraHorario() {
    let data = new Date();
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();

    return horario
}

function adicionarDados(grafico, legenda, dados) {
    grafico.data.labels.push(legenda)
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados)
    })
    grafico.update();
}


let workerDolar = new Worker('./script/workers/workerDolar.js');
workerDolar.postMessage('usd');

workerDolar.addEventListener('message', event => {
    let tempo = geraHorario();
    let valor = event.data.ask
    adicionarDados(graficoParaDolar, tempo, valor);
    selecionaCotacao('dolar', valor)
})


// iene
const graficoIene = document.getElementById('graficoIene')
const graficoParaIene = new Chart(graficoIene, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Iene',
        data: [],
        borderWidth: 1
      }]
    },
  });


let workerIene = new Worker('./script/workers/workerIene.js');
workerIene.postMessage('iene');

workerIene.addEventListener('message', event => {
    let tempo = geraHorario();
    let valor = event.data.ask
    adicionarDados(graficoParaIene, tempo, valor);
    selecionaCotacao('iene', valor)
})


// euro
const graficoEuro = document.getElementById('graficoEuro');
const graficoParaEuro = new Chart(graficoEuro, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'euro',
        data: [],
        borderWidth: 1
      }]
    },
  });

let workerEuro = new Worker('./script/workers/workerEuro.js');
workerEuro.postMessage('euro')

workerEuro.addEventListener('message', event => {
    let tempo = geraHorario();
    let valor = event.data.ask
    adicionarDados(graficoParaEuro, tempo, valor);
    selecionaCotacao('euro', valor)
})
