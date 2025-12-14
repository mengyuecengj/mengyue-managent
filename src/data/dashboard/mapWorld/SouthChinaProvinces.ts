// 华南地区
import * as echarts from 'echarts';
import guangdongMapData from '~/coordinate/440000.json';
import guangxiMapData from '~/coordinate/450000.json';
import hainanMapData from '~/coordinate/460000.json';
import hongkongMapData from '~/coordinate/810000.json';
import aomenMapData from '~/coordinate/820000.json';

// 注册华南地区地图数据
if (typeof window !== 'undefined') {
    window.echarts = echarts;
    echarts.registerMap('guangdong', guangdongMapData as any);
    echarts.registerMap('guangxi', guangxiMapData as any);
    echarts.registerMap('hainan', hainanMapData as any);
    echarts.registerMap('hongkong', hongkongMapData as any);
    echarts.registerMap('aomen', aomenMapData as any);
}

export enum MapType {
    Map_Province = 'map-province'
}

// 广东 (adcode: 440000)
export const guangdongDistrictGeoCoordMap: Record<string, [number, number]> = {
    '广州市': [113.264385, 23.129112],
    '韶关市': [113.591544, 24.801322],
    '深圳市': [114.057868, 22.543099],
    '珠海市': [113.576726, 22.270715],
    '汕头市': [116.681972, 23.354091],
    '佛山市': [113.122717, 23.028762],
    '江门市': [113.094942, 22.590431],
    '湛江市': [110.364977, 21.274898],
    '茂名市': [110.925229, 21.667335],
    '肇庆市': [112.472529, 23.051546],
    '惠州市': [114.412599, 23.110846],
    '梅州市': [116.117582, 24.299112],
    '汕尾市': [115.364238, 22.774485],
    '河源市': [114.697802, 23.746266],
    '阳江市': [111.975107, 21.859222],
    '清远市': [113.051227, 23.685022],
    '东莞市': [113.746262, 23.046237],
    '中山市': [113.382391, 22.521113],
    '潮州市': [116.632301, 23.661701],
    '揭阳市': [116.355733, 23.543778],
    '云浮市': [112.044439, 22.929801]
};

export const guangdongDistrictPopulationData = [
    { name: "广州市", value: 0 },
    { name: "韶关市", value: 0 },
    { name: "深圳市", value: 0 },
    { name: "珠海市", value: 0 },
    { name: "汕头市", value: 0 },
    { name: "佛山市", value: 0 },
    { name: "江门市", value: 0 },
    { name: "湛江市", value: 0 },
    { name: "茂名市", value: 0 },
    { name: "肇庆市", value: 0 },
    { name: "惠州市", value: 0 },
    { name: "梅州市", value: 0 },
    { name: "汕尾市", value: 0 },
    { name: "河源市", value: 0 },
    { name: "阳江市", value: 0 },
    { name: "清远市", value: 0 },
    { name: "东莞市", value: 0 },
    { name: "中山市", value: 0 },
    { name: "潮州市", value: 0 },
    { name: "揭阳市", value: 0 },
    { name: "云浮市", value: 0 }
];

export const convertGuangdongGeoData = () =>
    guangdongDistrictPopulationData
        .map(item => {
            const coord = guangdongDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const guangdongMapChart = {
    id: 'guangdong-map-1',
    name: '广东省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'guangdong',
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
                data: guangdongDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertGuangdongGeoData(),
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

// 广西 (adcode: 450000)
export const guangxiDistrictGeoCoordMap: Record<string, [number, number]> = {
    '南宁市': [108.366543, 22.817002],
    '柳州市': [109.428608, 24.326291],
    '桂林市': [110.299121, 25.274215],
    '梧州市': [111.297604, 23.474803],
    '北海市': [109.119254, 21.481291],
    '防城港市': [108.353801, 21.614409],
    '钦州市': [108.654315, 21.979704],
    '贵港市': [109.598808, 23.111531],
    '玉林市': [110.18122, 22.654525],
    '百色市': [106.618202, 23.902166],
    '贺州市': [111.566694, 24.403561],
    '河池市': [108.085261, 24.695899],
    '来宾市': [109.229772, 23.733766],
    '崇左市': [107.365085, 22.394555]
};

export const guangxiDistrictPopulationData = [
    { name: "南宁市", value: 0 },
    { name: "柳州市", value: 0 },
    { name: "桂林市", value: 0 },
    { name: "梧州市", value: 0 },
    { name: "北海市", value: 0 },
    { name: "防城港市", value: 0 },
    { name: "钦州市", value: 0 },
    { name: "贵港市", value: 0 },
    { name: "玉林市", value: 0 },
    { name: "百色市", value: 0 },
    { name: "贺州市", value: 0 },
    { name: "河池市", value: 0 },
    { name: "来宾市", value: 0 },
    { name: "崇左市", value: 0 }
];

export const convertGuangxiGeoData = () =>
    guangxiDistrictPopulationData
        .map(item => {
            const coord = guangxiDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const guangxiMapChart = {
    id: 'guangxi-map-1',
    name: '广西壮族自治区地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'guangxi',
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
                data: guangxiDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertGuangxiGeoData(),
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

// 海南 (adcode: 460000)
export const hainanDistrictGeoCoordMap: Record<string, [number, number]> = {
    '海口市': [110.327352, 20.030628],
    '三亚市': [109.511772, 18.252847],
    '三沙市': [112.34882, 16.831039],
    '儋州市': [109.580686, 19.521134],
    '五指山市': [109.516925, 18.776921],
    '琼海市': [110.474666, 19.259134],
    '文昌市': [110.797157, 19.543285],
    '万宁市': [110.391073, 18.796216],
    '东方市': [108.653789, 19.10198],
    '定安县': [110.326709, 19.681434],
    '屯昌县': [110.103475, 19.351765],
    '澄迈县': [110.006754, 19.738521],
    '临高县': [109.695778, 19.912027],
    '白沙黎族自治县': [109.451493, 19.240963],
    '昌江黎族自治县': [109.055741, 19.298184],
    '乐东黎族自治县': [109.173396, 18.75026],
    '陵水黎族自治县': [110.037504, 18.506048],
    '保亭黎族苗族自治县': [109.70259, 18.639133],
    '琼中黎族苗族自治县': [109.838263, 19.034943]
};

export const hainanDistrictPopulationData = [
    { name: "海口市", value: 0 },
    { name: "三亚市", value: 0 },
    { name: "三沙市", value: 0 },
    { name: "儋州市", value: 0 },
    { name: "五指山市", value: 0 },
    { name: "琼海市", value: 0 },
    { name: "文昌市", value: 0 },
    { name: "万宁市", value: 0 },
    { name: "东方市", value: 0 },
    { name: "定安县", value: 0 },
    { name: "屯昌县", value: 0 },
    { name: "澄迈县", value: 0 },
    { name: "临高县", value: 0 },
    { name: "白沙黎族自治县", value: 0 },
    { name: "昌江黎族自治县", value: 0 },
    { name: "乐东黎族自治县", value: 0 },
    { name: "陵水黎族自治县", value: 0 },
    { name: "保亭黎族苗族自治县", value: 0 },
    { name: "琼中黎族苗族自治县", value: 0 }
];

export const convertHainanGeoData = () =>
    hainanDistrictPopulationData
        .map(item => {
            const coord = hainanDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const hainanMapChart = {
    id: 'hainan-map-1',
    name: '海南省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'hainan',
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
                data: hainanDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertHainanGeoData(),
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

// 香港 (adcode: 810000)
export const hongkongDistrictGeoCoordMap: Record<string, [number, number]> = {
    '中西区': [114.154373, 22.281981],
    '湾仔区': [114.178699, 22.276389],
    '东区': [114.225865, 22.279773],
    '南区': [114.160022, 22.246271],
    '油尖旺区': [114.173343, 22.311618],
    '深水埗区': [114.163342, 22.327163],
    '九龙城区': [114.193047, 22.312373],
    '黄大仙区': [114.197302, 22.343241],
    '观塘区': [114.225757, 22.320054],
    '荃湾区': [114.102451, 22.368442],
    '屯门区': [113.976306, 22.393832],
    '元朗区': [114.028784, 22.44573],
    '北区': [114.147404, 22.494559],
    '大埔区': [114.170342, 22.445222],
    '沙田区': [114.187104, 22.387142],
    '西贡区': [114.263193, 22.314105],
    '离岛区': [113.946105, 22.280373]
};

export const hongkongDistrictPopulationData = [
    { name: "中西区", value: 0 },
    { name: "湾仔区", value: 0 },
    { name: "东区", value: 0 },
    { name: "南区", value: 0 },
    { name: "油尖旺区", value: 0 },
    { name: "深水埗区", value: 0 },
    { name: "九龙城区", value: 0 },
    { name: "黄大仙区", value: 0 },
    { name: "观塘区", value: 0 },
    { name: "荃湾区", value: 0 },
    { name: "屯门区", value: 0 },
    { name: "元朗区", value: 0 },
    { name: "北区", value: 0 },
    { name: "大埔区", value: 0 },
    { name: "沙田区", value: 0 },
    { name: "西贡区", value: 0 },
    { name: "离岛区", value: 0 }
];

export const convertHongkongGeoData = () =>
    hongkongDistrictPopulationData
        .map(item => {
            const coord = hongkongDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const hongkongMapChart = {
    id: 'hongkong-map-1',
    name: '香港特别行政区地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'hongkong',
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
                data: hongkongDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertHongkongGeoData(),
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

// 澳门 (adcode: 820000)
export const aomenDistrictGeoCoordMap: Record<string, [number, number]> = {
    '花地玛堂区': [113.55296, 22.20788],
    '圣安多尼堂区': [113.56421, 22.19718],
    '大堂区': [113.55371, 22.18819],
    '望德堂区': [113.55025, 22.19406],
    '风顺堂区': [113.53728, 22.18783],
    '嘉模堂区': [113.55878, 22.15376],
    '圣方济各堂区': [113.59211, 22.12348],
    '路氹填海区': [113.56925, 22.13655]
};

export const aomenDistrictPopulationData = [
    { name: "花地玛堂区", value: 0 },
    { name: "圣安多尼堂区", value: 0 },
    { name: "大堂区", value: 0 },
    { name: "望德堂区", value: 0 },
    { name: "风顺堂区", value: 0 },
    { name: "嘉模堂区", value: 0 },
    { name: "圣方济各堂区", value: 0 },
    { name: "路氹填海区", value: 0 }
];

export const convertAomenGeoData = () =>
    aomenDistrictPopulationData
        .map(item => {
            const coord = aomenDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const aomenMapChart = {
    id: 'aomen-map-1',
    name: '澳门特别行政区地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'aomen',
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
                data: aomenDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertAomenGeoData(),
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
export const southChinaProvinceMaps = [
    guangdongMapChart,
    guangxiMapChart,
    hainanMapChart,
    hongkongMapChart,
    aomenMapChart
];