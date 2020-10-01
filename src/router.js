import Vue from "vue";
import Router from "vue-router";

import beersPage from "./modules/beers/beersPage";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: beersPage
    }
  ]
});
