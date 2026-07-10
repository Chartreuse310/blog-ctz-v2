import { defineConfig } from 'vitepress'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { vextabPlugin } from './markdown-it-vextab'

function getSidebarItems() {
  try {
    const postsDir = join(__dirname, '../posts')
    return readdirSync(postsDir, { withFileTypes: true })
      .filter(dirent => dirent.isFile() && dirent.name.endsWith('.md') && dirent.name !== 'index.md')
      .map(dirent => {
        const content = readFileSync(join(postsDir, dirent.name), 'utf-8')
        const titleMatch = content.match(/^title:\s*(["']?)(.+?)\1?$/m)
        const dateMatch = content.match(/^date:\s*(["']?)(.+?)\1?$/m)
        let title = titleMatch ? titleMatch[2].trim() : dirent.name.replace('.md', '')
        const emDashIndex = title.indexOf('——')
        if (emDashIndex !== -1) {
          title = title.substring(0, emDashIndex).trim()
        }
        const date = dateMatch ? dateMatch[2].trim() : ''
        return {
          text: `${date ? `<span class="sidebar-date">${date}</span>` : ''} ${title}`,
          link: `/posts/${dirent.name.replace('.md', '')}`,
          date
        }
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (e) {
    console.warn('Failed to load sidebar items:', e)
    return []
  }
}

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
    sidebar: {
      '/posts/': [
        {
          text: '近期文章',
          link: '/posts/',
          items: getSidebarItems()
        }
      ]
    },
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
