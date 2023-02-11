import { createStore, createLogger } from 'vuex';
import auth from "@/store/modules/auth.module";
import request from "@/store/modules/request.module.js";

const plugins = [];

if (import.meta.env.NODE_ENV === 'development') {
  plugins.push(createLogger());
}

export const store = createStore({
  plugins,
  state() {
    return {
      message: null,
      sidebar: false,
    };
  },
  getters: {
    getMessage(state) {
      return state.message;
    },
  },
  mutations: {
    SET_MESSAGE(state, message) {
      state.message = message;
    },
    CLEAR_MESSAGE(state) {
      state.message = null;
    },
    OPEN_SIDEBAR(state) {
      state.sidebar = true;
    },
    CLOSE_SIDEBAR(state) {
      state.sidebar = false;
    },
  },
  actions: {
    setMessage({ commit }, message) {
      commit('SET_MESSAGE', message);
      setTimeout(() => {
        commit('CLEAR_MESSAGE');
      }, 5000);
    },
  },
  modules: {
    auth,
    request,
  }
});
