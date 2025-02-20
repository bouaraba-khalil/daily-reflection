<script setup lang="ts">
import AppHeader from "~/components/AppHeader/AppHeader.vue";

const { user, status } = useUserStore();
</script>

<template>
  <div>
    <div
      v-if="status === 'pending'"
      class="min-w-screen min-h-screen grid place-items-center"
    >
      <Loader />
    </div>
    <div
      v-else-if="status === 'error'"
      class="min-w-screen min-h-screen grid place-items-center"
    >
      retry please
    </div>
    <main v-else-if="status === 'success'" class="min-w-screen min-h-screen">
      <AppHeader /> <slot />
    </main>
  </div>
</template>
