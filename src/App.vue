<script setup>
import { UserCircleIcon } from '@heroicons/vue/24/solid' 

</script>

<template>
  <div>
    <header>
       <div class="container mx-auto p-4 flex">
          <div class="flex-initial">
             <router-link to="/">
                HELLO WORLD
             </router-link>
          </div>
          <div class="flex-auto">
             <div>
                <router-link>
                  <UserCircleIcon />
                </router-link>
             </div>
          </div>
       </div>
    </header>
    <router-view />
    <footer class="container"></footer>
  </div>
</template>
