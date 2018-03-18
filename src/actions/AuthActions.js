import { post } from '../lib/Http'
import { push } from 'react-router-redux'
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  AUTH_USER_SUCCESS,
  AUTH_RESET_FINISH,
  FORGOT_PASSWORD_SUCCESS,
  LOADING,
  CLEAR
} from './types'

export const authError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export const signinUser = ({ email, password }) => {
  return function (dispatch) {

    dispatch({ type: LOADING })
    post(`/Customer/auth?email=${email}&password=${password}`)
      .then(response => {

        dispatch({ type: AUTH_USER })
        console.log(response)

        localStorage.setItem('token', response.data)

        push('/')
      })
      .catch((error) => {
        localStorage.removeItem('token')
        dispatch(authError('email or password incorrect'))
      })
  }
}

export const signoutUser = () => {
  localStorage.removeItem('token')
  return { type: UNAUTH_USER }
}

export const signupUser = ({ email, name, address, password }) => {
  return function (dispatch) {
    dispatch({ type: LOADING })

    const newUser = {
      'email': email,
      'name': name,
      "address": address,
      'creation': new Date(),
      'password': password,
    }
    post('/Customer', newUser)
      .then(() => {

        dispatch({ type: AUTH_USER_SUCCESS })
      })
      .catch((e) => {
        const { data } = e.response

        dispatch(authError(data.error))
      })
  }
}

export const forgotPassword = ({ email }) => {
  return function (dispatch) {
    dispatch({ type: LOADING })
    post('/account/reset_password/init', email)
      .then(() => {
        dispatch({ type: FORGOT_PASSWORD_SUCCESS })
      })
      .catch(() => { dispatch(authError('Email não cadastrado!')) })
  }
}

export const clearState = () => {
  return function (dispatch) {
    dispatch({ type: CLEAR })
  }
}

export const newPassword = ({ key, newPassword }) => {
  return function (dispatch) {
    post('/account/reset_password/finish', { key, newPassword })
      .then(() => {

        dispatch({ type: AUTH_RESET_FINISH })
      })
      .catch(() => {
        dispatch(authError('Can\'t update your password! Please get in touch with the supports'))
      })
  }
}
