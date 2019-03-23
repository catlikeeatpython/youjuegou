import Vue from 'vue'
import Vuex from 'vuex'
import KindStore from './kind'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    KindStore
  }
})

export default store
