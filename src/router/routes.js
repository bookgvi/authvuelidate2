import { isAuth, isNoAuth } from '@/helper/Auth'

export const routes = [
  {
    path: '/login',
    name: 'login',
    beforeEnter: isAuth,
    component: () => import('../views/Login')
  },
  {
    path: '/',
    name: '/',
    beforeEnter: isNoAuth,
    component: () => import('../views/Home'),
    children: [
      {
        path: '',
        component: () => import('../views/Hello'),
      },
      {
        path: 'hello',
        name: 'hello',
        component: () => import('../views/Hello'),
      },
      {
        path: 'about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  }
]
