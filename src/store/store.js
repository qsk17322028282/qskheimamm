//导入vue
import Vue from 'vue'
//导入仓库
import Vuex from 'vuex'
//注册仓库
Vue.use(Vuex)
//创建仓库
const store = new Vuex.Store({
    state: {
        // 用户信息
        userInfo: {}
    },
    //修改数据的方法
    mutations:{
        changeMessage(state,tempMessage){
        state.userInfo = tempMessage
        }
    }
})
// 暴露出去
export default store;




