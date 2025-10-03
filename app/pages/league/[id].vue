<script lang='ts' setup>
const $route = useRoute();
</script>

<template>
  <p>ID: {{ $route.params.id }}</p>
</template>
