import request from 'common/js/request';

export function getSimLottery(id) {
  return request.get('/game/similarType', {
    params: {
      type:id
    },
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
