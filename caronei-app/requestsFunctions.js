import { store } from './store'
import config from './config/config.json'

//gambiarra porque as portas não estavam batendo
const url = config.urlRootNode.replace(config.urlRootNode.split(":")[2], config.backend_port)

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