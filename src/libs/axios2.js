import axios from 'axios'
import { Message } from 'view-design'
import config from '@/config'
import {setToken,getToken} from "@/libs/utils"
const baseUrl =process.env.VUE_APP_BASE_URL ? process.env.VUE_APP_BASE_URL : config.publicPath.dev


class HttpRequest {
  constructor () {
    this.baseUrl = baseUrl
    this.timeout=10000
    this.queue = {}
  }
  getInsideConfig () {
    let code = getToken() ? ('Bearer ' + getToken()) : ''
    const config = {
      baseURL: this.baseUrl,
      headers: {
        // 将本地token写到header中
        'Authorization': code
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      return { data, status }
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      console.log(error)
      if (error.request.status === 403) {
        Message.error('登录已过期,请重新登录')
        setTimeout(() => {
          setToken('')
          window.location.href = '/'
        }, 2000)
      }
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default new HttpRequest()

