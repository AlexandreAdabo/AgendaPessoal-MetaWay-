import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "homeLogin",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/cadastro",
    name: "cadastro",
    component: () => import("../views/cadastro.vue"),
  },
  {
    path: "/contatos",
    name: "contatos",
    component: () => import("../views/contatos.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/MenuAcessos",
    name: "MenuAcessos",
    component: () => import("../views/MenuAcessos.vue"),
  },
  {
    path: "/pessoas",
    name: "pessoas",
    component: () => import("../views/pessoas.vue"),
  },
  {
    path: "/usuarios",
    name: "usuarios",
    component: () => import("../views/usuarios.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (
    to.name !== "login" &&
    !localStorage.resultLogin &&
    !sessionStorage.resultLogin
  ) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
