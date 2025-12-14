import * as echarts from 'echarts'

// 确保 echarts 在全局可用
declare global {
  interface Window {
    echarts: typeof echarts;
  }
}

// 如果需要在配置中使用 echarts，确保它已挂载
if (typeof window !== 'undefined') {
  window.echarts = echarts;
}

export enum ChartType {
  BASIC_PROGRESS = 'basic-progress',
  RING_PROGRESS = 'ring-progress'
}

export interface ChartConfig {
  id: string;
  name: string;
  type: ChartType;
  options: any;
  description?: string;
}

// 水波图（模拟水波效果）
export const basicProgressChart: ChartConfig = {
  id: 'basic-progress-1',
  name: '进度图',
  type: ChartType.BASIC_PROGRESS,
  description: '具有水波效果的进度图',
  options: {
    title: {
      text: '进度图',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    series: [
      {
        name: '进度',
        type: 'gauge',
        radius: '90%',
        center: ['50%', '60%'],
        startAngle: 225,
        endAngle: -45,
        min: 0,
        max: 100,
        splitNumber: 0,
        axisLine: {
          lineStyle: {
            width: 25,
            color: [
              [0.75, new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#5470c6' },
                { offset: 1, color: '#91cc75' }
              ])],
              [1, 'rgba(255, 255, 255, 0.1)']
            ]
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        pointer: {
          show: false
        },
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },
        grid: {
          show: false
        },
        title: {
          offsetCenter: [0, '-30%'],
          color: '#fff',
          fontSize: 14
        },
        detail: {
          fontSize: 20,
          offsetCenter: [0, '0%'],
          valueAnimation: true,
          color: '#fff',
          formatter: '{value}%',
          rich: {
            value: {
              fontSize: 24,
              fontWeight: 'bold'
            }
          }
        },
        animationDuration: 1500,
        animationEasing: 'cubicOut',
        data: [
          {
            value: 75,
            name: '完成率'
          }
        ]
      }
    ]
  }
};

// 环形进度图
export const ringProgressChart: ChartConfig = {
  id: 'ring-progress-1',
  name: '环形进度图',
  type: ChartType.RING_PROGRESS,
  description: '环形进度展示图',
  options: {
    title: {
      text: '环形进度图',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}%'
    },
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    grid: {
      show: false
    },
    series: [
      {
        name: '进度',
        type: 'pie',
        radius: ['60%', '80%'],
        center: ['50%', '60%'],
        startAngle: 90,
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 1
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        animationDuration: 1500,
        animationEasing: 'cubicOut',
        data: [
          {
            value: 75,
            name: '已完成',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#5470c6' },
                { offset: 1, color: '#91cc75' }
              ])
            }
          },
          {
            value: 25,
            name: '未完成',
            itemStyle: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        ]
      }
    ]
  }
};

// 导出所有进度图配置
export const progressChartConfigs: ChartConfig[] = [
  basicProgressChart,
  ringProgressChart
];