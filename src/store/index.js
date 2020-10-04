import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './Auth';
import { todo } from './Todo';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    todo
  }
});
