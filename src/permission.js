import router from './router'
import { getToken, removeToken } from './utils/auth'

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    removeToken()
    next()
  } else {
    // 非登录页进入时拦截处理
    if (getToken()) {
      // 有登陆信息，允许进入
      next()
    } else {
      // 没有登陆信息时，强制跳到登陆页
      next('/login')
    }
  }
})
