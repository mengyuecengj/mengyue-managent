import { DropdownConfig, DropdownItem } from '@/types/dashboard/dashboard';
import { barChartConfigs } from './barChart';
import { lineChartConfigs } from './lineChart';
import { pieChartConfigs } from './pieChart';
import { ringChartConfigs } from './ringChart';
import { scatterChartConfigs } from './scatterChart';
import { radarChartConfigs } from './radarChart';
import { funnelChartConfigs } from './funnelChart';
import { polarChartConfigs } from './polarChart';
import { gaugeChartConfigs } from './gaugeChart';
import { progressChartConfigs } from './progressChart';
import { decorationItems } from './border/decorationItems';
import textRenderer from '@/components/dashboard/renderers/TextRenderer.vue'
import { mapChartConfigs } from './mapWorld/world'
// import { provinceMapChartConfigs } from './mapWorld/province'
import { centerChinaProvinceMaps } from '@/data/dashboard/mapWorld/CenterChinaProvinces'
import { eastChinaProvinceMaps } from '@/data/dashboard/mapWorld/EastChinaProvinces'
import { northChinaProvinceMaps } from '@/data/dashboard/mapWorld/NorthChinaProvinces'
import { northWestChinaProvinceMaps } from '@/data/dashboard/mapWorld/NorthWestChinaProvinces'
import { southChinaProvinceMaps } from '@/data/dashboard/mapWorld/SouthChinaProvinces'
import { southWestChinaProvinceMaps } from '@/data/dashboard/mapWorld/SouthWestChinaProvinces'

// 转换函数：DropdownItem 转换为级联选择器需要的格式
const transformToCascaderOptions = (items: DropdownItem[]): any[] => {
  return items.map(item => ({
    label: item.text,
    value: item.value,
    children: item.children ? transformToCascaderOptions(item.children) : undefined,
    disabled: item.disabled,
    componentConfig: item.componentConfig,
    type: item.type
  }));
};

// 图表分类的级联菜单
export const chartItems: DropdownItem[] = [
  {
    text: '柱形图',
    value: 'bar-charts',
    children: [
      {
        text: '基础柱形图',
        value: 'basic-bar',
        type: 'chart',
        componentConfig: barChartConfigs[0] // 基础柱形图
      },
      {
        text: '横向柱形图',
        value: 'horizontal-bar',
        type: 'chart',
        componentConfig: barChartConfigs[1] // 横向柱形图
      },
      {
        text: '堆叠柱形图',
        value: 'stacked-bar',
        type: 'chart',
        componentConfig: barChartConfigs[2] // 堆叠柱形图
      },
      {
        text: '胶囊图',
        value: 'capsule-bar',
        type: 'chart',
        componentConfig: barChartConfigs[3] // 胶囊图
      },
      {
        text: '折柱图',
        value: 'line-bar',
        type: 'chart',
        componentConfig: barChartConfigs[4] // 折柱图
      },
      {
        text: '百分比条形图',
        value: 'percent-bar',
        type: 'chart',
        componentConfig: barChartConfigs[5] // 百分比条形图
      }
    ]
  },
  {
    text: '折线图',
    value: 'line-charts',
    children: [
      {
        text: '基础折线图',
        value: 'basic-line',
        type: 'chart',
        componentConfig: lineChartConfigs[0]
      },
      {
        text: '面积图',
        value: 'area-line',
        type: 'chart',
        componentConfig: lineChartConfigs[1]
      },
      {
        text: '纵向折线图',
        value: 'smooth-line',
        type: 'chart',
        componentConfig: lineChartConfigs[2]
      }
    ]
  },
  {
    text: '饼图',
    value: 'pie-charts',
    children: [
      {
        text: '基础饼图',
        value: 'basic-pie',
        type: 'chart',
        componentConfig: pieChartConfigs[0]
      },
      {
        text: '南丁格尔玫瑰',
        value: 'ring-pie',
        type: 'chart',
        componentConfig: pieChartConfigs[1]
      },
      {
        text: '环形饼图',
        value: 'rose-pie',
        type: 'chart',
        componentConfig: pieChartConfigs[2]
      },
      {
        text: '旋转饼图',
        value: 'rotate-pie',
        type: 'chart',
        componentConfig: pieChartConfigs[3]
      }
    ]
  },
  {
    text: '环形图',
    value: 'ring-charts',
    children: [
      {
        text: '基础环形图',
        value: 'basic',
        type: 'chart',
        componentConfig: ringChartConfigs[0]
      },
      {
        text: '可交互环形图',
        value: 'radar',
        type: 'chart',
        componentConfig: ringChartConfigs[1]
      },
    ]
  },
  {
    text: '散点图',
    value: 'scatter-charts',
    children: [
      {
        text: '基础散点图',
        value: 'basic-scatter',
        type: 'chart',
        componentConfig: scatterChartConfigs[0]
      },
    ]
  },
  {
    text: '雷达图',
    value: 'radar-charts',
    children: [
      {
        text: '基础雷达图',
        value: 'basic-radar',
        type: 'chart',
        componentConfig: radarChartConfigs[0]
      },
      {
        text: '多雷达图',
        value: 'multiple-radar',
        type: 'chart',
        componentConfig: radarChartConfigs[1]
      }
    ]
  },
  {
    text: '漏斗图',
    value: 'funnel-charts',
    children: [
      {
        text: '基础漏斗图',
        value: 'basic-funnel',
        type: 'chart',
        componentConfig: funnelChartConfigs[0]
      },
    ]
  },
  {
    text: '象形图',
    value: 'polar-charts',
    children: [
      {
        text: '象形柱图',
        value: 'polar-bar',
        type: 'chart',
        componentConfig: polarChartConfigs[0]
      },
      {
        text: '象形折线图',
        value: 'polar-line',
        type: 'chart',
        componentConfig: polarChartConfigs[1]
      }
    ]
  },
  {
    text: '仪表盘',
    value: 'gauge-charts',
    children: [
      {
        text: '基础仪表盘',
        value: 'basic-gauge',
        type: 'chart',
        componentConfig: gaugeChartConfigs[0]
      },
      {
        text: '多色仪表盘',
        value: 'dynamic-gauge',
        type: 'chart',
        componentConfig: gaugeChartConfigs[1]
      }
    ]
  },
  {
    text: '进度图',
    value: 'progress-charts',
    children: [
      {
        text: '水波图',
        value: 'basic-progress',
        type: 'chart',
        componentConfig: progressChartConfigs[0]
      },
      {
        text: '环形进度图',
        value: 'ring-progress',
        type: 'chart',
        componentConfig: progressChartConfigs[1]
      }
    ]
  }
];

// 文字组件
const textItems: DropdownItem[] = [
  {
    text: '文字',
    value: 'title-text',
    type: 'text',
    children: [
      {
        text: '文本',
        value: 'text',
        type: 'text',
        componentConfig: textRenderer
      }
    ]
  },
];

const mapItems: DropdownItem[] = [
  {
    text: '世界地图',
    value: 'maps',
    type: 'map',
    children: [
      { text: '世界地图', value: 'map-world', type: 'map', componentConfig: mapChartConfigs[0] },
      { text: '中国地图', value: 'map-china', type: 'map', componentConfig: mapChartConfigs[1] }
    ]
  },
  {
    text: '中国各省',
    value: 'maps-province',
    type: 'map',
    children: [
      { text: '北京市', value: 'map-beijing', type: 'map', componentConfig: northChinaProvinceMaps[0] },
      { text: '天津市', value: 'map-tianjin', type: 'map', componentConfig: northChinaProvinceMaps[1] },
      { text: '河北省', value: 'map-hebei', type: 'map', componentConfig: northChinaProvinceMaps[2] },
      { text: '山西省', value: 'map-shanxi', type: 'map', componentConfig: northChinaProvinceMaps[3] },
      { text: '内蒙古自治区', value: 'map-neimenggu', type: 'map', componentConfig: northChinaProvinceMaps[4] },
      { text: '辽宁省', value: 'map-liaoning', type: 'map', componentConfig: northChinaProvinceMaps[5] },
      { text: '吉林省', value: 'map-jilin', type: 'map', componentConfig: northChinaProvinceMaps[6] },
      { text: '黑龙江省', value: 'map-heilongjiang', type: 'map', componentConfig: northChinaProvinceMaps[7] },
      { text: '上海市', value: 'map-shanghai', type: 'map', componentConfig: eastChinaProvinceMaps[0] },
      { text: '江苏省', value: 'map-jiangsu', type: 'map', componentConfig: eastChinaProvinceMaps[1] },
      { text: '浙江省', value: 'map-zhejiang', type: 'map', componentConfig: eastChinaProvinceMaps[2] },
      { text: '安徽省', value: 'map-anhui', type: 'map', componentConfig: eastChinaProvinceMaps[3] },
      { text: '福建省', value: 'map-fujian', type: 'map', componentConfig: eastChinaProvinceMaps[4] },
      { text: '江西省', value: 'map-jiangxi', type: 'map', componentConfig: eastChinaProvinceMaps[5] },
      { text: '山东省', value: 'map-shandong', type: 'map', componentConfig: eastChinaProvinceMaps[6] },
      { text: '河南省', value: 'map-henan', type: 'map', componentConfig: centerChinaProvinceMaps[0] },
      { text: '湖北省', value: 'map-hubei', type: 'map', componentConfig: centerChinaProvinceMaps[1] },
      { text: '湖南省', value: 'map-hunan', type: 'map', componentConfig: centerChinaProvinceMaps[2] },
      { text: '广东省', value: 'map-guangdong', type: 'map', componentConfig: southChinaProvinceMaps[0] },
      { text: '广西壮族自治区', value: 'map-guangxi', type: 'map', componentConfig: southChinaProvinceMaps[1] },
      { text: '海南省', value: 'map-hainan', type: 'map', componentConfig: southChinaProvinceMaps[2] },
      { text: '重庆市', value: 'map-chongqing', type: 'map', componentConfig: southWestChinaProvinceMaps[0] },
      { text: '四川省', value: 'map-sichuan', type: 'map', componentConfig: southWestChinaProvinceMaps[1] },
      { text: '贵州省', value: 'map-guizhou', type: 'map', componentConfig: southWestChinaProvinceMaps[2] },
      { text: '云南省', value: 'map-yunnan', type: 'map', componentConfig: southWestChinaProvinceMaps[3] },
      { text: '西藏自治区', value: 'map-xizang', type: 'map', componentConfig: southWestChinaProvinceMaps[4] },
      { text: '陕西省', value: 'map-xian', type: 'map', componentConfig: northWestChinaProvinceMaps[0] },
      { text: '甘肃省', value: 'map-gansu', type: 'map', componentConfig: northWestChinaProvinceMaps[1] },
      { text: '青海省', value: 'map-qinghai', type: 'map', componentConfig: northWestChinaProvinceMaps[2] },
      { text: '宁夏回族自治区', value: 'map-ningxia', type: 'map', componentConfig: northWestChinaProvinceMaps[3] },
      { text: '新疆维吾尔自治区', value: 'map-xinjiang', type: 'map', componentConfig: northWestChinaProvinceMaps[4] },
      { text: '台湾省', value: 'map-taiwan', type: 'map', componentConfig: eastChinaProvinceMaps[7] },
      { text: '香港特别行政区', value: 'map-hongkong', type: 'map', componentConfig: southChinaProvinceMaps[3] },
      { text: '澳门特别行政区', value: 'map-aomen', type: 'map', componentConfig: southChinaProvinceMaps[4] }
    ]
  }
];
// 导出完整配置
export const dropdownConfigs: DropdownConfig[] = [
  {
    title: '图表',
    items: transformToCascaderOptions(chartItems)
  },
  {
    title: '装饰',
    items: transformToCascaderOptions(decorationItems)
  },
  {
    title: '文字',
    items: transformToCascaderOptions(textItems)
  },
  {
    title: '地图',
    items: transformToCascaderOptions(mapItems)
  },
];

// 辅助函数：根据值查找配置
export const findComponentConfig = (value: string | number): any => {
  // 扁平化所有配置项进行搜索
  const flattenItems = (items: DropdownItem[]): DropdownItem[] => {
    let result: DropdownItem[] = []
    items.forEach(item => {
      result.push(item)
      if (item.children) {
        result = result.concat(flattenItems(item.children))
      }
    })
    return result
  }

  const allItems = dropdownConfigs.flatMap(config => flattenItems(config.items))
  const foundItem = allItems.find(item => item.value === value)

  return foundItem?.componentConfig || null
}

export const findItem = (value: string): DropdownItem | null => {
  const flattenItems = (items: DropdownItem[]): DropdownItem[] => {
    let result: DropdownItem[] = []
    items.forEach(item => {
      result.push(item)
      if (item.children) {
        result = result.concat(flattenItems(item.children))
      }
    })
    return result
  }

  const allOriginalItems = [
    ...flattenItems(chartItems),
    ...flattenItems(decorationItems),
    ...flattenItems(textItems),
    ...flattenItems(mapItems),
    // ...flattenItems(operationItems),
    // ...flattenItems(previewItems)
  ]
  return allOriginalItems.find(item => item.value === value) || null
}