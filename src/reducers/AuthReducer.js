import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  AUTH_USER_SUCCESS,
  AUTH_RESET_FINISH,
  LOADING,
  FORGOT_PASSWORD_SUCCESS,
  CLEAR
} from '../actions/types'

const INITIAL_STATE = {
  erro: '',
  loading: false,
  success: false,
  authenticated: false,
  submitted: false
}

export default function (state = INITIAL_STATE, action) {

  switch (action.type) {
  case LOADING:
    return { ...state, loading: true }
  case AUTH_USER:
    return { ...state, error: '', authenticated: true, loading: false }
  case AUTH_USER_SUCCESS:
    return { ...state, error: '', authenticated: false, success: true, loading: false }
  case UNAUTH_USER:    
    return { ...state, authenticated: false }
  case AUTH_ERROR:
    return { ...state, error: action.payload, loading: false }
  case AUTH_RESET_FINISH:
    return { ...state, submitted: true }
  case FORGOT_PASSWORD_SUCCESS:
    return { ...state, success: true, loading: false}
  case CLEAR:
    return { ...state, success: false, loading: false, error: ''}
  default:
    return state
  }
}
