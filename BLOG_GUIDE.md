# 博客使用规范

## 📋 快速参考清单

当你有新文章要发布时，按以下步骤操作：

1. [ ] 在 `docs/posts/` 下创建 `.md` 文件（kebab-case 命名）
2. [ ] 填写 frontmatter（title、date、excerpt、tags；可选 author）
3. [ ] 将文章图片放入 `docs/public/images/文章名/` 目录（如有）
4. [ ] 编写文章正文：第一行是 `# 标题`，紧跟正文（meta 区会自动生成，无需手写）
5. [ ] `npm run docs:dev` 本地预览验证
6. [ ] `npm run docs:build` 构建验证
7. [ ] 提交代码并部署

---

## 1. 创建文章文件

在 `docs/posts/` 目录下创建新的 Markdown 文件：

```
docs/posts/your-article-title.md
```

**命名规则**：使用 **kebab-case**（小写字母 + 连字符），避免特殊字符和空格。

## 2. 填写 Frontmatter

文章顶部必须包含完整的 frontmatter：

```yaml
---
title: 文章标题
date: 2026-07-03
excerpt: 文章摘要，用于文章列表展示（建议 50-100 字）
tags:
  - 标签1
  - 标签2
author: 310   # 可选
---
```

**字段说明**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 文章标题 |
| date | string | 是 | 发布日期，格式：YYYY-MM-DD（YAML 会自动解析为日期，渲染时格式化回 YYYY-MM-DD） |
| excerpt | string | 是 | 文章摘要，用于列表展示和 RSS/OG description |
| tags | string[] | 否 | 文章标签，用于列表页筛选 |
| author | string | 否 | 作者名，显示在文章 meta 区 |

**tag 命名约定**：同一个概念只用一种写法，避免大小写不一致（如 `PKM` 和 `pkm` 并存）。缩写用大写（如 `PKM`），普通英文用小写（如 `vextab`），中文用本字（如 `吉他`）。复用已有 tag 时请保持与历史一致。

## 3. 添加文章正文

在 frontmatter 之后编写 Markdown 正文。**第一行是 H1 标题**，meta 信息（日期/作者/标签）会由 markdown-it 插件自动注入到标题下方，无需手写：

```markdown
# 文章标题

## 第一个小节

正文内容...
```

> ⚠️ 不要在正文里手写 `<div class="post-info">...</div>`。该信息已由 `markdown-it-postmeta.ts` 插件根据 frontmatter 自动生成，手写会导致重复。

## 4. 图片管理

文章中使用的图片需要存放在 `docs/public/images/` 目录下，按文章名创建子目录管理。

### 目录结构

```
docs/public/
├── images/           # 存放所有文章图片
│   ├── post-title/   # 按文章名创建子目录（与 .md 文件名一致）
│   │   └── img1.png
│   └── another-post/
│       └── screenshot.png
└── favicon.svg
```

### 命名规则

- 使用 **kebab-case**（小写字母 + 连字符）
- 避免中文文件名（可能导致编码问题）
- 保持描述性，便于识别

### 引用方式

在 Markdown 中使用根路径 `/` 引用图片：

```markdown
![图片描述](/images/post-title/img1.png)
```

### 优化建议

- 建议使用 WebP 或 AVIF 格式减小体积
- 控制图片尺寸，避免超大图
- 图片宽度建议不超过 1200px

## 5. 本地预览验证

```bash
npm run docs:dev
```

打开 `http://localhost:5173/blog-ctz-v2/` 检查：
- 文章列表页（`/posts/`）是否显示新文章
- 文章页内容是否正确渲染（标题、自动生成的 meta 区、正文）
- 标签筛选区是否能按新 tag 正确筛选

**注意**：如果在 dev server 运行期间新增文章，文章列表（基于 `createContentLoader`）会自动热更新。

## 6. 构建验证

```bash
npm run docs:build
```

确保构建过程无错误。构建时会自动生成以下产物：

| 产物 | 说明 |
|------|------|
| `dist/sitemap.xml` | 站点地图（基于 `config.mts` 的 `sitemap.hostname`） |
| `dist/feed.xml` | RSS 2.0 订阅源（`buildEnd` 钩子，复用文章数据） |
| 每页 `<head>` 里的 OG/Twitter meta | 由 `transformHead` 从 frontmatter 自动生成 |

## 7. 文章列表页与筛选

文章列表页（`/posts/`）由 `<PostList />` 组件渲染，提供：

- **搜索框**：对 title / excerpt / tags 做子串匹配（不区分大小写）
- **标签筛选**：标签按出现次数降序排列，单选切换（点已选中的取消、点另一个切换）
- **联动**：搜索与标签筛选是 AND 关系（同时满足才显示）
- **文章项内的标签可点击**直接触发筛选

数据来自 `posts.data.mts` 的 `createContentLoader('posts/*.md')`，是全站唯一的文章数据源（列表页、RSS 都复用它）。

---

## ❓ 常见问题

### Q: 图片不显示（404）？

A: 确保图片文件位于 `docs/public/images/文章名/` 目录下，且引用路径正确（如 `/images/post-title/img.png`）。

### Q: 中文文件名导致图片无法加载？

A: 避免使用中文文件名，改为 kebab-case 命名（如 `screenshot.png` 而非 `截图.png`）。

### Q: 文章列表没有显示新文章？

A: 确保文件位于 `docs/posts/` 目录下，且 frontmatter 中包含 `title` 和 `date` 字段。`index.md` 会被自动排除。

### Q: 文章 meta 区（日期/作者/标签）没显示？

A: meta 区由 markdown-it 插件根据 frontmatter 自动注入到 H1 标题之后。前提是：(1) frontmatter 有 `date` 字段；(2) 正文第一行是 `# 标题`。不要手写 meta 区，否则会重复。

### Q: 构建失败？

A: 检查 Markdown 语法是否正确，frontmatter 格式是否符合 YAML 规范。
