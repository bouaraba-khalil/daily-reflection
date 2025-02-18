<script setup lang="ts">
const token = useCookie("Authorization");
</script>

<template>test {{ token ? "lool" : "nop" }}</template>
