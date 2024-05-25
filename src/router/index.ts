import { createRouter, createWebHistory } from 'vue-router'
import ChatView from '@/views/ChatView.vue'
import LoginView from '@/views/LoginView.vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'chat',
      component: ChatView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: () => {
        const { isauthenticated } = storeToRefs(useAuthStore())

        if (isauthenticated.value) {
          return false
        }
      }
    }
  ]
})

let checkLoginSubscribed = false

router.beforeEach(async (to) => {
  const { isauthenticated } = storeToRefs(useAuthStore())
  const { subscribeToAuth } = useAuthStore()

  if (!checkLoginSubscribed) {
    checkLoginSubscribed = true
    subscribeToAuth()
  }

  if (to.name !== 'login' && !isauthenticated.value) {
    return {
      name: 'login'
    }
  }
})

export default router
