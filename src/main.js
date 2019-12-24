import Vue from 'vue'
import App from './App.vue'
//导入router,js
import router from './router/router'
//导入ele包
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入base 初始化css
import "./style/base.css";
//导入Vuex(store)
import store from './store/store'

Vue.use(ElementUI);


Vue.config.productionTip = false
//测试基地址的设置
// window.console.log(process.env.VUE_APP_BASEURL)
new Vue({
  router,
  store,
  render: h => h(App)
   }).$mount('#app')
