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
  BASIC_RADAR = 'basic-radar',
  MULTIPLE_RADAR = 'multiple-radar'
}

export interface ChartConfig {
  id: string;
  name: string;
  type: ChartType;
  options: any;
  description?: string;
}

export const basicRadarChart: ChartConfig = {
  id: 'basic-radar-1',
  name: '基础雷达图',
  type: ChartType.BASIC_RADAR,
  description: '单数据系列雷达图',
  options: {
    title: {
      text: '基础雷达图',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      data: ['能力分析'],
      textStyle: {
        color: '#fff'
      },
      top: '10%'
    },
    radar: {
      indicator: [
        { name: '销售能力', max: 100 },
        { name: '沟通能力', max: 100 },
        { name: '专业能力', max: 100 },
        { name: '创新能力', max: 100 },
        { name: '团队协作', max: 100 }
      ],
      radius: '60%',
      center: ['50%', '60%'],
      splitNumber: 4,
      shape: 'circle',
      axisName: {
        color: '#fff',
        fontSize: 10,
        rotate: 0,
        align: 'center',
        verticalAlign: 'middle',
        padding: [0, 0, 0, 0],
        formatter: function(value: string) {
          return value;
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(100, 100, 100, 0.2)'
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.1)']
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
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
        type: 'radar',
        data: [
          {
            value: [85, 70, 90, 65, 80],
            name: '个人能力',
            areaStyle: {
              color: 'rgba(84, 112, 198, 0.5)'
            },
            lineStyle: {
              color: '#5470c6',
              width: 2
            },
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              color: '#5470c6'
            }
          }
        ]
      }
    ]
  }
};

export const multipleRadarChart: ChartConfig = {
  id: 'multiple-radar-1',
  name: '多雷达图',
  type: ChartType.MULTIPLE_RADAR,
  description: '多数据系列对比雷达图',
  options: {
    title: {
      text: '多雷达图',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      data: ['产品经理', 'UI设计师', '开发工程师'],
      textStyle: {
        color: '#fff'
      },
      top: '10%'
    },
    radar: {
      indicator: [
        { name: '专业能力', max: 100 },
        { name: '沟通能力', max: 100 },
        { name: '创新能力', max: 100 },
        { name: '执行能力', max: 100 },
        { name: '协作能力', max: 100 },
        { name: '抗压能力', max: 100 }
      ],
      radius: '65%',
      center: ['50%', '60%'],
      splitNumber: 5,
      shape: 'circle',
      axisName: {
        color: '#fff',
        fontSize: 12,
        rotate: 0,
        align: 'center',
        verticalAlign: 'middle',
        padding: [0, 0, 0, 0],
        formatter: function(value: string) {
          return value;
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(100, 100, 100, 0.2)'
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.1)']
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)'
        }
      }
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
        name: '能力对比',
        type: 'radar',
        animationDuration: 1000,
        animationEasing: 'cubicOut',
        data: [
          {
            value: [85, 75, 90, 70, 85, 75],
            name: '产品经理',
            areaStyle: {
              color: 'rgba(84, 112, 198, 0.3)'
            },
            lineStyle: {
              color: '#5470c6',
              width: 2
            },
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              color: '#5470c6'
            }
          },
          {
            value: [70, 85, 80, 85, 90, 70],
            name: 'UI设计师',
            areaStyle: {
              color: 'rgba(145, 204, 117, 0.3)'
            },
            lineStyle: {
              color: '#91cc75',
              width: 2
            },
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              color: '#91cc75'
            }
          },
          {
            value: [90, 65, 75, 90, 70, 85],
            name: '开发工程师',
            areaStyle: {
              color: 'rgba(250, 200, 88, 0.3)'
            },
            lineStyle: {
              color: '#fac858',
              width: 2
            },
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              color: '#fac858'
            }
          }
        ]
      }
    ]
  }
};

export const radarChartConfigs: ChartConfig[] = [
  basicRadarChart,
  multipleRadarChart
];