<script setup>
import { ref, onMounted, inject } from "vue";
import { useUserStore } from "../store/user";

const userStore = useUserStore();

const welcomeText = ref("");

onMounted(() => {
  setTimeout(() => {
    const username = userStore.account.split("@")[0];
    const text = `歡迎，${username}`;
    let count = 0;
    let timer = setInterval(() => {
      welcomeText.value += text[count];
      count += 1;
      if (count === text.length) {
        clearInterval(timer);
      }
    }, 200);
  }, 1000);
});
</script>

<template>
  <div
    class="
      home
      xl:container
      mx-auto
      min-h-[inherit]
      flex
      items-center
      justify-center
    "
  >
    <div class="text-7xl welcome-text relative">
      {{ welcomeText }}
    </div>
  </div>
</template>

<style scoped>
.welcome-text {
  min-height: 4.5rem;
}
.welcome-text::before {
  content: "";
  display: block;
  width: 3px;
  height: 100%;
  position: absolute;
  right: -12px;
  top: 0;
  background-color: theme("colors.black");
  animation-name: blink;
  animation-duration: 0.9s;
  animation-iteration-count: infinite;
}

@keyframes blink {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
