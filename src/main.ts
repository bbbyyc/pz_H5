import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from "./router";
import api from "./api";

const app=createApp(App)

app.config.globalProperties.$api=api

// 路由守卫
router.beforeEach((to)=>{
  // 这里判断逻辑的思路是：login页面是不需要token的，别的页面都需要，所以你要区别的页面的时候要判断一下有没有token，没有token就不能跳转，而且要回到登陆页面
  if(to.path!='/login'){
    if(!localStorage.getItem('h5_token')){
      return '/login'
    }
  }
})

app.use(router)
app.mount('#app')
