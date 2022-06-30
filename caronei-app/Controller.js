

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
    // const user = await model.Usuarios.findByPk(request.body.userMatricula) //acha o registro no banco de dados pela matricula
    // if(user){
    //     response.send(JSON.stringify('Usuário já cadastrado'))
    // }
    //falta verificar se o email já foi cadastrado
    // else{
        let reqs = await model.Usuarios.create({
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
    
// }
)

//fazer login
app.post('/login', async(request, response) => {
    const user = await model.Usuarios.findByPk(request.body.userMatricula) //acha o registro no banco de dados pela matricula
    
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

//achar nome do usuário pela matricula
app.get('/username/:matricula', async(request, response) =>{
    const {matricula} = request.params
    const user = await model.Usuarios.findByPk(matricula)
    if (user == null){
        return response.send(JSON.stringify("Anônimo"))
    }
    else{
        return response.send(JSON.stringify(user.nomeCompleto))
    }
    
})
//achar todos os dados de um usuário pela matrícula
app.get('/data/:matricula', async(request, response) =>{
    const {matricula} = request.params
    const user = await model.Usuarios.findByPk(matricula)
    if (user == null){
        return response.send(("Erro"))
    }
    else{
        return response.end(JSON.stringify({
            name: user.nomeCompleto,
            rating: user.avaliacao,
            experience: user.experiencia,
            
            email: user.email,
            emailVisibility: user.emailVisib,
            
            phone: user.numero,
            phoneVisibility: user.telefoneVisib,
            
            gender: user.genero,
            genderVisibility: user.generoVisib,
            
            birth: user.nascimento,
            birthVisibility: user.nascimentoVisib,
            
        }))
    }
    
})

//alterar dados do usuário
app.post('/update', async(request, response) => {
    console.log("chegou", request)
    model.Usuarios.update(
        { 
            email: request.body.email,
            emailVisib: request.body.emailVisibility,
            numero: request.body.number,
            numeroVisib: request.body.phoneVisibility,
            genero: request.body.gender,
            generoVisib: request.body.genderVisibility,
            nascimento: request.body.birth,
            nascimentoVisib: request.body.birthVisibility,
            updatedAt: new Date()
    
    },
        { where: { matricula: request.body.matricula } }
      )
        .then(result =>
            response.send(JSON.stringify("Alterações realizadas com sucesso"))
        )
        .catch(err =>
            response.send(JSON.stringify("Erro ao realizar as alterações"))
        )

})
//oferecer carona
app.get('/oferecer', async(request, response) =>{
    
})

//solicitar carona
app.post('/solicitar', async(request, response) =>{
    console.log("entrou")
    let reqs = await model.Usuarios.create({
        'matricula': request.body.matriculaPedido,
        'nomeDestino': request.body.nomeDestino,
        'nomePartida': request.body.nomePartida,
        'latitudeDestino':request.body.latitudeDestino,
        'longitudeDestino':request.body.longitudeDestino,
        'latitudePartida':request.body.latitudePartida,
        'longitudePartida':request.body.longitudePartida,
        'createdAt': new Date(),
        'updatedAt': new Date(),
    })
    if(reqs){
        response.send(JSON.stringify('Carona solicitada'));
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