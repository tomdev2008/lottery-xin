import * as types from './mutation-types'
import storage from 'good-storage'

export const ajaxEnd = function ({commit}, status) {
  commit(types.SET_AJAX_LOADING, status)
}
export const saveUser = function ({commit}, username) {
  commit(types.SAVE_USER, username)
  storage.set('username', username)
  commit('TOGGLE_LOGIN', false)
}
