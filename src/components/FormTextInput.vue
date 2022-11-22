<script setup>
import { defineProps, defineEmits, ref } from "vue";

const isFocus = ref(false);

const props = defineProps({
  password: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorText: {
    type: String,
    default: "",
  },
  name: {
    type: String,
  },
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <label
    v-bind="{
      ...(name ? { for: name } : {}),
    }"
    class="border border-solid rounded-md relative bg-gray-100 cursor-text pt-2"
    :class="[
      block ? 'block' : 'inline-block',
      error ? 'border-red-400' : 'border-gray-100',
      error && errorText ? 'mb-5' : '',
      'relative',
    ]"
  >
    <div class="px-3 pt-1 pb-1">
      <div
        class="
          absolute
          bg-transparent
          pointer-events-none
          transition-all
          left-4
          top-1/2
        "
        :class="[
          isFocus || !!modelValue ? 'scale-75' : '',
          isFocus || !!modelValue
            ? '-translate-y-6 -translate-x-1/4'
            : '-translate-y-2/4',
          error ? 'text-red-400' : 'text-black',
        ]"
      >
        {{ label }}
      </div>
      <input
        class="bg-gray-100 py-2 h-5 box-content outline-none block w-full"
        :type="password ? 'password' : 'text'"
        :value="modelValue"
        @focus="isFocus = true"
        @blur="isFocus = false"
        v-bind="{
          ...$attrs,
          ...(name ? { id: name } : {}),
        }"
        @input="(event) => $emit('update:modelValue', event.target.value)"
      />
    </div>
    <div
      v-show="error && errorText"
      class="absolute bottom-0 left-4 translate-y-full text-sm text-red-400"
    >
      {{ errorText }}
    </div>
  </label>
</template>
