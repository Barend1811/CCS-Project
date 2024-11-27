import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import UserView from '../views/UserView.vue'
import SetupView from '@/views/SetupView.vue'
import EditView from '@/views/EditView.vue'
import store from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView,

    },
    {
      path: '/Setup',
      name: 'Setup',
      component: SetupView,
    },

    {
      path: '/User',
      name: 'User',
      component: UserView,
    },

    {
      path: '/User/Edit',
      name: 'Edit',
      component: EditView,
    }
  ],
})

router.beforeEach((to, from) => {
  let status = store.getters.isLoggedIn
  if (!status && (to.name == 'User' || to.name == 'Edit')) {
    return { name: 'Login' }
  } else if (status && (to.name == 'Login' || to.name == 'Setup')) {
    return { name: 'User' }
  }
})

export default router
