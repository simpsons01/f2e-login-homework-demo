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
        checked ? 'bg-black' : '',
        checked ? 'border-black' : 'border-gray-400',
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
        "
        :class="[checked ? '' : 'hidden']"
      />
    </div>
    <span>
      {{ label }}
    </span>
  </label>
</template>
