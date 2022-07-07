import { store } from './store'
import config from './config/config.json'

//gambiarra porque as portas não estavam batendo
export const url = config.urlRootNode


export async function searchPassageiro(rotaMotorista) {
  let reqs = await fetch(url + "/matchroute", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      driverRoute: rotaMotorista,
      recusadas: store.getState().ride.recusadas
    }),
  })
  return await reqs.json()
}

export async function updateCar(placaNova, placaAntiga, modelo, cor) {
  let reqs = await fetch(url + "/alterar-carro/", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      matricula: store.getState().auth.matricula,
      cor: cor,
      placaNova: placaNova,
      placaAntiga: placaAntiga,
      modelo: modelo
    }),
  })
  return await reqs.json()

}

export async function getCars() {
  //carrega os carros do banco de dados
  let reqs = await fetch(url + '/carros/' + store.getState().auth.matricula, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return await reqs.json()

}

export async function addCar(placaCarro, modeloCarro, corCarro) {
  let reqs = await fetch(url + '/adicionar-carro/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      matricula: store.getState().auth.matricula,
      placa: placaCarro,
      modelo: modeloCarro,
      cor: corCarro
    })
  })
  return await reqs.json()

}

export async function getUserData() {
  //pega os dados do banco de dados e preenche as variaveis

  let reqs = await fetch(url + '/data/' + store.getState().auth.matricula, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return await reqs.json()
}

export async function getPublicData(matricula) {
  //pega os dados do banco de dados e preenche as variaveis
  let reqs = await fetch(url + '/dados-publicos/' + matricula, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  return await reqs.json()
}

export async function deleteCar(placa) {

  let reqs = await fetch(url + '/deletar-carro/', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      matricula: store.getState().auth.matricula,
      placa: placa,
    })
  })
  return await reqs.json()
}

export async function addRoute(route) {
  let routeString = JSON.stringify(route)
  let rota = routeString.replace(/"/g, "'")


  let reqs = await fetch(url + '/createroute', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      passengerMatricula: store.getState().auth.matricula,
      passengerRoute: rota
    })
  })
  return await reqs.json()
}

export async function rateUser(matricula, rating) {
  let reqs = await fetch(url + '/avaliar', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      matricula: matricula,
      avaliacao: rating
    })
  })
  return await reqs.json()
}

export async function searchDriver(idRoute) {
  let reqs = await fetch(url + '/buscar-motorista/' + idRoute, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  let resp = await reqs.json()
  return resp
}


export async function aceitarPassageiro(idRota) {
  let reqs = await fetch(url + '/aceitar-passageiro', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      idRota: idRota,
      matriculaMotorista: store.getState().auth.matricula
    })
  })
  return await reqs.json()
}

export async function removeRoute(idRoute) {
  let reqs = await fetch(url + '/deleteroute/', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: idRoute,
    })
  })
  return await reqs.json()
}

export async function verificarStatus(idRota){
  let reqs = await fetch(url + '/verificar-status/' + idRota, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  let resp = await reqs.json()
  
  return resp
}

export async function acabarCorrida(idCorrida, finalizada){
  let reqs = await fetch(url + '/acabar-corrida-ativa', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      idCorrida: idCorrida,
      finalizada: finalizada
    })
  })
  let resp = await reqs.json()
  return resp
}

export async function getUsernameData(matricula){
  let resp = await fetch(
    url + "/username/" + matricula,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )

  return await resp.json()
}