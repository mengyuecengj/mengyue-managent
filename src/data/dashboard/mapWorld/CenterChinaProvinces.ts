// 华中地区
import * as echarts from 'echarts';
import henanMapData from '~/coordinate/410000.json';
import hubeiMapData from '~/coordinate/420000.json';
import hunanMapData from '~/coordinate/430000.json';

// 注册华中地区地图数据
if (typeof window !== 'undefined') {
    window.echarts = echarts;
    echarts.registerMap('henan', henanMapData as any);
    echarts.registerMap('hubei', hubeiMapData as any);
    echarts.registerMap('hunan', hunanMapData as any);
}

export enum MapType {
    Map_Province = 'map-province'
}

// 河南 (adcode: 410000)
export const henanDistrictGeoCoordMap: Record<string, [number, number]> = {
    '郑州市': [113.665388, 34.757975],
    '开封市': [114.341447, 34.797049],
    '洛阳市': [112.434468, 34.663041],
    '平顶山市': [113.298316, 33.735241],
    '安阳市': [114.352482, 36.103442],
    '鹤壁市': [114.295444, 35.748236],
    '新乡市': [113.883991, 35.302616],
    '焦作市': [113.238266, 35.23904],
    '濮阳市': [115.029216, 35.761829],
    '许昌市': [113.826063, 34.022956],
    '漯河市': [114.026539, 33.575855],
    '三门峡市': [111.194099, 34.777338],
    '南阳市': [112.540918, 32.999082],
    '商丘市': [115.650497, 34.437054],
    '信阳市': [114.075031, 32.123274],
    '周口市': [114.649654, 33.620474],
    '驻马店市': [114.024736, 32.980169],
    '济源市': [112.590047, 35.090378]
};

export const henanDistrictPopulationData = [
    { name: "郑州市", value: 0 },
    { name: "开封市", value: 0 },
    { name: "洛阳市", value: 0 },
    { name: "平顶山市", value: 0 },
    { name: "安阳市", value: 0 },
    { name: "鹤壁市", value: 0 },
    { name: "新乡市", value: 0 },
    { name: "焦作市", value: 0 },
    { name: "濮阳市", value: 0 },
    { name: "许昌市", value: 0 },
    { name: "漯河市", value: 0 },
    { name: "三门峡市", value: 0 },
    { name: "南阳市", value: 0 },
    { name: "商丘市", value: 0 },
    { name: "信阳市", value: 0 },
    { name: "周口市", value: 0 },
    { name: "驻马店市", value: 0 },
    { name: "济源市", value: 0 }
];

export const convertHenanGeoData = () =>
    henanDistrictPopulationData
        .map(item => {
            const coord = henanDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const henanMapChart = {
    id: 'henan-map-1',
    name: '河南省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'henan',
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
                data: henanDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertHenanGeoData(),
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

// 湖北 (adcode: 420000)
export const hubeiDistrictGeoCoordMap: Record<string, [number, number]> = {
    '武汉市': [114.298572, 30.584355],
    '黄石市': [115.077048, 30.220074],
    '十堰市': [110.787916, 32.646907],
    '宜昌市': [111.290843, 30.702636],
    '襄阳市': [112.144146, 32.042426],
    '鄂州市': [114.890593, 30.396536],
    '荆门市': [112.199427, 31.03542],
    '孝感市': [113.926655, 30.926423],
    '荆州市': [112.23813, 30.326857],
    '黄冈市': [114.879365, 30.447711],
    '咸宁市': [114.328963, 29.832798],
    '随州市': [113.37377, 31.717497],
    '恩施土家族苗族自治州': [109.48699, 30.283114],
    '仙桃市': [113.453974, 30.364953],
    '潜江市': [112.896866, 30.421215],
    '天门市': [113.165862, 30.653061],
    '神农架林区': [110.671525, 31.744449]
};

export const hubeiDistrictPopulationData = [
    { name: "武汉市", value: 0 },
    { name: "黄石市", value: 0 },
    { name: "十堰市", value: 0 },
    { name: "宜昌市", value: 0 },
    { name: "襄阳市", value: 0 },
    { name: "鄂州市", value: 0 },
    { name: "荆门市", value: 0 },
    { name: "孝感市", value: 0 },
    { name: "荆州市", value: 0 },
    { name: "黄冈市", value: 0 },
    { name: "咸宁市", value: 0 },
    { name: "随州市", value: 0 },
    { name: "恩施土家族苗族自治州", value: 0 },
    { name: "仙桃市", value: 0 },
    { name: "潜江市", value: 0 },
    { name: "天门市", value: 0 },
    { name: "神农架林区", value: 0 }
];

export const convertHubeiGeoData = () =>
    hubeiDistrictPopulationData
        .map(item => {
            const coord = hubeiDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const hubeiMapChart = {
    id: 'hubei-map-1',
    name: '湖北省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'hubei',
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
                data: hubeiDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertHubeiGeoData(),
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

// 湖南 (adcode: 430000)
export const hunanDistrictGeoCoordMap: Record<string, [number, number]> = {
    '长沙市': [112.982279, 28.19409],
    '株洲市': [113.151737, 27.835806],
    '湘潭市': [112.944052, 27.829739],
    '衡阳市': [112.607693, 26.900358],
    '邵阳市': [111.469536, 27.237842],
    '岳阳市': [113.132855, 29.37029],
    '常德市': [111.691347, 29.040225],
    '张家界市': [110.479921, 29.127401],
    '益阳市': [112.355042, 28.570066],
    '郴州市': [113.032067, 25.793589],
    '永州市': [111.608019, 26.434516],
    '怀化市': [109.97824, 27.550082],
    '娄底市': [112.008497, 27.728136],
    '湘西土家族苗族自治州': [109.739735, 28.314296]
};

export const hunanDistrictPopulationData = [
    { name: "长沙市", value: 0 },
    { name: "株洲市", value: 0 },
    { name: "湘潭市", value: 0 },
    { name: "衡阳市", value: 0 },
    { name: "邵阳市", value: 0 },
    { name: "岳阳市", value: 0 },
    { name: "常德市", value: 0 },
    { name: "张家界市", value: 0 },
    { name: "益阳市", value: 0 },
    { name: "郴州市", value: 0 },
    { name: "永州市", value: 0 },
    { name: "怀化市", value: 0 },
    { name: "娄底市", value: 0 },
    { name: "湘西土家族苗族自治州", value: 0 }
];

export const convertHunanGeoData = () =>
    hunanDistrictPopulationData
        .map(item => {
            const coord = hunanDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const hunanMapChart = {
    id: 'hunan-map-1',
    name: '湖南省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'hunan',
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
                data: hunanDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertHunanGeoData(),
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
export const centerChinaProvinceMaps = [
    henanMapChart,
    hubeiMapChart,
    hunanMapChart
];