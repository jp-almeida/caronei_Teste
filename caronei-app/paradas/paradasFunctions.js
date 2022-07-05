import paradas from "../paradas/paradas.json"

export function getNome(ponto) {
    
    let nome
    paradas.forEach((parada) => {
        if (parada.ponto == ponto) {
          nome = parada.nome
        }
      })

    return nome
}