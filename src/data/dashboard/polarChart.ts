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
  POLAR_BAR = 'polar-bar',
  POLAR_LINE = 'polar-line'
}

export interface ChartConfig {
  id: string;
  name: string;
  type: ChartType;
  options: any;
  description?: string;
}

// 象形柱图（极坐标柱状图）
export const polarBarChart: ChartConfig = {
  id: 'polar-bar-1',
  name: '象形柱图',
  type: ChartType.POLAR_BAR,
  description: '基于极坐标系的柱状图',
  options: {
    title: {
      text: '象形柱图',
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
    angleAxis: {
      type: 'category',
      data: ['销售能力', '沟通能力', '专业能力', '创新能力', '团队协作'],
      z: 10,
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#fff',
        fontSize: 12,
        // 关键修复：调整标签位置避免重叠
        margin: 20,
        formatter: function(value: string) {
          return value;
        }
      },
      splitLine: {
        show: false
      }
    },
    radiusAxis: {
      min: 0,
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#fff',
        fontSize: 10
      },
      splitLine: {
        show: false
      }
    },
    polar: {
      center: ['50%', '55%'],
      radius: '75%'
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
        name: '能力分析',
        type: 'bar',
        coordinateSystem: 'polar',
        data: [
          { value: 85, name: '销售能力', itemStyle: { color: '#5470c6' } },
          { value: 70, name: '沟通能力', itemStyle: { color: '#91cc75' } },
          { value: 90, name: '专业能力', itemStyle: { color: '#fac858' } },
          { value: 65, name: '创新能力', itemStyle: { color: '#ee6666' } },
          { value: 80, name: '团队协作', itemStyle: { color: '#73c0de' } }
        ],
        barWidth: 20,
        label: {
          show: true,
          position: 'top',
          color: '#fff',
          formatter: '{c}'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],
  }
};

// 象形折线图（极坐标折线图）
export const polarLineChart: ChartConfig = {
  id: 'polar-line-1',
  name: '象形折线图',
  type: ChartType.POLAR_LINE,
  description: '基于极坐标系的折线图',
  options: {
    title: {
      text: '象形折线图',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    angleAxis: {
      type: 'category',
      data: ['销售能力', '沟通能力', '专业能力', '创新能力', '团队协作'],
      z: 10,
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#fff',
        fontSize: 12,
        // 关键修复：调整标签位置避免重叠
        margin: 20,
        formatter: function(value: string) {
          return value;
        }
      },
      splitLine: {
        show: false
      }
    },
    radiusAxis: {
      min: 0,
      max: 100,
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#fff',
        fontSize: 10
      },
      splitLine: {
        show: false
      }
    },
    polar: {
      center: ['50%', '55%'],
      radius: '75%'
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
        name: '能力分析',
        type: 'line',
        coordinateSystem: 'polar',
        data: [
          { value: [85, 0], name: '销售能力' },
          { value: [70, 1], name: '沟通能力' },
          { value: [90, 2], name: '专业能力' },
          { value: [65, 3], name: '创新能力' },
          { value: [80, 4], name: '团队协作' }
        ],
        lineStyle: {
          width: 3,
          color: '#5470c6'
        },
        itemStyle: {
          color: '#5470c6'
        },
        symbol: 'circle',
        symbolSize: 8,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(84, 112, 198, 0.5)' },
              { offset: 1, color: 'rgba(84, 112, 198, 0.1)' }
            ]
          }
        },
        label: {
          show: true,
          position: 'top',
          color: '#fff',
          formatter: '{b}: {c}',
          distance: 15
        },
        emphasis: {
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2
          }
        }
      }
    ],
  }
};

// 导出所有极坐标图表配置
export const polarChartConfigs: ChartConfig[] = [
  polarBarChart,
  polarLineChart
]