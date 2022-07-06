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

export function getCoords(ponto) {
  let coords
  paradas.forEach((parada) => {
    if (parada.ponto == ponto) {
      //coloquei pra retornar um object assim {location: {lat: ..., lng: ...}}
      // só pra que ficasse da mesma forma como é usado no componente Map
      coords = { location: { lat: parada.lat, lng: parada.lng } }
    }
  })
  return coords
}
