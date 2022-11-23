<script setup>
import { UserCircleIcon, Squares2X2Icon } from "@heroicons/vue/24/solid";
import Loading from "./components/Loading.vue";
import Modal from "./components/Modal.vue";
import { provide, reactive, ref } from "vue";

const isLandingShow = ref(false);

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

provide("loading", {
  show: () => {
    isLoadingShow.value = true;
  },
  hide: () => {
    isLoadingShow.value = false;
  },
});

provide("alert", {
  open: (content) => {
    alertModal.content = content;
    alertModal.show = true;
  },
  close: () => (alertModal.show = false),
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
          <router-link class="flex items-center" to="/">
            <Squares2X2Icon class="h-12 w-12" />
          </router-link>
        </div>
        <div class="flex-auto flex flex-row-reverse">
          <div class="flex-initial flex items-center">
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

.landing .icon {
  animation-name: rotate-landing;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  transform-origin: 50% 50%;
}

@keyframes rotate-landing {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
