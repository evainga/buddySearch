import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    boulderers: []
  },
  mutations: {
    SET_BOULDERERS(state, data){
      state.boulderers = data
    }
  },
  actions: {
    async fetchBoulderers({commit}){
      const result = await axios.get(`${process.env.VUE_APP_API_URL}/boulderer/all/json`)
      commit('SET_BOULDERERS', result.data)
    }
  },
  modules: {
  }
})
