# 博客框架优化记录

> 基于 2026-08-01 的整体评审。逐项讨论后勾选。

## 🔴 重要问题

- [x] **#1 文章正文手动重复渲染元信息** ✅
  - 现状：每篇文章 frontmatter 写一遍 title/date/author/tags，正文又手写一遍 `<div class="post-info">`。
  - 问题：易遗漏/不一致，date 改两处。
  - 方案：在 `DocLayout.vue` 用 `#doc-before` slot 从 frontmatter 自动注入。
  - 尝试 1（2026-08-01，回退）：用 `#doc-before` slot 注入。**失败原因**：该 slot 渲染在 H1 **上方**，破坏 `H1 → meta → 正文` 顺序，视觉变丑。
  - 调研结论：H1 是 markdown `<Content>` 内部产物，**主题层没有任何 slot 能落在「H1 下方、正文上方」**。
  - 落地（2026-08-01，路径 A markdown-it 插件）：新增 `markdown-it-postmeta.ts`，用 `md.core.ruler.after('block')` 在 H1 token 之后注入 `<div class="post-info">`。数据来自 `env.frontmatter`（VitePress 的 frontmatter 插件在本插件前已写好）。守卫条件：仅 `frontmatter.date` 存在才注入。
  - 验证：构建通过；4 篇文章页 HTML 中 H1 严格在 meta 之前；DOM 快照确认渲染顺序 `H1 → meta → 正文`；about/首页/列表页无注入。复用现有 CSS 类，视觉零变化。

- [x] **#2 两套数据加载逻辑需统一** ✅
  - 现状：`PostList.vue` 用 `createContentLoader`；`config.mts` 的 `getSidebarItems` 用 `fs.readdirSync` + 正则。
  - 问题：脆弱，且有 `——` 破折号截断标题的隐式约定。
  - 落地（2026-08-01，路径 A）：侧边栏列文章只是当初顺手填的（非有意设计），故删除 `getSidebarItems()` 函数、`fs`/`path` import、`themeConfig.sidebar` 整块。文章数据单一来源为 `createContentLoader`（PostList + posts.data.mts）。
  - 验证：构建通过；4 篇文章页 sidebar DOM 消失、outline-container 保留；列表页正常显示 4 篇文章；about 页无副作用。config.mts 从 82 行精简到 42 行。

- [x] **#3 自定义 Outline 是体验倒退** ✅
  - 现状：关掉原生 outline，自写 `Outline.vue`，仅在点击时高亮。
  - 问题：滚动不跟随高亮。
  - 调研结论（2026-08-01）：原生 outline 的 `label` 是静态 string，**无法 per-page 显示文章标题**（VitePress 1.6.4 无此机制）。因此"自定义 outline 显示文章标题"的诉求合理，应保留自定义、只补滚动高亮。
  - 落地（方案 1 + 要 marker）：`Outline.vue` 改为复用 VitePress 内部的 `useActiveAnchor` + `getHeaders`（从 `vitepress/dist/client/theme-default/composables/outline` 导入），获得滚动跟随高亮 + 滑动 marker。保留自定义的"文章标题"label 和样式。
  - 过程中修正两个坑：(1) 不能用 `theme.outline` 作为 `getHeaders` 的 range —— 全局 `outline:false` 会让它返回空数组，改为固定传 `[2,3]`；(2) SSR 阶段列表为空是官方设计（getHeaders 走客户端 DOM 查询），label 仍 SSR 可用。
  - 验证：构建通过；浏览器实测点击 outline 链接后 active 高亮生效、marker 定位（top:39px, opacity:1）正确，与原生公式一致。

## 🟡 建议优化

- [x] **#4 SEO / 内容发现基础设施缺失** ✅
  - 缺 sitemap.xml、RSS feed、OG/Twitter Card meta。
  - 落地（2026-08-01）：
    - **Sitemap**：VitePress 1.6.4 原生支持，`config.mts` 加 `sitemap.hostname`（必须含 base + 尾斜杠，否则 URL 丢 base 段）。构建自动生成 sitemap.xml，7 个 URL 全部含 base。
    - **OG / Twitter Card**：新增 `og.ts`，用 `transformHead` 钩子从 frontmatter 批量生成 per-page meta（title/excerpt/date/tags 复用）。文章页 og:type=article（含 article:published_time），首页/about og:type=website。twitter:card=summary_large_image。
    - **RSS**：新增 `rss.ts`，用 `buildEnd` + `createContentLoader('posts/*.md')` 复用单一数据源 + `feed` 包生成 RSS 2.0 feed.xml。head 加 RSS 自动发现标签。
  - TODO（待你后续处理）：og:image 当前引用 `og/default.png` 但**图片文件尚未创建**，需设计一张 1200×630 默认分享图放到 `docs/public/og/default.png`。文件缺失时分享预览无图但不报错。

- [x] **#5 文章列表页 tag 筛选 + 搜索** ✅（需求调整：从「本地搜索」改为「tag 筛选为主 + 集成搜索」）
  - 落地（2026-08-01）：重写 `PostList.vue`，在列表顶部加筛选区：
    - **tag 横排**：按出现次数降序，单选切换（点已选取消、点另一个切换），选中态高亮
    - **搜索框**：title/excerpt/tags 子串匹配，不区分大小写
    - **AND 联动**：tag 与搜索同时满足才显示
    - **文章项内 tag 可点击**触发筛选（增强便利）
    - **空状态**：无匹配时显示提示 + 清除筛选按钮
  - CSS 复用现有 `.post-tag` 基础样式，新增选中态/搜索框/空状态样式（brand 色变量）。
  - 验证：构建通过；SSR 输出仍为全部 4 篇（SEO 不损）；浏览器实测 tag 筛选/搜索/AND 联动/空状态/清除全部正常。
  - 关于全局搜索：**有意不启用** `themeConfig.search`（VitePress 内置全局搜索是顶部导航栏模态框，与列表页内联搜索定位不同，且当前文章量少无需全局搜索）。确认过：未配置 search 时顶部导航栏**不会渲染搜索按钮**（`VPNavBarSearch` 内容为空占位，无死按钮问题），导航栏布局正常。

- [ ] **#6 vextab 用 base64 经 HTML 属性传递**
  - base64 放大约 33%，乐谱长时属性膨胀。可改用 provide/inject 或占位符方案。

- [ ] **#7 `ignoreDeadLinks: true` 建议关掉或收窄**
  - 掩盖死链，建议局部忽略或开启并修复。

- [x] **#8 根目录 `changelog.md` 悬空** ✅（决定：保留不动）
  - 未接入站点，需决定去留（接入页面 or 移入文档说明）。
  - 决定（2026-08-01）：保留不动。它是 AI 辅助开发的变更日志（452 行），有历史保留价值，不需要接入站点。

## 🟢 小细节

- [x] **#9 `.DS_Store` 已被提交** ✅ → 加入 `.gitignore` 并 `git rm --cached`。
  - 落地（2026-08-01）：`.gitignore` 加 `.DS_Store` 规则；`git rm --cached .DS_Store` 移出跟踪（本地文件保留）。
- [x] **#10 `assets/` 与 `.uploads/` 目录用途** ✅（已确认，保留）
  - 原疑"用途不明"。确认（2026-08-01）：`assets/` 是有意保留的源文件暂存目录（每次更新前放源文件，处理完删除，git 历史可见该工作流）；`.uploads/` 当前空、用途未明但无影响，保留不动。
- [x] **#11 `lastUpdatedText` 未本地化** ✅
  - 落地（2026-08-01）：`themeConfig.lastUpdatedText: '最后更新于'`，构建产物从 "Last updated" 改为中文。
- [x] **#12 PostList 的 tags 仅展示，无法筛选** ✅（已被 #5 解决）
  - 原方案：文章多后需 `/tags/` 页。实际由 #5（列表页 tag 筛选 + 搜索）解决——tags 已可点击筛选，无需独立 `/tags/` 页。
- [ ] **#13 首页文案与实际内容方向脱节** → features 写"前端工程/设计系统"，实际有吉他/知识管理。
