//Constantes
const config = require("./config/config.json") //arquivo de configurações
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const model = require("./models")

let app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//ROTAS

//criar um usuário
app.post(
  "/create",
  async (request, response) => {
    //caso não exista um usuário, ele irá criar
    //a variável "user" guarda o modelo criado/encontrado e a "created" indica se foi criado ou não
    let user,
      created = await model.Usuarios.findOrCreate({
        where: { matricula: request.body.userMatricula },
        defaults: {
          matricula: request.body.userMatricula,
          nomeCompleto: request.body.userName,
          email: request.body.userEmail,
          senha: request.body.userPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    if (user) {
      return response.send(JSON.stringify("Usuário já cadastrado"))
    }
    if (created) {
      return response.send(
        JSON.stringify("O usuário foi cadastrado com sucesso!")
      )
    } else {
      return response.send(
        JSON.stringify("Ocorreu algum problema. Tente novamente")
      )
    }
  }

  // }
)

//fazer login
app.post("/login", async (request, response) => {
  const user = await model.Usuarios.findByPk(request.body.userMatricula) //acha o registro no banco de dados pela matricula

  let response_data = {
    //resposta do back para o front
    token: null,
    message: null,
  }

  if (user == null) {
    //caso não ache registro com a matricula informada
    response_data.token = false
    response_data.message = "Usuário não cadastrado"
  } else {
    if (user.senha != request.body.userPassword) {
      response_data.token = false
      response_data.message = "Senha incorreta"
    } else {
      response_data.token = user.matricula
      response_data.message = "Logando..."
    }
  }
  return response.end(JSON.stringify(response_data))
})

//achar nome do usuário pela matricula
app.get("/username/:matricula", async (request, response) => {
  const { matricula } = request.params
  const user = await model.Usuarios.findByPk(matricula)
  if (user == null) {
    return response.send(JSON.stringify("Anônimo"))
  } else {
    return response.send(JSON.stringify(user.nomeCompleto))
  }
})
//achar todos os dados de um usuário pela matrícula
app.get("/data/:matricula", async (request, response) => {
  const { matricula } = request.params
  const user = await model.Usuarios.findByPk(matricula)
  if (user == null) {
    return response.send("Erro")
  } else {
    return response.end(
      JSON.stringify({
        name: user.nomeCompleto,
        rating: user.avaliacao,
        experience: user.experiencia,

        email: user.email,
        emailVisibility: user.emailVisib,

        phone: user.telefone,
        phoneVisibility: user.telefoneVisib,

        gender: user.genero,
        genderVisibility: user.generoVisib,

        birth: user.nascimento,
        birthVisibility: user.nascimentoVisib,
      })
    )
  }
})

//alterar dados do usuário
app.post("/update", async (request, response) => {
  model.Usuarios.update(
    {
      nomeCompleto: request.body.name,
      email: request.body.email,
      emailVisib: request.body.emailVisibility,
      telefone: request.body.phone,
      telefoneVisib: request.body.phoneVisibility,
      genero: request.body.gender,
      generoVisib: request.body.genderVisibility,
      nascimento: request.body.birth,
      nascimentoVisib: request.body.birthVisibility,
      updatedAt: new Date(),
    },
    { where: { matricula: request.body.matricula } }
  )
    .then((result) =>
      response.send(JSON.stringify("Alterações realizadas com sucesso"))
    )
    .catch((err) =>
      response.send(JSON.stringify("Erro ao realizar as alterações"))
    )
})

//oferecer carona
app.get(
  "/oferecer/:matricula/:coordOrigem/:coordDestino/:nomeOrigem/:nomeDestino",
  async (request, response) => {
    //recuperar todas as corridas no banco de dados
    let pedidos = await model.Pedidos.findAll({
      attributes: [
        "nomeDestino",
        "nomePartida",
        "latitudePartida",
        "longitudePartida",
        "latitudeDestino",
        "longitudeDestino",
      ],
    }) //retorna um array
  }
)

//solicitar carona
app.post("/solicitar", async (request, response) => {
  let reqs = await model.Pedidos.create({
    matriculaPedido: request.body.matricula,
    nomeDestino: request.body.nomeDestino,
    nomePartida: request.body.nomePartida,
    latitudeDestino: request.body.latitudeDestino,
    longitudeDestino: request.body.longitudeDestino,
    latitudePartida: request.body.latitudePartida,
    longitudePartida: request.body.longitudePartida,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  if (reqs) {
    response.send(JSON.stringify("Carona solicitada"))
  } else {
    response.send(JSON.stringify("Ocorreu algum problema. Tente novamente"))
  }
})

//adicionar um carro
app.post("/adicionar-carro/", async (request, response) => {
  let user,
    created = await model.Carros.findOrCreate({
      where: {
        matricula: request.body.matricula,
        placa: request.body.placa,
      },
      defaults: {
        cor: request.body.cor,
        modelo: request.body.modelo,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
  if (!created) {
    return response.send(JSON.stringify("Carro já cadastrado"))
  }
  if (user && created) {
    return response.send(JSON.stringify("O carro foi cadastrado com sucesso!"))
  } else {
    return response.send(
      JSON.stringify("Ocorreu algum problema. Tente novamente")
    )
  }
})
//carregar todos os carros do banco de dados de acordo com uma matricula
app.get("/carros/:matricula", async (request, response) => {
  const { matricula } = request.params
  let carros = await model.Carros.findAll({
    where: { matricula: matricula },
    attributes: ["placa", "modelo", "cor"],
  })

  return response.send(JSON.stringify(carros))
})

app.get("/dados-publicos/:matricula", async (request, response) => {
  const { matricula } = request.params
  const user = await model.Usuarios.findByPk(matricula)
  if (!user) {
    return response.send(JSON.stringify("Usuário não existe"))
  } else {
    let dadosPublicos = {}
    if(user.emailVisib){
      dadosPublicos.email = user.email
    }
    if(user.nascimentoVisib){
      dadosPublicos.birth = user.nascimento
    }
    if(user.generoVisib){
      dadosPublicos.gender = user.genero
    }
    if(user.telefoneVisib){
      dadosPublicos.phone = user.telefone
    }

    dadosPublicos.avaliacao = user.avaliacao
    dadosPublicos.experience = user.experiencia
    dadosPublicos.name = user.nomeCompleto
    dadosPublicos.matricula = user.matricula

    return response.end(JSON.stringify(dadosPublicos))

  }

})

//alterar carro
app.put("/alterar-carro/", async (request, response) => {
  model.Carros.update(
    {
      placa: request.body.placaNova,
      cor: request.body.cor,
      modelo: request.body.modelo,
      updatedAt: new Date(),
    },
    {
      where: {
        matricula: request.body.matricula,
        placa: request.body.placaAntiga,
      },
    }
  )
    .then((result) => {
      response.send(JSON.stringify(true))
    })
    .catch((err) => response.send(JSON.stringify(false)))
})

app.delete("/deletar-carro/", async (request, response) => {
  model.Carros.destroy({
    where: {matricula: request.body.matricula, placa: request.body.placa}})
  .then((result) => response.send(JSON.stringify(true)))
  .catch((err) => response.send(JSON.stringify(false)))
})




//configurando o servidor
let port = config.backend_port //process.env.PORT || 3000

app.listen(port, (request, response) => {
  console.log("Servidor rodando")
})


//cadastrando uma rota no bd
app.post(
  "/createroute",
  async (request, response) => {
    //caso não exista um usuário, ele irá criar
    //a variável "user" guarda o modelo criado/encontrado e a "created" indica se foi criado ou não
    let user,
      created = await model.Pedidos.findOrCreate({
        where: { 
          matriculaPedido: request.body.passengerMatricula,
          rota: request.body.passengerRoute,
        },
        defaults: {
          matriculaPedido: request.body.passengerMatricula,
          rota: request.body.passengerRoute,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    if (user) {
      return response.send(JSON.stringify("Rota já cadastrada"))
    }
    if (created) {
      return response.send(
        JSON.stringify("A rota foi cadastrada com sucesso!")
      )
    } else {
      return response.send(
        JSON.stringify("Ocorreu algum problema. Tente novamente")
      )
    }
  }
)

// PROBLEEEMAAAAAAA
app.post(
  "/matchroute",
  async (request, response) => {
    const driverRoute = eval(request.body.driverRoute)
    const pedidos = await model.Pedidos.findAll({
      attributes: [
        "id",
        "matriculaPedido",
        "rota"
      ]
    })
    let result
    pedidos.forEach(pedido => {
      let r = eval(pedido.rota)
      result = driverRoute.join().includes(r.join())
      console.log(result)
      console.log(r)
      console.log(driverRoute)
      if (result) {
        return
      }
    });
    if (result) {
      const corrida = await model.Matches.create({
        matriculaMotorista: request.body.driverMatricula,
        matriculaPassageiro: pedido.matriculaPedido,
        idRota: pedido.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    return response.end(JSON.stringify(pedidos))
  }
)

app.post("/avaliar",
  async (request, response) => {
    const user = await model.Usuarios.findByPk(request.body.matricula)

    model.Usuarios.update(
      {
        numAvaliacoes: user.numAvaliacoes+1,
        avaliacao: (user.avaliacao*user.numAvaliacoes + request.body.avaliacao) / (user.numAvaliacoes+1),
      },
      {
        where: {
          matricula: request.body.matricula,
        },
      }
    )
    .then((result) => {
      response.send(JSON.stringify(true))
    })
    .catch((err) => response.send(JSON.stringify(false)))
})
  