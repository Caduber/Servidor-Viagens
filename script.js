const express = require("express");
const app = express();
const fs = require('fs');
const pdfkit = require('pdfkit');
const pdfParse = require('pdf-parse');
const bodyParser = require('body-parser');

var textotraduzido = "";
var caminho = "C:/Codigos/Frota com node/Viagens.pdf";

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/");

})

//Aqui eu crio a rota de entrega do conteúdo, que eu s´´o consigo pegar
//por conta do body parser e seu "req.body"

app.post("/", function(req,res){
    var motorista = req.body.mot;
    var paciente = req.body.pac;
    var local = req.body.loc;
    var carro = req.body.car;
    var data = req.body.dat;

    var cadastro = (data + "\nMotorista: " + motorista + '\nCarro: ' + carro + '\nPaciente: '+ paciente + '\nDestino: '+ local + "\n\n");

    // Aqui verifico se o arquivo já existe
if (fs.existsSync(caminho)) {
    // Se o arquivo já existe leio o que está escrito
    var conteudoExistente = fs.readFileSync(caminho);

    //Traduzo o que está escrito

    pdfParse(conteudoExistente).then(function(conteudo){

        textotraduzido = conteudo.text;



//Correção de bug: esta parte do codigo teve que ficar aqui dentro para
// que o "textotraduzido" pudesse ser usado corretamente

    // Cria um novo documento PDF e mantém o conteúdo existente
    const doc = new pdfkit();
    doc.pipe(fs.createWriteStream(caminho));

    // Adiciona o conteúdo existente ao novo PDF
    doc.text(textotraduzido);
    // Adiciona o novo conteúdo
    doc.text(cadastro);
    // Finaliza o PDF
    doc.end();

    console.log('Conteudo adicionado com sucesso');

    })

    .catch  (err=>{
        console.error('Erro: ', err);
    })




//Caso não exista

} else {
    // Se o arquivo não existe, cria um novo PDF com o conteúdo especificado
    const doc = new pdfkit();
    doc.pipe(fs.createWriteStream(caminho));
    doc.text(cadastro);
    doc.end();
}

    res.redirect()

})

// Porta do Servidor

app.listen(777, function(req,res){
    console.log("Rodando");
})
