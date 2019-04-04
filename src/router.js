import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/login.vue'

Vue.use(Router)

const pageRoutes = [
  {
    path: '/commercialCustomer',
    name: 'CommercialCustomer',
    component: () => import('@/views/commercialCustomer')
  },
  {
    path: '/channelPartner',
    name: 'ChannelPartner',
    component: () => import('@/views/channelPartner')
  }
]

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Login,
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/commercialCustomer',
      children: pageRoutes
    },
    {
      path: '/home2'
    }
  ]
})
