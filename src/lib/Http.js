import axios from 'axios'

import { ROOT_URL } from '../actions/urls'

function getHeaders(){
  const token = localStorage.getItem('token')
  const headers = {  
    'Content-Type': 'application/json-patch+json'
  }

  if(token){
    headers['Authorization']= `Bearer ${token}`
  }

  return headers
}

export const get = (url, params) => {
  return axios({
    method: 'get',
    baseURL: `${ROOT_URL}/api/v1/`,
    url: url,
    params: params,
    headers: getHeaders()
  })
}

export const post = (url, params) => {
  return axios({
    method: 'post',
    baseURL: `${ROOT_URL}/api/v1/`,
    url: url,
    data: params,
    headers: getHeaders()
  })
}

export const put = (url, params) => {
  return axios({
    method: 'put',
    baseURL: `${ROOT_URL}/api/v1/`,
    url: url,
    data: params,
    headers: getHeaders()
  })
}

