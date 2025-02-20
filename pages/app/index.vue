<script setup lang="ts">
const { user } = useUserStore();
</script>

<template>
  dashboard

  {{ JSON.stringify({ user }) }}
</template>
