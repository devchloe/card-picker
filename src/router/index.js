import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import BenefitsCalculator from "../views/BenefitsCalculator.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "BenefitsCalculator",
    component: BenefitsCalculator
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
