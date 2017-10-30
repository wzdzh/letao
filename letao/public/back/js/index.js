/**
 * Created by Administrator on 2017/10/29.
 */
$(function(){
  var myChart = echarts.init(document.querySelector(".chart_left"));

  // 指定图表的配置项和数据
  var option = {
    title: {
      text: '2017注册人数'
    },
    tooltip: {},
    legend: {
      data:['销量']
    },
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }]
  };
  myChart.setOption(option);

  var myChart1 = echarts.init(document.querySelector(".chart_right"));
  option1 = {
    title : {
      text: '热门品牌销售',
      subtext: '2017年6月',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['阿迪','耐克','李宁','安踏','匹克']
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'阿迪'},
          {value:310, name:'耐克'},
          {value:234, name:'李宁'},
          {value:135, name:'安踏'},
          {value:1548, name:'匹克'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  myChart1.setOption(option1);

});