import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import home from '@/views/home'
import { getToken } from '@/utils/token'
import dashbord from '@/views/dashboard'


Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
      {
        path: '/',
        redirect: '/login'
      },
      {
        path: '/login',
        component: login
      },
      {
        path: '/home',
        component: home,
        redirect: '/dashbord',
        children: [
          {
            path: '/dashbord',
            component: dashbord
          }
        ]
      }
    ]
  })
  
  router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    const token = getToken
    if (!token) {
      return next('/login')
    }
    next()
  })
  
  export default router