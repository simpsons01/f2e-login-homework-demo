import { createRouter, createWebHistory  } from "vue-router"
import Account from "./page/Account.vue"
import Login from "./page/Login.vue"
import Register from "./page/Register.vue"
import Home from "./page/Home.vue"
import Error404 from "./page/Error404.vue"
import Error500 from "./page/Error500.vue"
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
  },
  {
    path: "/error500",
    name: "error500",
    component: Error500,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: Error404,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes, 
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  try {
    if(!from.name) {
      await wait(0.3)
      await userStore.getUser()
    }
    if(to.meta.authRequired == null) {
      next()
    }else {
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
    }
    EventBus.notify("controlLandingShow", false)
  }catch(error) {
    EventBus.notify("controlLandingShow", false)
    next("error500")
  }
})


export default router