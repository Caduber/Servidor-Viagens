const express = require("express");
const app = express();
const fs = require("fs"); //manuseia os arrquivos
const bodyParser = require ("body-parser")
const pdfdoc = require ('pdfkit'); // escreve o pdf
const pdfparse = require ('pdf-parse');  //transforma o pdf

var historico = "";

app.use(bodyParser.urlencoded({extended: true}))

// Aqui eu chamo o html quando eu acesso a porta padrão do servidor

app.get("/", function(req, res){

    res.sendFile(__dirname + "/");
})

// Ao enviar, como o método é "post" ele redireciona o usuário, mas pega os inputs

app.post("/viagem", function(req,res){

    // Aqui eu envio o usuário para uma página de conclusão do formulário

    res.sendFile(__dirname, + '/Enviado.html');

    // Aqui eu pego os inputs pelo nome que eu os dei no body do html

    var motorista = req.body.mot;
    var paciente = req.body.pac;
    var carro = req.body.car;
    var data = req.body.dat;
    var local = req.body.loc;

    //Aqui eu declaro o pdf depois crio o documento

    const pdf = new pdfdoc();
    const nomeArquivo = 'Viagens.pdf';

        //Aqui eu leio o pdf para que ao receber outro input, não seja sobrescrito 

        var buffer = fs.readFileSync('C:/Codigos/Viagens.pdf');

        //Mas ele vai vir encriptado, então traduzimos ele para string
    
        pdfparse(buffer).then(function(conteudo){
            
            historico = conteudo.text;
            console.log(historico);

                //Aqui eu adiciono conteúdo ao pdf

                pdf.pipe(fs.createWriteStream(nomeArquivo));
                
                pdf
                .fontSize(14)
                .text (historico, 50,70) // apresento o que já foi escrito
                .text('Motorista: '+ motorista + ' Carro: ' + carro + ' Paciente: ' + paciente + ' Local: ' + local + ' Data: ' + data, 50,70); // cadastro novo


                
                pdf.end();

    
        }).catch((err) => {
            console.error("Erro ao ler pdf", err);
        });

    res.redirect("/viagem");
    
})

//Crio a página de envio realizado

app.get("/viagem", (req,res)=>{

    res.sendFile(__dirname + "/Enviado.html");

});
//

// Aqui eu rodo o servidor

app.listen(777, function(req, res){
    console.log("Rodando");
});