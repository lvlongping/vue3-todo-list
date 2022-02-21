import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home/home.vue'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  }
]
const Router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default Router
