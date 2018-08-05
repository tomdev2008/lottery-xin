import axios from 'axios';
import {getToken} from '@/common/js/utils/auth';
import Toast from '@/base/toast/index.js';
import store from '@/store/index.js'

const service = axios.create({
  timeout: 10000,
  withCredentials: true, // 是否允许带cookie这些
})

// request interceptor
service.interceptors.request.use(config => {
  if (getToken()) {
    console.log('getToken()',getToken())
    config.headers.Authorization = getToken();
  }
  return config;
}, error => {
  Toast(error)
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code == 200) {
      return response;
    } else if (res.code == 401) {
      Toast(res.message)
      store.commit('TOGGLE_LOGIN', true)
      return Promise.reject(res.message);
    } else {
      Toast(res.message)
      return Promise.reject(res);
    }
  },
  error => {
    console.log('responseErr' + error)// for debug
    return Promise.reject(error)
  })

export default service
