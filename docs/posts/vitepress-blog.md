---
title: 用 VitePress 搭建个人博客
date: 2026-07-03
excerpt: 从零开始用 VitePress 搭建一个支持暗色模式、自动文章列表和自定义主题的个人博客。
tags:
  - VitePress
  - Vue
  - 博客
---

# 用 VitePress 搭建个人博客

<div class="post-info">
  <time>2026-07-03</time>
  <span class="post-tag">VitePress</span>
  <span class="post-tag">Vue</span>
</div>

## 为什么选择 VitePress

VitePress 是 Vite 驱动的静态站点生成器，专为文档和博客设计。相比 Hexo、Hugo 等方案，它有几个核心优势：

- **极速构建** — 基于 Vite 的按需编译，冷启动几乎瞬时
- **Vue 生态** — 可以在 Markdown 中直接使用 Vue 组件
- **默认暗色模式** — 内置明暗切换，零配置
- **TypeScript 支持** — 配置和主题定制都可以用 TS

## 项目结构

```
docs/
├── .vitepress/
│   ├── config.mts          # 站点配置
│   └── theme/
│       ├── index.ts         # 主题入口
│       ├── custom.css       # 自定义样式
│       └── components/      # 自定义组件
│           ├── BlogHero.vue
│           ├── PostList.vue
│           └── posts.data.mts
├── posts/                   # 博客文章
├── public/                  # 静态资源
└── index.md                # 首页
```

## 自动文章列表

使用 VitePress 的 `createContentLoader` 可以在构建时扫描所有文章的 frontmatter，自动生成文章列表：

```ts
import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  transform(rawData) {
    return rawData
      .map(({ frontmatter, url }) => ({
        title: frontmatter.title,
        date: frontmatter.date,
        excerpt: frontmatter.excerpt,
        tags: frontmatter.tags,
        url
      }))
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  }
})
```

这样文章列表会按时间自动排序，新增文章只需往 `posts/` 目录添加 Markdown 文件即可。

## 自定义主题

VitePress 允许扩展默认主题而不需要完全重写。通过覆盖 CSS 变量可以快速改变品牌色：

```css
:root {
  --vp-c-brand-1: #2d6a4f;
  --vp-c-brand-2: #40916c;
}
```

同时可以通过 Vue 组件注册和 layout slots 来注入自定义内容，比如博客专属的 Hero 区域和文章列表。

## 启动开发

```bash
npm install
npm run docs:dev
```

打开 `http://localhost:5173` 即可预览。
