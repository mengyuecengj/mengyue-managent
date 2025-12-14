// 华东地区
import * as echarts from 'echarts';
import shanghaiMapData from '~/coordinate/310000.json';
import jiangsuMapData from '~/coordinate/320000.json';
import zhejiangMapData from '~/coordinate/330000.json';
import anhuiMapData from '~/coordinate/340000.json';
import fujianMapData from '~/coordinate/350000.json';
import jiangxiMapData from '~/coordinate/360000.json';
import shandongMapData from '~/coordinate/370000.json';
import taiwanMapData from '~/coordinate/710000.json'

// 注册华东地区地图数据
if (typeof window !== 'undefined') {
    window.echarts = echarts;
    echarts.registerMap('shanghai', shanghaiMapData as any);
    echarts.registerMap('jiangsu', jiangsuMapData as any);
    echarts.registerMap('zhejiang', zhejiangMapData as any);
    echarts.registerMap('anhui', anhuiMapData as any);
    echarts.registerMap('fujian', fujianMapData as any);
    echarts.registerMap('jiangxi', jiangxiMapData as any);
    echarts.registerMap('shandong', shandongMapData as any);
    echarts.registerMap('taiwan', taiwanMapData as any);
}

export enum MapType {
    Map_Province = 'map-province'
}

// 上海 (adcode: 310000)
export const shanghaiDistrictGeoCoordMap: Record<string, [number, number]> = {
    '黄浦区': [121.490317, 31.222771],
    '徐汇区': [121.43752, 31.179973],
    '长宁区': [121.422249, 31.218057],
    '静安区': [121.448228, 31.229003],
    '普陀区': [121.392324, 31.241701],
    '虹口区': [121.491034, 31.26122],
    '杨浦区': [121.522797, 31.270755],
    '闵行区': [121.375973, 31.115162],
    '宝山区': [121.489934, 31.398896],
    '嘉定区': [121.250333, 31.383524],
    '浦东新区': [121.69281, 31.215894],
    '金山区': [121.330736, 30.724697],
    '松江区': [121.223543, 31.03047],
    '青浦区': [121.113021, 31.151209],
    '奉贤区': [121.458472, 30.912345],
    '崇明区': [121.566566, 31.622936]
};

export const shanghaiDistrictPopulationData = [
    { name: "黄浦区", value: 0 },
    { name: "徐汇区", value: 0 },
    { name: "长宁区", value: 0 },
    { name: "静安区", value: 0 },
    { name: "普陀区", value: 0 },
    { name: "虹口区", value: 0 },
    { name: "杨浦区", value: 0 },
    { name: "闵行区", value: 0 },
    { name: "宝山区", value: 0 },
    { name: "嘉定区", value: 0 },
    { name: "浦东新区", value: 0 },
    { name: "金山区", value: 0 },
    { name: "松江区", value: 0 },
    { name: "青浦区", value: 0 },
    { name: "奉贤区", value: 0 },
    { name: "崇明区", value: 0 }
];

export const convertShanghaiGeoData = () =>
    shanghaiDistrictPopulationData
        .map(item => {
            const coord = shanghaiDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const shanghaiMapChart = {
    id: 'shanghai-map-1',
    name: '上海市地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'shanghai',
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
                data: shanghaiDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertShanghaiGeoData(),
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

// 江苏 (adcode: 320000)
export const jiangsuDistrictGeoCoordMap: Record<string, [number, number]> = {
    '南京市': [118.796877, 32.060255],
    '无锡市': [120.301663, 31.574703],
    '徐州市': [117.184811, 34.261792],
    '常州市': [119.946973, 31.772752],
    '苏州市': [120.585316, 31.298886],
    '南通市': [120.864606, 32.016212],
    '连云港市': [119.178821, 34.600018],
    '淮安市': [119.021265, 33.597506],
    '盐城市': [120.139998, 33.377631],
    '扬州市': [119.421003, 32.393159],
    '镇江市': [119.452753, 32.204409],
    '泰州市': [119.915176, 32.484882],
    '宿迁市': [118.275162, 33.963008]
};

export const jiangsuDistrictPopulationData = [
    { name: "南京市", value: 0 },
    { name: "无锡市", value: 0 },
    { name: "徐州市", value: 0 },
    { name: "常州市", value: 0 },
    { name: "苏州市", value: 0 },
    { name: "南通市", value: 0 },
    { name: "连云港市", value: 0 },
    { name: "淮安市", value: 0 },
    { name: "盐城市", value: 0 },
    { name: "扬州市", value: 0 },
    { name: "镇江市", value: 0 },
    { name: "泰州市", value: 0 },
    { name: "宿迁市", value: 0 }
];

export const convertJiangsuGeoData = () =>
    jiangsuDistrictPopulationData
        .map(item => {
            const coord = jiangsuDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const jiangsuMapChart = {
    id: 'jiangsu-map-1',
    name: '江苏省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'jiangsu',
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
                data: jiangsuDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertJiangsuGeoData(),
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

// 浙江 (adcode: 330000)
export const zhejiangDistrictGeoCoordMap: Record<string, [number, number]> = {
    '杭州市': [120.15507, 30.274085],
    '宁波市': [121.549792, 29.868388],
    '温州市': [120.672111, 28.003411],
    '嘉兴市': [120.750865, 30.762653],
    '湖州市': [120.127356, 30.867139],
    '绍兴市': [120.582227, 30.013409],
    '金华市': [119.649506, 29.089524],
    '衢州市': [118.87263, 28.941708],
    '舟山市': [122.106863, 30.016028],
    '台州市': [121.428599, 28.661378],
    '丽水市': [119.921786, 28.451993]
};

export const zhejiangDistrictPopulationData = [
    { name: "杭州市", value: 0 },
    { name: "宁波市", value: 0 },
    { name: "温州市", value: 0 },
    { name: "嘉兴市", value: 0 },
    { name: "湖州市", value: 0 },
    { name: "绍兴市", value: 0 },
    { name: "金华市", value: 0 },
    { name: "衢州市", value: 0 },
    { name: "舟山市", value: 0 },
    { name: "台州市", value: 0 },
    { name: "丽水市", value: 0 }
];

export const convertZhejiangGeoData = () =>
    zhejiangDistrictPopulationData
        .map(item => {
            const coord = zhejiangDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const zhejiangMapChart = {
    id: 'zhejiang-map-1',
    name: '浙江省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'zhejiang',
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
                data: zhejiangDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertZhejiangGeoData(),
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

// 安徽 (adcode: 340000)
export const anhuiDistrictGeoCoordMap: Record<string, [number, number]> = {
    '合肥市': [117.283042, 31.86119],
    '芜湖市': [118.376451, 31.326319],
    '蚌埠市': [117.363228, 32.939667],
    '淮南市': [117.018329, 32.647574],
    '马鞍山市': [118.507906, 31.689362],
    '淮北市': [116.794664, 33.971707],
    '铜陵市': [117.816576, 30.929935],
    '安庆市': [117.043551, 30.50883],
    '黄山市': [118.317325, 29.709239],
    '滁州市': [118.316264, 32.303627],
    '阜阳市': [115.819729, 32.896969],
    '宿州市': [116.984084, 33.633891],
    '六安市': [116.507676, 31.754244],
    '亳州市': [115.778997, 33.844607],
    '池州市': [117.489157, 30.656037],
    '宣城市': [118.757995, 30.945667]
};

export const anhuiDistrictPopulationData = [
    { name: "合肥市", value: 0 },
    { name: "芜湖市", value: 0 },
    { name: "蚌埠市", value: 0 },
    { name: "淮南市", value: 0 },
    { name: "马鞍山市", value: 0 },
    { name: "淮北市", value: 0 },
    { name: "铜陵市", value: 0 },
    { name: "安庆市", value: 0 },
    { name: "黄山市", value: 0 },
    { name: "滁州市", value: 0 },
    { name: "阜阳市", value: 0 },
    { name: "宿州市", value: 0 },
    { name: "六安市", value: 0 },
    { name: "亳州市", value: 0 },
    { name: "池州市", value: 0 },
    { name: "宣城市", value: 0 }
];

export const convertAnhuiGeoData = () =>
    anhuiDistrictPopulationData
        .map(item => {
            const coord = anhuiDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const anhuiMapChart = {
    id: 'anhui-map-1',
    name: '安徽省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'anhui',
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
                data: anhuiDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertAnhuiGeoData(),
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

// 福建 (adcode: 350000)
export const fujianDistrictGeoCoordMap: Record<string, [number, number]> = {
    '福州市': [119.306239, 26.075302],
    '厦门市': [118.11022, 24.490474],
    '莆田市': [119.007558, 25.431011],
    '三明市': [117.638678, 26.263406],
    '泉州市': [118.589421, 24.908574],
    '漳州市': [117.661801, 24.510897],
    '南平市': [118.178459, 26.635627],
    '龙岩市': [117.02978, 25.091603],
    '宁德市': [119.527082, 26.65924]
};

export const fujianDistrictPopulationData = [
    { name: "福州市", value: 0 },
    { name: "厦门市", value: 0 },
    { name: "莆田市", value: 0 },
    { name: "三明市", value: 0 },
    { name: "泉州市", value: 0 },
    { name: "漳州市", value: 0 },
    { name: "南平市", value: 0 },
    { name: "龙岩市", value: 0 },
    { name: "宁德市", value: 0 }
];

export const convertFujianGeoData = () =>
    fujianDistrictPopulationData
        .map(item => {
            const coord = fujianDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const fujianMapChart = {
    id: 'fujian-map-1',
    name: '福建省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'fujian',
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
                data: fujianDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertFujianGeoData(),
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

// 江西 (adcode: 360000)
export const jiangxiDistrictGeoCoordMap: Record<string, [number, number]> = {
    '南昌市': [115.858198, 28.682892],
    '景德镇市': [117.214664, 29.29256],
    '萍乡市': [113.852186, 27.622946],
    '九江市': [115.992811, 29.712034],
    '新余市': [114.930835, 27.810834],
    '鹰潭市': [117.033838, 28.238638],
    '赣州市': [114.940278, 25.85097],
    '吉安市': [114.986373, 27.111699],
    '宜春市': [114.391136, 27.8043],
    '抚州市': [116.358351, 27.98385],
    '上饶市': [117.971185, 28.44442]
};

export const jiangxiDistrictPopulationData = [
    { name: "南昌市", value: 0 },
    { name: "景德镇市", value: 0 },
    { name: "萍乡市", value: 0 },
    { name: "九江市", value: 0 },
    { name: "新余市", value: 0 },
    { name: "鹰潭市", value: 0 },
    { name: "赣州市", value: 0 },
    { name: "吉安市", value: 0 },
    { name: "宜春市", value: 0 },
    { name: "抚州市", value: 0 },
    { name: "上饶市", value: 0 }
];

export const convertJiangxiGeoData = () =>
    jiangxiDistrictPopulationData
        .map(item => {
            const coord = jiangxiDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const jiangxiMapChart = {
    id: 'jiangxi-map-1',
    name: '江西省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'jiangxi',
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
                data: jiangxiDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertJiangxiGeoData(),
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

// 山东 (adcode: 370000)
export const shandongDistrictGeoCoordMap: Record<string, [number, number]> = {
    '济南市': [117.000923, 36.675807],
    '青岛市': [120.355173, 36.082982],
    '淄博市': [118.047648, 36.814939],
    '枣庄市': [117.557964, 34.856424],
    '东营市': [118.66471, 37.434564],
    '烟台市': [121.391382, 37.539297],
    '潍坊市': [119.107078, 36.70925],
    '济宁市': [116.587245, 35.415393],
    '泰安市': [117.129063, 36.194968],
    '威海市': [122.116394, 37.509691],
    '日照市': [119.461208, 35.428588],
    '临沂市': [118.326443, 35.065282],
    '德州市': [116.307428, 37.453968],
    '聊城市': [115.980367, 36.456013],
    '滨州市': [118.016974, 37.383542],
    '菏泽市': [115.469381, 35.246531]
};

export const shandongDistrictPopulationData = [
    { name: "济南市", value: 0 },
    { name: "青岛市", value: 0 },
    { name: "淄博市", value: 0 },
    { name: "枣庄市", value: 0 },
    { name: "东营市", value: 0 },
    { name: "烟台市", value: 0 },
    { name: "潍坊市", value: 0 },
    { name: "济宁市", value: 0 },
    { name: "泰安市", value: 0 },
    { name: "威海市", value: 0 },
    { name: "日照市", value: 0 },
    { name: "临沂市", value: 0 },
    { name: "德州市", value: 0 },
    { name: "聊城市", value: 0 },
    { name: "滨州市", value: 0 },
    { name: "菏泽市", value: 0 }
];

export const convertShandongGeoData = () =>
    shandongDistrictPopulationData
        .map(item => {
            const coord = shandongDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const shandongMapChart = {
    id: 'shandong-map-1',
    name: '山东省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'shandong',
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
                data: shandongDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertShandongGeoData(),
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

// 台湾 (adcode: 710000)
export const taiwanDistrictGeoCoordMap: Record<string, [number, number]> = {
    '台北市': [121.53185, 25.047758],
    '新北市': [121.467683, 25.011494],
    '桃园市': [121.300939, 24.993628],
    '台中市': [120.679402, 24.143004],
    '台南市': [120.213323, 22.993359],
    '高雄市': [120.313333, 22.62525],
    '基隆市': [121.74635, 25.127541],
    '新竹市': [120.973608, 24.806663],
    '嘉义市': [120.443111, 23.487199],
    '新竹县': [121.072517, 24.841255],
    '苗栗县': [120.820353, 24.560159],
    '彰化县': [120.544606, 24.075556],
    '南投县': [120.685201, 23.913306],
    '云林县': [120.389605, 23.709275],
    '嘉义县': [120.302418, 23.458891],
    '屏东县': [120.487924, 22.682802],
    '宜兰县': [121.753666, 24.702087],
    '花莲县': [121.396181, 23.981757],
    '台东县': [121.145611, 22.755942],
    '澎湖县': [119.586206, 23.571189],
    '金门县': [118.322779, 24.426285],
    '连江县': [119.539704, 26.197363]
};

export const taiwanDistrictPopulationData = [
    { name: "台北市", value: 0 },
    { name: "新北市", value: 0 },
    { name: "桃园市", value: 0 },
    { name: "台中市", value: 0 },
    { name: "台南市", value: 0 },
    { name: "高雄市", value: 0 },
    { name: "基隆市", value: 0 },
    { name: "新竹市", value: 0 },
    { name: "嘉义市", value: 0 },
    { name: "新竹县", value: 0 },
    { name: "苗栗县", value: 0 },
    { name: "彰化县", value: 0 },
    { name: "南投县", value: 0 },
    { name: "云林县", value: 0 },
    { name: "嘉义县", value: 0 },
    { name: "屏东县", value: 0 },
    { name: "宜兰县", value: 0 },
    { name: "花莲县", value: 0 },
    { name: "台东县", value: 0 },
    { name: "澎湖县", value: 0 },
    { name: "金门县", value: 0 },
    { name: "连江县", value: 0 }
];

export const convertTaiwanGeoData = () =>
    taiwanDistrictPopulationData
        .map(item => {
            const coord = taiwanDistrictGeoCoordMap[item.name];
            return coord ? { name: item.name, value: [...coord, item.value] } : null;
        })
        .filter(Boolean as any);

export const taiwanMapChart = {
    id: 'taiwan-map-1',
    name: '台湾省地图',
    type: MapType.Map_Province,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'taiwan',
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
                data: taiwanDistrictPopulationData,
                nameMap: {}
            },
            {
                name: '人口点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertTaiwanGeoData(),
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

export const eastChinaProvinceMaps = [
    shanghaiMapChart,
    jiangsuMapChart,
    zhejiangMapChart,
    anhuiMapChart,
    fujianMapChart,
    jiangxiMapChart,
    shandongMapChart,
    taiwanMapChart
];