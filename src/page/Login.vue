<script setup>
import { reactive, ref, inject } from "vue";
import FormTextInput from "../components/FormTextInput.vue";
import FormCheckbox from "../components/FormCheckbox.vue";
import Modal from "../components/Modal.vue";
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
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import http from "../common/http";

const alert = inject("alert");

const loading = inject("loading");

const user = inject("user");

const router = useRouter();

const isPasswordDisplay = ref(false);

const form = reactive({
  account: "ray.zhu@104.com.tw",
  password: "12345678",
});

const forgetPasswordModal = reactive({
  show: false,
  form: {
    account: "",
  },
});

const newPasswordModal = reactive({
  show: false,
  newPassword: "",
});

const formV$ = useVuelidate(
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
  },
  form
);

const forgetPasswordModalFormV$ = useVuelidate(
  {
    account: {
      required: helpers.withMessage(validateMessages.required, required),
      email: helpers.withMessage(validateMessages.email, email),
    },
  },
  forgetPasswordModal.form
);

const accountErrorMessage = computed(() =>
  getFirstVuelidateErrorMessage(formV$.value.account)
);

const passwordErrorMessage = computed(() =>
  getFirstVuelidateErrorMessage(formV$.value.password)
);

const forgetPasswordModalAccountErrorMessage = computed(() =>
  getFirstVuelidateErrorMessage(forgetPasswordModalFormV$.value.account)
);

const onForgetPasswordModalConfirmClick = () => {
  forgetPasswordModalFormV$.value.$touch();
};

const submit = () => {
  formV$.value.$touch();
  if (!formV$.value.$invalid) {
    loading.show();
    setTimeout(() => {
      http
        .post("/user/login", {
          email: form.account,
          password: form.password,
        })
        .then((res) => {
          loading.hide();
          const {
            data: {
              data: { email: account },
            },
          } = res;
          user.updateAccount(account);
          router.push({ path: "/" });
        })
        .catch((error) => {
          const {
            data: { message },
          } = createHttpErrorModel(error);
          alert.open(message);
          loading.hide();
        });
    }, 1500);
  }
};
</script>

<template>
  <div class="login min-h-[inherit] relative">
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
          <h3 class="m-0 text-2xl">登入</h3>
          <div class="mt-6">
            <form-text-input
              :error="formV$.account.$error"
              :errorText="accountErrorMessage"
              block
              v-model="form.account"
              label="帳號"
            />
          </div>
          <div class="mt-6">
            <form-text-input
              :type="isPasswordDisplay ? 'text' : 'password'"
              block
              :error="formV$.password.$error"
              :errorText="passwordErrorMessage"
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
            <button @click="submit" class="btn w-full text-white bg-black">
              登入
            </button>
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
      handler: () => {
        forgetPasswordModal.form.account = '';
        forgetPasswordModal.show = false;
        forgetPasswordModalFormV$.$reset();
      },
    }"
    :confirm="{
      text: '送出',
      handler: onForgetPasswordModalConfirmClick,
    }"
  >
    <template v-slot:content>
      <div class="py-8 px-4">
        <form-text-input
          block
          v-model="forgetPasswordModal.form.account"
          :error="forgetPasswordModalFormV$.account.$error"
          :error-text="forgetPasswordModalAccountErrorMessage"
          :placeholder="'輸入您的帳號'"
        />
      </div>
    </template>
  </modal>
  <modal
    title="新密碼"
    :show="newPasswordModal.show"
    :on-close-icon-click="() => (newPasswordModal.show = false)"
    :confirm="{
      text: '確認',
      handler: () => {
        newPasswordModal.show = false;
      },
    }"
  >
    <template v-slot:content>
      <div class="my-8 mx-4 py-4 text-center text-2xl bg-black text-white">
        {{ newPasswordModal.newPassword }}
      </div>
    </template>
  </modal>
</template>

<style scoped></style>
