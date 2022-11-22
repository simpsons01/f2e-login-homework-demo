import { createWebHashHistory, createRouter  } from "vue-router"
import Account from "./page/Account.vue"
import Login from "./page/Login.vue"
import Register from "./page/Register.vue"

const routes = [
  {
    path: "/",
    alias: "/account",
    name: "account",
    component: Account
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})


export default router