// 导入 抽取的 axios的请求对象
import instance from '../utils/request'


// 题库 新增
export function questionAdd(data) {
  return instance({
    url: "/question/add",
    method: "post",
    data,
  });
}
// 题库 列表
export function questionList(params) {
  return instance({
    url: "/question/list",
    method: "get",
    params,
  });
}
// 题库 状态
export function questionStatus(data) {
  return instance({
    url: "/question/status",
    method: "post",
    data,
    
  });
}
// 题库 编辑
export function questionEdit(data) {
  return instance({
    url: "/question/edit",
    method: "post",
    data,
    
  });
}
// 题库 删除
export function questionRemove(data) {
  return instance({
    url: "/question/remove",
    method: "post",
    data,
    
  });
}
