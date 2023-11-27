const monto = document.querySelector("#valueInput");
const divisaSelect = document.querySelector("#select");
const resultado = document.querySelector("#resultado");
const convert = document.querySelector("#convertir");
const apiURL = "https://mindicador.cl/api";
let grafico = '';

async function getValores() {
  const res = await fetch(apiURL);
  const data = await res.json();
  return data;
}

async function calcular() {
  try {
    const divisa = await getValores();
    const dolar = Number(divisa.dolar.valor);
    const euro = Number(divisa.euro.valor);

    convert.addEventListener("click", () => {
      if (divisaSelect.value == "dolar") {
        let valorDolar = monto.value / dolar;
        resultado.innerHTML = `${valorDolar.toFixed(2)} USD`;
        renderGraficaDolar()

      } else if (divisaSelect.value == "euro") {
        let valorEuro = monto.value / euro;
        resultado.innerHTML = `${valorEuro.toFixed(2)} EUR`;
        renderGraficaEuro()

      } else 
        resultado.innerHTML = "Selecciona una moneda";
        grafico.destroy()
      console.log(dolar, euro);
    });
  } catch (e) {
    console.log(e.message);
  }
}
calcular();

async function getAndCreateDataToChartDolar() {
  let titulo = "Cotización 10 días"
  try {
    const response = await fetch('https://mindicador.cl/api/dolar')
    const series = await response.json()
    const labels = series.serie.map((serie) => serie.fecha.slice(0, 10));
    labels.length = 10;
    const data = series.serie.map((serie) => {
      const valor = serie.valor;
      return Number(valor);
    });
    const datasets = [
      {
        label: titulo,
        borderColor: 'blue',
        data,
      },
    ];
    return { labels, datasets };
  } catch (e) {
    alert(e.message);
  }
}

async function renderGraficaDolar() {
  let tipoGrafica = "line"
  const data = await getAndCreateDataToChartDolar();
  const config = {
    type: tipoGrafica,
    data,

  };
  const myChart = document.getElementById("myChart");
  myChart.style.backgroundColor = "white"
  if (grafico) {
    grafico.destroy();
    grafico = new Chart(myChart, config);
  } else {
    grafico = new Chart(myChart, config);
  }
}

async function getAndCreateDataToChartEuro() {
  let titulo = "Cotización 10 días"
  try {
    const response = await fetch('https://mindicador.cl/api/euro');
    const series = await response.json();
    const labels = series.serie.map((serie) => serie.fecha.slice(0, 10));
    labels.length = 10;
    const data = series.serie.map((serie) => {
      const valor = serie.valor;
      return Number(valor);
    });
    const datasets = [
      {
        label: titulo,
        borderColor: 'red',
        data,
      },
    ];
    return { labels, datasets };
  } catch (e) {
    alert(e.message)
  }
}

async function renderGraficaEuro() {
  let tipoGrafica = "line";
  const data = await getAndCreateDataToChartEuro();
  const config = {
    type: tipoGrafica,
    data,
  };
  const myChart = document.getElementById("myChart");
  myChart.style.backgroundColor = "white";
  if (grafico) {
    grafico.destroy()
    grafico = new Chart(myChart, config);
  } else {
    grafico = new Chart(myChart, config);
  }
}