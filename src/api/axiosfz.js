//创建的这个文件用来抽取主文件中使用axios方法
//导入axios包
import axios from 'axios'
import {getToken} from '../utils/token'

//统一设置axios
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    withCredentials: true,
});

//暴露接口
//1,登录接口
export function login(data) {
    //一定要return一个返回值
    return instance({
        url: '/login',
        method: 'post',
        data, //调用接口的人传入相对应的参数
    })
}
//2,短信验证码接口
export function sendsms(data) {
    return instance({
        url: "/sendsms",
        method: 'post',
        data, //调用接口的人传入相对应的参数
    })
}
//3,注册接口
export function register(data) {
    return instance({
        url: "/register",
        method: 'post',
        data, //调用接口的人传入相对应的参数
    })
}
//4,登录   用户信息获取
export function userInfo() {
    return instance({
        url: "/info",
        method: 'get',
        headers:{
            token:getToken()
        }
    })
}
//退出登录信息获取
export function userlogout(){
    return instance({
        url: "/logout",
        method: 'get',
        headers:{
            token:getToken()
        }
    })
}
