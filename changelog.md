# Changelog

## 2026-07-03

### 修改建议

**新增博客使用规范文档**

为了规范博客文章发布流程，降低遗漏风险，建议建立博客使用规范文档。

### 实现计划

1. 创建 `docs/blog-guide.md` 文件，包含完整的新增文章流程
2. 定义文件命名约定和 frontmatter 字段规范
3. 提供优化建议（自动生成侧边栏）

### 实施内容

- 创建了 [BLOG_GUIDE.md](BLOG_GUIDE.md)，包含以下内容：
  - 新增文章的 6 个步骤（创建文件 → 填写 frontmatter → 添加正文 → 本地预览 → 构建验证）
  - 文件命名约定（kebab-case）
  - frontmatter 字段说明表
  - 常见问题解答

### 修改建议

**实现侧边栏自动生成**

采纳优化建议，将侧边栏从手动维护改为自动扫描生成，降低遗漏风险。

### 实现计划

1. 修改 `docs/.vitepress/config.mts`，添加 `getSidebarItems` 函数
2. 自动扫描 `docs/posts/` 目录，从 frontmatter 中提取文章标题
3. 更新 `BLOG_GUIDE.md`，移除手动更新侧边栏步骤

### 实施内容

- 修改了 [config.mts](docs/.vitepress/config.mts)，添加了自动生成侧边栏的功能
- 更新了 [BLOG_GUIDE.md](BLOG_GUIDE.md)，移除了手动更新侧边栏步骤，简化发布流程
- 构建验证通过：`npm run docs:build` 成功

### 修改建议

**添加错误处理机制**

当 `postsDir` 目录不存在或无法读取时，`readdirSync` 会抛出错误导致构建失败。建议添加 try-catch 错误处理。

### 实现计划

1. 修改 `getSidebarItems` 函数，添加 try-catch 包裹
2. 捕获错误时输出警告日志并返回空数组
3. 验证构建是否正常

### 实施内容

- 修改了 [config.mts](docs/.vitepress/config.mts) 的 `getSidebarItems` 函数，添加了错误处理机制
- 构建验证通过：`npm run docs:build` 成功

### 修改建议

**新增图片管理规范**

为了规范博客文章中图片的存储和引用方式，避免路径混乱和 404 错误，建议建立图片管理规范。

### 实现计划

1. 更新 [BLOG_GUIDE.md](BLOG_GUIDE.md)，在快速参考清单中添加图片相关步骤
2. 新增「图片管理」章节，包含目录结构、命名规则、引用方式、优化建议
3. 在常见问题区补充图片相关 Q&A
4. 创建 `docs/public/images/` 目录并添加 `.gitkeep`
5. 验证构建是否正常

### 实施内容

- 更新了 [BLOG_GUIDE.md](BLOG_GUIDE.md)，添加了图片管理规范：
  - 在快速参考清单中增加了图片相关步骤（第3步：放入图片文件；第4步：编写正文并引用图片）
  - 新增「图片管理」章节（目录结构、命名规则、引用方式、优化建议）
  - 补充了图片不显示和中文文件名问题的 Q&A
- 创建了 `docs/public/images/` 目录并添加 `.gitkeep` 文件
- 构建验证通过：`npm run docs:build` 成功

### 修改建议

**更新简介页个人信息**

为了展示更准确的个人信息，需要更新 about.md 页面的名称、简介、头像、tags 和联系方式。

### 实现计划

1. 将头像图片复制到 `docs/public/images/about/` 目录并重命名为 `avatar.png`
2. 更新 [about.md](docs/about.md) 的名称、简介、头像、tags 和联系方式
3. 更新 [custom.css](docs/.vitepress/theme/custom.css) 中头像样式，适配图片显示
4. 验证构建是否正常

### 实施内容

- 更新了 [about.md](docs/about.md)：
  - 名称：沙楚子（CTZ）
  - 简介：一个喜欢瞎折腾的设计师 👾
  - 头像：使用 `/images/about/avatar.png`
  - tags：交互设计 / 建筑学 / 场景美术 / 技术美术 / 吉他 / PKM
  - GitHub：@Chartreuse310
  - Email：ctz_3e0@163.com
- 更新了 [custom.css](docs/.vitepress/theme/custom.css) 的 `.profile-avatar` 样式，添加 `object-fit: cover` 和边框
- 构建验证通过：`npm run docs:build` 成功

### 修改建议

**优化关于页布局和底部链接**

1. 头像顶部对齐名称
2. 删除"在 GitHub 上编辑此页"链接，改为"查看 GitHub 仓库"

### 实现计划

1. 修改 [custom.css](docs/.vitepress/theme/custom.css)，确保头像与名称顶部对齐
2. 修改 [config.mts](docs/.vitepress/config.mts)，移除全局 editLink 配置
3. 在 [about.md](docs/about.md) 中添加"查看 GitHub 仓库"链接
4. 验证构建是否正常

### 实施内容

- 更新了 [custom.css](docs/.vitepress/theme/custom.css)，为 `.profile-avatar` 和 `.profile-info` 添加 `align-self: flex-start` 确保顶部对齐
- 修改了 [config.mts](docs/.vitepress/config.mts)，移除了全局的 editLink 配置
- 更新了 [about.md](docs/about.md)，添加了"查看此博客的源代码"链接
- 构建验证通过：`npm run docs:build` 成功

### 修改建议

**新增文章：关于我的最终版知识组织方法——Solution Z的第一版设计**

为了分享个人知识组织方法，发布一篇关于 Solution Z 知识管理系统的文章。

### 实现计划

1. 将文章从 assets 目录移动到 docs/posts/，使用 kebab-case 命名
2. 配置 frontmatter（title、date、excerpt、tags）
3. 添加 post-info 文章信息区
4. 将图片移动到 docs/public/images/ 目录并更新引用路径
5. 验证构建是否正常

### 实施内容

- 创建了 [solution-z-knowledge-organization-method.md](docs/posts/solution-z-knowledge-organization-method.md)，包含：
  - frontmatter：标题、日期、摘要、标签（PKM、知识管理、Solution Z）
  - post-info：日期和标签展示
  - 正文：Solution Z 系统介绍、与 PARA 系统对比、实践效果
- 创建了图片目录 `docs/public/images/solution-z-knowledge-organization-method/`
- 移动并重命名图片为 `pixpin-2026-07-03-12-13-14.png`
- 更新了文章中的图片引用路径
- 构建验证通过：`npm run docs:build` 成功

### 修改建议

**文章页优化与清理**

1. 修复"近期文章"页空值问题
2. 调整文章列表样式，改为间隔一条线
3. 日期格式只显示年月日，不显示时分秒
4. 修复侧边栏自动生成逻辑，确保新文章正确显示
5. 删除示例文章文件

### 实施内容

- 修改了 [posts.data.mts](docs/.vitepress/theme/components/posts.data.mts)，添加 filter 排除 posts/index.md，避免空值显示；统一日期格式为 YYYY-MM-DD 字符串
- 修改了 [PostList.vue](docs/.vitepress/theme/components/PostList.vue)，移除本地日期格式化逻辑
- 修改了 [config.mts](docs/.vitepress/config.mts)：优化 `getSidebarItems` 的正则表达式，支持带引号的标题；侧边栏改为按日期降序排列
- 更新了 [BLOG_GUIDE.md](BLOG_GUIDE.md)，补充新增文章后需重启 dev server 的说明
- 删除了 [design-system.md](docs/posts/design-system.md)、[typescript-notes.md](docs/posts/typescript-notes.md)、[vitepress-blog.md](docs/posts/vitepress-blog.md)
- 构建验证通过：`npm run docs:build` 成功

### 修改建议

**侧边栏优化**

1. 标题简化：截取到「——」之前
2. 「近期文章」可点击跳转文章列表页
3. 「近期文章」下添加分割线，文章标题后显示日期胶囊

### 实施内容

- 修改了 [config.mts](docs/.vitepress/config.mts)：
  - `getSidebarItems` 中截取标题到「——」之前
  - 日期胶囊移到标题前面 `<span class="sidebar-date">${date}</span> ${title}`
  - 给「近期文章」添加 `link: '/posts/'`
- 修改了 [custom.css](docs/.vitepress/theme/custom.css)：
  - 添加侧边栏分割线样式
  - 添加 `.sidebar-date` 日期胶囊样式（margin-left 改为 margin-right）
- 构建验证通过：`npm run docs:build` 成功

### 修改建议

**完善 BLOG_GUIDE.md 侧边栏文档**

在博客使用规范中添加侧边栏相关的步骤和说明。

### 实施内容

- 更新了 [BLOG_GUIDE.md](BLOG_GUIDE.md)：
  - 在快速参考清单中添加侧边栏检查步骤
  - 新增第7章「侧边栏说明」，包含显示规则、交互行为和更新注意事项
- 构建验证通过：`npm run docs:build` 成功

### 修改建议

**移除「近期文章」页顶部标题**

为了简化页面布局，删除文章列表页顶部的「所有文章 按时间倒序排列」标题区域。

### 实施内容

- 修改了 [index.md](docs/posts/index.md)，删除了 `<BlogHero name="所有文章" tagline="按时间倒序排列" />` 组件
- 构建验证通过：`npm run docs:build` 成功

### 修改建议

**更新右上角 GitHub 链接**

将界面右上角的 GitHub 标志链接指向用户的 GitHub 主页。

### 实施内容

- 修改了 [config.mts](docs/.vitepress/config.mts) 的 `socialLinks` 配置，将 GitHub 链接从 `https://github.com` 更新为 `https://github.com/Chartreuse310`