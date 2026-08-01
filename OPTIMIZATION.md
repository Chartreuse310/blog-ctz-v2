# 博客框架优化记录

> 基于 2026-08-01 的整体评审。逐项讨论后勾选。

## 🔴 重要问题

- [ ] **#1 文章正文手动重复渲染元信息**（已尝试，回退）
  - 现状：每篇文章 frontmatter 写一遍 title/date/author/tags，正文又手写一遍 `<div class="post-info">`。
  - 问题：易遗漏/不一致，date 改两处。
  - 方案：在 `DocLayout.vue` 用 `#doc-before` slot 从 frontmatter 自动注入。
  - 尝试（2026-08-01）：用 `#doc-before` slot 注入 PostMeta 组件。**回退原因**：`#doc-before` 渲染在 H1 **上方**，导致视觉顺序变成 meta → H1，明显变丑。
  - 教训：若要重做，应找能让 meta 出现在 **H1 下方** 的注入点（如自定义 doc layout / `#doc-top` 之外的方案），且不破坏现有视觉。暂搁置。

- [x] **#2 两套数据加载逻辑需统一** ✅
  - 现状：`PostList.vue` 用 `createContentLoader`；`config.mts` 的 `getSidebarItems` 用 `fs.readdirSync` + 正则。
  - 问题：脆弱，且有 `——` 破折号截断标题的隐式约定。
  - 落地（2026-08-01，路径 A）：侧边栏列文章只是当初顺手填的（非有意设计），故删除 `getSidebarItems()` 函数、`fs`/`path` import、`themeConfig.sidebar` 整块。文章数据单一来源为 `createContentLoader`（PostList + posts.data.mts）。
  - 验证：构建通过；4 篇文章页 sidebar DOM 消失、outline-container 保留；列表页正常显示 4 篇文章；about 页无副作用。config.mts 从 82 行精简到 42 行。

- [ ] **#3 自定义 Outline 是体验倒退**
  - 现状：关掉原生 outline，自写 `Outline.vue`，仅在点击时高亮。
  - 问题：滚动不跟随高亮。
  - 方案：改用主题原生 outline（`outline: { level: [2,3], label }`）。

## 🟡 建议优化

- [ ] **#4 SEO / 内容发现基础设施缺失**
  - 缺 sitemap.xml、RSS feed、OG/Twitter Card meta。

- [ ] **#5 未启用本地搜索**
  - 方案：`themeConfig.search = { provider: 'local' }`。

- [ ] **#6 vextab 用 base64 经 HTML 属性传递**
  - base64 放大约 33%，乐谱长时属性膨胀。可改用 provide/inject 或占位符方案。

- [ ] **#7 `ignoreDeadLinks: true` 建议关掉或收窄**
  - 掩盖死链，建议局部忽略或开启并修复。

- [ ] **#8 根目录 `changelog.md` 悬空**
  - 未接入站点，需决定去留（接入页面 or 移入文档说明）。

## 🟢 小细节

- [ ] **#9 `.DS_Store` 已被提交** → 加入 `.gitignore` 并 `git rm --cached`。
- [ ] **#10 `assets/` 与 `.uploads/` 目录用途不明** → 确认是否在用。
- [ ] **#11 `lastUpdatedText` 未本地化** → 会显示英文 "Last updated"。
- [ ] **#12 PostList 的 tags 仅展示，无法筛选** → 文章多后需 `/tags/` 页。
- [ ] **#13 首页文案与实际内容方向脱节** → features 写"前端工程/设计系统"，实际有吉他/知识管理。
