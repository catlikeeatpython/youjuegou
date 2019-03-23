import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

// 必须实例化

const router = new Router({
  routes
})
// 全局导航守卫
// router.beforeEach((to, from, next) => {
//   console.log(to)
//   if (to.path === '/cart') {
//     if (localStorage.getItem('isLogin') === 'ok') {
//       next()
//     } else {
//       // alert('小样没登录')
//       next('/register')
//     }
//   } else {
//     next()
//   }
// })

export default router
