<script setup>
import { useUserStore } from "../store/user";
const userStore = useUserStore();
const reload = () => window.location.reload();
</script>

<template>
  <div
    class="not-found min-h-[inherit] flex flex-col items-center justify-center"
  >
    <div class="text-5xl welcome-text relative dark:text-zinc-300">
      嗚嗚，網頁暫時出了點問題
    </div>
    <button
      @click="reload"
      class="btn bg-black text-white dark:text-zinc-300 py-2 px-4 mt-6"
    >
      重新整理
    </button>
  </div>
</template>
