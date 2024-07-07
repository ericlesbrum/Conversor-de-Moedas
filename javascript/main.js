const Main = {
  init: function () {
    this.cacheSelectors();
    this.bindEvents();
    this.CarregarOption();
  },
  cacheSelectors: function () {
    this.$campoValor = document.querySelector("#campo");
    this.$calcular = document.querySelector("#calcular");
    this.$resultado = document.querySelector("#resultado");
    this.$select = document.querySelector("#selectKey");
    this.$titulo = document.querySelector("#titulo");
  },
  bindEvents: function () {
    const self = this;
    this.$calcular.onclick = self.Events.calcularButton_click.bind(self);
    this.$select.onchange = self.Events.trocarElementoTitulo.bind(self);
  },
  Events: {
    trocarElementoTitulo: function () {
      this.$resultado.value = '';
      let value = this.$select.value;
      if (value == "")
        value = '---'
      this.$titulo.innerHTML = `BRL para ${value}`;
    },
    calcularButton_click: function () {
      this.Converter();
    }
  },
  ConverterParaJSON: function (response) {
    return response.json();
  },
  CarregarOption: function () {
    fetch('https://open.er-api.com/v6/latest/BRL')
      .then(this.ConverterParaJSON)
      .then(this.PreencherSelect);
  },
  PreencherSelect: function (json) {
    let option = '';
    let keys = Object.keys(json.rates);
    keys.forEach(element => {
      option += `<option value="${element}">${element}</option>`
    });
    Main.$select.innerHTML += option;
  },
  Converter: async function () {
    fetch('https://open.er-api.com/v6/latest/BRL')
      .then(this.ConverterParaJSON)
      .then(this.ConverterValor) 
  },
  ConverterValor: function (json) {
    console.log(json);
    if (Main.$select.value == "") {
      Main.$resultado.innerHTML = '';
      alert("Selecione a moeda corretamente.");
    }
    else if (!json.rates) {
      Main.$resultado.innerHTML = '';
      alert("Falha na conversão.");
    }
    else {
      Main.$resultado.innerHTML = '';
      Main.$resultado.innerHTML = `
        ${Main.$select.value}: ${(Main.$campoValor.value * json.rates[Main.$select.value]).toFixed(2)}
      `
    }
  }
}
Main.init();