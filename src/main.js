// The Vue deploy-build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './router/permission'
import ElementUI from 'element-ui'
import store from './store'

// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset-ui.css';
import '@/assets/css/style.css';
import '@/assets/css/table.css';
import '@/assets/css/tree.css';
import '@/assets/css/iconfont/iconfont.css'

/* eslint-disable no-new */
Vue.config.productionTip = false;

/* 注册全局对象 */
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
