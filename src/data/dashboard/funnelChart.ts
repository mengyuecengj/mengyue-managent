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
  BASIC_FUNNEL = 'basic-funnel',
  DYNAMIC_FUNNEL = 'dynamic-funnel',
  SCROLLING_FUNNEL = "SCROLLING_FUNNEL",
  ROTATING_3D_FUNNEL = "ROTATING_3D_FUNNEL"
}

export interface ChartConfig {
  id: string;
  name: string;
  type: ChartType;
  options: any;
  description?: string;
}

// 基础漏斗图（优化文本位置）
export const basicFunnelChart: ChartConfig = {
  id: 'basic-funnel-1',
  name: '基础漏斗图',
  type: ChartType.BASIC_FUNNEL,
  description: '标准漏斗图',
  options: {
    title: {
      text: '基础漏斗图',
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
      data: ['销售能力', '沟通能力', '专业能力', '创新能力', '团队协作'],
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
        name: '能力分析',
        type: 'funnel',
        left: '10%',
        top: '10%',
        width: '80%',
        height: '80%',
        minSize: '10%',
        maxSize: '50%',
        sort: 'descending',
        gap: 2,
        label: {
          show: true,
          position: 'inside',
          formatter: '{b}',
          color: '#fff',
          // 关键：为不同位置的标签设置不同的偏移量
          offset: function(value: string, index: number) {
            if (index === 0) { // 销售能力 - 保持原位
              return [0, 0];
            } else { // 其他标签 - 向下移动
              return [0, 10];
            }
          }
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          }
        },
        data: [
          { value: 335, name: '销售能力', itemStyle: { color: '#5470c6' } },
          { value: 310, name: '沟通能力', itemStyle: { color: '#91cc75' } },
          { value: 274, name: '专业能力', itemStyle: { color: '#fac858' } },
          { value: 235, name: '创新能力', itemStyle: { color: '#ee6666' } },
          { value: 400, name: '团队协作', itemStyle: { color: '#73c0de' } }
        ]
      }
    ]
  }
};

// 导出所有漏斗图配置
export const funnelChartConfigs: ChartConfig[] = [
  basicFunnelChart
];