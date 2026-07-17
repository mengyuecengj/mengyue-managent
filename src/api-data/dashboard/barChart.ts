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
  BASIC_BAR = 'basic-bar',
  HORIZONTAL_BAR = 'horizontal-bar',
  STACKED_BAR = 'stacked-bar',
  CAPSULE_BAR = 'capsule-bar',
  LINE_BAR = 'line-bar',
  PERCENT_BAR = 'percent-bar'
}

export interface ChartConfig {
  id: string;
  name: string;
  type: ChartType;
  options: any;
  description?: string;
}

// 基础柱形图
export const basicBarChart: ChartConfig = {
  id: 'basic-bar-1',
  name: '基础柱形图',
  type: ChartType.BASIC_BAR,
  description: '标准垂直柱状图',
  options: {
    title: {
      text: '基础柱形图',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '20%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: {
        color: '#fff',
      },
      axisLine: {
        lineStyle: {
          color: '#666'
        }
      },
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
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110, 130],
        itemStyle: {
          color: '#5470c6'
        },
        label: {
          position: 'top'
        }
      },
    ]
  }
};

// 横向柱形图
export const horizontalBarChart: ChartConfig = {
  id: 'horizontal-bar-1',
  name: '横向柱形图',
  type: ChartType.HORIZONTAL_BAR,
  description: '水平条形图',
  options: {
    title: {
      text: '横向柱形图',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
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
    yAxis: {
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
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110, 130],
        itemStyle: {
          color: '#5470c6'
        },
        label: {
          position: 'right'
        }
      }
    ]
  }
};

// 堆叠柱形图
export const stackedBarChart: ChartConfig = {
  id: 'stacked-bar-1',
  name: '堆叠柱形图',
  type: ChartType.STACKED_BAR,
  description: '多数据系列堆叠显示',
  options: {
    title: {
      text: '堆叠柱形图',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['系列1', '系列2', '系列3'],
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
        name: '系列1',
        type: 'bar',
        stack: '总量',
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: '系列2',
        type: 'bar',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: '系列3',
        type: 'bar',
        stack: '总量',
        data: [150, 232, 201, 154, 190, 330, 410],
      }
    ]
  }
};

// 胶囊图
export const capsuleBarChart: ChartConfig = {
  id: 'capsule-bar-1',
  name: '胶囊图',
  type: ChartType.CAPSULE_BAR,
  description: '圆角柱状图',
  options: {
    title: {
      text: '胶囊图',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
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
        name: '销量',
        type: 'bar',
        barWidth: '60%',
        data: [120, 200, 150, 80, 70, 110, 130],
        itemStyle: {
          color: '#ee6666',
          borderRadius: [30, 30, 0, 0]
        }
      }
    ]
  }
};

// 折柱图
export const lineBarChart: ChartConfig = {
  id: 'line-bar-1',
  name: '折柱图',
  type: ChartType.LINE_BAR,
  description: '柱状图和折线图组合',
  options: {
    title: {
      text: '折柱图',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['蒸发量', '降水量', '平均温度'],
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
    xAxis: [
      {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisPointer: {
          type: 'shadow'
        },
        axisLabel: {
          color: '#fff'
        },
        axisLine: {
          lineStyle: {
            color: '#666'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '水量',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value} ml',
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
      {
        type: 'value',
        name: '温度',
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
          formatter: '{value} °C',
          color: '#fff'
        },
        axisLine: {
          lineStyle: {
            color: '#666'
          }
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '蒸发量',
        type: 'bar',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      },
      {
        name: '降水量',
        type: 'bar',
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
      },
      {
        name: '平均温度',
        type: 'line',
        yAxisIndex: 1,
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
      }
    ]
  }
};

// 百分比条形图
export const percentBarChart: ChartConfig = {
  id: 'percent-bar-1',
  name: '百分比条形图',
  type: ChartType.PERCENT_BAR,
  description: '显示数据占比的条形图',
  options: {
    title: {
      text: '百分比条形图',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params: any) {
        return params[0].name + ': ' + params[0].value + '%';
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      max: 100,
      axisLabel: {
        formatter: '{value}%',
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
    yAxis: {
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
    series: [
      {
        name: '完成率',
        type: 'bar',
        data: [45, 78, 62, 89, 34, 95, 71],
        label: {
          show: true,
          position: 'inside',
          formatter: '{c}%',
          color: '#fff'
        },
      }
    ]
  }
};

// 导出所有柱形图配置
export const barChartConfigs: ChartConfig[] = [
  basicBarChart,
  horizontalBarChart,
  stackedBarChart,
  capsuleBarChart,
  lineBarChart,
  percentBarChart
];