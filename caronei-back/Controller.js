//Constantes
const config = require("./config/config.json") //arquivo de configurações
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const model = require("./models")
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
let app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//configurando o servidor
let port = process.env.PORT || config.backend_port //process.env.PORT || 3000

app.listen(port, (request, response) => {
  console.log("Servidor rodando")
})

//criar um usuário
app.post("/create", async (request, response) => {
  //caso não exista um usuário, ele irá criar
  //a variável "user" guarda o modelo criado/encontrado e a "created" indica se foi criado ou não
  let [user, created] = await model.Usuarios.findOrCreate({
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
  console.log(user)
  console.log(created)
  if (created) {
    return response.send(
      JSON.stringify("O usuário foi cadastrado com sucesso!")
    )
  }
  if (user) {
    return response.send(JSON.stringify("Usuário já cadastrado"))
  } else {
    return response.send(
      JSON.stringify("Ocorreu algum problema. Tente novamente")
    )
  }
})

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

//ADICIONAR UM CARRO
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
//CARREGAR CARROS
app.get("/carros/:matricula", async (request, response) => {
  const { matricula } = request.params
  let carros = await model.Carros.findAll({
    where: { matricula: matricula },
    attributes: ["placa", "modelo", "cor"],
  })

  return response.send(JSON.stringify(carros))
})

//RECUPERAR DADOS PUBLICOS DE UM USUARIO
app.get("/dados-publicos/:matricula", async (request, response) => {
  const { matricula } = request.params
  const user = await model.Usuarios.findByPk(matricula)
  if (!user) {
    return response.send(JSON.stringify("Usuário não existe"))
  } else {
    let dadosPublicos = {}
    if (user.emailVisib) {
      dadosPublicos.email = user.email
    }
    if (user.nascimentoVisib) {
      dadosPublicos.birth = user.nascimento
    }
    if (user.generoVisib) {
      dadosPublicos.gender = user.genero
    }
    if (user.telefoneVisib) {
      dadosPublicos.phone = user.telefone
    }

    dadosPublicos.avaliacao = user.avaliacao
    dadosPublicos.experience = user.experiencia
    dadosPublicos.name = user.nomeCompleto
    dadosPublicos.matricula = user.matricula

    return response.end(JSON.stringify(dadosPublicos))
  }
})

//ALTERAR CARRO
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
    where: { matricula: request.body.matricula, placa: request.body.placa },
  })
    .then((result) => response.send(JSON.stringify(true)))
    .catch((err) => response.send(JSON.stringify(false)))
})

//cadastrando uma rota no bd
app.post("/createroute", async (request, response) => {
  //caso não exista um usuário, ele irá criar
  //a variável "user" guarda o modelo criado/encontrado e a "created" indica se foi criado ou não
  let [pedido, created] = await model.Pedidos.findOrCreate({
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

  if (created || pedido) {
    return response.end(JSON.stringify({ id: pedido.id, rota: pedido.rota }))
  } else {
    return response.send(
      JSON.stringify("Ocorreu algum problema. Tente novamente")
    )
  }
})

//MOTORISTA BUSCAR PASSAGEIRO - checa os pedidos de carona e vê se algum dá match com a rota enviada no body
app.post("/matchroute", async (request, response) => {
  let result,
    pedidoEscolhido,
    corrida = null

  const driverRoute = eval(request.body.driverRoute)
  console.log(request.body.recusadas)
  const pedidos = await model.Pedidos.findAll({
    //seleciona todos os pedidos
    attributes: ["id", "matriculaPedido", "rota"],
  })

  pedidos.forEach((pedido) => {
    if (!request.body.recusadas.includes(pedido.matriculaPedido)) {
      //se a matricula do pedido não estiver na lista de recusadas
      let r = eval(pedido.rota) //converte de string para array
      result = result ? result : driverRoute.join().includes(r.join())

      if (result) {
        //se result for verdadeiro
        pedidoEscolhido = pedido //seta o match
      }
    }
  })
  if (result) {
    //se achar um match
    return response.end(
      JSON.stringify({
        response: result,
        pedidoId: pedidoEscolhido.id,
        matriculaPassageiro: pedidoEscolhido.matriculaPedido,
        rota: pedidoEscolhido.rota,
      })
    ) //retorna o ID do pedido que deu match
  }
  //não apagar a rota da tabela de pedidos agora, porque o motorista precisa
  // confirmar o passageiro primeiro. Depois que ele confirmar, a gente remove
  // da tabela de pedido e da tabela de matches e passa para uma tabela de corridas
  return response.end(JSON.stringify({ response: result, pedidos: corrida }))
})

//PASSAGEIRO BUSCAR POR MOTORISTA - vê se na tabela de matches apareceu alguma corrida com o seu ID
app.get("/buscar-motorista/:idRota", async (request, response) => {
  const corrida = await model.CorridasAtivas.findByPk(request.params.idRota)
  console.log(corrida)
  if (corrida) {
    return response.end(JSON.stringify({ response: true, content: corrida }))
  } else {
    return response.send(
      JSON.stringify({ response: false, content: "Não encontrou uma corrida" })
    )
  }
})

// MOTORISTA ACEITAR PASSAGEIRO
app.post("/aceitar-passageiro", async (request, response) => {
  const match = await model.Pedidos.findByPk(request.body.idRota)
  if (!match) {
    return response.end(
      JSON.stringify({ response: false, message: "Corrida não existe" })
    )
  }
  model.Pedidos.destroy({ where: { id: request.body.idRota } })
    .then((a) => {
      console.log("deletou")
      model.CorridasAtivas.create({
        idRota: request.body.idRota,
        matriculaMotorista: request.body.matriculaMotorista,
        matriculaPassageiro: match.matriculaPedido,
        rota: match.rota,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
        .then((corrida) => {
          console.log("criou")
          response.end(
            JSON.stringify({
              response: true,
              content: corrida,
              message: "Passageiro aceito com sucesso",
            })
          )
        })
        .catch((err) => {
          console.log("errou")
          console.log(err)
          response.end(
            JSON.stringify({
              error: err,
              response: false,
              message: "Não foi possível criar a corrida",
            })
          )
        })
    })
    .catch((err) => {
      response.end(
        JSON.stringify({
          error: err,
          response: false,
          message: "Não foi possível aceitar o passageiro",
        })
      )
    })
})

//AVALIAÇÃO - um usuário avalia o outo. Seta a nova média de avaliação
app.post("/avaliar", async (request, response) => {
  const user = await model.Usuarios.findByPk(request.body.matricula)

  model.Usuarios.update(
    {
      numAvaliacoes: user.numAvaliacoes + 1,
      avaliacao:
        (user.avaliacao * user.numAvaliacoes + request.body.avaliacao) /
        (user.numAvaliacoes + 1),
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

app.delete("/deleteroute/", async (request, response) => {
  model.Pedidos.destroy({
    where: {
      id: request.body.id,
    },
  })
    .then((result) => response.send(JSON.stringify(true)))
    .catch((err) => response.send(JSON.stringify(false)))
})

//VERIFICA SE UMA CORRIDA AINDA ESTÁ ATIVA
app.get("/verificar-status/:idRota", async (request, response) => {
  const viagemNaoAtiva = await model.CorridasNaoAtivas.findByPk(
    request.params.idRota
  )

  if (viagemNaoAtiva) {
    return response.end(
      JSON.stringify({ finalizada: viagemNaoAtiva.finalizada, ativa: false })
    )
  }
  return response.end(JSON.stringify({ finalizada: null, ativa: true }))
})

app.post("/acabar-corrida-ativa", async (request, response) => {
  console.log("desativando corrida", request.body.idCorrida)
  const corridaAtiva = await model.CorridasAtivas.findByPk(
    request.body.idCorrida
  )
  console.log(corridaAtiva)

  //setando as mensagens caso ela tenha sido finalizada ou cancelada
  const msg = request.body.finalizada
    ? "Corrida finalizada com sucesso"
    : "Corrida cancelada com sucesso"
  const msg_erro = request.body.finalizada
    ? "Não foi possível finalizar a corrida"
    : "Não foi possível cancelar a corrida"

  if (corridaAtiva) {
    //apaga a corrida da tabela de corridas ativas
    model.CorridasAtivas.destroy({ where: { idRota: request.body.idCorrida } })
      .then((a) => {
        console.log("deletou")
        //adiciona a corrida na tabela de corridas não ativas
        model.CorridasNaoAtivas.create({
          idCorrida: request.body.idCorrida,
          matriculaMotorista: corridaAtiva.matriculaMotorista,
          matriculaPassageiro: corridaAtiva.matriculaPassageiro,
          finalizada: request.body.finalizada,
          rota: corridaAtiva.rota,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
          .then((b) => {
            console.log("criou")
            response.end(JSON.stringify({ response: true, message: msg }))
          })
          .catch((err) => {
            console.log(err)
            response.end(
              JSON.stringify({ error: err, response: false, message: msg_erro })
            )
          })
      })
      .catch((err) => {
        response.end(
          JSON.stringify({ error: err, response: false, message: msg_erro })
        )
      })
  } else {
    return response.send(
      JSON.stringify({ response: false, error: "Corrida não existe" })
    )
  }
})
