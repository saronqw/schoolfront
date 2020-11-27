import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
// import createPersistedState from "vuex-persistedstate";
// import * as Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {}
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, payload) {
      state.status = "success";
      state.token = payload.token;
      state.user = payload.user_request;
      // createPersistedState.storage.setItem(
      //   "username",
      //   payload.user_request.username
      // );
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    }
  },
  actions: {
    login({ commit }, user_request) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "/auth/obtain_token/",
          data: user_request,
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.access;
            localStorage.setItem("token", token);
            localStorage.setItem("username", user_request.username);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            commit("auth_success", {
              token,
              user_request
            });
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "/register",
          data: user,
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    }
  },
  modules: {},
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  },
  plugins: [
    // createPersistedState({
    //   getItem: key => Cookies.get(key),
    //   setItem: (key, value) =>
    //     Cookies.set(key, value, { expires: 3, secure: true }),
    //   removeItem: key => Cookies.remove(key)
    // })
  ]
});
