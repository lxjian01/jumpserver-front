/**
 * axios请求封装
 */

import axios from 'axios'
import router from '@/router'
import {Message} from 'element-ui'
import Cookies from 'js-cookie'
import store from '@/store'
import {isObject} from "./common";

let requestList = [];
const saveTime = 1000;
/**
 请求超时时间
 */
const service = axios.create({
  baseURL: process.env.API_ROOT, // node环境的不同，对应不同的baseURL
  timeout: 15*1000,
});

/**
 request拦截器
 */
service.interceptors.request.use(
  config => {
    //定义取消请求函数
    let cancel = undefined;
    config.cancelToken = new axios.CancelToken(function executor(c) {
      cancel = c;
    });
    //放置重复请求
    let nowTime = new Date().getTime();
    requestList = requestList.filter((item) => {
      return (item.setTime + saveTime) > nowTime;
    });
    let sessionUrl = requestList.filter((item) => {
      return item.url === config.url;
    });
    if (sessionUrl.length > 0) {
      console.info(config.url + '请求重复 中断请求!');
      cancel(config.url)
      return;
    }
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    let login_token = Cookies.get("login_token");
    if (login_token) {
      config.headers.Authorization = login_token;
    }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);
/**
 response拦截器
 */
service.interceptors.response.use(
  response => {
    store.commit('setNetworkState',true);
    let result=response.data;
    if(result.state){
      return Promise.resolve(result.data);
    }else{
      Message({type:'error',message:result.msg});
      if(result.code === 401){
        setTimeout(() => {
          Cookies.set("return_url",process.env.FRONT_ROOT + '/#' + router.currentRoute.fullPath,{ domain: process.env.COOKIE_DOMAIN });
          window.location.href = process.env.LOGIN_ROOT;
        }, 1000);
      }else if(result.code === 403){
        setTimeout(() => {
          router.push('/403');
        }, 1000);
      }
      return Promise.reject(result.msg);
    }
  },
  error => {
    console.info(error)
    let originalRequest = error.config
    if(error.code === 'ECONNABORTED' && error.message.indexOf('timeout')!==-1 && !originalRequest._retry){
      console.info("请求超时......")
      Message({type:'error',message:"请求超时......"});
      return Promise.reject(error.response);
      // originalRequest._retry = true
      // return axios.request(originalRequest);
    }else if(error.response){
      store.commit('setNetworkState',true);
      let status=error.response.status;
      let result=error.response.data;
      console.info(error.response);
      switch(status){
        case 400:
          Message({type:'error',message:result.msg});
          break;
        case 401:
          Message({type:'error',message:result.msg});
          setTimeout(() => {
            Cookies.set("return_url",process.env.FRONT_ROOT + '/#' + router.currentRoute.fullPath,{ domain: process.env.COOKIE_DOMAIN });
            window.location.href = process.env.LOGIN_ROOT;
          }, 1000);
          break;
        case 403:
          setTimeout(() => {
            router.push('/403');
          }, 1000);
          break;
        case 404:
          setTimeout(() => {
            router.push('/404');
          }, 1000);
          break;
        case 405:
          Message({type:'error',message:"服务器内部错误，请与管理员联系或稍后重试"});
          break;
        case 500:
          Message({type:'error',message:"服务器内部错误，请与管理员联系或稍后重试"});
          break;
        default:
          Message({type:'error',message:"服务器未知错误，请与管理员联系或稍后重试"});
      }
      return Promise.reject(error.response);
    }
    else{
      /// 断网了
      store.commit('setNetworkState',false);
    }
  });
/**
 封装请求方式
 */
class Request{

  constructor(){

  }

  /***
   * 在url后面加上时间参数，防止url缓存
   * @param params
   * @returns {*}
   * @private
   */
  _addTtoParams (params) {
    if(params === null || params ===undefined){
      return {};
    }else{
      if(isObject(params)){
        params.t=(new Date()).getTime()
        return params;
      }else{
        throw 'Params mast be object';
      }
    }
  }

  /***
   * axios config
   */
  _getConfig(){
    let config = {};
    config.baseURL = process.env.API_ROOT;
    return config;
  }

  /***
   * get 请求开启缓存
   * @param url
   * @param params
   */
  getForCache(url, params){
    let config = this._getConfig();
    config["params"] = params;
    return service.get(url, config);
  }

  /***
   * 普通get请求，不缓存
   * @param url
   * @param params
   */
  get(url, params) {
    let config = this._getConfig();
    config["params"] = this._addTtoParams(params);
    return service.get(url, config);
  }
  /**
   * 如果提交带文件，则需要配置
   * config.headers["Content-Type"] = 'multipart/form-data';
   * @param url
   * @param params
   * @returns {AxiosPromise<any>}
   */
  post(url, params) {
    let config = this._getConfig();
    let data = this._addTtoParams(params);
    return service.post(url, data, config);
  }

  /***
   * 修改请求
   * @param url
   * @param params
   * @returns {AxiosPromise<any>}
   */
  put(url, params) {
    let config = this._getConfig();
    let data = this._addTtoParams(params);
    return axios.put(url,data, config);
  }

  /***
   * 删除方法
   * @param url
   * @param params
   * @returns {AxiosPromise}
   */
  delete(url, params) {
    let config = this._getConfig();
    config["params"] = this._addTtoParams(params);
    return service.delete(url, config);
  }

  uploadFilePost(url, params) {
    let config = this._getConfig();
    console.info(config)
    config["Content-Type"] = 'multipart/form-data';
    return axios.post(url, this._addTtoParams(params), config);
  }
}

export const request = new Request();

