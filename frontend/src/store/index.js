import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    boulderers: [],
    buddySearches: []
  },
  mutations: {
    SET_BOULDERERS(state, data){
      state.boulderers = data
    },
    SET_BUDDYSEARCHES(state, data){
      state.buddySearches = data
    }
  },
  actions: {
    async fetchBoulderers({commit}){
      const result = await axios.get(`${process.env.VUE_APP_API_URL}/boulderer/all/json`)
      commit('SET_BOULDERERS', result.data)
    },
    async fetchBuddySearches({commit}){
      const result = await axios.get(`${process.env.VUE_APP_API_URL}/buddy-search/all/json`)
      commit('SET_BUDDYSEARCHES', result.data)
    }
  },
  modules: {
  }
})
