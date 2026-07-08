<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

const { page, frontmatter } = useData()
const route = useRoute()

interface Header {
  level: number
  title: string
  slug: string
  link: string
  children?: Header[]
}

const flattenHeaders = (headers: Header[], depth: number = 0): Array<{title: string, slug: string, depth: number}> => {
  let result: Array<{title: string, slug: string, depth: number}> = []
  for (const h of headers) {
    result.push({ title: h.title, slug: h.slug, depth: h.level })
    if (h.children && h.children.length > 0) {
      result = result.concat(flattenHeaders(h.children, depth + 1))
    }
  }
  return result
}

const outlineItems = computed(() => {
  const headers = page.value.headers || []
  return flattenHeaders(headers).filter(h => h.depth >= 2 && h.depth <= 3)
})

const activeId = computed(() => {
  return (route.hash || '').slice(1) || outlineItems.value[0]?.slug
})

const label = computed(() => {
  return page.value.title || frontmatter.value.title || '文章目录'
})

const isActive = (slug: string) => {
  return activeId.value === slug
}
</script>

<template>
  <div class="outline-container">
    <div class="outline-label">{{ label }}</div>
    <nav class="outline-nav">
      <ul class="outline-list">
        <li 
          v-for="item in outlineItems" 
          :key="item.slug" 
          class="outline-item"
          :style="{ paddingLeft: `${(item.depth - 2) * 12}px` }"
        >
          <a 
            :href="`#${item.slug}`" 
            :class="['outline-link', { 'outline-link-active': isActive(item.slug) }]"
          >
            {{ item.title }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.outline-container {
  padding: 16px 0;
}

.outline-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.outline-nav {
  font-size: 13px;
}

.outline-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.outline-item {
  margin: 4px 0;
}

.outline-link {
  display: block;
  color: var(--vp-c-text-2);
  text-decoration: none;
  padding: 4px 0;
  transition: color 0.2s;
}

.outline-link:hover {
  color: var(--vp-c-brand-1);
}

.outline-link-active {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}
</style>
