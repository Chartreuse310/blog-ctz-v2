<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData, onContentUpdated } from 'vitepress'
import { useActiveAnchor, getHeaders, type MenuItem } from 'vitepress/dist/client/theme-default/composables/outline'

const { page, frontmatter } = useData()

const headers = ref<MenuItem[]>([])

onContentUpdated(() => {
  // 注意：不能用 theme.outline —— 全局配置为 false 会导致 getHeaders 直接返回空数组。
  // 这里固定取 h2/h3 两级（与 config.mts 的 markdown.headers.level 一致）。
  headers.value = getHeaders([2, 3])
})

// 拍平为 h2/h3 两级列表，用 padding 表现层级（与原自定义样式保持一致）
const outlineItems = computed(() => {
  const result: Array<{ title: string; link: string; depth: number }> = []
  for (const h of headers.value) {
    result.push({ title: h.title, link: h.link, depth: h.level })
    for (const child of h.children || []) {
      result.push({ title: child.title, link: child.link, depth: child.level })
    }
  }
  return result
})

const label = computed(() => {
  return page.value.title || frontmatter.value.title || '文章目录'
})

// 官方滚动高亮逻辑：复用 useActiveAnchor
const container = ref()
const marker = ref()
useActiveAnchor(container, marker)
</script>

<template>
  <div
    class="outline-container"
    :class="{ 'has-outline': outlineItems.length > 0 }"
    ref="container"
  >
    <div class="outline-content">
      <div class="outline-marker" ref="marker" />
      <div class="outline-label">{{ label }}</div>
      <nav class="outline-nav">
        <ul class="outline-list">
          <li
            v-for="item in outlineItems"
            :key="item.link"
            class="outline-item"
            :style="{ paddingLeft: `${(item.depth - 2) * 12}px` }"
          >
            <a
              :href="item.link"
              class="outline-link"
            >
              {{ item.title }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.outline-container {
  padding: 16px 0;
}

.outline-container:not(.has-outline) {
  display: none;
}

.outline-content {
  position: relative;
  border-left: 1px solid var(--vp-c-divider);
  padding-left: 16px;
}

.outline-marker {
  position: absolute;
  top: 32px;
  left: -1px;
  z-index: 0;
  opacity: 0;
  width: 2px;
  border-radius: 2px;
  height: 18px;
  background-color: var(--vp-c-brand-1);
  transition:
    top 0.25s cubic-bezier(0, 1, 0.5, 1),
    background-color 0.5s,
    opacity 0.25s;
}

.outline-label {
  position: relative;
  z-index: 1;
  line-height: 32px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.outline-nav {
  position: relative;
  z-index: 1;
  font-size: 13px;
}

.outline-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.outline-item {
  margin: 0;
}

.outline-link {
  display: block;
  line-height: 32px;
  font-size: 13px;
  font-weight: 400;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  transition: color 0.25s;
}

.outline-link:hover {
  color: var(--vp-c-brand-1);
}

/* useActiveAnchor 会给当前可见标题对应的链接加 .active */
.outline-link.active {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  transition: color 0.25s;
}
</style>
