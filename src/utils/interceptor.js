import axios from 'axios'
import { getToken } from './auth'
// 创建一个axios实例
const instance = axios.create({
  // baseURL: 'https://some-domain.com/api/',
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000
  // headers: { 'X-Custom-Header': 'foobar' }
})
// 拦截器  在请求或响应被 then 或 catch 处理前拦截它们

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log(config, '请求信息')
  if (getToken()) {
    config.headers.token = sessionStorage.getItem('token') // 添加请求头
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log(response, '响应信息')
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
