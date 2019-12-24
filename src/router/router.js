//导入vue
import Vue from 'vue'
// 导入 vue-router
import VueRouter from 'vue-router'
//导入login组件
import login from '../view/login/login'
//导入index组件
import index from '../view/index/index'
//导入index列表下的内容页面
// 1,数据页
import chart from '../view/index/chart/chart'
// 2,用户页
import user from '../view/index/user/user'
// 3,题库页
import question from '../view/index/question/question'
// 4,企业页
import enterprise from '../view/index/enterprise/enterprise'
// 5,学科页
import subject from '../view/index/subject/subject'
//导入token令牌
import { getToken, removeToken } from '../utils/token'
// import { ElCarousel } from 'element-ui/types/carousel'
//导入elem的 按需引入  
import { Message } from 'element-ui';
// 导入封装好的axios
import { userInfo } from "../api/axiosfz";
//导入store
import store from '../store/store'




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
      children: [
        //1,数据页
        {
          path: 'chart',//写入一个地址
          component: chart,//这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
        },
        //2,用户页
        {
          path: 'user',//写入一个地址
          component: user,//这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
        },
        //3,题库页
        {
          path: 'question',//写入一个地址
          component: question,//这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
        },
        //4,企业页
        {
          path: 'enterprise',//写入一个地址
          component: enterprise,//这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
        },
        //5,学科页
        {
          path: 'subject',//写入一个地址
          component: subject,//这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
        },
      ]
    },
  ]
})
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
          next()
          // 用户头像图片需要加上基地址
          // store.state.userInfo = res.data.data
          // store.state.userInfo.avatar = `${process.env.VUE_APP_BASEURL}/${store.state.userInfo.avatar}`;
          res.data.data.avatar = `${process.env.VUE_APP_BASEURL}/${res.data.data.avatar}`;
          // this.userMessage = res.data.data;
          store.commit("changeMessage",res.data.data)
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