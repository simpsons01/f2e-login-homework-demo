<script setup>
import { reactive, ref } from "vue";
import FormTextInput from "../components/FormTextInput.vue";
import FormCheckbox from "../components/FormCheckbox.vue";

const form = reactive({
  account: "",
  password: "",
  confirmPassword: "",
});
const isPasswordDisplay = ref(false);
</script>

<template>
  <div class="register min-h-[inherit] flex items-center">
    <div
      class="
        wrapper
        w-[960px]
        shadow-custom1
        rounded-xl
        p-10
        mx-auto
        -translate-y-[4rem]
      "
    >
      <div class="flex">
        <div class="flex-auto p-16">
          <h3 class="m-0 text-2xl">註冊</h3>
          <div class="mt-6">
            <form-text-input block v-model="form.account" label="帳號" />
          </div>
          <div class="mt-6">
            <form-text-input
              :type="isPasswordDisplay ? 'text' : 'password'"
              block
              v-model="form.password"
              label="密碼"
            />
          </div>
          <div class="mt-6">
            <form-text-input
              :type="isPasswordDisplay ? 'text' : 'password'"
              block
              v-model="form.confirmPassword"
              label="確認密碼"
            />
          </div>
          <div class="mt-6">
            <button class="btn w-full text-white bg-black">送出</button>
          </div>
        </div>
        <div class="divider basis-[1px] bg-gray-300" />
        <div class="flex-auto flex justify-center items-center">
          <router-link to="/login" class="btn bg-black text-white px-16 py-4"
            >登入</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
