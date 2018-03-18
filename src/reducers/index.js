import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import AuthReducer  from './AuthReducer'
import ProductReducer from './ProductReducer'

const rootReducer = combineReducers({
  form,
  router: routerReducer,
  auth: AuthReducer,
  product: ProductReducer
})

export default rootReducer
