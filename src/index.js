import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import reduxThunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'

import Routes from './Routes'
import reducers from './reducers'
import { AUTH_USER } from './actions/types'

import 'bootstrap/dist/css/bootstrap.css';

require('moment/locale/pt-br')

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(history)

const store = createStore(
  reducers,
  applyMiddleware(historyMiddleware, reduxThunk)
)

const token = localStorage.getItem('token')

if (token) {
  store.dispatch({ type: AUTH_USER })
  //localStorage.removeItem('token')
}

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */}
        <Routes />
  </Provider>,
  document.getElementById('app')
)
