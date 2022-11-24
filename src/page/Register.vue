<script setup>
import {
  reactive,
  ref,
  computed,
  inject,
  onMounted,
  onBeforeUnmount,
} from "vue";
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
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import { useUserStore } from "../store/user";
import { wait } from "../common/utils";

const userStore = useUserStore();

const alert = inject("alert");

const loading = inject("loading");

const step = {
  register: "register",
  verify: "verify",
  success: "success",
};

const registerForm = reactive({
  account: "",
  password: "",
  confirmPassword: "",
});
const isPasswordDisplay = ref(false);

const verify = reactive({
  key: "",
  code: "",
});

const verifyForm = reactive({
  code: "",
});

const currentStep = ref(step.register);

const registerFormV$ = useVuelidate(
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
        return value === registerForm.password;
      }),
    },
  },
  registerForm
);

const verifyFormV$ = useVuelidate(
  {
    code: {
      required: helpers.withMessage(validateMessages.required, required),
      match: helpers.withMessage(validateMessages.verifyCode, (value) => {
        return value === verify.code;
      }),
    },
  },
  verifyForm
);

const accountErrorMessage = computed(() =>
  getFirstVuelidateErrorMessage(registerFormV$.value.account)
);

const passwordErrorMessage = computed(() =>
  getFirstVuelidateErrorMessage(registerFormV$.value.password)
);

const confirmPasswordErrorMessage = computed(() =>
  getFirstVuelidateErrorMessage(registerFormV$.value.confirmPassword)
);

const verifyCodeErrorMessage = computed(() =>
  getFirstVuelidateErrorMessage(verifyFormV$.value.code)
);

const registerFormSubmit = async () => {
  registerFormV$.value.$touch();
  if (!registerFormV$.value.$invalid) {
    try {
      loading.show();
      await wait(0.2);
      const res = await userStore.register(
        registerForm.account,
        registerForm.password
      );
      verify.code = res.verifyCode;
      verify.key = res.verifyKey;
      currentStep.value = step.verify;
      loading.hide();
    } catch (error) {
      loading.hide();
      alert.open(error.data.message);
    }
  }
};

const verifyFormSubmit = async () => {
  verifyFormV$.value.$touch();
  if (!verifyFormV$.value.$invalid) {
    try {
      loading.show();
      await wait(0.2);
      await userStore.verify(verifyForm.code, verify.key);
      currentStep.value = step.success;
      loading.hide();
    } catch (error) {
      alert.open(error.data.message);
      loading.hide();
    }
  }
};

const verifyStepBackToRegister = () => {
  currentStep.value = step.register;
  registerForm.account = "";
  registerForm.password = "";
  registerForm.confirmPassword = "";
  verify.code = "";
  verify.key = "";
  registerFormV$.value.$reset();
};

const onKeydown = (e) => {
  if (e.key === "Enter") {
    if (currentStep.value === step.register) {
      registerFormSubmit();
    } else if (currentStep.value === step.verify) {
      verifyFormSubmit();
    }
  }
};

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <div class="register min-h-[inherit] relative">
    <div
      class="
        wrapper
        w-[700px]
        shadow-custom1
        rounded-xl
        p-16
        mx-auto
        absolute
        top-[10%]
        left-1/2
        -translate-x-2/4
        dark:shadow-zinc-700
      "
    >
      <div class="flex overflow-hidden relative min-h-[400px]">
        <transition-group name="slide" mode="in-out">
          <div
            v-if="currentStep === step.register"
            class="absolute left-0 top-0 w-full h-full box-content"
          >
            <h3 class="m-0 text-2xl dark:text-zinc-300">註冊</h3>
            <div class="mt-6">
              <form-text-input
                :error="registerFormV$.account.$error"
                :error-text="accountErrorMessage"
                block
                v-model="registerForm.account"
                label="帳號"
              />
            </div>
            <div class="mt-6">
              <form-text-input
                :type="isPasswordDisplay ? 'text' : 'password'"
                block
                :error="registerFormV$.password.$error"
                :error-text="passwordErrorMessage"
                v-model="registerForm.password"
                label="密碼"
              />
            </div>
            <div class="mt-6">
              <form-text-input
                :type="isPasswordDisplay ? 'text' : 'password'"
                block
                :error="registerFormV$.confirmPassword.$error"
                :error-text="confirmPasswordErrorMessage"
                v-model="registerForm.confirmPassword"
                label="確認密碼"
              />
            </div>
            <div class="mt-6 text-right">
              <router-link
                class="
                  underline underline-offset-1
                  cursor-pointer
                  dark:text-zinc-300
                "
                to="login"
                >已是會員?</router-link
              >
            </div>
            <div class="mt-6">
              <button
                @click="registerFormSubmit"
                class="btn w-full text-white dark:text-zinc-300 bg-black"
              >
                送出
              </button>
            </div>
          </div>
          <div
            v-if="currentStep === step.verify"
            class="p-16 absolute left-0 top-0 w-full h-full"
          >
            <button
              @click="verifyStepBackToRegister"
              class="absolute top-0 left-0"
            >
              <arrow-left-icon class="w-8 h-8 text-black dark:text-zinc-300" />
            </button>
            <h3 class="m-0 text-2xl dark:text-zinc-300">驗證碼</h3>
            <div class="mt-6">
              <form-text-input
                block
                :error="verifyFormV$.code.$error"
                :error-text="verifyCodeErrorMessage"
                v-model="verifyForm.code"
                placeholder="輸入驗證碼"
              />
            </div>
            <div class="mt-6">
              <div
                class="
                  bg-gray-300
                  text-black
                  dark:bg-zinc-800 dark:text-zinc-300
                  rounded-sm
                  p-2
                  text-center
                "
              >
                驗證碼: {{ verify.code }}
              </div>
            </div>
            <div class="mt-6">
              <button
                @click="verifyFormSubmit"
                class="btn w-full text-white dark:text-zinc-300 bg-black"
              >
                送出
              </button>
            </div>
          </div>
          <div
            v-if="currentStep === step.success"
            class="
              flex flex-col
              items-center
              justify-center
              absolute
              left-0
              top-0
              w-full
              h-full
            "
          >
            <h3 class="m-0 text-5xl dark:text-zinc-300">註冊成功!</h3>
            <router-link
              class="
                underline underline-offset-1
                cursor-pointer
                text-2xl
                mt-4
                dark:text-zinc-300
              "
              to="/login"
            >
              登入
            </router-link>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}
.slide-enter-from {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}

.slide-leave-to {
  transform: translate(-100%);
}
</style>
