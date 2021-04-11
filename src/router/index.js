/**
 * router配置
 */
import Vue from 'vue'
import Router from 'vue-router'
import * as Views from './views'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  mode: 'hash',
  routes: [
    {path: '/', redirect: '/home'},
    {path: '*', component: Views.Error404},
    // error page
    {path: '/403', name: '/403', component: Views.Error403 },
    {path: '/404', name: '/404', component: Views.Error404 },
    {path: '/refresh', name: '/refresh', component: Views.Refresh },
    {path: '/webshell/:terminal', name: '/webshell/webshell', component: Views.Webshell },
    {path: '/webshell/test', name: '/webshell/test', component: Views.WebshellTest },
    {
      path: '/index',
      name: '/index',
      component: Views.Layout,
      children:
        [
          // home
          {path: '/home', component: Views.Home, name: '/home'},
        ]
    }
  ]
})

export default router
