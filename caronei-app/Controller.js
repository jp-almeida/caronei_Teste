

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
    // console.log(request.body.emailUser)
    let reqs = await model.User.create({
        'email': request.body.emailUser,
        'password': request.body.passwordUser,
        'createdAt': new Date(),
        'updatedAt': new Date(),
    })
    // return response.json(request.body.emailUser)
})



//configurando o servidor
let port = config.backend_port //process.env.PORT || 3000

app.listen(port, (request, response) => {
    console.log("Servidor rodando")
}
)