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
  BASIC_GAUGE = 'basic-gauge',
  DYNAMIC_GAUGE = 'dynamic-gauge'
}

export interface ChartConfig {
  id: string;
  name: string;
  type: ChartType;
  options: any;
  description?: string;
}

// 基础仪表盘
export const basicGaugeChart: ChartConfig = {
  id: 'basic-gauge-1',
  name: '基础仪表盘',
  type: ChartType.BASIC_GAUGE,
  description: '单指针基础仪表盘',
  options: {
    title: {
      text: '基础仪表盘',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
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
        name: '完成率',
        type: 'gauge',
        radius: '90%',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 100,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            width: 15,
            color: [[1, '#5470c6']]
          }
        },
        axisTick: {
          length: 8,
          lineStyle: {
            color: 'auto'
          }
        },
        splitLine: {
          length: 15,
          lineStyle: {
            color: 'auto'
          }
        },
        axisLabel: {
          color: '#fff',
          fontSize: 10,
          distance: -20,
          // 关键修复：简化标签显示，避免重叠
          formatter: function(value: number) {
            if (value === 0) return '0%';
            if (value === 50) return '50%';
            if (value === 100) return '100%';
            return '';
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 15,
          itemStyle: {
            color: '#5470c6'
          }
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
          formatter: '{value}%'
        },
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

// 多色仪表盘
export const dynamicGaugeChart: ChartConfig = {
  id: 'dynamic-gauge-1',
  name: '多色仪表盘',
  type: ChartType.DYNAMIC_GAUGE,
  description: '多色分段仪表盘',
  options: {
    title: {
      text: '多色仪表盘',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
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
        name: '指标',
        type: 'gauge',
        radius: '90%',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 100,
        splitNumber: 5,
        animationDuration: 1500,
        animationEasing: 'cubicOut',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.3, '#ee6666'],
              [0.7, '#fac858'],
              [1, '#91cc75']
            ]
          }
        },
        axisTick: {
          length: 8,
          lineStyle: {
            color: 'auto'
          }
        },
        splitLine: {
          length: 15,
          lineStyle: {
            color: 'auto'
          }
        },
        axisLabel: {
          color: '#fff',
          fontSize: 10,
          distance: -20,
          // 关键修复：使用语义化标签，避免重叠
          formatter: function(value: number) {
            if (value === 0) return '0%';
            if (value === 25) return '低';
            if (value === 50) return '中';
            if (value === 75) return '高';
            if (value === 100) return '100%';
            return '';
          }
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 15,
          itemStyle: {
            color: '#333'
          }
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
        data: [
          {
            value: 65,
            name: '指标值'
          }
        ]
      }
    ]
  }
};

// 导出所有仪表盘配置
export const gaugeChartConfigs: ChartConfig[] = [
  basicGaugeChart,
  dynamicGaugeChart
];