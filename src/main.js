import Vue from "vue";
import dayjs from "dayjs";
import "dayjs/locale/fr";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import CssVariablePlugin from "./plugin/css-variable.plugin";
import "./registerServiceWorker";
import "./assets/reset.css";

Vue.config.productionTip = false;

const locale = navigator.language.split("-")[0];
dayjs.locale(locale);

Vue.use(CssVariablePlugin, {
  themes: {
    light: {
      primaryColor: "#db0000",
      secondaryColor: "#000000",
      tertiaryColor: "#ffffff",
      primaryAltColor: "#564d4d",
      secondaryAltColor: "#831010",
      textColor: () => "secondaryColor"
    },
    dark: {
      primaryColor: "#000000",
      secondaryColor: "#db0000",
      tertiaryColor: "#ffffff",
      primaryAltColor: "#564d4d",
      secondaryAltColor: "#831010",
      textColor: () => "tertiaryColor"
    }
  },
  defaultTheme: "light",
  querySelector: ":root"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
