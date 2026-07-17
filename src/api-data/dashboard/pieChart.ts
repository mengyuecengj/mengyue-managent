import * as echarts from 'echarts'

declare global {
    interface Window {
        echarts: typeof echarts;
    }
}

if (typeof window !== 'undefined') {
    window.echarts = echarts;
}

export enum ChartType {
    BASIC_PIE = 'basic-pie',
    RING_PIE = 'ring-pie',
    ROSE_PIE = 'rose-pie',
    ROTATE_PIE = 'rotate-pie'
}

export interface ChartConfig {
    id: string;
    name: string;
    type: ChartType;
    options: any;
    description?: string;
}

export const basicPieChart: ChartConfig = {
    id: 'basic-pie-1',
    name: '基础饼图',
    type: ChartType.BASIC_PIE,
    description: '标准饼图',
    options: {
        title: {
            text: '基础饼图',
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
            left: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
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
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                colorBy: 'data',
                data: [
                    { value: 335, name: '直接访问' },
                    { value: 310, name: '邮件营销' },
                    { value: 234, name: '联盟广告' },
                    { value: 135, name: '视频广告' },
                    { value: 1548, name: '搜索引擎' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
};

// 南丁格尔玫瑰图
export const ringPieChart: ChartConfig = {
    id: 'ring-pie-1',
    name: '南丁格尔玫瑰图',
    type: ChartType.RING_PIE,
    description: '扇区半径表示数据大小的饼图',
    options: {
        title: {
            text: '南丁格尔玫瑰图',
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
            textStyle: {
                color: '#fff'
            },
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
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
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['50%', '50%'],
                roseType: 'radius',
                colorBy: 'data',
                data: [
                    { value: 335, name: '直接访问' },
                    { value: 310, name: '邮件营销' },
                    { value: 274, name: '联盟广告' },
                    { value: 235, name: '视频广告' },
                    { value: 400, name: '搜索引擎' }
                ],
                label: {
                    color: '#fff'
                },
                labelLine: {
                    lineStyle: {
                        color: '#666'
                    }
                }
            }
        ]
    }
};

// 环形饼图
export const rosePieChart: ChartConfig = {
    id: 'rose-pie-1',
    name: '环形饼图',
    type: ChartType.ROSE_PIE,
    description: '中间有空心的饼状图',
    options: {
        title: {
            text: '环形饼图',
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
            textStyle: {
                color: '#fff'
            },
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
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
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                colorBy: 'data',
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 335, name: '直接访问' },
                    { value: 310, name: '邮件营销' },
                    { value: 274, name: '联盟广告' },
                    { value: 235, name: '视频广告' },
                    { value: 400, name: '搜索引擎' }
                ]
            }
        ]
    }
};

// 旋转饼图
export const rotatePieChart: ChartConfig = {
    id: 'rotate-pie-1',
    name: '旋转饼图',
    type: ChartType.ROTATE_PIE,
    description: '带旋转动画效果的饼状图',
    options: {
        title: {
            text: '旋转饼图',
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
            textStyle: {
                color: '#fff'
            },
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
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
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                colorBy: 'data', // 确保按数据项分配颜色
                data: [
                    { value: 335, name: '直接访问' },
                    { value: 310, name: '邮件营销' },
                    { value: 274, name: '联盟广告' },
                    { value: 235, name: '视频广告' },
                    { value: 400, name: '搜索引擎' }
                ],
                label: {
                    color: '#fff'
                },
                labelLine: {
                    lineStyle: {
                        color: '#666'
                    }
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function () {
                    return Math.random() * 200;
                }
            }
        ]
    }
};

export const pieChartConfigs: ChartConfig[] = [
    basicPieChart,
    ringPieChart,
    rosePieChart,
    rotatePieChart
];