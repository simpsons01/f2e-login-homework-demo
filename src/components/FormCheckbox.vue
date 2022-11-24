<script setup>
import { defineProps } from "vue";
import { CheckIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  name: {
    type: String,
  },
  label: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <label
    v-bind="{
      ...(name ? { for: name } : {}),
    }"
    class="items-center flex"
  >
    <input
      class="hidden p-0 m-0"
      type="checkbox"
      v-bind="{
        ...$attrs,
        ...(name ? { id: name } : {}),
      }"
    />
    <div
      class="border border-solid h-4 w-4 p-[2px] mr-1 relative"
      :class="[
        checked ? 'bg-black dark:bg-zinc-300' : 'dark:bg-zinc-300',
        checked
          ? 'border-black dark:bg-zinc-300 '
          : 'border-gray-400 dark:border-zinc-300',
      ]"
    >
      <check-icon
        class="
          h-4
          w-4
          absolute
          left-1/2
          top-1/2
          -translate-y-2/4 -translate-x-2/4
          text-white
          dark:text-zinc-900
        "
        :class="[checked ? '' : 'hidden']"
      />
    </div>
    <span class="dark:text-zinc-300">
      {{ label }}
    </span>
  </label>
</template>
