import { createWebHashHistory, createRouter  } from "vue-router"
import User from "./page/User.vue"

const routes = [
  {
    path: "/user",
    name: "User",
    component: User
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})


export default router