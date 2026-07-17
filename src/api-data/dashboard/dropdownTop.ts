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
import { getDecorationItems as getOriginalDecorationItems } from './border/decorationItems';
import textRenderer from '@/components/dashboard/renderers/TextRenderer.vue';
import { mapChartConfigs } from './mapWorld/world';
import { centerChinaProvinceMaps } from '@/api-data/dashboard/mapWorld/CenterChinaProvinces';
import { eastChinaProvinceMaps } from '@/api-data/dashboard/mapWorld/EastChinaProvinces';
import { northChinaProvinceMaps } from '@/api-data/dashboard/mapWorld/NorthChinaProvinces';
import { northWestChinaProvinceMaps } from '@/api-data/dashboard/mapWorld/NorthWestChinaProvinces';
import { southChinaProvinceMaps } from '@/api-data/dashboard/mapWorld/SouthChinaProvinces';
import { southWestChinaProvinceMaps } from '@/api-data/dashboard/mapWorld/SouthWestChinaProvinces';

const chartItemsRaw: DropdownItem[] = [
  {
    text: '柱形图',
    value: 'bar-charts',
    children: [
      {
        text: '基础柱形图',
        value: 'basic-bar',
        type: 'chart',
        componentConfig: barChartConfigs[0],
      },
      {
        text: '横向柱形图',
        value: 'horizontal-bar',
        type: 'chart',
        componentConfig: barChartConfigs[1],
      },
      {
        text: '堆叠柱形图',
        value: 'stacked-bar',
        type: 'chart',
        componentConfig: barChartConfigs[2],
      },
      {
        text: '胶囊图',
        value: 'capsule-bar',
        type: 'chart',
        componentConfig: barChartConfigs[3],
      },
      {
        text: '折柱图',
        value: 'line-bar',
        type: 'chart',
        componentConfig: barChartConfigs[4],
      },
      {
        text: '百分比条形图',
        value: 'percent-bar',
        type: 'chart',
        componentConfig: barChartConfigs[5],
      },
    ],
  },
  {
    text: '折线图',
    value: 'line-charts',
    children: [
      {
        text: '基础折线图',
        value: 'basic-line',
        type: 'chart',
        componentConfig: lineChartConfigs[0],
      },
      {
        text: '面积图',
        value: 'area-line',
        type: 'chart',
        componentConfig: lineChartConfigs[1],
      },
      {
        text: '纵向折线图',
        value: 'smooth-line',
        type: 'chart',
        componentConfig: lineChartConfigs[2],
      },
    ],
  },
  {
    text: '饼图',
    value: 'pie-charts',
    children: [
      {
        text: '基础饼图',
        value: 'basic-pie',
        type: 'chart',
        componentConfig: pieChartConfigs[0],
      },
      {
        text: '南丁格尔玫瑰',
        value: 'ring-pie',
        type: 'chart',
        componentConfig: pieChartConfigs[1],
      },
      {
        text: '环形饼图',
        value: 'rose-pie',
        type: 'chart',
        componentConfig: pieChartConfigs[2],
      },
      {
        text: '旋转饼图',
        value: 'rotate-pie',
        type: 'chart',
        componentConfig: pieChartConfigs[3],
      },
    ],
  },
  {
    text: '环形图',
    value: 'ring-charts',
    children: [
      {
        text: '基础环形图',
        value: 'basic',
        type: 'chart',
        componentConfig: ringChartConfigs[0],
      },
      {
        text: '可交互环形图',
        value: 'radar',
        type: 'chart',
        componentConfig: ringChartConfigs[1],
      },
    ],
  },
  {
    text: '散点图',
    value: 'scatter-charts',
    children: [
      {
        text: '基础散点图',
        value: 'basic-scatter',
        type: 'chart',
        componentConfig: scatterChartConfigs[0],
      },
    ],
  },
  {
    text: '雷达图',
    value: 'radar-charts',
    children: [
      {
        text: '基础雷达图',
        value: 'basic-radar',
        type: 'chart',
        componentConfig: radarChartConfigs[0],
      },
      {
        text: '多雷达图',
        value: 'multiple-radar',
        type: 'chart',
        componentConfig: radarChartConfigs[1],
      },
    ],
  },
  {
    text: '漏斗图',
    value: 'funnel-charts',
    children: [
      {
        text: '基础漏斗图',
        value: 'basic-funnel',
        type: 'chart',
        componentConfig: funnelChartConfigs[0],
      },
    ],
  },
  {
    text: '象形图',
    value: 'polar-charts',
    children: [
      {
        text: '象形柱图',
        value: 'polar-bar',
        type: 'chart',
        componentConfig: polarChartConfigs[0],
      },
      {
        text: '象形折线图',
        value: 'polar-line',
        type: 'chart',
        componentConfig: polarChartConfigs[1],
      },
    ],
  },
  {
    text: '仪表盘',
    value: 'gauge-charts',
    children: [
      {
        text: '基础仪表盘',
        value: 'basic-gauge',
        type: 'chart',
        componentConfig: gaugeChartConfigs[0],
      },
      {
        text: '多色仪表盘',
        value: 'dynamic-gauge',
        type: 'chart',
        componentConfig: gaugeChartConfigs[1],
      },
    ],
  },
  {
    text: '进度图',
    value: 'progress-charts',
    children: [
      {
        text: '水波图',
        value: 'basic-progress',
        type: 'chart',
        componentConfig: progressChartConfigs[0],
      },
      {
        text: '环形进度图',
        value: 'ring-progress',
        type: 'chart',
        componentConfig: progressChartConfigs[1],
      },
    ],
  },
];

const textItemsRaw: DropdownItem[] = [
  {
    text: '文字',
    value: 'title-text',
    type: 'text',
    children: [
      {
        text: '文本',
        value: 'text',
        type: 'text',
        componentConfig: textRenderer,
      },
    ],
  },
];

const mapItemsRaw: DropdownItem[] = [
  {
    text: '世界地图',
    value: 'maps',
    type: 'map',
    children: [
      { text: '世界地图', value: 'map-world', type: 'map', componentConfig: mapChartConfigs[0] },
      { text: '中国地图', value: 'map-china', type: 'map', componentConfig: mapChartConfigs[1] },
    ],
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
      { text: '澳门特别行政区', value: 'map-aomen', type: 'map', componentConfig: southChinaProvinceMaps[4] },
    ],
  },
];

// 原始装饰配置（假设 decorationItems 已经是 DropdownItem[]）
// 使用一个恒等翻译函数获取原始装饰项（假设 getOriginalDecorationItems 需要 t 函数）
const decorationItemsRaw: DropdownItem[] = getOriginalDecorationItems((key: string) => key);
// ==================== 工具函数 ====================
const transformToCascaderOptions = (items: DropdownItem[]): any[] => {
  return items.map((item) => ({
    label: item.text,
    value: item.value,
    children: item.children ? transformToCascaderOptions(item.children) : undefined,
    disabled: item.disabled,
    componentConfig: item.componentConfig,
    type: item.type,
  }));
};

// 获取所有扁平化的原始项（用于 findItem）
const flattenItemsRaw = (): DropdownItem[] => {
  const flatten = (items: DropdownItem[]): DropdownItem[] => {
    let result: DropdownItem[] = [];
    items.forEach((item) => {
      result.push(item);
      if (item.children) {
        result = result.concat(flatten(item.children));
      }
    });
    return result;
  };
  return [
    ...flatten(chartItemsRaw),
    ...flatten(decorationItemsRaw),
    ...flatten(textItemsRaw),
    ...flatten(mapItemsRaw),
  ];
};

// 导出 findItem，基于原始配置（不依赖 i18n，保持兼容）
export const findItem = (value: string): DropdownItem | null => {
  const allItems = flattenItemsRaw();
  return allItems.find((item) => item.value === value) || null;
};

// ==================== 动态 i18n 版本 ====================
const getChartItems = (t: any): DropdownItem[] => [
  {
    text: t('dashboard.menu.barChart'),
    value: 'bar-charts',
    children: [
      {
        text: t('dashboard.menu.basicBar'),
        value: 'basic-bar',
        type: 'chart',
        componentConfig: barChartConfigs[0],
      },
      {
        text: t('dashboard.menu.horizontalBar'),
        value: 'horizontal-bar',
        type: 'chart',
        componentConfig: barChartConfigs[1],
      },
      {
        text: t('dashboard.menu.stackedBar'),
        value: 'stacked-bar',
        type: 'chart',
        componentConfig: barChartConfigs[2],
      },
      {
        text: t('dashboard.menu.capsuleBar'),
        value: 'capsule-bar',
        type: 'chart',
        componentConfig: barChartConfigs[3],
      },
      {
        text: t('dashboard.menu.lineBar'),
        value: 'line-bar',
        type: 'chart',
        componentConfig: barChartConfigs[4],
      },
      {
        text: t('dashboard.menu.percentBar'),
        value: 'percent-bar',
        type: 'chart',
        componentConfig: barChartConfigs[5],
      },
    ],
  },
  {
    text: t('dashboard.menu.lineChart'),
    value: 'line-charts',
    children: [
      {
        text: t('dashboard.menu.basicLine'),
        value: 'basic-line',
        type: 'chart',
        componentConfig: lineChartConfigs[0],
      },
      {
        text: t('dashboard.menu.areaLine'),
        value: 'area-line',
        type: 'chart',
        componentConfig: lineChartConfigs[1],
      },
      {
        text: t('dashboard.menu.smoothLine'),
        value: 'smooth-line',
        type: 'chart',
        componentConfig: lineChartConfigs[2],
      },
    ],
  },
  {
    text: t('dashboard.menu.pieChart'),
    value: 'pie-charts',
    children: [
      {
        text: t('dashboard.menu.basicPie'),
        value: 'basic-pie',
        type: 'chart',
        componentConfig: pieChartConfigs[0],
      },
      {
        text: t('dashboard.menu.ringPie'),
        value: 'ring-pie',
        type: 'chart',
        componentConfig: pieChartConfigs[1],
      },
      {
        text: t('dashboard.menu.rosePie'),
        value: 'rose-pie',
        type: 'chart',
        componentConfig: pieChartConfigs[2],
      },
      {
        text: t('dashboard.menu.rotatePie'),
        value: 'rotate-pie',
        type: 'chart',
        componentConfig: pieChartConfigs[3],
      },
    ],
  },
  {
    text: t('dashboard.menu.ringChart'),
    value: 'ring-charts',
    children: [
      {
        text: t('dashboard.menu.basicRing'),
        value: 'basic',
        type: 'chart',
        componentConfig: ringChartConfigs[0],
      },
      {
        text: t('dashboard.menu.interactiveRing'),
        value: 'radar',
        type: 'chart',
        componentConfig: ringChartConfigs[1],
      },
    ],
  },
  {
    text: t('dashboard.menu.scatterChart'),
    value: 'scatter-charts',
    children: [
      {
        text: t('dashboard.menu.basicScatter'),
        value: 'basic-scatter',
        type: 'chart',
        componentConfig: scatterChartConfigs[0],
      },
    ],
  },
  {
    text: t('dashboard.menu.radarChart'),
    value: 'radar-charts',
    children: [
      {
        text: t('dashboard.menu.basicRadar'),
        value: 'basic-radar',
        type: 'chart',
        componentConfig: radarChartConfigs[0],
      },
      {
        text: t('dashboard.menu.multipleRadar'),
        value: 'multiple-radar',
        type: 'chart',
        componentConfig: radarChartConfigs[1],
      },
    ],
  },
  {
    text: t('dashboard.menu.funnelChart'),
    value: 'funnel-charts',
    children: [
      {
        text: t('dashboard.menu.basicFunnel'),
        value: 'basic-funnel',
        type: 'chart',
        componentConfig: funnelChartConfigs[0],
      },
    ],
  },
  {
    text: t('dashboard.menu.pictogramChart'),
    value: 'polar-charts',
    children: [
      {
        text: t('dashboard.menu.pictogramBar'),
        value: 'polar-bar',
        type: 'chart',
        componentConfig: polarChartConfigs[0],
      },
      {
        text: t('dashboard.menu.pictogramLine'),
        value: 'polar-line',
        type: 'chart',
        componentConfig: polarChartConfigs[1],
      },
    ],
  },
  {
    text: t('dashboard.menu.gauge'),
    value: 'gauge-charts',
    children: [
      {
        text: t('dashboard.menu.basicGauge'),
        value: 'basic-gauge',
        type: 'chart',
        componentConfig: gaugeChartConfigs[0],
      },
      {
        text: t('dashboard.menu.multiColorGauge'),
        value: 'dynamic-gauge',
        type: 'chart',
        componentConfig: gaugeChartConfigs[1],
      },
    ],
  },
  {
    text: t('dashboard.menu.progressChart'),
    value: 'progress-charts',
    children: [
      {
        text: t('dashboard.menu.waterWave'),
        value: 'basic-progress',
        type: 'chart',
        componentConfig: progressChartConfigs[0],
      },
      {
        text: t('dashboard.menu.ringProgress'),
        value: 'ring-progress',
        type: 'chart',
        componentConfig: progressChartConfigs[1],
      },
    ],
  },
];

const getTextItems = (t: any): DropdownItem[] => [
  {
    text: t('dashboard.menu.textComponent'),
    value: 'title-text',
    type: 'text',
    children: [
      {
        text: t('dashboard.menu.textBasic'),
        value: 'text',
        type: 'text',
        componentConfig: textRenderer,
      },
    ],
  },
];

const getMapItems = (t: any): DropdownItem[] => [
  {
    text: t('dashboard.menu.worldMap'),
    value: 'maps',
    type: 'map',
    children: [
      { text: t('dashboard.menu.worldMap'), value: 'map-world', type: 'map', componentConfig: mapChartConfigs[0] },
      { text: t('dashboard.menu.chinaMap'), value: 'map-china', type: 'map', componentConfig: mapChartConfigs[1] },
    ],
  },
  {
    text: t('dashboard.menu.chinaProvinces'),
    value: 'maps-province',
    type: 'map',
    children: [
      { text: t('dashboard.menu.beijing'), value: 'map-beijing', type: 'map', componentConfig: northChinaProvinceMaps[0] },
      { text: t('dashboard.menu.tianjin'), value: 'map-tianjin', type: 'map', componentConfig: northChinaProvinceMaps[1] },
      { text: t('dashboard.menu.hebei'), value: 'map-hebei', type: 'map', componentConfig: northChinaProvinceMaps[2] },
      { text: t('dashboard.menu.shanxi'), value: 'map-shanxi', type: 'map', componentConfig: northChinaProvinceMaps[3] },
      { text: t('dashboard.menu.neimenggu'), value: 'map-neimenggu', type: 'map', componentConfig: northChinaProvinceMaps[4] },
      { text: t('dashboard.menu.liaoning'), value: 'map-liaoning', type: 'map', componentConfig: northChinaProvinceMaps[5] },
      { text: t('dashboard.menu.jilin'), value: 'map-jilin', type: 'map', componentConfig: northChinaProvinceMaps[6] },
      { text: t('dashboard.menu.heilongjiang'), value: 'map-heilongjiang', type: 'map', componentConfig: northChinaProvinceMaps[7] },
      { text: t('dashboard.menu.shanghai'), value: 'map-shanghai', type: 'map', componentConfig: eastChinaProvinceMaps[0] },
      { text: t('dashboard.menu.jiangsu'), value: 'map-jiangsu', type: 'map', componentConfig: eastChinaProvinceMaps[1] },
      { text: t('dashboard.menu.zhejiang'), value: 'map-zhejiang', type: 'map', componentConfig: eastChinaProvinceMaps[2] },
      { text: t('dashboard.menu.anhui'), value: 'map-anhui', type: 'map', componentConfig: eastChinaProvinceMaps[3] },
      { text: t('dashboard.menu.fujian'), value: 'map-fujian', type: 'map', componentConfig: eastChinaProvinceMaps[4] },
      { text: t('dashboard.menu.jiangxi'), value: 'map-jiangxi', type: 'map', componentConfig: eastChinaProvinceMaps[5] },
      { text: t('dashboard.menu.shandong'), value: 'map-shandong', type: 'map', componentConfig: eastChinaProvinceMaps[6] },
      { text: t('dashboard.menu.henan'), value: 'map-henan', type: 'map', componentConfig: centerChinaProvinceMaps[0] },
      { text: t('dashboard.menu.hubei'), value: 'map-hubei', type: 'map', componentConfig: centerChinaProvinceMaps[1] },
      { text: t('dashboard.menu.hunan'), value: 'map-hunan', type: 'map', componentConfig: centerChinaProvinceMaps[2] },
      { text: t('dashboard.menu.guangdong'), value: 'map-guangdong', type: 'map', componentConfig: southChinaProvinceMaps[0] },
      { text: t('dashboard.menu.guangxi'), value: 'map-guangxi', type: 'map', componentConfig: southChinaProvinceMaps[1] },
      { text: t('dashboard.menu.hainan'), value: 'map-hainan', type: 'map', componentConfig: southChinaProvinceMaps[2] },
      { text: t('dashboard.menu.chongqing'), value: 'map-chongqing', type: 'map', componentConfig: southWestChinaProvinceMaps[0] },
      { text: t('dashboard.menu.sichuan'), value: 'map-sichuan', type: 'map', componentConfig: southWestChinaProvinceMaps[1] },
      { text: t('dashboard.menu.guizhou'), value: 'map-guizhou', type: 'map', componentConfig: southWestChinaProvinceMaps[2] },
      { text: t('dashboard.menu.yunnan'), value: 'map-yunnan', type: 'map', componentConfig: southWestChinaProvinceMaps[3] },
      { text: t('dashboard.menu.xizang'), value: 'map-xizang', type: 'map', componentConfig: southWestChinaProvinceMaps[4] },
      { text: t('dashboard.menu.shaanxi'), value: 'map-xian', type: 'map', componentConfig: northWestChinaProvinceMaps[0] },
      { text: t('dashboard.menu.gansu'), value: 'map-gansu', type: 'map', componentConfig: northWestChinaProvinceMaps[1] },
      { text: t('dashboard.menu.qinghai'), value: 'map-qinghai', type: 'map', componentConfig: northWestChinaProvinceMaps[2] },
      { text: t('dashboard.menu.ningxia'), value: 'map-ningxia', type: 'map', componentConfig: northWestChinaProvinceMaps[3] },
      { text: t('dashboard.menu.xinjiang'), value: 'map-xinjiang', type: 'map', componentConfig: northWestChinaProvinceMaps[4] },
      { text: t('dashboard.menu.taiwan'), value: 'map-taiwan', type: 'map', componentConfig: eastChinaProvinceMaps[7] },
      { text: t('dashboard.menu.hongkong'), value: 'map-hongkong', type: 'map', componentConfig: southChinaProvinceMaps[3] },
      { text: t('dashboard.menu.aomen'), value: 'map-aomen', type: 'map', componentConfig: southChinaProvinceMaps[4] },
    ],
  },
];

const getDecorationItems = (t: any): DropdownItem[] => {
  return getOriginalDecorationItems(t);
};

// 获取所有扁平化的动态项（用于 findComponentConfig 等）
export const getAllFlatItems = (t: any): DropdownItem[] => {
  const flatten = (items: DropdownItem[]): DropdownItem[] => {
    let result: DropdownItem[] = [];
    items.forEach((item) => {
      result.push(item);
      if (item.children) {
        result = result.concat(flatten(item.children));
      }
    });
    return result;
  };
  return [
    ...flatten(getChartItems(t)),
    ...flatten(getDecorationItems(t)),
    ...flatten(getTextItems(t)),
    ...flatten(getMapItems(t)),
  ];
};

// 根据值查找组件配置（需要传入所有扁平化项）
export const findComponentConfig = (value: string | number, allFlatItems: DropdownItem[]): any => {
  const foundItem = allFlatItems.find((item) => item.value === value);
  return foundItem?.componentConfig || null;
};

// 创建动态下拉配置（用于 editor.vue）
export const createDropdownConfigs = (t: any): DropdownConfig[] => {
  const chartItems = getChartItems(t);
  const textItems = getTextItems(t);
  const mapItems = getMapItems(t);
  const decorationItemsTransformed = getDecorationItems(t);

  return [
    {
      title: t('dashboard.menu.charts'),
      items: transformToCascaderOptions(chartItems),
    },
    {
      title: t('dashboard.menu.decorations'),
      items: transformToCascaderOptions(decorationItemsTransformed),
    },
    {
      title: t('dashboard.menu.text'),
      items: transformToCascaderOptions(textItems),
    },
    {
      title: t('dashboard.menu.maps'),
      items: transformToCascaderOptions(mapItems),
    },
  ];
};