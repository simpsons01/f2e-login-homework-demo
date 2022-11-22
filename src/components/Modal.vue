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
  <Transition name="temp">
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
          min-w-[500px] min-h-[200px]
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

<style>
.temp-enter-active .backdrop,
.temp-leave-active .backdrop {
  transition: 0.3s opacity;
}
.temp-enter-active .backdrop .content,
.temp-leave-active .backdrop .content {
  transition: 0.3s opacity, 0.3s transform;
  transition-delay: 0.1s;
}

.temp-enter-from .backdrop,
.temp-leave-to .backdrop {
  opacity: 0;
}

.temp-enter-to .backdrop,
.temp-leave-from .backdrop {
  opacity: 1;
}

.temp-enter-from .backdrop .content,
.temp-leave-to .backdrop .content {
  opacity: 0;
  transform: translateY(-2rem);
}

.temp-enter-to .backdrop .content,
.temp-leave-from .backdrop .content {
  opacity: 1;
  transform: translateY(0);
}
</style>
