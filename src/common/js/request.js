import axios from 'axios';
import {getToken} from '@/common/js/utils/auth';
import Toast from '@/base/toast/index.js';
import store from '@/store/index.js';

const service = axios.create({
  timeout: 3000,
  withCredentials: true, // 是否允许带cookie这些
})

// request interceptor
service.interceptors.request.use(config => {
  if (getToken()) {
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
    setTimeout(() => {
      store.commit('SET_AJAX_LOADING', false)
    }, 500)
    if (response.data.code == 401) {
      Toast(response.data.message)
      store.commit('TOGGLE_LOGIN', true)
      return Promise.reject(response.data.message);
    } else {
      return response;
    }
  },
  error => {
    setTimeout(() => {
      store.commit('SET_AJAX_LOADING', false)
    }, 500)
    //console.log('responseErr:' + error.response, error.response.status, error.response.data)// for debug
    if (error.response) {
      let res = error.response
      switch (res.status) {
        case 401:
          Toast(res.data.message)
          store.commit('TOGGLE_LOGIN', true)
      }
    }
    return Promise.reject(error.response);
  })

export default service
