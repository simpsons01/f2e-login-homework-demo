<script setup>
import { UserCircleIcon, Squares2X2Icon } from "@heroicons/vue/24/solid";
import Loading from "./components/Loading.vue";
import Modal from "./components/Modal.vue";
import { provide, reactive, ref, onBeforeMount } from "vue";
import * as EventBus from "./common/eventbus";

import { useUserStore } from "./store/user";

const userStore = useUserStore();

const isLandingShow = ref(true);

const isLoadingShow = ref(false);

const alertModal = reactive({
  show: false,
  title: "提醒您",
  content: "",
  onCloseIconClick: () => (alertModal.show = false),
  confirm: {
    text: "確定",
    handler: () => (alertModal.show = false),
  },
});

const loadingUtil = {
  show: () => {
    isLoadingShow.value = true;
  },
  hide: () => {
    isLoadingShow.value = false;
  },
};

provide("loading", loadingUtil);

const alertUtil = {
  open: (payload) => {
    alertModal.show = true;
    if (typeof payload === "string") {
      alertModal.content = payload;
    } else {
      const keys = Object.keys(payload);
      keys.forEach((key) => {
        alertModal[key] = payload[key];
      });
    }
  },
  close: () => (alertModal.show = false),
};

provide("alert", alertUtil);

const landingEventUnRegister = EventBus.register(
  "controlLandingShow",
  (val) => {
    isLandingShow.value = val;
  }
);

onBeforeMount(() => {
  landingEventUnRegister();
});
</script>

<template>
  <div class="f2e-login-homework pt-16">
    <header
      class="
        border-b
        box-border
        border-solid
        h-16
        border-gray-200
        fixed
        top-0
        w-full
      "
    >
      <div class="xl:container px-4 mx-auto flex h-full">
        <div class="flex-initial flex items-center">
          <router-link
            class="flex items-center"
            :to="userStore.isLogin ? '/' : '/login'"
          >
            <Squares2X2Icon class="h-12 w-12" />
          </router-link>
        </div>
        <div class="flex-auto flex flex-row-reverse">
          <div v-if="userStore.isLogin" class="flex-initial flex items-center">
            <router-link class="block" to="/account">
              <user-circle-icon class="h-12 w-12" />
            </router-link>
          </div>
        </div>
      </div>
    </header>
    <main>
      <router-view />
    </main>
    <footer class="bg-gray-100">
      <div
        class="
          xl:container
          mx-auto
          h-12
          flex
          items-center
          justify-center
          text-sm
        "
      >
        Copyright © {{ new Date().getFullYear() }}. All rights reserved
      </div>
    </footer>
  </div>
  <loading :show="isLoadingShow" />
  <modal v-bind="alertModal" />
  <div
    v-if="isLandingShow"
    class="
      fixed
      left-0
      top-0
      w-full
      h-full
      z-[1000]
      flex
      items-center
      justify-center
      bg-white
      landing
    "
  >
    <Squares2X2Icon class="icon h-24 w-24" />
  </div>
</template>

<style scoped>
.f2e-login-homework {
  min-width: theme("screens.xl");
}

.f2e-login-homework main {
  min-height: calc(100vh - 7rem);
  overflow: auto;
}
</style>
