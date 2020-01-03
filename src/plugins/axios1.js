import axios from 'axios'
import Vue from 'vue'

const config = {}

const instance = axios.create(config)

instance.interceptors.request.use(config => {
  return config
}, error => Promise.reject(error))

instance.interceptors.response.use(response => {
  return response
}, error => Promise.reject(error))

Plugin.install = function (Vue) {
  Vue.$http = instance
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
