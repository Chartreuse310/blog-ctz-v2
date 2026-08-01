<script setup lang="ts">
import { ref, computed } from 'vue'
import { data as posts } from './posts.data.mts'
import { withBase } from 'vitepress'

interface Post {
  title: string
  date: string
  excerpt: string
  tags?: string[]
  author?: string
  url: string
}

const selectedTag = ref<string | null>(null)
const query = ref('')

// 聚合全部 tag，按出现次数降序（同次数按 tag 名稳定排序）
const allTags = computed(() => {
  const counts = new Map<string, number>()
  for (const p of posts as Post[]) {
    for (const t of p.tags || []) {
      counts.set(t, (counts.get(t) || 0) + 1)
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, count]) => ({ name, count }))
})

// AND 筛选：tag 与搜索同时满足
const filteredPosts = computed(() => {
  const q = query.value.trim().toLowerCase()
  return (posts as Post[]).filter((p) => {
    if (selectedTag.value && !(p.tags || []).includes(selectedTag.value)) return false
    if (q) {
      const haystack = `${p.title} ${p.excerpt} ${(p.tags || []).join(' ')}`.toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })
})

const toggleTag = (tag: string) => {
  selectedTag.value = selectedTag.value === tag ? null : tag
}
const clearFilters = () => {
  selectedTag.value = null
  query.value = ''
}
const hasFilter = computed(() => selectedTag.value !== null || query.value.trim() !== '')
</script>

<template>
  <div class="filter-bar">
    <input
      class="search-input"
      v-model="query"
      type="search"
      placeholder="搜索文章…"
      aria-label="搜索文章"
    />
    <div class="tag-filter-list">
      <button
        v-for="t in allTags"
        :key="t.name"
        :class="['post-tag', 'tag-filter-btn', { 'tag-filter-active': selectedTag === t.name }]"
        @click="toggleTag(t.name)"
      >
        {{ t.name }}<span class="tag-count">{{ t.count }}</span>
      </button>
    </div>
  </div>

  <p v-if="hasFilter" class="filter-status">
    共 {{ filteredPosts.length }} 篇文章
    <button class="clear-btn" @click="clearFilters">清除筛选</button>
  </p>

  <ul v-if="filteredPosts.length > 0" class="post-list">
    <li v-for="post in filteredPosts" :key="post.url" class="post-item">
      <a :href="withBase(post.url)">
        <h2 class="post-title">{{ post.title }}</h2>
        <div class="post-meta">
          <time>{{ post.date }}</time>
          <span v-if="post.author" class="post-author">by {{ post.author }}</span>
          <button
            v-for="tag in post.tags"
            :key="tag"
            class="post-tag post-tag-link"
            @click.prevent="toggleTag(String(tag))"
          >
            {{ tag }}
          </button>
        </div>
        <p class="post-excerpt">{{ post.excerpt }}</p>
      </a>
    </li>
  </ul>

  <div v-else class="empty-state">
    <p>没有匹配的文章</p>
    <button class="clear-btn" @click="clearFilters">清除筛选</button>
  </div>
</template>
