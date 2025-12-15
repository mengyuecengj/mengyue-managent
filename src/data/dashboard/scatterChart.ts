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
  BASIC_SCATTER = 'basic-scatter',
  BUBBLE_SCATTER = 'bubble-scatter'
}

export interface ChartConfig {
  id: string;
  name: string;
  type: ChartType;
  options: any;
  description?: string;
}

export const basicScatterChart: ChartConfig = {
  id: 'basic-scatter',
  name: '基础散点图',
  type: ChartType.BASIC_SCATTER,
  description: '标准散点图',
  options: {
    title: {
      text: '基础散点图',
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
      data: ['系列1', '系列2'],
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
      type: 'value',
      name: 'X 值',
      min: 0,
      max: 100,
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
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: 'Y 值',
      min: 0,
      max: 100,
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
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '系列1',
        type: 'scatter',
        data: [
          [10, 20], [20, 32], [30, 18], [40, 34], [50, 50],
          [60, 30], [70, 45], [80, 60], [90, 20], [100, 40]
        ],
        symbolSize: function (data: any) {
          return Math.sqrt(data[1]) * 2;
        },

      },
      {
        name: '系列2',
        type: 'scatter',
        data: [
          [15, 25], [25, 40], [35, 20], [45, 50], [55, 60],
          [65, 35], [75, 55], [85, 65], [95, 25], [100, 45]
        ],
        symbolSize: function (data: any) {
          return Math.sqrt(data[1]) * 2;
        },
        
      }
    ]
  }
};

export const scatterChartConfigs: ChartConfig[] = [
  basicScatterChart,
];