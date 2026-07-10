import type MarkdownIt from 'markdown-it'

export function vextabPlugin(md: MarkdownIt) {
  const defaultFence = md.renderer.rules.fence!.bind(md.renderer.rules)

  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx]
    const info = token.info.trim()

    if (info === 'vextab') {
      const code = token.content
      const base64Code = Buffer.from(code, 'utf-8').toString('base64')
      return `<VexTabDemo code-base64="${base64Code}" />`
    }

    return defaultFence(tokens, idx, options, env, slf)
  }
}
