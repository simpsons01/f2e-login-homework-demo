<script setup>
import { ref, reactive } from "vue";
import FormTextInput from "../components/FormTextInput.vue";

const nav = {
  account: "account",
  logout: "logout",
};

const activeNav = ref(nav.account);

const isEditPassword = ref(false);

const user = reactive({
  account: "ray.zhu@104.com.tw",
  password: "123qwe",
});

const form = reactive({
  password: "",
});

const onLogoutClick = () => {
  activeNav.value = nav.logout;
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
            :class="[activeNav === nav.logout ? 'text-black' : 'text-gray-300']"
            class="text-md mt-3"
          >
            <button @click="onLogoutClick">登出</button>
          </li>
        </ul>
      </div>
      <div class="flex-auto">
        <div class="p-8 border-solid border-gray-200 border-b">
          <p class="text-xl">個人資料</p>
        </div>
        <div class="p-8">
          <ul>
            <li>
              <div class="flex items-center">
                <div class="mr-4">帳號</div>
                <div>{{ user.account }}</div>
              </div>
            </li>
            <li class="mt-3">
              <div class="flex items-center">
                <div class="mr-4">密碼</div>
                <div class="mr-2" v-if="!isEditPassword">
                  {{ user.password }}
                </div>
                <div v-else>
                  <form-text-input
                    class="mr-2"
                    placeholder="請輸入新密碼"
                    v-model="form.password"
                  />
                </div>
                <button
                  @click="isEditPassword = true"
                  v-if="!isEditPassword"
                  class="btn bg-black px-4 py-1 text-white"
                >
                  修改
                </button>
                <button v-else class="btn px-4 py-2 bg-black text-white">
                  確認更改
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
