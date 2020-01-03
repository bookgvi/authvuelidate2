import axios from 'axios'
import Vue from 'vue'

const config = {
  baseURL: 'https://pre.ugoloc.ucann.ru/api'
}

const instance = axios.create(config)

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt')
  if (token) {
    config.headers.common['Authorization'] = `Bearer ${token}`
  }
  return config
}, error => Promise.reject(error))

instance.interceptors.response.use(response => {
  return response
}, error => {
  const response = error.response
  if (response) {
    // eslint-disable-next-line no-console
    switch (response.status) {
      case 401:
      case 403:
        localStorage.removeItem('jwt')
        // location.reload(true)
        break
    }
  }
  return Promise.reject(error.response)
})

Plugin.install = function (Vue) {
  Vue.$http = instance
  window.$http = instance
  
  Object.defineProperties(Vue.prototype, {
    $http: {
      get() {
        return instance
      }
    },
    http: {
      get() {
        return instance
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
