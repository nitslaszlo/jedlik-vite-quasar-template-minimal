import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AboutView from "./views/AboutView.vue";
import AccountView from "./views/AccountView.vue";
import QTableViewVue from "./views/QTableView.vue";
import ExamplesView from "./views/ExamplesView.vue";
import GridView from "./views/GridView.vue";
import StartPageView from "./views/StartPageView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "StartPage",
    component: StartPageView,
  },
  {
    path: "/examples",
    name: "Examples",
    component: ExamplesView,
  },
  {
    path: "/account",
    name: "Account",
    component: AccountView,
  },
  {
    path: "/qtable",
    name: "q-table",
    component: QTableViewVue,
  },
  {
    path: "/grid",
    name: "Grid",
    component: GridView,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});
export default router;
