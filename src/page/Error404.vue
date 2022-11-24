<script setup>
import { useUserStore } from "../store/user";
const userStore = useUserStore();
</script>

<template>
  <div
    class="not-found min-h-[inherit] flex flex-col items-center justify-center"
  >
    <div class="text-5xl welcome-text relative">嗚嗚，頁面不存在</div>
    <router-link
      class="mt-2 underline underline-offset-0 text-2xl"
      :to="userStore.isLogin ? '/' : '/login'"
    >
      {{ userStore.isLogin ? "回首頁" : "登入去" }}
    </router-link>
  </div>
</template>
