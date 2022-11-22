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
  <Transition name="modal">
    <div
      v-if="show"
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
        bg-black/60
        backdrop
      "
    >
      <div
        class="
          relative
          bg-white
          p-4
          min-w-[500px] min-h-[200px]
          rounded-lg
          flex flex-col
          content
        "
      >
        <div
          v-if="onCloseIconClick"
          class="cancel absolute right-3 top-2 cursor-pointer w-8 h-8"
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
          <div
            class="text-2xl text-black"
            :class="[onCloseIconClick ? 'mt-3' : '']"
          >
            {{ title }}
          </div>
        </slot>
        <slot name="content">
          <div class="flex-auto p-2" v-bind="{ content }">
            {{ content }}
          </div>
        </slot>
        <slot name="control">
          <div v-if="cancel || confirm" class="text-center">
            <button
              v-if="cancel"
              class="btn text-white px-8 py-2 bg-gray-400 mr-2"
              @click="($event) => cancel.handler($event)"
            >
              {{ cancel.text }}
            </button>
            <button
              v-if="confirm"
              class="btn text-white px-8 py-2 bg-black"
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
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
}

.modal-enter-active .content,
.modal-leave-active .content {
  transition: opacity 0.3s, transform 0.3s;
}

.modal-enter-active .content {
  transition-delay: 0.1s;
}

.modal-enter-from .content,
.modal-leave-to .content {
  opacity: 0;
  transform: translateY(-2rem);
}

.modal-enter-to .content,
.modal-leave-from .content {
  opacity: 1;
  transform: translateY(0);
}
</style>
