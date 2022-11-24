import { createWebHashHistory, createRouter  } from "vue-router"
import Account from "./page/Account.vue"
import Login from "./page/Login.vue"
import Register from "./page/Register.vue"
import Home from "./page/Home.vue"
import { useUserStore } from "./store/user"
import * as EventBus from "./common/eventbus";
import { wait } from './common/utils';

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      authRequired: true
    }
  },
  {
    path: "/account",
    name: "account",
    component: Account,
    meta: {
      authRequired: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      authRequired: false
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      authRequired: false
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, 
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  try {
    if(!from.name) {
      await wait(0.3)
      await userStore.authValid()
    }
    if(to.meta.authRequired) {
      if(userStore.isLogin) {
        await next()
      }else {
        await next("/login")
      }
    }else {
      if(userStore.isLogin) {
        await next("/")
      }else {
        await next()
      }
    }
    EventBus.notify("controlLandingShow", false)
  }catch(error) {
    EventBus.notify("controlLandingShow", false)
  }
})


export default router