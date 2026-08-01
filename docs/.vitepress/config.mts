import { defineConfig } from 'vitepress'
import { vextabPlugin } from './markdown-it-vextab'

export default defineConfig({
  base: '/blog-ctz-v2/',
  lang: 'zh-CN',
  title: "CTZ's Blog",
  description: '记录技术成长与思考',
  markdown: {
    headers: {
      level: [2, 3]
    },
    config: (md) => {
      md.use(vextabPlugin)
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/blog-ctz-v2/favicon.svg', type: 'image/svg+xml' }]
  ],
  ignoreDeadLinks: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '关于', link: '/about' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Chartreuse310' }
    ],
    footer: {
      message: '基于 VitePress 构建',
      copyright: '© 2024-Present CTZ'
    },
    outline: false
  },
  vite: {
    ssr: {
      noExternal: ['vextab', 'vexflow']
    }
  }
})
