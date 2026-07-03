<script setup lang="ts">
defineProps<{
  name: string
  tagline?: string
}>()
</script>

<template>
  <section class="blog-hero">
    <h1>
      <span class="gradient-text">{{ name }}</span>
    </h1>
    <p v-if="tagline">{{ tagline }}</p>
  </section>
</template>
