import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: "CTZ's Blog",
  description: '记录技术成长与思考',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }]
  ],
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '关于', link: '/about' }
    ],
    sidebar: {
      '/posts/': [
        {
          text: '近期文章',
          items: [
            { text: '用 VitePress 搭建个人博客', link: '/posts/vitepress-blog' },
            { text: 'TypeScript 类型体操笔记', link: '/posts/typescript-notes' },
            { text: '从零搭建 Design System', link: '/posts/design-system' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],
    footer: {
      message: '基于 VitePress 构建',
      copyright: '© 2024-Present CTZ'
    },
    editLink: {
      pattern: 'https://github.com/your-username/blog/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    }
  },
  vite: {
    ssr: {
      noExternal: []
    }
  }
})
