import axios from "axios";
import store from "@/store";
import config from '@/config'

const baseUrl =process.env.VUE_APP_BASE_URL ? process.env.VUE_APP_BASE_URL : config.baseUrl.dev

class newAxios {
  constructor(){
    this.baseURL = baseUrl;
    this.timeout = 300; //设置超时
    // this.withCredentials = true; //允许携带凭证
  }
  // 设置拦截器
  setInterceptors = (instance, url) => {
    //拦截请求
    instance.interceptors.request.use(config => {
      //loading
      //token
      config.headers["Authorization"] = window.localStorage.getItem("PimToken")
        ? window.localStorage.getItem("PimToken")
        : "";
        return config
    },err => Promise.reject(err));

    //拦截响应
    instance.interceptors.response.use(response =>{
     return response
    },err => {
      if(err.response){
        switch(err.response.status){
          case '403':
            break;
          default:
            break;
        }
        return Promise.reject(err.response)
      }
      if(!window.navigator.online){
        return -1
      }
      return Promise.reject(err)
    }) 


  };

  request(options){
    // 每次请求都会创建新的axios实例。
    const instance = axios.create()
    const config ={
      /**
       * 将用户传过来的参数与公共配置合并
       */
      ...options,
      baseURL:this.baseURL,
      timeout: this.timeout,
      withCredentials: this.withCredentials
    }
    // 配置拦截器，支持根据不同url配置不同的拦截器。
    this.setInterceptors(instance,options.url)
    return instance(config)
  }
}

export default new newAxios();
