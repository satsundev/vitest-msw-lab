import { createRouter, createWebHistory } from 'vue-router'
import MyGrid from '../components/MyGrid.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MyGrid',
      component: MyGrid,
    },
  ],
})

export default router
