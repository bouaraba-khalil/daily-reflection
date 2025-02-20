<script setup lang="ts">
const { data, error } = useFetch("/api/v1/profile");
</script>

<template>
  dashboard
  <Loader />

  {{ JSON.stringify({ data }) }}
  {{ JSON.stringify({ error }) }}
</template>
