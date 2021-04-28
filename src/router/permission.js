/**
 * 登录鉴权
 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {Message} from 'element-ui'
import Cookies from "js-cookie";
import router from "./index";

// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })
//路由拦截
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start();
  Cookies.set('login_user_name', 'lxj', { expires: 7, path:'/',domain: '.lxj.com' });
  Cookies.set('login_token', 'login_token', { expires: 7, path:'/',domain: '.lxj.com' });
  let login_token=Cookies.get("login_token");
  console.info(login_token)
  if(login_token===undefined || login_token===null || login_token===""){

    Message({type:'error',message:"请先登陆"});
    Cookies.set("return_url",process.env.FRONT_ROOT + '/#' + to.fullPath,{ domain: process.env.COOKIE_DOMAIN });
    setTimeout(() => {
      window.location.href = process.env.LOGIN_ROOT;
    }, 1000);
  }else{
    if(Object.keys(from.query).length === 0){//判断路由来源是否有query，处理不是目的跳转的情况
      next()
    }else{
      let redirect = from.query.redirect//如果来源路由有query
      if(to.path === redirect){//这行是解决next无限循环的问题
        next()
      }else{
        next({path:redirect})//跳转到目的路由
      }
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
