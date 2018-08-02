import * as types from './mutation-types'

export const ajaxEnd = function ({commit}, status) {
  commit(types.SET_AJAX_LOADING, status)
}
