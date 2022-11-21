<script setup>
import { UserCircleIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="f2e-login-homework">
    <header class="border-b box-border border-solid h-16 border-gray-200">
      <div class="xl:container px-4 mx-auto flex h-full">
        <div class="flex-initial flex items-center">
          <router-link to="/">f2e-login-homework</router-link>
        </div>
        <div class="flex-auto flex flex-row-reverse">
          <div class="flex-initial flex items-center">
            <router-link class="block" to="/user">
              <user-circle-icon class="h-12 w-12" />
            </router-link>
          </div>
        </div>
      </div>
    </header>
    <main>
      <router-view />
    </main>
    <footer class="bg-gray-100">
      <div class="xl:container mx-auto h-16 flex items-center justify-center">
        f2e-login-homework
      </div>
    </footer>
  </div>
</template>

<style scoped>
.f2e-login-homework {
  min-width: theme("screens.xl");
}

.f2e-login-homework main {
  min-height: calc(100vh - 8rem);
  overflow: auto;
}
</style>
