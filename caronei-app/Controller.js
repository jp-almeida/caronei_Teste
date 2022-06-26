

//Constantes
const config = require('./config/config.json') //arquivo de configurações
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const model = require('./models')

let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//ROTAS

//criar um usuário
app.post('/create', async(request, response) => {
    //verificar se a matrícula já foi cadastrada
    const user = await model.Usuario.findByPk(request.body.userMatricula) //acha o registro no banco de dados pela matricula
    if(user){
        response.send(JSON.stringify('Usuário já cadastrado'))
    }
    //falta verificar se o email já foi cadastrado
    else{
        let reqs = await model.Usuario.create({
            'matricula': request.body.userMatricula,
            'nomeCompleto': request.body.userName,
            'email': request.body.userEmail,
            'senha': request.body.userPassword,
            'createdAt': new Date(),
            'updatedAt': new Date(),
        })
    
        if(reqs){
            response.send(JSON.stringify('O usuário foi cadastrado com sucesso!'));
        }
        else{
            response.send(JSON.stringify('Ocorreu algum problema. Tente novamente'))
        }
    }
    
})

//fazer login
app.post('/login', async(request, response) => {
    const user = await model.Usuario.findByPk(request.body.userMatricula) //acha o registro no banco de dados pela matricula
    
    let response_data = { //resposta do back para o front
        token: null,
        message: null
    }

    if (user == null){ //caso não ache registro com a matricula informada
        response_data.token = false
        response_data.message = "Usuário não cadastrado"
        
    }
    else{
        if (user.senha != request.body.userPassword){
            response_data.token = false
            response_data.message = "Senha incorreta"
        }
        else{
            response_data.token = user.matricula
            response_data.message = "Logando..."
        }
            
    }
    
    response.end(JSON.stringify(response_data))

})

//oferecer carona
app.get('/oferecer', async(request, response) =>{
    
})

//solicitar carona
app.get('/solicitar', async(request, response) =>{

})


//configurando o servidor
let port = config.backend_port //process.env.PORT || 3000

app.listen(port, (request, response) => {
    console.log("Servidor rodando")
}
)