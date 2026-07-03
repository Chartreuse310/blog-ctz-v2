import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  date: string
  excerpt: string
  tags?: string[]
  url: string
}

declare module 'vitepress' {
  interface ContentConfig {
    posts: Post[]
  }
}

export default createContentLoader('posts/*.md', {
  transform(rawData) {
    const posts = rawData
      .map(({ frontmatter, url }) => ({
        title: frontmatter.title,
        date: frontmatter.date,
        excerpt: frontmatter.excerpt || '',
        tags: frontmatter.tags || [],
        url
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return posts
  }
})
