import type { TransformContext } from 'vitepress'

/** 站点根 URL（含 base 与尾斜杠） */
export const SITE_URL = 'https://chartreuse310.github.io/blog-ctz-v2/'

/** 站点名 */
export const SITE_NAME = "CTZ's Blog"

/**
 * 默认 OG 图（绝对 URL）。
 * TODO: 设计一张 1200x630 的默认分享图放到 docs/public/og/default.png。
 * 文件未就绪前，分享时图片显示空白但不报错。
 */
export const DEFAULT_OG_IMAGE = `${SITE_URL}og/default.png`

/**
 * 为每个页面生成 Open Graph / Twitter Card meta。
 *
 * - 文章页（posts/ 下，有 frontmatter.title）：og:type=article，复用 title/excerpt/date/tags
 * - 其它页（首页/关于）：og:type=website，站点级默认值
 */
export function transformHead(context: TransformContext) {
  const { pageData } = context
  const fm = pageData.frontmatter
  const relativePath = pageData.relativePath // 如 'posts/why-i-play-guitar.md'

  const isPost = relativePath.startsWith('posts/') && !relativePath.endsWith('index.md')
  const title = String(fm.title || pageData.title || SITE_NAME)
  const description = String(fm.excerpt || fm.description || '记录技术成长与思考')

  // og:url：站点根 + 页面相对路径（去掉 .md，首页为根）
  const pagePath = relativePath
    .replace(/\.md$/, '')
    .replace(/(^|\/)index$/, '')
  const url = pagePath ? `${SITE_URL}${pagePath}.html` : SITE_URL

  const head = [
    ['meta', { property: 'og:site_name', content: SITE_NAME }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:image', content: DEFAULT_OG_IMAGE }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:image', content: DEFAULT_OG_IMAGE }]
  ]

  if (isPost) {
    head.push(['meta', { property: 'og:type', content: 'article' }])
    if (fm.date) {
      const d = fm.date instanceof Date ? fm.date : new Date(String(fm.date))
      head.push(['meta', { property: 'article:published_time', content: d.toISOString() }])
    }
  } else {
    head.push(['meta', { property: 'og:type', content: 'website' }])
  }

  return head
}
