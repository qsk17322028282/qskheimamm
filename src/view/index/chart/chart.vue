<template>
  <div class="chart_box">
    <el-card class="title_card">
      <ul>
        <li>
          <i class="primary">{{ headData.increment_users }}</i>
          <p>今日新增用户</p>
        </li>
        <li>
          <i class="primary">{{ headData.total_users }}</i>
          <p>总用户量</p>
        </li>
        <li>
          <i class="danger">{{ headData.increment_questions }}</i>
          <p>新增试题</p>
        </li>
        <li>
          <i class="danger">{{ headData.total_questions }}</i>
          <p>总试题量</p>
        </li>
        <li>
          <i class="success">{{ headData.total_done_questions }}</i>
          <p>总刷题量</p>
        </li>
        <li>
          <i class="success">{{ headData.personal_questions }}</i>
          <p>人均刷题量</p>
        </li>
      </ul>
    </el-card>
    <div class="main_card" ref="main_card"></div>
  </div>
</template>

<script>
//导入接口信息
import { dataTitle,dataStatistics } from "../../../api/chart";
// 导入 echarts
import echarts from "echarts";
export default {
  data() {
    return {
      headData: {
        total_done_questions: 0,
        personal_questions: 0,
        total_users: 14,
        increment_users: 0,
        increment_questions: 6,
        total_questions: 7
      }
    };
  },
  mounted() {
    // 头部数据获取
    dataTitle().then(res => {
      // window.console.log(res)
      this.headData = res.data;
    });
    //主体部分数据获取
    dataStatistics().then(res=>{
      window.console.log(res);
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.main_card);
    // 指定图表的配置项和数据
    var option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
       title: {
        top: 34,
        left: '55',
        text: '整体数据',
    },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 50,
        top: 50,
        bottom: 50,
        data: res.data
      },
      series: [
        {
          color: ["#F76137", "#F9B358", "#409EFF"],
          name: "访问来源",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          // 使用后台发送的数据
          data: res.data
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    })

  }
};
</script>

<style lang="less">
.chart_box {
  width: 100%;

  .title_card {
    height: 149px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    border-radius: 4px;

    ul {
      display: flex;
      list-style: none;
      justify-content: space-around;
      align-items: flex-start;
      li {
        i {
          display: block;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 2px solid #000;
          text-align: center;
          line-height: 80px;
          font-style: normal;
          // 生成 i.primary
          &.primary {
            border-color: #0488fa;
            color: #0488fa;
          }
          &.danger {
            border-color: #f76238;
            color: #f76238;
          }
          &.success {
            border-color: #74d691;
            color: #74d691;
          }
        }
        p {
          text-align: center;
          font-size: 16px;
          color: #737373;
          padding-top: 11px;
        }
      }
    }
  }
  .main_card {
    height: 571px;
    margin-top: 13px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    border-radius: 4px;
  }
}
</style>