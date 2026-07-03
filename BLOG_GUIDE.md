# 博客使用规范

## 📋 快速参考清单

当你有新文章要发布时，按以下步骤操作：

1. [ ] 在 `docs/posts/` 下创建 `.md` 文件（kebab-case 命名）
2. [ ] 填写 frontmatter（title、date、excerpt、tags）
3. [ ] 将文章图片放入 `docs/public/images/文章名/` 目录（如有）
4. [ ] 编写文章正文，在正文中引用图片
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
---
```

**字段说明**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 文章标题 |
| date | string | 是 | 发布日期，格式：YYYY-MM-DD |
| excerpt | string | 是 | 文章摘要，用于列表展示 |
| tags | string[] | 否 | 文章标签，用于分类 |

## 3. 添加文章正文

在 frontmatter 之后编写 Markdown 正文。建议在正文开头添加文章信息区：

```markdown
# 文章标题

<div class="post-info">
  <time>2026-07-03</time>
  <span class="post-tag">标签1</span>
  <span class="post-tag">标签2</span>
</div>

## 正文内容

...
```

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

打开 `http://localhost:5173` 检查：
- 首页文章列表是否显示新文章
- 文章页内容是否正确渲染
- 侧边栏是否显示新文章链接
- 标签和日期是否正确显示

**注意**：如果在 dev server 运行期间新增文章，需要重启 `npm run docs:dev` 才能刷新侧边栏。文章列表会自动热更新，但侧边栏需要重新读取配置。

## 6. 构建验证

```bash
npm run docs:build
```

确保构建过程无错误。

---

## ❓ 常见问题

### Q: 图片不显示（404）？

A: 确保图片文件位于 `docs/public/images/文章名/` 目录下，且引用路径正确（如 `/images/post-title/img.png`）。

### Q: 中文文件名导致图片无法加载？

A: 避免使用中文文件名，改为 kebab-case 命名（如 `screenshot.png` 而非 `截图.png`）。

### Q: 文章列表没有显示新文章？

A: 确保 frontmatter 中包含 `title` 和 `date` 字段，且文件位于 `docs/posts/` 目录下。

### Q: 侧边栏没有显示新文章？

A: 侧边栏会自动扫描 `docs/posts/` 目录生成，确保 frontmatter 中包含 `title` 和 `date` 字段。如果在 dev server 运行期间新增文章，需要重启 `npm run docs:dev` 才能刷新侧边栏。

### Q: 构建失败？

A: 检查 Markdown 语法是否正确，frontmatter 格式是否符合 YAML 规范。