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
      .filter(({ url }) => !url.endsWith('/posts/') && !url.endsWith('/posts/index'))
      .map(({ frontmatter, url }) => {
        const date = frontmatter.date
        const formattedDate = typeof date === 'string' 
          ? date.split('T')[0] 
          : date instanceof Date 
            ? date.toISOString().split('T')[0]
            : ''
        return {
          title: frontmatter.title,
          date: formattedDate,
          excerpt: frontmatter.excerpt || '',
          tags: frontmatter.tags || [],
          url
        }
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return posts
  }
})
