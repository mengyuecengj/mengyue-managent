import * as echarts from 'echarts'
import worldMapData from '~/MapWorld.json'
import chinaMapData from '~/china.json'
console.log(chinaMapData.features[0].properties.name);  // 应该输出 "北京"

declare global {
    interface Window {
        echarts: typeof echarts
    }
}

if (typeof window !== 'undefined') {
    window.echarts = echarts
    echarts.registerMap('world', worldMapData as any)
    echarts.registerMap('china', chinaMapData as any)
    const chinaMap = echarts.getMap('china');
    console.log(chinaMap ? 'China map registered' : 'China map not registered');
}

export enum MapType {
    Map_World = 'map-world',
    Map_China = 'map-china'
}

export const geoCoordMap: Record<string, [number, number]> = {
    China: [116.46, 39.92],
    India: [78.96, 20.59],
    'United States': [-95.71, 37.09],
    Indonesia: [113.92, -0.79],
    Pakistan: [69.34, 30.38],
    Brazil: [-51.92, -14.24],
    Nigeria: [8.68, 9.08],
    Bangladesh: [90.36, 23.68],
    Russia: [105.32, 61.52],
    Mexico: [-102.55, 23.63],
    Japan: [138.25, 36.20],
    Philippines: [121.77, 12.88],
    Egypt: [30.80, 26.82],
    Ethiopia: [40.49, 9.15],
    Vietnam: [108.28, 14.06],
    'Democratic Republic of the Congo': [21.76, -4.04],
    Turkey: [35.24, 38.96],
    Iran: [53.69, 32.43],
    Germany: [10.45, 51.16],
    Thailand: [100.99, 15.87]
}

export const populationData = [
    { name: 'China', value: 1411778724 },
    { name: 'India', value: 1380004385 },
    { name: 'United States', value: 332915073 },
    { name: 'Indonesia', value: 273523615 },
    { name: 'Pakistan', value: 220892340 },
    { name: 'Brazil', value: 212559417 },
    { name: 'Nigeria', value: 206139589 },
    { name: 'Bangladesh', value: 164689383 },
    { name: 'Russia', value: 145912025 },
    { name: 'Mexico', value: 128932753 },
    { name: 'Japan', value: 126476461 },
    { name: 'Philippines', value: 109581078 },
    { name: 'Egypt', value: 102334404 },
    { name: 'Ethiopia', value: 114963588 },
    { name: 'Vietnam', value: 97338579 },
    { name: 'Democratic Republic of the Congo', value: 89561403 },
    { name: 'Turkey', value: 84339067 },
    { name: 'Iran', value: 83992949 },
    { name: 'Germany', value: 83783942 },
    { name: 'Thailand', value: 69799978 }
]

export const convertGeoData = () =>
    populationData
        .map(item => {
            const coord = geoCoordMap[item.name]
            return coord ? { name: item.name, value: [...coord, item.value] } : null
        })
        .filter(Boolean)

export const worldMapChart = {
    id: 'world-map-1',
    name: '世界地图',
    type: MapType.Map_World,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'world',
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
                data: populationData,
                nameMap: {
                    'United States of America': 'United States',
                    'Viet Nam': 'Vietnam',
                    'Democratic Republic of Congo': 'Democratic Republic of the Congo'
                }
            }
        ]
    }
}

// export const worldMapBubbleChart = {
//     id: 'world-map-bubble',
//     name: '世界地图气泡图',
//     type: MapType.Map_World,
//     options: {
//         tooltip: {
//             trigger: 'item',
//             formatter: (p: any) => `${p.name}<br/>人口：${p.value?.[2]}`
//         },
//         geo: {
//             map: 'world',
//             roam: true,
//             itemStyle: { areaColor: '#283650', borderColor: '#14b82a' }
//         },
//         visualMap: {
//             min: 0,
//             max: 1500000000,
//             inRange: { symbolSize: [8, 40] },
//             textStyle: { color: '#fff' }
//         },
//         series: [
//             {
//                 name: '人口数量',
//                 type: 'scatter',
//                 coordinateSystem: 'geo',
//                 data: convertGeoData(),
//                 symbolSize: (val: number[]) => val[2] / 5e7,
//                 emphasis: { itemStyle: { borderColor: '#fff', borderWidth: 1 } }
//             }
//         ]
//     }
// }

// export const worldMapHeatmapChart = {
//     id: 'world-map-heatmap',
//     name: '世界地图热力图',
//     type: MapType.Map_World,
//     options: {
//         geo: { map: 'world', roam: true, itemStyle: { areaColor: '#283650', borderColor: '#14b82a' } },
//         visualMap: {
//             min: 0,
//             max: 1500000000,
//             textStyle: { color: '#fff' },
//             inRange: { color: ['#283650', '#14b82a', '#ffeb3b', '#ff5722'] }
//         },
//         series: [
//             {
//                 name: '人口热力',
//                 type: 'heatmap',
//                 coordinateSystem: 'geo',
//                 data: convertGeoData(),
//                 pointSize: 20,
//                 blurSize: 30
//             }
//         ]
//     }
// }

export const chinaMapChart = {
    id: 'china-map-1',
    name: '中国地图',
    type: MapType.Map_China,
    options: {
        title: { text: '' },
        series: [
            {
                name: '人口',
                type: 'map',
                map: 'china',
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
                data: [
                    { name: '北京', value: 21540000 },
                    { name: '上海', value: 24240000 },
                    // 添加更多省市数据...
                ],
                nameMap: {}
            }
        ]
    }
}
// export const mapChartConfigs = [worldMapChart, worldMapBubbleChart, worldMapHeatmapChart]
export const mapChartConfigs = [worldMapChart, chinaMapChart]
