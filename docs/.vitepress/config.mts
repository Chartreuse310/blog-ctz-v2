import { defineConfig } from 'vitepress'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

function getSidebarItems() {
  try {
    const postsDir = join(__dirname, '../posts')
    return readdirSync(postsDir, { withFileTypes: true })
      .filter(dirent => dirent.isFile() && dirent.name.endsWith('.md') && dirent.name !== 'index.md')
      .map(dirent => {
        const content = readFileSync(join(postsDir, dirent.name), 'utf-8')
        const match = content.match(/^title:\s*(.+)$/m)
        const title = match ? match[1].trim() : dirent.name.replace('.md', '')
        return {
          text: title,
          link: `/posts/${dirent.name.replace('.md', '')}`
        }
      })
      .sort((a, b) => a.text.localeCompare(b.text))
  } catch (e) {
    console.warn('Failed to load sidebar items:', e)
    return []
  }
}

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
          items: getSidebarItems()
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
