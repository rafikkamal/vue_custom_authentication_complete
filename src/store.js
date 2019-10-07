import Vue from 'vue'
import Vuex from 'vuex'

/* Added separate files for state, mutations, actions */
import state from './vuex_files/state';
import actions from './vuex_files/actions';
import mutations from './vuex_files/mutations';
import getters from './vuex_files/getters';

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})

export default store