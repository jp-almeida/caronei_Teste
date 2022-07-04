import { store } from './store'
import config from './config/config.json'

//gambiarra porque as portas não estavam batendo
export const url = config.urlRootNode.replace(config.urlRootNode.split(":")[2], config.backend_port)

export async function updateCar(placaNova,placaAntiga, modelo, cor) {
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