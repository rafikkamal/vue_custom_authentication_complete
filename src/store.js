import Vue from 'vue'
import Vuex from 'vuex'

/* Added separate files for state, mutations, actions */
import state from './vuex_files/state'
import getters from './vuex_files/getters'
import actions from './vuex_files/actions'
import mutations from './vuex_files/mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store