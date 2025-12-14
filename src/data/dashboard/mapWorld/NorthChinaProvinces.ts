// 华北地区
import * as echarts from 'echarts';
import beijingMapData from '~/coordinate/110000.json';
import tianjinMapData from '~/coordinate/120000.json';
import hebeiMapData from '~/coordinate/130000.json';
import shanxiMapData from '~/coordinate/140000.json';
import neimengguMapData from '~/coordinate/150000.json';
import liaoningMapData from '~/coordinate/210000.json';
import jilinMapData from '~/coordinate/220000.json';
import heilongjiangMapData from '~/coordinate/230000.json';

// 注册华北地区地图数据
if (typeof window !== 'undefined') {
    window.echarts = echarts;
    echarts.registerMap('beijing', beijingMapData as any);
    echarts.registerMap('tianjin', tianjinMapData as any);
    echarts.registerMap('hebei', hebeiMapData as any);
    echarts.registerMap('shanxi', shanxiMapData as any);
    echarts.registerMap('neimenggu', neimengguMapData as any);
    echarts.registerMap('liaoning', liaoningMapData as any);
    echarts.registerMap('jilin', jilinMapData as any);
    echarts.registerMap('heilongjiang', heilongjiangMapData as any);
}

export enum MapType {
    Map_Province = 'map-province'
}

// 北京 (adcode: 110000)
export const beijingDistrictGeoCoordMap: Record<string, [number, number]> = {
    '东城区': [116.418757, 39.917544],
    '西城区': [116.366794, 39.915309],
    '朝阳区': [116.443108, 39.921489],
    '丰台区': [116.287149, 39.858427],
    '石景山区': [116.223705, 39.906611],
    '海淀区': [116.298056, 39.959912],
    '门头沟区': [116.102009, 39.937183],
    '房山区': [116.143267, 39.749144],
    '通州区': [116.656434, 39.909696],
    '顺义区': [116.654561, 40.130347],
    '昌平区': [116.231204, 40.22066],
    '大兴区': [116.341395, 39.726929],
    '怀柔区': [116.631767, 40.315552],
    '平谷区': [117.121383, 40.140701],
    '密云区': [116.843352, 40.377362],
    '延庆区': [115.975145, 40.456951]
};

export const beijingDistrictPopulationData = [
    { name: '东城区', value: 0 },
    { name: '西城区', value: 0 },
    { name: '朝阳区', value: 0 },
    { name: '丰台区', value: 0 },
    { name: '石景山区', value: 0 },
    { name: '海淀区', value: 0 },
    { name: '门头沟区', value: 0 },
    { name: '房山区', value: 0 },
    { name: '通州区', value: 0 },
    { name: '顺义区', value: 0 },
    { name: '昌平区', value: 0 },
    { name: '大兴区', value: 0 },
    { name: '怀柔区', value: 0 },
    { name: '平谷区', value: 0 },
    { name: '密云区', value: 0 },
    { name: '延庆区', value: 0 }
];

export const convertBeijingGeoData = () =>
    beijingDistrictPopulationData
        .map(item => {
            const coord = beijingDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const beijingMapChart = {
    id: 'beijing-map-1',
    name: '北京市地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'beijing',
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
                data: beijingDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertBeijingGeoData(),
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

// 天津 (adcode: 120000)
export const tianjinDistrictGeoCoordMap: Record<string, [number, number]> = {
    '和平区': [117.195907, 39.118327],
    '河东区': [117.226568, 39.122125],
    '河西区': [117.223358, 39.109563],
    '南开区': [117.164143, 39.120394],
    '河北区': [117.214278, 39.161596],
    '红桥区': [117.151454, 39.175066],
    '东丽区': [117.313967, 39.087764],
    '西青区': [117.012247, 39.139446],
    '津南区': [117.382549, 38.989577],
    '北辰区': [117.13482, 39.225555],
    '武清区': [117.044186, 39.384167],
    '宝坻区': [117.309872, 39.716965],
    '滨海新区': [117.654173, 39.032846],
    '宁河区': [117.82828, 39.328886],
    '静海区': [116.925304, 38.947363],
    '蓟州区': [117.407449, 40.045342]
};

export const tianjinDistrictPopulationData = [
    { name: '和平区', value: 0 },
    { name: '河东区', value: 0 },
    { name: '河西区', value: 0 },
    { name: '南开区', value: 0 },
    { name: '河北区', value: 0 },
    { name: '红桥区', value: 0 },
    { name: '东丽区', value: 0 },
    { name: '西青区', value: 0 },
    { name: '津南区', value: 0 },
    { name: '北辰区', value: 0 },
    { name: '武清区', value: 0 },
    { name: '宝坻区', value: 0 },
    { name: '滨海新区', value: 0 },
    { name: '宁河区', value: 0 },
    { name: '静海区', value: 0 },
    { name: '蓟州区', value: 0 }
];

export const convertTianjinGeoData = () =>
    tianjinDistrictPopulationData
        .map(item => {
            const coord = tianjinDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const tianjinMapChart = {
    id: 'tianjin-map-1',
    name: '天津市地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'tianjin',
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
                data: tianjinDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertTianjinGeoData(),
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

// 河北 (adcode: 130000)
export const hebeiDistrictGeoCoordMap: Record<string, [number, number]> = {
    '石家庄市': [114.51486, 38.042307],
    '唐山市': [118.173651, 39.635113],
    '秦皇岛市': [119.59623, 39.935455],
    '邯郸市': [114.484967, 36.609308],
    '邢台市': [114.520487, 37.070832],
    '保定市': [115.464589, 38.874434],
    '张家口市': [114.887554, 40.767549],
    '承德市': [117.933822, 40.951756],
    '沧州市': [116.838693, 38.304407],
    '廊坊市': [116.700611, 39.518611],
    '衡水市': [115.666176, 37.738868]
};

export const hebeiDistrictPopulationData = [
    { name: "石家庄市", value: 0 },
    { name: "唐山市", value: 0 },
    { name: "秦皇岛市", value: 0 },
    { name: "邯郸市", value: 0 },
    { name: "邢台市", value: 0 },
    { name: "保定市", value: 0 },
    { name: "张家口市", value: 0 },
    { name: "承德市", value: 0 },
    { name: "沧州市", value: 0 },
    { name: "廊坊市", value: 0 },
    { name: "衡水市", value: 0 }
];

export const convertHebeiGeoData = () =>
    hebeiDistrictPopulationData
        .map(item => {
            const coord = hebeiDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const hebeiMapChart = {
    id: 'hebei-map-1',
    name: '河北省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'hebei',
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
                data: hebeiDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertHebeiGeoData(),
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

// 山西 (adcode: 140000)
export const shanxiDistrictGeoCoordMap: Record<string, [number, number]> = {
    '太原市': [112.548879, 37.87059],
    '大同市': [113.295259, 40.09031],
    '阳泉市': [113.580519, 37.861188],
    '长治市': [113.113556, 36.191112],
    '晋城市': [112.851274, 35.497553],
    '朔州市': [112.433387, 39.331219],
    '晋中市': [112.736465, 37.696495],
    '运城市': [110.978952, 35.022778],
    '忻州市': [112.733538, 38.41769],
    '临汾市': [111.518975, 36.088005],
    '吕梁市': [111.134335, 37.517623]
};

export const shanxiDistrictPopulationData = [
    { name: "太原市", value: 0 },
    { name: "大同市", value: 0 },
    { name: "阳泉市", value: 0 },
    { name: "长治市", value: 0 },
    { name: "晋城市", value: 0 },
    { name: "朔州市", value: 0 },
    { name: "晋中市", value: 0 },
    { name: "运城市", value: 0 },
    { name: "忻州市", value: 0 },
    { name: "临汾市", value: 0 },
    { name: "吕梁市", value: 0 }
];

export const convertShanxiGeoData = () =>
    shanxiDistrictPopulationData
        .map(item => {
            const coord = shanxiDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const shanxiMapChart = {
    id: 'shanxi-map-1',
    name: '山西省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'shanxi',
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
                data: shanxiDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertShanxiGeoData(),
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

// 内蒙古 (adcode: 150000)
export const neimengguDistrictGeoCoordMap: Record<string, [number, number]> = {
    '呼和浩特市': [111.670801, 40.818311],
    '包头市': [109.840405, 40.658168],
    '乌海市': [106.825563, 39.673734],
    '赤峰市': [118.956806, 42.275317],
    '通辽市': [122.263119, 43.617519],
    '鄂尔多斯市': [109.781285, 39.608266],
    '呼伦贝尔市': [119.758163, 49.215333],
    '巴彦淖尔市': [107.416959, 40.757402],
    '乌兰察布市': [113.114543, 41.034126],
    '兴安盟': [122.070317, 46.076268],
    '锡林郭勒盟': [116.090996, 43.944018],
    '阿拉善盟': [105.706422, 38.844814]
};

export const neimengguDistrictPopulationData = [
    { name: "呼和浩特市", value: 0 },
    { name: "包头市", value: 0 },
    { name: "乌海市", value: 0 },
    { name: "赤峰市", value: 0 },
    { name: "通辽市", value: 0 },
    { name: "鄂尔多斯市", value: 0 },
    { name: "呼伦贝尔市", value: 0 },
    { name: "巴彦淖尔市", value: 0 },
    { name: "乌兰察布市", value: 0 },
    { name: "兴安盟", value: 0 },
    { name: "锡林郭勒盟", value: 0 },
    { name: "阿拉善盟", value: 0 }
];

export const convertNeimengguGeoData = () =>
    neimengguDistrictPopulationData
        .map(item => {
            const coord = neimengguDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const neimengguMapChart = {
    id: 'neimenggu-map-1',
    name: '内蒙古自治区地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'neimenggu',
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
                data: neimengguDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertNeimengguGeoData(),
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

// 辽宁 (adcode: 210000)
export const liaoningDistrictGeoCoordMap: Record<string, [number, number]> = {
    '沈阳市': [123.431472, 41.805699],
    '大连市': [121.618622, 38.91459],
    '鞍山市': [122.995632, 41.110626],
    '抚顺市': [123.921109, 41.875956],
    '本溪市': [123.770519, 41.297909],
    '丹东市': [124.383044, 40.124296],
    '锦州市': [121.135742, 41.119269],
    '营口市': [122.235151, 40.667432],
    '阜新市': [121.648962, 42.011796],
    '辽阳市': [123.18152, 41.269402],
    '盘锦市': [122.06957, 41.124484],
    '铁岭市': [123.844279, 42.290585],
    '朝阳市': [120.451176, 41.576758],
    '葫芦岛市': [120.856394, 40.755572]
};

export const liaoningDistrictPopulationData = [
    { name: "沈阳市", value: 0 },
    { name: "大连市", value: 0 },
    { name: "鞍山市", value: 0 },
    { name: "抚顺市", value: 0 },
    { name: "本溪市", value: 0 },
    { name: "丹东市", value: 0 },
    { name: "锦州市", value: 0 },
    { name: "营口市", value: 0 },
    { name: "阜新市", value: 0 },
    { name: "辽阳市", value: 0 },
    { name: "盘锦市", value: 0 },
    { name: "铁岭市", value: 0 },
    { name: "朝阳市", value: 0 },
    { name: "葫芦岛市", value: 0 }
];

export const convertLiaoningGeoData = () =>
    liaoningDistrictPopulationData
        .map(item => {
            const coord = liaoningDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const liaoningMapChart = {
    id: 'liaoning-map-1',
    name: '辽宁省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'liaoning',
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
                data: liaoningDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertLiaoningGeoData(),
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

// 吉林 (adcode: 220000)
export const jilinDistrictGeoCoordMap: Record<string, [number, number]> = {
    '长春市': [125.323544, 43.817071],
    '吉林市': [126.549424, 43.837843],
    '四平市': [124.345765, 43.166453],
    '辽源市': [125.143664, 42.902692],
    '通化市': [125.939554, 41.728294],
    '白山市': [126.427839, 41.942501],
    '松原市': [124.816996, 45.118243],
    '白城市': [122.838711, 45.619026],
    '延边朝鲜族自治州': [129.513228, 42.904823]
};

export const jilinDistrictPopulationData = [
    { name: "长春市", value: 0 },
    { name: "吉林市", value: 0 },
    { name: "四平市", value: 0 },
    { name: "辽源市", value: 0 },
    { name: "通化市", value: 0 },
    { name: "白山市", value: 0 },
    { name: "松原市", value: 0 },
    { name: "白城市", value: 0 },
    { name: "延边朝鲜族自治州", value: 0 }
];

export const convertJilinGeoData = () =>
    jilinDistrictPopulationData
        .map(item => {
            const coord = jilinDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const jilinMapChart = {
    id: 'jilin-map-1',
    name: '吉林省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'jilin',
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
                data: jilinDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertJilinGeoData(),
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

// 黑龙江 (adcode: 230000)
export const heilongjiangDistrictGeoCoordMap: Record<string, [number, number]> = {
    '哈尔滨市': [126.642464, 45.756967],
    '齐齐哈尔市': [123.95792, 47.342081],
    '鸡西市': [130.975966, 45.300046],
    '鹤岗市': [130.277487, 47.332085],
    '双鸭山市': [131.157304, 46.643442],
    '大庆市': [125.031401, 46.587681],
    '伊春市': [128.899396, 47.724775],
    '佳木斯市': [130.361634, 46.809606],
    '七台河市': [131.015584, 45.771266],
    '牡丹江市': [129.618602, 44.582962],
    '黑河市': [127.499023, 50.249585],
    '绥化市': [126.99293, 46.637393],
    '大兴安岭地区': [124.711526, 52.335262]
};

export const heilongjiangDistrictPopulationData = [
    { name: "哈尔滨市", value: 0 },
    { name: "齐齐哈尔市", value: 0 },
    { name: "鸡西市", value: 0 },
    { name: "鹤岗市", value: 0 },
    { name: "双鸭山市", value: 0 },
    { name: "大庆市", value: 0 },
    { name: "伊春市", value: 0 },
    { name: "佳木斯市", value: 0 },
    { name: "七台河市", value: 0 },
    { name: "牡丹江市", value: 0 },
    { name: "黑河市", value: 0 },
    { name: "绥化市", value: 0 },
    { name: "大兴安岭地区", value: 0 }
];

export const convertHeilongjiangGeoData = () =>
    heilongjiangDistrictPopulationData
        .map(item => {
            const coord = heilongjiangDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const heilongjiangMapChart = {
    id: 'heilongjiang-map-1',
    name: '黑龙江省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'heilongjiang',
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
                data: heilongjiangDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertHeilongjiangGeoData(),
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
export const northChinaProvinceMaps = [
    beijingMapChart,
    tianjinMapChart,
    hebeiMapChart,
    shanxiMapChart,
    neimengguMapChart,
    liaoningMapChart,
    jilinMapChart,
    heilongjiangMapChart
];