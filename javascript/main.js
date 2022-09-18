const Main={
  init:function()
  {
    this.cacheSelectors();
    this.bindEvents();
    this.CarregarOption();
  },
  cacheSelectors:function(){
    this.$campoValor=document.querySelector("#campo");
    this.$calcular=document.querySelector("#calcular");
    this.$resultado=document.querySelector("#resultado");
    this.$select=document.querySelector("#selectKey");
    this.$titulo=document.querySelector("#titulo");
  },
  bindEvents:function()
  {
    const self=this;
    this.$calcular.onclick=self.Events.calcularButton_click.bind(self);
    this.$select.onchange=self.Events.trocarElementoTitulo.bind(self);
  },
  Events:{
    trocarElementoTitulo:function()
    {
<<<<<<< HEAD
=======
      this.$resultado.value='';
>>>>>>> master
      let value=this.$select.value;
      if(value=="")
        value='---'
      this.$titulo.innerHTML=`BRL para ${value}`;
    },
    calcularButton_click:function()
    {
      this.Converter();
    }
  },
  ConverterParaJSON:function(response)
  {
    return response.json();
  },
  CarregarOption:function(){
    fetch('https://api.exchangerate.host/latest')
    .then(this.ConverterParaJSON)
    .then(this.PreencherSelect);
  },
  PreencherSelect:function(json)
  {
    let option='';
    let keys=Object.keys(json.rates);
    keys.forEach(element => {
      option+=
      `
        <option value="${element}">${element}</option>
      `
    });
    Main.$select.innerHTML+=option;
  },
  Converter:function()
  {
    fetch(`https://api.exchangerate.host/convert?from=BRL&to=${this.$select.value}`)
    .then(this.ConverterParaJSON)
    .then(this.ConverterValor);
  },
  ConverterValor:function(json)
  {
    if(Main.$select.value=="")
    {
      Main.$resultado.innerHTML='';
      alert("Selecione a moeda corretamente.");
    }
    else if(!json.success)
    {
      Main.$resultado.innerHTML='';
      alert("Falha na conversão.");
    }
    else
    {
      Main.$resultado.innerHTML='';
      Main.$resultado.innerHTML=`
        R$${(Main.$campoValor.value*json.result).toFixed(2)}
      `
    }
      
  }
}
<<<<<<< HEAD
Main.init();
=======
Main.init();
>>>>>>> master
