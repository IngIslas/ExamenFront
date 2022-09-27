import Vue from "vue";
import AxiosPlugin from "vue-axios-cors";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.use(AxiosPlugin);
new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
