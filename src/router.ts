import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AboutView from "./views/AboutView.vue";
import AccountView from "./views/AccountView.vue";
import QTableViewVue from "./views/QTableView.vue";
import ExamplesView from "./views/ExamplesView.vue";
import GridView from "./views/GridView.vue";
import StartPageView from "./views/StartPageView.vue";
import HelpView from "./views/HelpView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "StartPage",
    component: StartPageView,
  },
  {
    path: "/examples",
    name: "examples",
    component: ExamplesView,
  },
  {
    path: "/account",
    name: "account",
    component: AccountView,
  },
  {
    path: "/qtable",
    name: "qtable",
    component: QTableViewVue,
  },
  {
    path: "/grid",
    name: "grid",
    component: GridView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/qhelp",
    name: "qhelp",
    component: HelpView,
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
