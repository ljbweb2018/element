// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'

import '../src/common/stylus/border.css'
import '../src/common/stylus/icon.styl'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)

/* eslint-disable no-new */
const page404 = { template: '<div>page404</div>' }

const routes = [
  {
    path: '/',
    component: resolve => require(['./components/goods/goods.vue'], resolve)
  },
  {
    path: '/goods',
    component: resolve => require(['./components/goods/goods.vue'], resolve)
  },
  {
    path: '/ratings',
    component: resolve => require(['./components/ratings/ratings.vue'], resolve)
  },
  {
    path: '/seller',
    component: resolve => require(['./components/seller/seller.vue'], resolve)
  },
  // {
  //   path: '/fourth',
  //   component: resolve => require(['./components/fourth.vue'], resolve),
  //
  //   children:
  //     [
  //       {
  //         path: '/f1',
  //         component: resolve => require(['./components/fourth_child/f1.vue'], resolve)
  //       },
  //       {
  //         path: '/f2',
  //         component: resolve => require(['./components/fourth_child/f2.vue'], resolve)
  //       },
  //     ]
  // },

  {
    path: '/aaa', redirect: '/'
  },

  {
    path: '*', component: page404
  }

]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})

new Vue({
  el: '#app',
  router, // 注入到根实例中
  render: h => h(App)
})
