// 导入 抽取的 axios的请求对象
import instance from '../utils/request'


//企业列表
export function enterpriseList(params){
    return instance({
        url: "/enterprise/list",
        method: "get",
        params,
    })
}
//新增企业
export function addEnterprise(data){
    return instance({
        url: "/enterprise/add",
        method: "post",
        data,
    })
}
//企业状态
export function enterpriseStatus(data){
    return instance({
        url: "/enterprise/status",
        method: "post",
        data,
    })
}
//企业删除
export function enterpriseRemove(data){
    return instance({
        url: "/enterprise/remove",
        method: "post",
        data,
    })
}
//企业编辑
export function enterpriseEdit(data){
    return instance({
        url: "/enterprise/edit",
        method: "post",
        data,
    })
}
