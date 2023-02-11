import requestAxios from "@/axios/request";
import { store } from "@/store/index.js";

export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  getters: {
    getRequests(state) {
      return state.requests;
    },
  },
  mutations: {
    SET_REQUESTS(state, requests) {
      state.requests = requests;
    },
    ADD_REQUEST(state, request) {
      state.requests.push(request);
    },
  },
  actions: {
    async createRequest({ commit, dispatch }, payload) {
      try {
        const token = store.getters["auth/GET_TOKEN"];
        const {data} = await requestAxios.post(`/requests.json?auth=${token}`, payload);
        commit('ADD_REQUEST', {...payload, id: data.name});
        dispatch('setMessage', {
          value: "Заявка успешно создана",
          type: "primary",
        }, {root: true});
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: "danger",
        }, {root: true});
      }
    },

    async loadData({ commit, dispatch }) {
      try {
        const token = store.getters["auth/GET_TOKEN"];
        const {data} = await requestAxios.get(`/requests.json?auth=${token}`);
        const req = Object.keys(data).map(id => ({...data[id], id}));
        commit('SET_REQUESTS', req);
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: "danger",
        }, {root: true});
      }
    },

    async loadDataById({ commit, dispatch }, id) {
      try {
        const token = store.getters["auth/GET_TOKEN"];
        const {data} = await requestAxios.get(`/requests/${id}.json?auth=${token}`);
        return data;
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: "danger",
        }, {root: true});
      }
    },

    async removeById({ dispatch }, id) {
      try {
        const token = store.getters["auth/GET_TOKEN"];
        await requestAxios.delete(`/requests/${id}.json?auth=${token}`);
        dispatch('setMessage', {
          value: "Заявка удалена",
          type: 'danger',
        }, {root: true});
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: "danger",
        }, {root: true});
      }
    },

    async updateById({ dispatch }, req) {
      try {
        const token = store.getters["auth/GET_TOKEN"];
        await requestAxios.put(`/requests/${req.id}.json?auth=${token}`, req);
        dispatch('setMessage', {
          value: "Заявка обновлена",
          type: 'primary',
        }, {root: true});
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: "danger",
        }, {root: true});
      }
    },

  },
}
