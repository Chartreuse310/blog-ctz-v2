import DefaultTheme from 'vitepress/theme'
import './custom.css'
import BlogHero from './components/BlogHero.vue'
import PostList from './components/PostList.vue'
import Outline from './components/Outline.vue'
import VexTabDemo from './components/VexTabDemo.vue'
import DocLayout from './layouts/DocLayout.vue'

export default {
  extends: DefaultTheme,
  Layout: DocLayout,
  enhanceApp({ app }) {
    app.component('BlogHero', BlogHero)
    app.component('PostList', PostList)
    app.component('Outline', Outline)
    app.component('VexTabDemo', VexTabDemo)
  }
}
