<script setup>
import { reactive, ref } from "vue";
import FormTextInput from "../components/FormTextInput.vue";
import FormCheckbox from "../components/FormCheckbox.vue";

const form = reactive({
  account: "",
  password: "",
});
const isPasswordDisplay = ref(false);
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
        -translate-y-1/4
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

          <div class="mt-1 pl-1">
            <form-checkbox
              label="顯示密碼"
              :checked="isPasswordDisplay"
              @change="($event) => (isPasswordDisplay = $event.target.checked)"
            />
          </div>
          <div class="mt-6">
            <button class="btn w-full text-white bg-black">登入</button>
          </div>
        </div>
        <div class="divider basis-[1px] bg-gray-300" />
        <div class="flex-auto flex justify-center items-center">
          <button class="btn bg-black text-white px-16 py-4">加入會員</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
