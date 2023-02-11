import axios from "axios";
import { error } from "@/utils/error";

// кастыльный вариант. Потом перенести в ".env"
const VUE_APP_FB_KEY = "AIzaSyC1zjmls3n60I2qFH9dwn44uxfeaulxG5U";
const TOKEN_KEY = 'jwt-token';

export default {
    // название actions локальными
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY),
        };
    },
    getters: {
        GET_TOKEN(state) {
            return state.token;
        },
        isAuthenticated(stata) {
          return !!stata.token;
        },
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            localStorage.setItem(TOKEN_KEY, token);
        },
        LOGOUT(state) {
            state.token = null;
            localStorage.removeItem('jwt-token');
        },
    },
    actions: {
        async login({ commit, dispatch }, payload) {
            try {
                // const endPoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VUE_APP_FB_KEY}`;
                const endPoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${VUE_APP_FB_KEY}`;
                const {data} = await axios.post(endPoint, {...payload, returnSecureToken: true});
                commit('SET_TOKEN', data.idToken);
                commit('CLEAR_MESSAGE', null, {root: true})
                // console.log(payload, import.meta.env.VUE_APP_FB_KEY);
                // console.log(payload, VUE_APP_FB_KEY);
            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger',
                }, { root: true });
                throw new Error();
            }
        },

    }
};
