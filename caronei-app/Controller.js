

//Constantes
const config = require('./config/config.json')
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const model = require('./models')

let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//ROTAS

//criar um usuário
app.post('/create', async(request, response) => {

    let reqs = await model.Usuario.create({
        'matricula': request.body.userMatricula,
        'nome': request.body.userName,
        'email': request.body.userEmail,
        'senha': request.body.passwordUser,
        'createdAt': new Date(),
        'updatedAt': new Date(),
    })

    if(reqs){
        response.send(JSON.stringify('O usuário foi cadastrado com sucesso!'));
    }
    else{
        response.send(JSON.stringify('Ocorreu algum problema. Tente novamente'))
    }
})



//configurando o servidor
let port = config.backend_port //process.env.PORT || 3000

app.listen(port, (request, response) => {
    console.log("Servidor rodando")
}
)