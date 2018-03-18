import { get, post } from '../lib/Http'
import {
  PRODUCTS_FETCH_SUCCESS,
  PRODUCTS_FETCH_ERROR,
  CHECK_PRODUCT,
  UNCHECK_PRODUCT,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_ERROR
} from './types'

export const fetchAllProducts = () => {
  return function (dispatch) {
    get('/Product').then(response => {
      dispatch({ type: PRODUCTS_FETCH_SUCCESS, payload: response.data })
    })
      .catch((error) => {
        dispatch({ type: PRODUCTS_FETCH_ERROR, payload: error })
      })
  }
}

export const sendOrder = (order) => {
  return function (dispatch) {
    post('/Order', order).then(response => {
      dispatch({ type: SEND_ORDER_SUCCESS, payload: response.data })
    })
      .catch((error) => {
        dispatch({ type: SEND_ORDER_ERROR, payloard: error })
      })
  }
}

export const check = ( product ) => {
  return {
    type: CHECK_PRODUCT,
    product
  }
}

export const unCheck = ( product ) => {
  return {
    type: UNCHECK_PRODUCT,
    product
  }
}