import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    nickname: localStorage.getItem("nickname")
  },
  getters: {

    getNickName: state => {
      return state.nickname
    }

  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token=token
      localStorage.setItem("token",token)
    },

    SET_NICKNAME: (state,nickname) =>{
      state.nickname=nickname
      localStorage.setItem("nickname",nickname)
    },

    REMOVE_INFO: (state) => {
      state.token=""
      state.nickname=""
      localStorage.removeItem("token")
      localStorage.removeItem("nickname")
    }

  },
  actions: {
  },
  modules: {
  }
})
