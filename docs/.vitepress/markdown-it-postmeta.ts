import type MarkdownIt from 'markdown-it'
import type StateCore from 'markdown-it/lib/rules_core/state_core'

/** VitePress render env：frontmatter 由其内置 frontmatter 插件写入 */
interface RenderEnv {
  frontmatter?: Record<string, any>
  [key: string]: any
}

/**
 * 在文章 H1 标题之后自动注入 meta 信息（date / author / tags）。
 *
 * 为什么是 markdown-it 插件而非主题 slot：
 * VitePress 默认主题没有任何 slot 能落在「H1 下方、正文上方」——H1 是
 * markdown 编译后 <Content> 内部的产物，主题组件无法穿透进去。`doc-before`
 * slot 渲染在 H1 上方。因此在 markdown token 层注入是唯一能保证
 * 「H1 → meta → 正文」顺序的方式。
 *
 * 数据来源：env.frontmatter（VitePress 的 frontmatter 插件在本插件运行前
 * 已写好 env.frontmatter，可直接读取）。
 */
export function postmetaPlugin(md: MarkdownIt) {
  md.core.ruler.after('block', 'postmeta', (state) => {
    const env = state.env as RenderEnv
    const fm = env.frontmatter
    if (!fm || !fm.date) return

    const html = buildMetaHTML(fm)
    if (!html) return

    // 找到第一个 H1（heading_open level 1）的 heading_close 位置
    const tokens = state.tokens
    let insertAt = -1
    for (let i = 0; i < tokens.length; i++) {
      if (
        tokens[i].type === 'heading_open' &&
        tokens[i].tag === 'h1'
      ) {
        // 找到与之配对的 heading_close
        for (let j = i + 1; j < tokens.length; j++) {
          if (tokens[j].type === 'heading_close' && tokens[j].tag === 'h1') {
            insertAt = j + 1
            break
          }
        }
        break
      }
    }

    if (insertAt === -1) return

    const token = new state.Token('html_block', '', 0)
    token.content = html
    token.block = true
    tokens.splice(insertAt, 0, token)
  })
}

function formatDate(date: unknown): string {
  if (!date) return ''
  if (date instanceof Date) return date.toISOString().slice(0, 10)
  // YAML 中 `date: "2026-07-20"` 为字符串；`date: 2026-07-20` 被解析为 Date
  return String(date).split('T')[0]
}

function escapeHTML(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildMetaHTML(fm: Record<string, any>): string {
  const date = formatDate(fm.date)
  const author = fm.author ? String(fm.author) : ''
  const tags: string[] = Array.isArray(fm.tags) ? fm.tags.map(String) : []

  const parts: string[] = [`<time>${escapeHTML(date)}</time>`]
  if (author) parts.push(`<span class="post-author">by ${escapeHTML(author)}</span>`)
  for (const tag of tags) {
    parts.push(`<span class="post-tag">${escapeHTML(tag)}</span>`)
  }
  return `<div class="post-info">\n  ${parts.join('\n  ')}\n</div>`
}
