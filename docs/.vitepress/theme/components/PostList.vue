<script setup lang="ts">
import { data as posts } from './posts.data.mts'
import { withBase } from 'vitepress'

interface Post {
  title: string
  date: string
  excerpt: string
  tags?: string[]
  url: string
}
</script>

<template>
  <ul class="post-list">
    <li v-for="post in (posts as Post[])" :key="post.url" class="post-item">
      <a :href="withBase(post.url)">
        <h2 class="post-title">{{ post.title }}</h2>
        <div class="post-meta">
          <time>{{ post.date }}</time>
          <span v-for="tag in post.tags" :key="tag" class="post-tag">{{ tag }}</span>
        </div>
        <p class="post-excerpt">{{ post.excerpt }}</p>
      </a>
    </li>
  </ul>
</template>
