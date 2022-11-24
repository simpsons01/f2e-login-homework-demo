import { defineStore } from 'pinia'
import http from '../common/http'
import { createHttpErrorModel, errorCode } from "../common/httpError";

const withHandleError = promise => promise.catch(error => Promise.reject(createHttpErrorModel(error)))

export const useUserStore = defineStore('user', {
  state: () => {
    return { 
      isLogin: false,
      account: "",
      id: ""
    }
  },
  actions: {
    updateIsLogin(isLogin) {
      this.isLogin = isLogin
    },
    updateUser(user) {
      this.account = user.account
      this.id = user.id
    },
    getUser() {
      return withHandleError(http.get("/user").then((res) => {
        const {
          data: {
            data: { email: account, id },
          },
        } = res;
        this.updateIsLogin(true)
        this.updateUser({ account, id })
      })).catch(error => {
        if(error.data.statusCode === errorCode.unauthorized) {
          return
        }
        return Promise.reject(error)
      })
    },
    register(account, password) {
      return withHandleError(http.post("/user/signup", {
        email: account,
        password: password,
      }).then((res) => {
        const {
          data: {
            data: { verifyKey, verifyCode },
          },
        } = res;
        return { verifyCode, verifyKey }
      }))
    },
    verify(code, key) {
      return withHandleError(http.patch("/user/verify", {
        verifyCode: code,
        verifyKey: key,
      }))
    },
    login(account, password) {
      return withHandleError(http.post("/user/login", {
          email: account,
          password: password,
        })
        .then((res) => {
          const {
            data: {
              data: { email: account, id },
            },
          } = res;
          this.updateIsLogin(true)
          this.updateUser({ account, id })
        }))
    },
    logout() {
      return withHandleError(http.delete("/user/logout")).then(() => {
        this.updateIsLogin(false)
        this.updateUser({ account: "", id: "" })
      }).catch(error => {
        if(error.data.statusCode === errorCode.unauthorized) {
          this.updateIsLogin(false)
          this.updateUser({ account: "", id: "" })
          return
        }
        return Promise.reject(error)
      })
    },
    resetPassword(email) {
      return withHandleError(http.patch("/user/reset-password", {
        email,
      }).then(res => {
        const {
          data: {
            data: {
              password
            }
          }
        } = res
        return password
      }))
    },
    changePassword(password) {
      return withHandleError(http.patch("/user/change-password", {
        password,
      })).catch(error => {
        if(error.data.statusCode === errorCode.unauthorized) {
          this.updateIsLogin(false)
          this.updateUser({ account: "", id: "" })
        }
        return Promise.reject(error)
      })
    }
  }
})