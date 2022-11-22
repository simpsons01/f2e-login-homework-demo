<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  onCloseIconClick: {
    type: Function,
  },
  cancel: {
    type: Object,
    validator: (val) => val.text && val.handler,
  },
  confirm: {
    type: Object,
    validator: (val) => val.text && val.handler,
  },
});
</script>

<template>
  <Transition name="modal-transition">
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
        backdrop
      "
    >
      <div
        class="
          absolute
          left-1/2
          top-1/2
          -translate-y-2/4 -translate-x-2/4
          bg-white
          p-4
          min-w-[400px] min-h-[200px]
          rounded-lg
          flex flex-col
          content
        "
      >
        <div
          v-if="onCloseIconClick"
          class="cancel absolute right-2 top-1 cursor-pointer w-8 h-8"
        >
          <x-mark-icon
            @click="onCloseIconClick"
            class="
              w-8
              h-8
              text-black
              absolute
              left-1/2
              top-1/2
              -translate-y-2/4 -translate-x-2/4
            "
          />
        </div>
        <slot name="title" v-bind="{ title }">
          <div class="text-2xl text-black">
            {{ title }}
          </div>
        </slot>
        <slot name="content ">
          <div class="flex-auto p-2" v-bind="{ content }">
            {{ content }}
          </div>
        </slot>
        <slot name="control">
          <div v-if="cancel || confirm" class="text-center">
            <button
              v-if="cancel"
              class="btn text-white px-4 py-1 bg-gray-500 mr-2"
              @click="($event) => cancel.handler($event)"
            >
              {{ cancel.text }}
            </button>
            <button
              v-if="confirm"
              class="btn text-white px-4 py-1 bg-black"
              @click="($event) => confirm.handler($event)"
            >
              {{ confirm.text }}
            </button>
          </div>
        </slot>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-transition-active .backdrop,
.modal-transition-active .backdrop {
}
.modal-transition-active .backdrop,
.modal-transition-active .backdrop {
}

.modal-transition-from,
.modal-transition-to {
  opacity: 0;
}
</style>
