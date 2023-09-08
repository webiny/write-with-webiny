import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Blog from '@/views/Blog.vue'
import PostDetail from '@/views/PostDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/post/:slug',
    name: 'PostDetail',
    component: PostDetail
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
