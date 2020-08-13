import Vue from "vue";
import Router from "vue-router";

import NewBeers from "./modules/beers/newBeers";
import Beers from "./modules/beers/beers";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Beers
    },
    {
      path: "/new",
      name: "new",
      component: NewBeers
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
