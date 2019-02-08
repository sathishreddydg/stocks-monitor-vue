import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    watchlists: {},
    URLs: {
      watchlists: '/watchlists/:id'
    }
  },
  mutations: {
    setWatchlists: function (state, watchlists) {
      state.watchlists = watchlists
    }
  },
  actions: {
    initializeStore: function ({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        axios.get(state.URLs.watchlists.replace(':id', id)).then(({ data }) => {
          commit('setWatchlists', data.watchlists)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
})
