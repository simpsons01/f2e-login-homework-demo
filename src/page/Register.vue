<script setup>
import { reactive, ref, computed } from "vue";
import FormTextInput from "../components/FormTextInput.vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  helpers,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import {
  messages as validateMessages,
  getFirstVuelidateErrorMessage,
} from "../common/validate";

const form = reactive({
  account: "",
  password: "",
  confirmPassword: "",
});
const isPasswordDisplay = ref(false);

const v$ = useVuelidate(
  {
    account: {
      required: helpers.withMessage(validateMessages.required, required),
      email: helpers.withMessage(validateMessages.email, email),
    },
    password: {
      required: helpers.withMessage(validateMessages.required, required),
      minMax: helpers.withMessage(validateMessages.between(8, 20), (value) => {
        return (
          minLength(8).$validator(value) && maxLength(20).$validator(value)
        );
      }),
    },
    confirmPassword: {
      required: helpers.withMessage(validateMessages.required, required),
      match: helpers.withMessage(validateMessages.confirmPassword, (value) => {
        return value === form.password;
      }),
    },
  },
  form
);

const accountErrorMessage = computed(() =>
  getFirstVuelidateErrorMessage(v$.value.account)
);

const passwordErrorMessage = computed(() =>
  getFirstVuelidateErrorMessage(v$.value.password)
);

const confirmPasswordErrorMessage = computed(() =>
  getFirstVuelidateErrorMessage(v$.value.confirmPassword)
);

const submit = () => {
  v$.value.$touch();
};
</script>

<template>
  <div class="register min-h-[inherit] relative">
    <div
      class="
        wrapper
        w-[960px]
        shadow-custom1
        rounded-xl
        p-10
        mx-auto
        absolute
        top-[10%]
        left-1/2
        -translate-x-2/4
      "
    >
      <div class="flex">
        <div class="flex-auto p-16">
          <h3 class="m-0 text-2xl">註冊</h3>
          <div class="mt-6">
            <form-text-input
              :error="v$.account.$error"
              :error-text="accountErrorMessage"
              block
              v-model="form.account"
              label="帳號"
            />
          </div>
          <div class="mt-6">
            <form-text-input
              :type="isPasswordDisplay ? 'text' : 'password'"
              block
              :error="v$.password.$error"
              :error-text="passwordErrorMessage"
              v-model="form.password"
              label="密碼"
            />
          </div>
          <div class="mt-6">
            <form-text-input
              :type="isPasswordDisplay ? 'text' : 'password'"
              block
              :error="v$.confirmPassword.$error"
              :error-text="confirmPasswordErrorMessage"
              v-model="form.confirmPassword"
              label="確認密碼"
            />
          </div>
          <div class="mt-6">
            <button @click="submit" class="btn w-full text-white bg-black">
              送出
            </button>
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
