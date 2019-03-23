// import HelloWorld from '@/pages/HelloWorld'
// 路由的懒加载
const Home = () => import(/* webpackChunkName: "group-footer" */ '@/pages/Home')
const Kind = () => import(/* webpackChunkName: "group-footer" */ '@/pages/kind')
const Cart = () => import(/* webpackChunkName: "group-footer" */ '@/pages/Cart')
const Users = () => import(/* webpackChunkName: "group-footer" */ '@/pages/Users')
const Dingdan = () => import(/* webpackChunkName: "group-footer" */ '@/pages/Dingdan')
const Detail = () => import(/* webpackChunkName: "group-nofooter" */ '@/pages/Detail')
const Register = () => import(/* webpackChunkName: "group-footer" */ '@/pages/Register')
const Footer = () => import(/* webpackChunkName: "group-footer" */ '@/components/Footer')
// const Rightnav = () => import(/* webpackChunkName: "group-footer" */ '@/components/Right_nav')
const Footer1 = () => import(/* webpackChunkName: "group-footer" */ '@/components/Footer1')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    components: {
      // default: () => import(/* webpackChunkName: "group-footer" */ '@/pages/Home'),
      default: Home,
      footer: Footer
    },
    alias: '/h'
  },
  {
    path: '/kind',
    name: 'kind',
    components: {
      default: Kind,
      footer: Footer
    }
  },
  {
    path: '/search',
    name: 'search',
    components: {
      default: () => import(/* webpackChunkName: "group-footer" */ '@/pages/Search')
    }
  },
  {
    path: '/dingdan',
    name: 'dingdan',
    components: {
      default: Dingdan
    }
  },
  {
    path: '/phone',
    name: 'phone',
    components: {
      default: () => import(/* webpackChunkName: "group-footer" */ '@/pages/Phone')
    }
  },
  {
    path: '/cart',
    name: 'cart',
    components: {
      default: Cart
      // footer: Footer
    }
    // ,
    // beforeEnter (to, form, next) {
    //   if (localStorage.getItem('isLogin' === 'ok')) {
    //     next()
    //   } else {
    //     next('/register')
    //   }
    // }
  },
  {
    path: '/users',
    name: 'users',
    components: {
      default: Users,
      footer: Footer
    }
  },
  {
    path: '/city',
    name: 'city',
    components: {
      default: () => import(/* webpackChunkName: "group-footer" */ '@/pages/City'),
      footer: Footer
    }
  },
  {
    path: '/detail/:id',
    name: 'detail',
    components: {
      default: Detail,
      footer1: Footer1
    }
  },
  {
    path: '/register',
    name: 'register',
    components: {
      default: Register
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      default: () => import(/* webpackChunkName: "group-footer" */ '@/pages/Login')
    }
  }
]

export default routes
