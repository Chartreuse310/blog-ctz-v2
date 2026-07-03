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