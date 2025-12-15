import * as echarts from 'echarts'

declare global {
  interface Window {
    echarts: typeof echarts;
  }
}

if (typeof window !== 'undefined') {
  window.echarts = echarts;
}

export enum ChartType {
  BASIC_LINE = 'basic-line',
  AREA_LINE = 'area-line',
  SMOOTH_LINE = 'smooth-line'
}

export interface ChartConfig {
  id: string;
  name: string;
  type: ChartType;
  options: any;
  description?: string;
}

export const basicLineChart: ChartConfig = {
  id: 'basic-line-1',
  name: '基础折线图',
  type: ChartType.BASIC_LINE,
  description: '标准折线图',
  options: {
    title: {
      text: '基础折线图',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['销量'],
      textStyle: {
        color: '#fff'
      },
      top: '10%'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: {
        color: '#fff'
      },
      axisLine: {
        lineStyle: {
          color: '#666'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#fff'
      },
      axisLine: {
        lineStyle: {
          color: '#666'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#2D343C',
        }
      }
    },
    series: [
      {
        name: '销量',
        type: 'line',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        lineStyle: {
          width: 3,
          color: '#5470c6'
        },
        itemStyle: {
          color: '#5470c6'
        },
        symbol: 'circle',
        symbolSize: 8,
        smooth: false
      }
    ]
  }
};

export const areaLineChart: ChartConfig = {
  id: 'area-line-1',
  name: '面积图',
  type: ChartType.AREA_LINE,
  description: '带填充区域的折线图',
  options: {
    title: {
      text: '面积图',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: function(params: any) {
        return params[0].name + '<br/>' + 
               params.map((p: { seriesName: any; value: any; }) => `${p.seriesName}: ${p.value}`).join('<br/>');
      }
    },
    legend: {
      data: ['邮件营销', '联盟广告', '视频广告'],
      textStyle: {
        color: '#fff'
      },
      top: '10%'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: {
        color: '#fff'
      },
      axisLine: {
        lineStyle: {
          color: '#666'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#fff'
      },
      axisLine: {
        lineStyle: {
          color: '#666'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#2D343C',
        }
      }
    },
    series: [
      {
        name: '邮件营销',
        type: 'line',
        stack: '总量',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(84, 112, 198, 0.5)' },
            { offset: 1, color: 'rgba(84, 112, 198, 0)' }
          ])
        },
        data: [120, 132, 101, 134, 90, 230, 210],
        lineStyle: {
          width: 3,
          color: '#5470c6'
        },
        itemStyle: {
          color: '#5470c6'
        }
      },
      {
        name: '联盟广告',
        type: 'line',
        stack: '总量',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(145, 204, 117, 0.5)' },
            { offset: 1, color: 'rgba(145, 204, 117, 0)' }
          ])
        },
        data: [220, 182, 191, 234, 290, 330, 310],
        lineStyle: {
          width: 3,
          color: '#91cc75'
        },
        itemStyle: {
          color: '#91cc75'
        }
      },
      {
        name: '视频广告',
        type: 'line',
        stack: '总量',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(250, 200, 88, 0.5)' },
            { offset: 1, color: 'rgba(250, 200, 88, 0)' }
          ])
        },
        data: [150, 232, 201, 154, 190, 330, 410],
        lineStyle: {
          width: 3,
          color: '#fac858'
        },
        itemStyle: {
          color: '#fac858'
        }
      }
    ]
  }
};

export const smoothLineChart: ChartConfig = {
  id: 'smooth-line-1',
  name: '平滑折线图',
  type: ChartType.SMOOTH_LINE,
  description: '具有平滑曲线的折线图',
  options: {
    title: {
      text: '平滑折线图',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['温度'],
      textStyle: {
        color: '#fff'
      },
      top: '10%'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: {
        color: '#fff'
      },
      axisLine: {
        lineStyle: {
          color: '#666'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#fff'
      },
      axisLine: {
        lineStyle: {
          color: '#666'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#2D343C',
        }
      }
    },
    series: [
      {
        name: '温度',
        type: 'line',
        data: [11, 11, 15, 13, 12, 13, 10],
        lineStyle: {
          width: 4,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#5470c6' },
            { offset: 1, color: '#91cc75' }
          ])
        },
        itemStyle: {
          color: '#ee6666'
        },
        symbol: 'circle',
        symbolSize: 10,
        smooth: true,
        // 开启折线动画
        animationDuration: 2000,
        animationEasing: 'cubicOut'
      }
    ]
  }
};

export const lineChartConfigs: ChartConfig[] = [
  basicLineChart,
  areaLineChart,
  smoothLineChart
];
