// 西南地区
import * as echarts from 'echarts';
import chongqingMapData from '~/coordinate/500000.json';
import sichuanMapData from '~/coordinate/510000.json';
import guizhouMapData from '~/coordinate/520000.json';
import yunnanMapData from '~/coordinate/530000.json';
import xizangMapData from '~/coordinate/540000.json';

// 注册西南地区地图数据
if (typeof window !== 'undefined') {
    window.echarts = echarts;
    echarts.registerMap('chongqing', chongqingMapData as any);
    echarts.registerMap('sichuan', sichuanMapData as any);
    echarts.registerMap('guizhou', guizhouMapData as any);
    echarts.registerMap('yunnan', yunnanMapData as any);
    echarts.registerMap('xizang', xizangMapData as any);
}

export enum MapType {
    Map_Province = 'map-province'
}

// 重庆 (adcode: 500000)
export const chongqingDistrictGeoCoordMap: Record<string, [number, number]> = {
    '万州区': [108.408661, 30.807667],
    '涪陵区': [107.390587, 29.703128],
    '渝中区': [106.56288, 29.559009],
    '大渡口区': [106.482333, 29.484045],
    '江北区': [106.574271, 29.606703],
    '沙坪坝区': [106.454205, 29.541224],
    '九龙坡区': [106.510182, 29.502272],
    '南岸区': [106.560813, 29.523992],
    '北碚区': [106.396083, 29.805466],
    '綦江区': [106.651362, 29.028045],
    '大足区': [105.721671, 29.707038],
    '渝北区': [106.631187, 29.718142],
    '巴南区': [106.540256, 29.387003],
    '黔江区': [108.770624, 29.533609],
    '长寿区': [107.081632, 29.853637],
    '江津区': [106.259281, 29.290065],
    '合川区': [106.276369, 29.972084],
    '永川区': [105.927001, 29.356311],
    '南川区': [107.09936, 29.157891],
    '璧山区': [106.227305, 29.592024],
    '铜梁区': [106.056405, 29.844811],
    '潼南区': [105.841619, 30.190991],
    '荣昌区': [105.594062, 29.405765],
    '开州区': [108.393135, 31.160711],
    '梁平区': [107.802351, 30.673735],
    '武隆区': [107.760193, 29.325601],
    '城口县': [108.6649, 31.94766],
    '丰都县': [107.730894, 29.8635],
    '垫江县': [107.333281, 30.327695],
    '忠县': [108.039005, 30.299559],
    '云阳县': [108.697698, 30.930529],
    '奉节县': [109.465784, 31.019967],
    '巫山县': [109.879138, 31.074571],
    '巫溪县': [109.628912, 31.396634],
    '石柱土家族自治县': [108.114069, 29.999278],
    '秀山土家族苗族自治县': [108.996043, 28.444772],
    '酉阳土家族苗族自治县': [108.767205, 28.839801],
    '彭水苗族土家族自治县': [108.08182, 29.056599]
};

export const chongqingDistrictPopulationData = [
    { name: "万州区", value: 0 },
    { name: "涪陵区", value: 0 },
    { name: "渝中区", value: 0 },
    { name: "大渡口区", value: 0 },
    { name: "江北区", value: 0 },
    { name: "沙坪坝区", value: 0 },
    { name: "九龙坡区", value: 0 },
    { name: "南岸区", value: 0 },
    { name: "北碚区", value: 0 },
    { name: "綦江区", value: 0 },
    { name: "大足区", value: 0 },
    { name: "渝北区", value: 0 },
    { name: "巴南区", value: 0 },
    { name: "黔江区", value: 0 },
    { name: "长寿区", value: 0 },
    { name: "江津区", value: 0 },
    { name: "合川区", value: 0 },
    { name: "永川区", value: 0 },
    { name: "南川区", value: 0 },
    { name: "璧山区", value: 0 },
    { name: "铜梁区", value: 0 },
    { name: "潼南区", value: 0 },
    { name: "荣昌区", value: 0 },
    { name: "开州区", value: 0 },
    { name: "梁平区", value: 0 },
    { name: "武隆区", value: 0 },
    { name: "城口县", value: 0 },
    { name: "丰都县", value: 0 },
    { name: "垫江县", value: 0 },
    { name: "忠县", value: 0 },
    { name: "云阳县", value: 0 },
    { name: "奉节县", value: 0 },
    { name: "巫山县", value: 0 },
    { name: "巫溪县", value: 0 },
    { name: "石柱土家族自治县", value: 0 },
    { name: "秀山土家族苗族自治县", value: 0 },
    { name: "酉阳土家族苗族自治县", value: 0 },
    { name: "彭水苗族土家族自治县", value: 0 }
];

export const convertChongqingGeoData = () =>
    chongqingDistrictPopulationData
        .map(item => {
            const coord = chongqingDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const chongqingMapChart = {
    id: 'chongqing-map-1',
    name: '重庆市地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'chongqing',
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
                data: chongqingDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertChongqingGeoData(),
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

// 四川 (adcode: 510000)
export const sichuanDistrictGeoCoordMap: Record<string, [number, number]> = {
    '成都市': [104.066143, 30.573095],
    '自贡市': [104.773447, 29.352765],
    '攀枝花市': [101.718637, 26.582347],
    '泸州市': [105.443348, 28.889138],
    '德阳市': [104.398651, 31.127991],
    '绵阳市': [104.741722, 31.46402],
    '广元市': [105.829757, 32.433668],
    '遂宁市': [105.592833, 30.532861],
    '内江市': [105.058435, 29.580228],
    '乐山市': [103.765673, 29.552115],
    '南充市': [106.110698, 30.837793],
    '眉山市': [103.848491, 30.075441],
    '宜宾市': [104.630825, 28.760189],
    '广安市': [106.633369, 30.456398],
    '达州市': [107.468024, 31.209484],
    '雅安市': [103.001033, 29.987722],
    '巴中市': [106.753669, 31.858809],
    '资阳市': [104.641917, 30.122211],
    '阿坝藏族羌族自治州': [102.221374, 31.899792],
    '甘孜藏族自治州': [101.963815, 30.050664],
    '凉山彝族自治州': [102.267712, 27.881571]
};

export const sichuanDistrictPopulationData = [
    { name: "成都市", value: 0 },
    { name: "自贡市", value: 0 },
    { name: "攀枝花市", value: 0 },
    { name: "泸州市", value: 0 },
    { name: "德阳市", value: 0 },
    { name: "绵阳市", value: 0 },
    { name: "广元市", value: 0 },
    { name: "遂宁市", value: 0 },
    { name: "内江市", value: 0 },
    { name: "乐山市", value: 0 },
    { name: "南充市", value: 0 },
    { name: "眉山市", value: 0 },
    { name: "宜宾市", value: 0 },
    { name: "广安市", value: 0 },
    { name: "达州市", value: 0 },
    { name: "雅安市", value: 0 },
    { name: "巴中市", value: 0 },
    { name: "资阳市", value: 0 },
    { name: "阿坝藏族羌族自治州", value: 0 },
    { name: "甘孜藏族自治州", value: 0 },
    { name: "凉山彝族自治州", value: 0 }
];

export const convertSichuanGeoData = () =>
    sichuanDistrictPopulationData
        .map(item => {
            const coord = sichuanDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const sichuanMapChart = {
    id: 'sichuan-map-1',
    name: '四川省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'sichuan',
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
                data: sichuanDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertSichuanGeoData(),
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

// 贵州 (adcode: 520000)
export const guizhouDistrictGeoCoordMap: Record<string, [number, number]> = {
    '贵阳市': [106.630153, 26.647661],
    '六盘水市': [104.830293, 26.594604],
    '遵义市': [106.927383, 27.725743],
    '安顺市': [105.947594, 26.253673],
    '毕节市': [105.28501, 27.302589],
    '铜仁市': [109.191555, 27.718346],
    '黔西南布依族苗族自治州': [104.897971, 25.08812],
    '黔东南苗族侗族自治州': [107.977541, 26.583352],
    '黔南布依族苗族自治州': [107.517156, 26.258219]
};

export const guizhouDistrictPopulationData = [
    { name: "贵阳市", value: 0 },
    { name: "六盘水市", value: 0 },
    { name: "遵义市", value: 0 },
    { name: "安顺市", value: 0 },
    { name: "毕节市", value: 0 },
    { name: "铜仁市", value: 0 },
    { name: "黔西南布依族苗族自治州", value: 0 },
    { name: "黔东南苗族侗族自治州", value: 0 },
    { name: "黔南布依族苗族自治州", value: 0 }
];

export const convertGuizhouGeoData = () =>
    guizhouDistrictPopulationData
        .map(item => {
            const coord = guizhouDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const guizhouMapChart = {
    id: 'guizhou-map-1',
    name: '贵州省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'guizhou',
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
                data: guizhouDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertGuizhouGeoData(),
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

// 云南 (adcode: 530000)
export const yunnanDistrictGeoCoordMap: Record<string, [number, number]> = {
    '昆明市': [102.832891, 24.869231],
    '曲靖市': [103.797851, 25.501557],
    '玉溪市': [102.543907, 24.350461],
    '保山市': [99.167133, 25.111802],
    '昭通市': [103.717216, 27.336999],
    '丽江市': [100.233026, 26.872108],
    '普洱市': [100.972344, 22.777321],
    '临沧市': [100.08697, 23.886566],
    '楚雄彝族自治州': [101.546046, 25.041988],
    '红河哈尼族彝族自治州': [103.384182, 23.366775],
    '文山壮族苗族自治州': [104.24401, 23.369216],
    '西双版纳傣族自治州': [100.797941, 22.001724],
    '大理白族自治州': [100.225668, 25.589449],
    '德宏傣族景颇族自治州': [98.578363, 24.436694],
    '怒江傈僳族自治州': [98.854304, 25.850949],
    '迪庆藏族自治州': [99.706463, 27.826853]
};

export const yunnanDistrictPopulationData = [
    { name: "昆明市", value: 0 },
    { name: "曲靖市", value: 0 },
    { name: "玉溪市", value: 0 },
    { name: "保山市", value: 0 },
    { name: "昭通市", value: 0 },
    { name: "丽江市", value: 0 },
    { name: "普洱市", value: 0 },
    { name: "临沧市", value: 0 },
    { name: "楚雄彝族自治州", value: 0 },
    { name: "红河哈尼族彝族自治州", value: 0 },
    { name: "文山壮族苗族自治州", value: 0 },
    { name: "西双版纳傣族自治州", value: 0 },
    { name: "大理白族自治州", value: 0 },
    { name: "德宏傣族景颇族自治州", value: 0 },
    { name: "怒江傈僳族自治州", value: 0 },
    { name: "迪庆藏族自治州", value: 0 }
];

export const convertYunnanGeoData = () =>
    yunnanDistrictPopulationData
        .map(item => {
            const coord = yunnanDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const yunnanMapChart = {
    id: 'yunnan-map-1',
    name: '云南省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'yunnan',
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
                data: yunnanDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertYunnanGeoData(),
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

// 西藏 (adcode: 540000)
export const xizangDistrictGeoCoordMap: Record<string, [number, number]> = {
    '拉萨市': [91.132212, 29.660361],
    '日喀则市': [88.885148, 29.267519],
    '昌都市': [97.178452, 31.136875],
    '林芝市': [94.362348, 29.654693],
    '山南市': [91.766529, 29.236023],
    '那曲市': [92.060214, 31.476004],
    '阿里地区': [80.105498, 32.503187]
};

export const xizangDistrictPopulationData = [
    { name: "拉萨市", value: 0 },
    { name: "日喀则市", value: 0 },
    { name: "昌都市", value: 0 },
    { name: "林芝市", value: 0 },
    { name: "山南市", value: 0 },
    { name: "那曲市", value: 0 },
    { name: "阿里地区", value: 0 }
];

export const convertXizangGeoData = () =>
    xizangDistrictPopulationData
        .map(item => {
            const coord = xizangDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const xizangMapChart = {
    id: 'xizang-map-1',
    name: '西藏自治区地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'xizang',
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
                data: xizangDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertXizangGeoData(),
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

export const southWestChinaProvinceMaps = [
    chongqingMapChart,
    sichuanMapChart,
    guizhouMapChart,
    yunnanMapChart,
    xizangMapChart
];