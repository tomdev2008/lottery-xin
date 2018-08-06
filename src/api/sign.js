import request from 'common/js/request';

export function signIn(loginForm) {
  return request.post('/users/login', {
    loginForm,
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function signUp(regForm) {
  return request.post('/users/reg', {
    regForm,
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function checkLogin() {
  return request.get('/users/check').then((res) => {
    return Promise.resolve(res.data)
  })
}
