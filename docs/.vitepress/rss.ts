import { writeFileSync } from 'fs'
import { join } from 'path'
import { Feed } from 'feed'
import { createContentLoader, type SiteConfig } from 'vitepress'
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from './og'

/**
 * 在构建结束后生成 RSS 2.0 feed。
 *
 * 复用 createContentLoader('posts/*.md') —— 与 PostList / posts.data.mts
 * 同源，保证文章数据只有一处。
 */
export async function buildRSS(siteConfig: SiteConfig) {
  if (!siteConfig.outDir) return

  const feed = new Feed({
    title: SITE_NAME,
    description: '记录技术成长与思考',
    id: SITE_URL,
    link: SITE_URL,
    language: 'zh-CN',
    image: DEFAULT_OG_IMAGE,
    favicon: `${SITE_URL}favicon.svg`,
    copyright: `© ${new Date().getFullYear()}-Present CTZ`,
    updated: new Date(),
    feedLinks: {
      rss: `${SITE_URL}feed.xml`
    }
  })

  // 复用与 posts.data.mts 相同的 loader（单一数据源）
  const posts = await createContentLoader('posts/*.md', {
    render: false,
    excerpt: true
  }).load()

  for (const post of posts) {
    // 排除列表页 index
    if (post.url.endsWith('/posts/') || post.url.endsWith('/posts')) continue

    const fm = post.frontmatter
    const dateRaw = fm.date
    const date = dateRaw instanceof Date ? dateRaw : new Date(String(dateRaw))

    feed.addItem({
      title: String(fm.title || post.url),
      id: `${SITE_URL}${post.url.replace(/^\//, '')}`,
      link: `${SITE_URL}${post.url.replace(/^\//, '')}`,
      description: String(fm.excerpt || ''),
      date,
      category: Array.isArray(fm.tags)
        ? fm.tags.map((t: string) => ({ name: String(t) }))
        : []
    })
  }

  writeFileSync(join(siteConfig.outDir, 'feed.xml'), feed.rss2(), 'utf-8')
}
