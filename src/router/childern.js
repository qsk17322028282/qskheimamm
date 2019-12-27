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
export default [
    //1,数据页
    {
      path: 'chart',//写入一个地址
      component: chart,//这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
      meta: {
        power: [1,2, 3],
        icon:"el-icon-pie-chart",
        name:"数据概览"
      }
    },
    //2,用户页
    {
      path: 'user',//写入一个地址
      component: user,//这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
      meta: {
        power: [1,2],
        icon:"el-icon-user",
        name:"用户列表"
      }
    },
    //3,题库页
    {
      path: 'question',//写入一个地址
      component: question,//这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
      meta: {
        power: [1,2,3,4],
        icon:"el-icon-edit-outline",
        name:"题库列表"
      }
    },
    //4,企业页
    {
      path: 'enterprise',//写入一个地址
      component: enterprise,//这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
      meta: {
        power: [1,2, 3],
        icon:"el-icon-office-building",
        name:"企业列表"
      }
    },
    //5,学科页
    {
      path: 'subject',//写入一个地址
      component: subject,//这里要填入一个组件名(填入import的名字)，也就是上面地址对应的组件
      meta: {
        power: [1,2, 3],
        icon:"el-icon-notebook-2",
        name:"学科列表"
      }
    },
  ]   