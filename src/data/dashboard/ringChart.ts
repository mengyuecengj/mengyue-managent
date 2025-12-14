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
  BASIC_RING = 'basic',
  DYNAMIC_RING = 'radar'
}

export interface ChartConfig {
  id: string;
  name: string;
  type: ChartType;
  options: any;
  description?: string;
}

// 基础环形图 (保持不变)
export const basicRingChart: ChartConfig = {
  id: 'basic-ring-1',
  name: '基础环形图',
  type: ChartType.BASIC_RING,
  description: '标准环形图',
  options: {
    title: {
      text: '基础环形图',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      textStyle: {
        color: '#fff'
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
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'], // 内外半径设置形成环形
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 335, name: '直接访问', itemStyle: { color: '#5470c6' } },
          { value: 310, name: '邮件营销', itemStyle: { color: '#91cc75' } },
          { value: 274, name: '联盟广告', itemStyle: { color: '#fac858' } },
          { value: 235, name: '视频广告', itemStyle: { color: '#ee6666' } },
          { value: 400, name: '搜索引擎', itemStyle: { color: '#73c0de' } }
        ]
      }
    ]
  }
};

// 动态环形图 (已替换)
export const dynamicRingChart: ChartConfig = {
  id: 'dynamic-ring-1',
  name: '可交互环形图',
  type: ChartType.DYNAMIC_RING,
  description: '具有丰富动态效果的环形图',
  options: {
    title: {
      text: '可交互环形图',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: 10,
      left: 'center',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      textStyle: {
        color: '#fff'
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
        name: '访问来源',
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '45%'],
        animationDuration: 1500,
        animationEasing: 'elasticOut',
        animationDelay: (idx: number) => idx * 200,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#000',
          borderWidth: 1
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}: {d}%',
          color: '#fff',
          padding: [5, 10],
          rich: {
            name: {
              fontSize: 12,
              color: '#fff',
              lineHeight: 20
            }
          }
        },
        labelLine: {
          show: true,
          length: 15,
          length2: 25,
          smooth: true,
          lineStyle: {
            color: '#666',
            width: 1,
            type: 'solid'
          }
        },
        data: [
          { value: 335, name: '直接访问', itemStyle: { color: '#5470c6' } },
          { value: 310, name: '邮件营销', itemStyle: { color: '#91cc75' } },
          { value: 274, name: '联盟广告', itemStyle: { color: '#fac858' } },
          { value: 235, name: '视频广告', itemStyle: { color: '#ee6666' } },
          { value: 400, name: '搜索引擎', itemStyle: { color: '#73c0de' } }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            borderColor: '#fff',
            borderWidth: 3
          },
          label: {
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        // 添加点击交互效果
        selectedMode: 'single',
        selectedOffset: 25
      }
    ]
  }
};

// 导出所有环形图配置
export const ringChartConfigs: ChartConfig[] = [
  basicRingChart,
  dynamicRingChart
];