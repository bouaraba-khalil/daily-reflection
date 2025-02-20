<script setup lang="ts">
const { user, status } = useUserStore();
</script>

<template>
  <div class="min-w-screen min-h-screen">
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
    <div v-else>
      <slot />
    </div>
  </div>
</template>
