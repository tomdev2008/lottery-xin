import request from 'common/js/request';

export function addBet(previewBetArr) {
  return request.post('/bets/addBet', {
    bet: previewBetArr,
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function delBet(id) {
  return request.post('/bets/delBet', {
    id
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getBet() {
  return request.get('/bets/all').then((res) => {
    return Promise.resolve(res.data)
  })
}

export function searchBet(params) {
  return request.get('/bets/searchBet', {
    params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getBetById() {
  return request.get('/bets/all').then((res) => {
    return Promise.resolve(res.data)
  })
}
