import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/token'

const BASE_URL = '/api'

const service = axios.create({
    // baseURL 将自动加在 url`前面，除非 url 是一个绝对 URL。
    // 它可以通过设置一个 baseURL 便于为 axios 实例的方法传递相对 URL
    baseURL: BASE_URL,
    // timeout设置一个请求超时时间，如果请求时间超过了timeout，请求将被中断，单位为毫秒（ms）
    timeout: 100000,
    // headers是被发送的自定义请求头，请求头内容需要根据后端要求去设置，这里我们使用本项目请求头。
    headers: {
        'Accept': 'application/json',
        "Content-Type": "multipart/form-data;",
    }
})

service.interceptors.request.use(
    config => {
      if (store.getters.getToken) {
        config.headers['Authorization'] = getToken()
      }
      return config
    },
    error => {
      // do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    }
  )

export default {
    fileUpload(file) {
        return service.post('/file/upload',file)
    }
}