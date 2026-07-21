# CTZ's Blog

记录技术成长与思考

## 🚀 技术栈

- **框架**: VitePress 1.x
- **语言**: Vue 3 + TypeScript
- **构建工具**: Vite

## 📦 安装

```bash
npm install
```

## 🚗 运行

### 开发模式

```bash
npm run docs:dev
```

访问 http://localhost:5173/blog-ctz-v2/ 查看博客。

### 构建生产版本

```bash
npm run docs:build
```

### 预览生产版本

```bash
npm run docs:preview
```

## 📁 项目结构

```
docs/
├── .vitepress/
│   ├── config.mts          # VitePress 配置
│   ├── theme/
│   │   ├── components/     # 自定义组件
│   │   ├── custom.css      # 自定义样式
│   │   └── index.ts        # 主题入口
├── posts/                  # 文章目录
│   ├── index.md            # 文章列表页
│   └── *.md                # 文章内容
├── public/                 # 静态资源
│   ├── images/             # 图片目录
│   └── favicon.svg         # 网站图标
├── about.md                # 关于页面
└── index.md                # 首页
```

## ✨ 特性

- **自动文章列表**: Sidebar 自动从 `posts/` 目录读取文章元数据并按日期排序
- **响应式设计**: 支持桌面端和移动端访问
- **Markdown 支持**: 完整的 Markdown 语法支持

## 📝 撰写文章

参考 [BLOG_GUIDE.md](BLOG_GUIDE.md) 了解文章格式规范。

## 🚀 部署

### GitHub Pages

1. 确保 `base` 配置与仓库名称一致：
   ```ts
   base: '/blog-ctz-v2/'
   ```

2. 构建项目：
   ```bash
   npm run docs:build
   ```

3. 将 `docs/.vitepress/dist` 目录部署到 GitHub Pages。

## 📄 许可证

本项目采用 [知识共享署名 4.0 国际许可协议](https://creativecommons.org/licenses/by/4.0/)（CC BY 4.0）。
