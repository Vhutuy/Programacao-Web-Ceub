
function inverter() {
    let estatico = document.getElementById("inverterEstatico");
    let gif = document.getElementById("inverterGif");
    
    let de = document.getElementById("de").value
    let para = document.getElementById("para").value


    document.getElementById("de").value = para
    document.getElementById("para").value = de

    estatico.style.display = "none";
    gif.style.display = "flex";
    
    setTimeout(function() {
        estatico.style.display = "flex";
        gif.style.display = "none";
    }, 1000);
}

function apagar() {
    let estatico = document.getElementById("lixoEstatico");
    let gif = document.getElementById("lixoGif");
    
    let valor = document.getElementById("valor").value = "";
    let espaco = document.getElementById("espaco").innerHTML = ""
    
    estatico.style.display = "none";
    gif.style.display = "flex";
    
    setTimeout(function() {
        estatico.style.display = "flex";
        gif.style.display = "none";
    }, 1000);
}


function buscaAPI(de="USD", para="BRL") {
    console.log(de)
    console.log(para)
    let parametro = de + "-" + para
    let url = "https://economia.awesomeapi.com.br/last/" + parametro;

    console.log(url)

    return fetch(url).then(function(data){
            if (data.status == 200) {
             console.log("Retorno Ok!")
            }
            return data.json();
        }
    ).then(function(response){
  
        return response[de+para];
       
    }).catch()
}


function converter() {

    let valor = parseFloat(document.getElementById("valor").value);

    let de = document.getElementById("de").value
    let para = document.getElementById("para").value
    
    if (de == para) {
        alert("Ta tirando amigao")
    }
    


    if(valor <= 0) {
        alert("Tão pobre que nao consegue comprar coisa gratis!")
        return
    }

    if(valor == "") {
        alert("Não")
        return
    }

    buscaAPI(de, para).then(function(response){
        let conversao = valor * response["ask"]
        let simbolo = ""
        if (para = "BRL") {
            simbolo = "R$"
        }
        if (para = "EUR") {
            simbolo = "€"
        }
        if (para = "BRL") {
            simbolo = "US$"
        }

        let resultado = document.getElementById("espaco").innerHTML =simbolo + " " +  conversao.toFixed(2);  

        
        console.log(response["ask"]);
        console.log(conversao)

        let resultadoConvesao = {
            valor: valor,
            de: de,
            para: para,
            resultado: conversao
        }

        salvarResultadoNoHistorico(resultadoConvesao)

    });
}


function salvarResultadoNoHistorico(conversao) {
    let historico = recuperaHistoricodeConversao();
    historico.push(conversao);
    let conversaoEmJson = JSON.stringify(historico);
    localStorage.setItem("historico", conversaoEmJson); 
}

function recuperaHistoricodeConversao() {
    let historico = localStorage.getItem("historico");
    if (!historico) { 
        console.log("O Histórico está vazio!"); 
        return [];
    }
    let historicoConvertido = JSON.parse(historico);
    return historicoConvertido;
}

function salvar() {
    let caixa = document.getElementById("mensagemUser")
    caixa.style.display = "none";
    
    localStorage.setItem("aceitou", "1")
}



document.addEventListener ('keypress', (event) => {
    const keyName = event.key;

    valor.addEventListener("keypress", function(event) {
        if (event.ctrlKey == true) {
            
        }  
    }) 



    if (keyName == "Enter") {
        converter()
      }
    
      if(keyName.ctrlKey == true && keyName == "i") {
        inverter()
      }

  });

  if (localStorage.getItem("aceitou") == "1") {
    let caixa = document.getElementById("mensagemUser")
    caixa.style.display = "none";
  }

  function salvar() {
    let caixa = document.getElementById("mensagemUser")
    caixa.style.display = "none";

    localStorage.setItem("aceitou", "1")
  }







