import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/login',
      component: () => import('@/components/Login')
    },
    { path: '/home',
      component: () => import('@/components/Home'),
      children: [
        {
          path: '/home/search',
          component: () => import('@/components/Search'),
        },
        {
          path: '/home/resource',
          component: () => import('@/components/Resource'),
        },
        {
          path: '/home/hello',
          component: () => import('@/components/HelloWorld'),
        }
      ]
    }
  ]
})
