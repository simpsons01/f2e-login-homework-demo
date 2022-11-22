import { createWebHashHistory, createRouter  } from "vue-router"
import Account from "./page/Account.vue"
import Login from "./page/Login.vue"

const routes = [
  {
    path: "/account",
    name: "account",
    component: Account
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})


export default router