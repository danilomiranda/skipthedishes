import {
  PRODUCTS_FETCH_SUCCESS,
  PRODUCTS_FETCH_ERROR,
  CHECK_PRODUCT, 
  UNCHECK_PRODUCT,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_ERROR} from '../actions/types'

const INITIAL_STATE = {
  list: [],
  cart: [],
  error: {},
  loading: false,
}

export default function (state = INITIAL_STATE, action) {

  switch (action.type) {
  case PRODUCTS_FETCH_SUCCESS:
    return { ...state, list: action.payload, loading: false }
  case PRODUCTS_FETCH_ERROR:
    return { ...state, error: action.payload, loading: false }
  case SEND_ORDER_SUCCESS:
    return { ...state, orderResp: action.payload, success: true, loading: false }
  case SEND_ORDER_ERROR:
    return { ...state, error: action.payload, loading: false }
  case CHECK_PRODUCT:
    return { ...state, error: {}, cart: state.cart.concat(action.product) }
  case UNCHECK_PRODUCT:
    return { ...state, error: {},
      cart: state.cart.filter((item) => item.id !== action.product.id) }
  default:
    return state
  }
}
