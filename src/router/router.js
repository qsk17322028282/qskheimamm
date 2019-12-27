//导入vue
import Vue from 'vue'
// 导入 vue-router
import VueRouter from 'vue-router'
//导入login组件
import login from '../view/login/login'
//导入index组件
import index from '../view/index/index'

//导入token令牌
import { getToken, removeToken } from '../utils/token'
// import { ElCarousel } from 'element-ui/types/carousel'
//导入elem的 按需引入  
import { Message } from 'element-ui';
// 导入封装好的axios
import { userInfo } from "../api/axiosfz";
//导入store
import store from '../store/store'
//导入路由子组件设置
import children from './childern'



Vue.config.productionTip = false
//注册 vue-router
Vue.use(VueRouter)
// 实例化                                 
const router = new VueRouter({
  //这里就是路由的配制项
  routes: [
    //登录页
    {
      path: '/',
      component: login //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
    },
    {
      path: '/login',//写入一个地址
      component: login //这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
    },
    //首页  index
    {
      path: '/index',//写入一个地址
      component: index,//这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
      meta: {
        power: [2, 3,4]
      },
     children
    },
  ]
})


//白名单
const whitePaths = ["/login", "/"]

//注册一个导航守卫
router.beforeEach((to, from, next) => {
  // alert('111')
  //判断是否是登录页
  // if (to.path != "/login") {
  if (whitePaths.includes(to.path.toLocaleLowerCase()) === false) {
    // 判断是否携带令牌
    if (!getToken()) {
      Message.error("没有令牌禁止进入");
      next("/login")
    } else {
      //有token的时候需要放行向下继续执行
      userInfo().then(res => {
        // window.console.log(res.data.data);
        if (res.data.code === 200) {
          // 用户头像图片需要加上基地址
          if (res.data.data.status === 0) {
            //状态显示禁用的用户
            next("./login")
            Message.error("您已经被禁止登录请联系管理员");
          } else {
            //状态是启用的用户
            res.data.data.avatar = `${process.env.VUE_APP_BASEURL}/${res.data.data.avatar}`;
            // 提交到仓库中
            store.commit("changeMessage", res.data.data)

            if(to.meta.power.includes(res.data.data.role_id)){
              next()
            }else{
              Message.error("您没有访问的权限,请联系管理员");
            }
          }
        } else if (res.data.code === 206) {
          Message.error("伪造令牌是不好的");
          removeToken();
          next("/login");

        }
      });
    }
  } else {
    //是登录页就直接放过去 
    // 注意:  如果不写next  页面会卡住
    next()
  }
})

export default router