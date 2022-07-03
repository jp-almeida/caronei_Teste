import { store } from './store'
import config from './config/config.json'

//gambiarra porque as portas não estavam batendo
const url = config.urlRootNode.replace(onfig.urlRootNode.split(":")[2], config.backend_port)

export async function updateCar(cor, placa, modelo) {

    let reqs = await fetch(url + "/alterar-carro/", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            matricula: store.getState().auth.matricula,
            cor: cor,
            placa: placa,
            modelo: modelo
        }),
    })
    let resp = await reqs.json()
    if(resp){
        props.editFunction({
            ...props.carro,
            placa: placa,
            modelo: modelo,
            cor: cor,
            isEditing: false,
            changed: true
        })
    }
}