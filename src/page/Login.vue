<script setup>
import { reactive, ref } from "vue";
import FormTextInput from "../components/FormTextInput.vue";
import FormCheckbox from "../components/FormCheckbox.vue";
import Modal from "../components/Modal.vue";

const form = reactive({
  account: "",
  password: "",
});
const isPasswordDisplay = ref(false);
const forgetPasswordModal = reactive({
  show: false,
  form: {
    account: "",
  },
});

const sendPassword = () => {};
</script>

<template>
  <div class="login min-h-[inherit] flex items-center">
    <div
      class="
        wrapper
        w-[960px]
        shadow-custom1
        rounded-xl
        p-10
        mx-auto
        -translate-y-[4rem]
        md:-translate-y-[1rem]
      "
    >
      <div class="flex">
        <div class="flex-auto p-16">
          <h3 class="m-0 text-2xl">登入</h3>
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

          <div class="flex justify-between items-center mt-1 pl-1">
            <form-checkbox
              label="顯示密碼"
              :checked="isPasswordDisplay"
              @change="($event) => (isPasswordDisplay = $event.target.checked)"
            />
            <button
              @click="forgetPasswordModal.show = true"
              class="underline underline-offset-1 cursor-pointer"
            >
              忘記密碼?
            </button>
          </div>
          <div class="mt-6">
            <button class="btn w-full text-white bg-black">登入</button>
          </div>
        </div>
        <div class="divider basis-[1px] bg-gray-300" />
        <div class="flex-auto flex justify-center items-center">
          <router-link to="/register" class="btn bg-black text-white px-16 py-4"
            >加入會員</router-link
          >
        </div>
      </div>
    </div>
  </div>
  <modal
    title="忘記密碼"
    :show="forgetPasswordModal.show"
    :on-close-icon-click="() => (forgetPasswordModal.show = false)"
    :cancel="{
      text: '取消',
      handler: () => (forgetPasswordModal.show = false),
    }"
    :confirm="{
      text: '送出',
      handler: sendPassword,
    }"
  >
    <template v-slot:content>
      <div class="py-8 px-4">
        <form-text-input
          block
          v-model="forgetPasswordModal.form.account"
          :placeholder="'輸入您的帳號'"
        />
      </div>
    </template>
  </modal>
</template>

<style scoped></style>
