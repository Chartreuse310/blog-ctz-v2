import { defineConfig } from 'vitepress'
import { vextabPlugin } from './markdown-it-vextab'
import { postmetaPlugin } from './markdown-it-postmeta'
import { transformHead as ogTransformHead } from './og'
import { buildRSS } from './rss'

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
      md.use(postmetaPlugin)
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/blog-ctz-v2/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: "CTZ's Blog", href: '/blog-ctz-v2/feed.xml' }]
  ],
  ignoreDeadLinks: true,
  lastUpdated: true,
  sitemap: {
    // hostname 必须含 base 与尾斜杠，否则 sitemap 内 URL 会丢失 base 段
    hostname: 'https://chartreuse310.github.io/blog-ctz-v2/'
  },
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
  transformHead: ogTransformHead,
  buildEnd: buildRSS,
  vite: {
    ssr: {
      noExternal: ['vextab', 'vexflow']
    }
  }
})
