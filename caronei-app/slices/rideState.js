import { createAction, createReducer } from "@reduxjs/toolkit"

const EM_CORRIDA_PASSAGEIRO = "Em corrida - passageiro"
const EM_CORRIDA_MOTORISTA = "Em corrida - motorista"
const CARREGAR_PASSAGEIRO = "Carregando - passageiro"
const CARREGAR_MOTORISTA = "Carregando - motorista"


const INITIAL_STATE = {
  ride: null,
}

export const carregar_passageiro = createAction('CA_PASS')
export const carregar_motorista = createAction('CA_MOT')
export const em_corrida_passageiro = createAction('CO_PASS')
export const em_corrida_motorista = createAction('CO_MOT')
export const cancelar_corrida = createAction('CANCELA')

export default createReducer(
  INITIAL_STATE,
  {
    [carregar_passageiro.type]: (state, action) => ({...state, ride: CARREGAR_PASSAGEIRO}),
    [carregar_motorista.type]: (state, action) => ({...state, ride: CARREGAR_MOTORISTA}),
    [em_corrida_passageiro.type]: (state, action) => ({...state, ride: EM_CORRIDA_PASSAGEIRO}),
    [em_corrida_motorista.type]: (state, action) => ({...state, ride: EM_CORRIDA_MOTORISTA}),
    [cancelar_corrida.type]: (state, action) => ({...state, ride: null})
  }
)