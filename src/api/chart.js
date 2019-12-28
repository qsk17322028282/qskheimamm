// 导入 抽取的 axios的请求对象
import instance from '../utils/request.js'


// 面板 编辑
export function dataTitle() {
  return instance({
    url: "/data/title",
    method: "post",
  });
}
// 企业题目统计 
export function dataStatistics(data) {
  return instance({
    url: "/data/statistics",
    method: "post",
    data,
    
  });
}
