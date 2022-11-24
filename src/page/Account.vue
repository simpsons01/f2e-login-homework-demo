<script setup>
import { ref, reactive, computed, inject } from "vue";
import FormTextInput from "../components/FormTextInput.vue";

import { useVuelidate } from "@vuelidate/core";
import { helpers, minLength, maxLength, required } from "@vuelidate/validators";
import {
  messages as validateMessages,
  getFirstVuelidateErrorMessage,
} from "../common/validate";
import { useUserStore } from "../store/user";
import { wait } from "../common/utils";
import { useRouter } from "vue-router";
import { errorCode } from "../common/httpError";

const router = useRouter();

const userStore = useUserStore();

console.log(userStore);

const loading = inject("loading");

const alert = inject("alert");

const nav = {
  account: "account",
  changePassword: "changePassword",
  logout: "logout",
};

const activeNav = ref(nav.account);

const form = reactive({
  password: "",
});

const v$ = useVuelidate(
  {
    password: {
      required: helpers.withMessage(validateMessages.required, required),
      minMax: helpers.withMessage(validateMessages.between(8, 20), (value) => {
        return (
          minLength(8).$validator(value) && maxLength(20).$validator(value)
        );
      }),
    },
  },
  form
);

const passwordErrorMessage = computed(() =>
  getFirstVuelidateErrorMessage(v$.value.password)
);

const changePassword = async () => {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    try {
      loading.show();
      await wait(0.2);
      await userStore.changePassword(form.password);
      loading.hide();
      alert.open("密碼更改成功！");
    } catch (error) {
      loading.hide();
      if (error.data.statusCode === errorCode.unauthorized) {
        alert.open({
          content: "尚未登入",
          confirm: {
            text: "確定",
            handler: () => {
              alert.close();
              router.push("/login");
            },
          },
        });
      } else {
        alert.open(error.data.message);
      }
    }
  }
};

const onLogoutClick = async () => {
  activeNav.value = nav.logout;
  try {
    loading.show();
    await wait(0.2);
    await userStore.logout();
    loading.hide();
    router.push({ path: "/login" });
  } catch (error) {
    loading.hide();
    alert.open(error.data.message);
  }
};
</script>

<template>
  <div class="account xl:container mx-auto">
    <div class="px-12 py-8 flex">
      <div class="basis-40 pr-4">
        <h3 class="text-gray-600 text-2xl">我的帳戶</h3>
        <ul class="mt-8">
          <li
            :class="[
              activeNav === nav.account ? 'text-black' : 'text-gray-300',
            ]"
            class="text-md"
          >
            <button @click="activeNav = nav.account">個人資料</button>
          </li>
          <li
            :class="[
              activeNav === nav.changePassword ? 'text-black' : 'text-gray-300',
            ]"
            class="text-md mt-3"
          >
            <button @click="activeNav = nav.changePassword">更改密碼</button>
          </li>
          <li
            :class="[activeNav === nav.logout ? 'text-black' : 'text-gray-300']"
            class="text-md mt-3"
          >
            <button @click="onLogoutClick">登出</button>
          </li>
        </ul>
      </div>
      <div class="flex-auto">
        <div v-if="activeNav === nav.account">
          <div class="p-8 border-solid border-gray-200 border-b">
            <p class="text-xl">個人資料</p>
          </div>
          <div class="p-8">
            <ul>
              <li>
                <div class="flex items-center">
                  <div class="mr-4">帳號</div>
                  <div>{{ userStore.account }}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="activeNav === nav.changePassword">
          <div class="p-8 border-solid border-gray-200 border-b">
            <p class="text-xl">更改密碼</p>
          </div>
          <div class="p-8">
            <div class="flex">
              <form-text-input
                placeholder="請輸入新密碼"
                password
                v-model="form.password"
                :error="v$.password.$error"
                :error-text="passwordErrorMessage"
              />
              <div class="pt-2">
                <button
                  class="btn bg-black text-white ml-2 p-2"
                  @click="changePassword"
                >
                  確認修改
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
