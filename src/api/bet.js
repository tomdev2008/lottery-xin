import request from 'common/js/request';

export function addBet(previewBetArr) {
  return request.post('/bets/addBet', {
    bet: previewBetArr,
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getBet() {
  return request.get('/bets/all').then((res) => {
    return Promise.resolve(res.data)
  })
}
