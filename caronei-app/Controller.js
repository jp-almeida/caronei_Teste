

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
        'nomeCompleto': request.body.userName,
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

app.get('/login', async(request, response) => {
    const user = await model.Usuario.findByPk(request.body.userMatricula) //acha o registro no banco de dados pela matricula

    if (user == null){ //caso não ache registro com a matricula informada
        response.send(JSON.stringify("Usuário não cadastro. Verifique a matrícula informada"))
    }
    else{
        if (user.senha != request.body.userPassword){
            response.send(JSON.stringify("Senha incorreta"))
        }
        else{
            response.send(JSON.stringify("Login realizado com sucesso"))
        }
            
    }


})


//configurando o servidor
let port = config.backend_port //process.env.PORT || 3000

app.listen(port, (request, response) => {
    console.log("Servidor rodando")
}
)