
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

let valoresConversao = {
    real: {
        dolar: 0.27,
        euro: 0.18,
        
    },
    dolar: {
        real: 5.03,
        euro: 1.09,
        
    },
    euro: {
        real: 5.47,
        dolar: 0.92,
        
    }
}

function buscaAPI() {
    let url = "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL";
    fetch(url).then(
        function(data){
            console.log(data)
            if (data.status == 200) {
                console.log("Retorno Ok")
                
            }
        }
    ).catch(
        console.log("Errado")
    )

}


function converter() {

    buscaAPI()

    let valor = parseFloat(document.getElementById("valor").value);

    let de = document.getElementById("de").value
    let para = document.getElementById("para").value

   

    let conversao = (valor * valoresConversao[de][para]).toFixed(2);
    
    if (de == para) {
        alert("Ta tirando amigao")
    }
    
    
    if(isNaN(conversao)) {
        alert("Digite um Valor Valido!")
        return
    }

    if(valor <= 0) {
        alert("Tão pobre que nao consegue comprar coisa gratis!")
        return
    }

    
    
    if (para == "real") {
        let espaco = document.getElementById("espaco").innerHTML =  "R$ " +  conversao 
    } 

    if (para == "dolar") {
        let espaco = document.getElementById("espaco").innerHTML =  "US$ "  +  conversao  
    } 

    if (para == "euro") {
        let espaco = document.getElementById("espaco").innerHTML =  "€ " + conversao 
    }
 

    let resultadoConvesao = {
        valor: valor,
        de: de,
        para: para,
        resultado: conversao
    }

    salvarResultadoNoHistorico(resultadoConvesao)

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







