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