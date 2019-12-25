// 导入 抽取的 axios的请求对象
import instance from '../utils/request'


//用户列表
export function userList(params){
    return instance({
        url: "/user/list",
        method: "get",
        params,
    })
}
//新增用户
export function adduser(data){
    return instance({
        url: "/user/add",
        method: "post",
        data,
    })
}
//用户状态
export function userStatus(data){
    return instance({
        url: "/user/status",
        method: "post",
        data,
    })
}
//用户删除
export function userRemove(data){
    return instance({
        url: "/user/remove",
        method: "post",
        data,
    })
}
//用户编辑
export function userEdit(data){
    return instance({
        url: "/user/edit",
        method: "post",
        data,
    })
}
