import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import home from './modules/home'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  plugins: debug ? [createLogger(),createPersistedState()] : [createPersistedState()],
  strict: debug,
  modules: {
    home,
  },
})

