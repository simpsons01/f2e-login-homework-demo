<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div
    v-show="show"
    class="
      fixed
      left-0
      top-0
      w-full
      h-full
      z-[1000]
      flex
      items-start
      justify-center
      bg-black/60
      dark:bg-zinc-400/60
    "
  >
    <div
      class="
        spinner
        w-12
        h-12
        absolute
        left-1/2
        top-1/2
        -translate-y-2/4 -translate-x-2/4
        text-white
        dark:text-zinc-200
      "
    ></div>
  </div>
</template>

<style scoped>
.spinner {
  border-top: 5px solid theme("colors.white");
  border-right: 3px solid transparent;
  border-radius: 50%;
  animation: rotation 0.8s linear infinite;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
