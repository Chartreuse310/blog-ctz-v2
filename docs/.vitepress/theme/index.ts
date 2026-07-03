import DefaultTheme from 'vitepress/theme'
import './custom.css'
import BlogHero from './components/BlogHero.vue'
import PostList from './components/PostList.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BlogHero', BlogHero)
    app.component('PostList', PostList)
  }
}
