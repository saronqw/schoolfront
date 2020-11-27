import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import moment from "moment";

const BASE_URL = "http://85.143.78.10:8000";

moment.locale("ru");

Vue.prototype.axios = axios;
Vue.prototype.moment = moment;

axios.defaults.baseURL = BASE_URL;

Vue.config.productionTip = false;

const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.axios.defaults.headers.common["Authorization"] =
    "Bearer " + token;
}

Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
