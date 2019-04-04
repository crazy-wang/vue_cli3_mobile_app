<template>
  <div class="commercial-customer">
    <div class="btn-module">
      <span class="btn-tips">BUSINESS GROUP</span>
      <van-radio-group v-model="radio" class="radio-group">
        <van-radio name="1">PCSD</van-radio>
        <van-radio name="2">DCG</van-radio>
      </van-radio-group>
    </div>
    <div class="chart-module">
      <v-chart :autoresize="true" :options="polar" @click="handleClickBar" />
    </div>
    <div class="chart-module pie-chart">
      <v-chart :autoresize="true" :options="polar2"/>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        radio: '1',
        polar: {
          tooltip: {},
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70],
            type: 'bar',
            barWidth: 30,
            emphasis: {
              label: {
                show: true,
                position: 'top',
                color: '#333',
                fontWeight: 'bold'
              }
            }
          }]
        },
        polar2: {
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 0,
            top: 50,
            bottom: 20,
            data: []
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['30%', '60%'],
              center: ['45%', '50%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
              ]
            }
          ]
        },
        mockDataurl: 'http://localhost:9099/json/mockData.json',
        // mockDataurl: '../assets/mockData.json',
        allData: [], //总数据
        currentWeek: null,
        currentPieData: [], // 当前所用数据
        barObj: null
      }
    },
    methods: {
      getWeekOfYear() {
        var today = new Date()
        var firstDay = new Date(today.getFullYear(), 0, 1)
        var dayOfWeek = firstDay.getDay()
        var spendDay = 1
        if (dayOfWeek != 0) {
          spendDay = 7 - dayOfWeek + 1
        }
        firstDay = new Date(today.getFullYear(), 0, 1 + spendDay)
        var d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000)
        var result = Math.ceil(d / 7)
        return result + 1
      },
      async getChartData() {
        let res = await this.axios.get(this.mockDataurl)
        if (res.status === 200) {
          this.allData = res.data
          this.currentWeek = this.getWeekOfYear()
          // 柱图填充数据
          this.polar.xAxis.data = this.allData.map(item => item['x轴'])
          this.polar.series[0].data = this.allData.map(item => item['总'])

          // 饼图填充数据
          this.currentPieData = this.allData[this.allData.length - 1]['分布']
          this.polar2.series[0].data = this.currentPieData.map(item => {
            return {
              value: item['占总'],
              name: item['名称']
            }
          })
          this.polar2.legend.data = this.currentPieData.map(item => item['名称'])

          // this.allData.forEach(item => {
          //   if (Number(item['周']) === this.currentWeek) {
          //     this.currentPieData = item['分布']
          //     // 饼图填充数据
          //     this.polar2.series[0].data = this.currentPieData.map(item => {
          //       return {
          //         value: item['占总'],
          //         name: item['名称']
          //       }
          //     })
          //   }
          // })
        }
      },
      handleClickBar(params) {
        this.getPieData(params.name)
      },
      getPieData(value) {
        this.allData.forEach(item => {
          if (item['x轴'] === value) {
            this.currentPieData = item['分布']
            this.polar2.series[0].data = this.currentPieData.map(item => {
              return {
                value: item['占总'],
                name: item['名称']
              }
            })
            this.polar2.legend.data = this.currentPieData.map(item => item['名称'])
          }
        })
      }
    },
    created() {
      this.getChartData()
    },
    mounted() {
      // this.barObj = this.echarts.init(document.getElementById('main'))
      // console.log(document.URL, 'URL')
    }
  }
</script>

<style lang="scss" scoped>
  .commercial-customer {
    overflow: hidden;
    padding: 0 8px 20px;
    .btn-module {
      margin-top: 10px;
      .btn-tips {
        font-size: 12px;
        color: #7C8694;
        vertical-align: text-top;
      }
    }
    .radio-group {
      margin-left: 30px;
      display: inline-block;
      font-size: 14px;
      .van-radio {
        display: inline-block;
        margin-right: 15px;
      }
    }
  }

  .chart-module {
    width: 100%;
    overflow: auto;
    background: #FFFFFF;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    margin-top: 20px;
  }

  .pie-chart {
    .echarts {
      width: 100%;
      overflow: hidden;
    }
  }

  .echarts {
    /*width: 100%;*/
    height: 300px;
    overflow-x: auto;
  }
</style>
