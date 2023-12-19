const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require ("body-parser")

app.use(bodyParser.urlencoded({extended: true}))

// Aqui eu chamo o html quando eu acesso a porta padrão do servidor

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");
})

// Ao enviar, como o método é "post" ele redireciona o usuário, mas pega os inputs

app.post("/viagem", function(req,res){

    // Aqui eu envio o usuário para uma página de conclusão do formulário

    //res.sendFile(__dirname + "/viagens.html");

    res.sendFile("C:/Codigos/Viagens.txt");

    // Aqui eu pego os inputs pelo nome que eu os dei no body do html

    const motorista = req.body.mot;
    const paciente = req.body.pac;
    const carro = req.body.car

    //Aqui eu crio o texto que vou armazenar para o arquivo viagens

    const viagem = "Motorista: " + motorista + " Paciente: " + paciente + " Carro: " + carro + "\n";

    //Aqui eu crio e adiciono conteudo ao arquivo texto da viagem
 try{
    fs.writeFileSync("Viagens.txt", viagem, {flag: 'a+'});
            console.log("Viagem Adicionada");
            viagem = "01";
            }
            catch (err) {
                console.log("Erro: " + err);
            };

    // Aqui eu mostro no console do servidor para garantir que está rodando

    console.log("Motorista, Paciente, Carro: " + motorista, paciente, carro);
})

// Aqui eu rodo o servidor

app.listen(777, function(req, res){
    console.log("Rodando");
});