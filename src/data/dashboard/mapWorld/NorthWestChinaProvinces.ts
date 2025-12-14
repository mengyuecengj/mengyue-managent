// 西北地区
import * as echarts from 'echarts';
import xianMapData from '~/coordinate/610000.json';
import gansuMapData from '~/coordinate/620000.json';
import qinghaiMapData from '~/coordinate/630000.json';
import ningxiaMapData from '~/coordinate/640000.json';
import xinjiangMapData from '~/coordinate/650000.json';

// 注册西北地区地图数据
if (typeof window !== 'undefined') {
    window.echarts = echarts;
    echarts.registerMap('shaanxi', xianMapData as any);
    echarts.registerMap('gansu', gansuMapData as any);
    echarts.registerMap('qinghai', qinghaiMapData as any);
    echarts.registerMap('ningxia', ningxiaMapData as any);
    echarts.registerMap('xinjiang', xinjiangMapData as any);
}

export enum MapType {
    Map_Province = 'map-province'
}

// 陕西 (adcode: 610000)
export const shaanxiDistrictGeoCoordMap: Record<string, [number, number]> = {
    '西安市': [108.948024, 34.263161],
    '铜川市': [108.979608, 34.916582],
    '宝鸡市': [107.14487, 34.369315],
    '咸阳市': [108.705117, 34.333439],
    '渭南市': [109.502882, 34.499381],
    '延安市': [109.49081, 36.596537],
    '汉中市': [107.028621, 33.077668],
    '榆林市': [109.741193, 38.290162],
    '安康市': [109.029273, 32.6903],
    '商洛市': [109.939776, 33.868319]
};

export const shaanxiDistrictPopulationData = [
    { name: "西安市", value: 0 },
    { name: "铜川市", value: 0 },
    { name: "宝鸡市", value: 0 },
    { name: "咸阳市", value: 0 },
    { name: "渭南市", value: 0 },
    { name: "延安市", value: 0 },
    { name: "汉中市", value: 0 },
    { name: "榆林市", value: 0 },
    { name: "安康市", value: 0 },
    { name: "商洛市", value: 0 }
];

export const convertShaanxiGeoData = () =>
    shaanxiDistrictPopulationData
        .map(item => {
            const coord = shaanxiDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const xianMapChart = {
    id: 'shanxi-map-1',
    name: '陕西省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'shaanxi',
                roam: true,
                zoom: 1,
                label: { show: false },
                itemStyle: {
                    areaColor: '#283650',
                    borderColor: '#14b82a',
                    borderWidth: 1
                },
                emphasis: {
                    itemStyle: { areaColor: '#3bb8c7' }
                },
                data: shaanxiDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertShaanxiGeoData(),
                symbolSize: function (val: number[]) {
                    return val[2] / 100000;
                },
                label: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                itemStyle: {
                    color: '#ddb926'
                },
                emphasis: {
                    label: {
                        show: true
                    }
                }
            }
        ]
    }
};

// 甘肃 (adcode: 620000)
export const gansuDistrictGeoCoordMap: Record<string, [number, number]> = {
    '兰州市': [103.823557, 36.058039],
    '嘉峪关市': [98.277304, 39.786529],
    '金昌市': [102.187888, 38.514239],
    '白银市': [104.173606, 36.54568],
    '天水市': [105.724998, 34.578529],
    '武威市': [102.634697, 37.929908],
    '张掖市': [100.455472, 38.932897],
    '平凉市': [106.684691, 35.54279],
    '酒泉市': [98.510795, 39.744023],
    '庆阳市': [107.638372, 35.734218],
    '定西市': [104.626294, 35.579578],
    '陇南市': [104.929379, 33.388598],
    '临夏回族自治州': [103.211634, 35.599446],
    '甘南藏族自治州': [102.911008, 34.986354]
};

export const gansuDistrictPopulationData = [
    { name: "兰州市", value: 0 },
    { name: "嘉峪关市", value: 0 },
    { name: "金昌市", value: 0 },
    { name: "白银市", value: 0 },
    { name: "天水市", value: 0 },
    { name: "武威市", value: 0 },
    { name: "张掖市", value: 0 },
    { name: "平凉市", value: 0 },
    { name: "酒泉市", value: 0 },
    { name: "庆阳市", value: 0 },
    { name: "定西市", value: 0 },
    { name: "陇南市", value: 0 },
    { name: "临夏回族自治州", value: 0 },
    { name: "甘南藏族自治州", value: 0 }
];

export const convertGansuGeoData = () =>
    gansuDistrictPopulationData
        .map(item => {
            const coord = gansuDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const gansuMapChart = {
    id: 'gansu-map-1',
    name: '甘肃省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'gansu',
                roam: true,
                zoom: 1,
                label: { show: false },
                itemStyle: {
                    areaColor: '#283650',
                    borderColor: '#14b82a',
                    borderWidth: 1
                },
                emphasis: {
                    itemStyle: { areaColor: '#3bb8c7' }
                },
                data: gansuDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertGansuGeoData(),
                symbolSize: function (val: number[]) {
                    return val[2] / 100000;
                },
                label: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                itemStyle: {
                    color: '#ddb926'
                },
                emphasis: {
                    label: {
                        show: true
                    }
                }
            }
        ]
    }
};

// 青海 (adcode: 630000)
export const qinghaiDistrictGeoCoordMap: Record<string, [number, number]> = {
    '西宁市': [101.778916, 36.623177],
    '海东市': [102.10327, 36.502916],
    '海北藏族自治州': [100.901059, 36.959435],
    '黄南藏族自治州': [102.019988, 35.517744],
    '海南藏族自治州': [100.619542, 36.280353],
    '果洛藏族自治州': [100.242143, 34.4736],
    '玉树藏族自治州': [97.008522, 33.004049],
    '海西蒙古族藏族自治州': [97.370785, 37.374663]
};

export const qinghaiDistrictPopulationData = [
    { name: "西宁市", value: 0 },
    { name: "海东市", value: 0 },
    { name: "海北藏族自治州", value: 0 },
    { name: "黄南藏族自治州", value: 0 },
    { name: "海南藏族自治州", value: 0 },
    { name: "果洛藏族自治州", value: 0 },
    { name: "玉树藏族自治州", value: 0 },
    { name: "海西蒙古族藏族自治州", value: 0 }
];

export const convertQinghaiGeoData = () =>
    qinghaiDistrictPopulationData
        .map(item => {
            const coord = qinghaiDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const qinghaiMapChart = {
    id: 'qinghai-map-1',
    name: '青海省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'qinghai',
                roam: true,
                zoom: 1,
                label: { show: false },
                itemStyle: {
                    areaColor: '#283650',
                    borderColor: '#14b82a',
                    borderWidth: 1
                },
                emphasis: {
                    itemStyle: { areaColor: '#3bb8c7' }
                },
                data: qinghaiDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertQinghaiGeoData(),
                symbolSize: function (val: number[]) {
                    return val[2] / 100000;
                },
                label: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                itemStyle: {
                    color: '#ddb926'
                },
                emphasis: {
                    label: {
                        show: true
                    }
                }
            }
        ]
    }
};

// 宁夏 (adcode: 640000)
export const ningxiaDistrictGeoCoordMap: Record<string, [number, number]> = {
    '银川市': [106.278179, 38.46637],
    '石嘴山市': [106.376173, 39.01333],
    '吴忠市': [106.199409, 37.986165],
    '固原市': [106.285241, 36.004561],
    '中卫市': [105.189568, 37.514951]
};

export const ningxiaDistrictPopulationData = [
    { name: "银川市", value: 0 },
    { name: "石嘴山市", value: 0 },
    { name: "吴忠市", value: 0 },
    { name: "固原市", value: 0 },
    { name: "中卫市", value: 0 }
];

export const convertNingxiaGeoData = () =>
    ningxiaDistrictPopulationData
        .map(item => {
            const coord = ningxiaDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const ningxiaMapChart = {
    id: 'ningxia-map-1',
    name: '宁夏回族自治区地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'ningxia',
                roam: true,
                zoom: 1,
                label: { show: false },
                itemStyle: {
                    areaColor: '#283650',
                    borderColor: '#14b82a',
                    borderWidth: 1
                },
                emphasis: {
                    itemStyle: { areaColor: '#3bb8c7' }
                },
                data: ningxiaDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertNingxiaGeoData(),
                symbolSize: function (val: number[]) {
                    return val[2] / 100000;
                },
                label: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                itemStyle: {
                    color: '#ddb926'
                },
                emphasis: {
                    label: {
                        show: true
                    }
                }
            }
        ]
    }
};

// 新疆 (adcode: 650000)
export const xinjiangDistrictGeoCoordMap: Record<string, [number, number]> = {
    '乌鲁木齐市': [87.617733, 43.792818],
    '克拉玛依市': [84.873946, 45.595886],
    '吐鲁番市': [89.184078, 42.947613],
    '哈密市': [93.5131, 42.833248],
    '昌吉回族自治州': [87.304012, 44.014577],
    '博尔塔拉蒙古自治州': [82.074778, 44.903258],
    '巴音郭楞蒙古自治州': [86.150969, 41.768552],
    '阿克苏地区': [80.265068, 41.170712],
    '克孜勒苏柯尔克孜自治州': [76.172825, 39.713431],
    '喀什地区': [75.989138, 39.494325],
    '和田地区': [79.925334, 37.110687],
    '伊犁哈萨克自治州': [81.317946, 43.924821],
    '塔城地区': [82.985732, 46.746301],
    '阿勒泰地区': [88.13963, 47.848393],
    '石河子市': [86.041075, 44.305886],
    '阿拉尔市': [81.285884, 40.541914],
    '图木舒克市': [79.077978, 39.824867],
    '五家渠市': [87.526864, 44.167401],
    '北屯市': [87.824932, 47.353177],
    '铁门关市': [85.501218, 41.827251],
    '双河市': [82.353656, 44.840524],
    '可克达拉市': [80.63579, 43.683293],
    '昆玉市': [79.287372, 37.207994],
    '胡杨河市': [84.666643, 44.649905]
};

export const xinjiangDistrictPopulationData = [
    { name: "乌鲁木齐市", value: 0 },
    { name: "克拉玛依市", value: 0 },
    { name: "吐鲁番市", value: 0 },
    { name: "哈密市", value: 0 },
    { name: "昌吉回族自治州", value: 0 },
    { name: "博尔塔拉蒙古自治州", value: 0 },
    { name: "巴音郭楞蒙古自治州", value: 0 },
    { name: "阿克苏地区", value: 0 },
    { name: "克孜勒苏柯尔克孜自治州", value: 0 },
    { name: "喀什地区", value: 0 },
    { name: "和田地区", value: 0 },
    { name: "伊犁哈萨克自治州", value: 0 },
    { name: "塔城地区", value: 0 },
    { name: "阿勒泰地区", value: 0 },
    { name: "石河子市", value: 0 },
    { name: "阿拉尔市", value: 0 },
    { name: "图木舒克市", value: 0 },
    { name: "五家渠市", value: 0 },
    { name: "北屯市", value: 0 },
    { name: "铁门关市", value: 0 },
    { name: "双河市", value: 0 },
    { name: "可克达拉市", value: 0 },
    { name: "昆玉市", value: 0 },
    { name: "胡杨河市", value: 0 }
];

export const convertXinjiangGeoData = () =>
    xinjiangDistrictPopulationData
        .map(item => {
            const coord = xinjiangDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const xinjiangMapChart = {
    id: 'xinjiang-map-1',
    name: '新疆维吾尔自治区地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'xinjiang',
                roam: true,
                zoom: 1,
                label: { show: false },
                itemStyle: {
                    areaColor: '#283650',
                    borderColor: '#14b82a',
                    borderWidth: 1
                },
                emphasis: {
                    itemStyle: { areaColor: '#3bb8c7' }
                },
                data: xinjiangDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertXinjiangGeoData(),
                symbolSize: function (val: number[]) {
                    return val[2] / 100000;
                },
                label: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                itemStyle: {
                    color: '#ddb926'
                },
                emphasis: {
                    label: {
                        show: true
                    }
                }
            }
        ]
    }
};
export const northWestChinaProvinceMaps = [
    xianMapChart,
    gansuMapChart,
    qinghaiMapChart,
    ningxiaMapChart,
    xinjiangMapChart
];