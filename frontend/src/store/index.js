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
      const result = await axios.get('http://localhost:3000/boulderer/all/json')
      commit('SET_BOULDERERS', result.data)
    }
  },
  modules: {
  }
})
