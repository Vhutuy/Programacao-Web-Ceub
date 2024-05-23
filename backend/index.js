const express = require('express');
const aplicacao = express();

aplicacao.get('/', (req, res) => {
    res.send("Va a poha, poha! GET");
});

aplicacao.post('/', (req, res) => {
    res.send("Va a poha, poha POST")
});


aplicacao.get('/moedas', (req, res) => {
    const moedas = {
        BRL: "real",
        USD: "dolar",
        EUR: "euro"
    }

    res.status(200).json(moedas)
});

aplicacao.post('/moedas', (req, res) => {
    const moedas = {
        BRL: "real",
        USD: "dolar",
        EUR: "euro"
    }

    res.status(200).json(moedas)
});

aplicacao.get('/conversao/:a', (req, res) => {
    let moedas = req.params.a.split("-");

    let moeda1 = moedas[0];
    let moeda2 = moedas[1];

    console.log(moeda1)
    console.log(moeda2)

    const resultado = {
        moedaOrigem: moeda1,
        moedaDestino: moeda2
        //fatorDeConversao: algumaCoisa
    }
});


aplicacao.listen(4000, () => {
    console.log("Escutando porta 4000");
});

