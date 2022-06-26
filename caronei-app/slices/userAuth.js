import { createAction, createReducer } from "@reduxjs/toolkit"

const INITIAL_STATE = {
  matricula: null,
}

export const loginAuth = createAction('LOGIN')
export const logoutAuth = createAction('LOGOUT')

export default createReducer(
  INITIAL_STATE,
  {
    [loginAuth.type]: (state, action) => ({...state, matricula: action.payload}),
    [logoutAuth.type]: (state, action) => ({...state, matricula: null})
  }
)