<template>
    <div class="dashboard-container">
        <MYRow :gutter="20" class="app-row">
            <MYCol :span="6" v-for="item in data.appList" :key="item.name">
                <div class="app-list">
                    <MYText Tecolor="var(--navbar-text)" class="name">{{ item.name }}</MYText>
                    <MYText TTecolor="var(--navbar-text)" class="total">{{ item.total }}</MYText>
                    <MYButton :type="item.type" round class="num" colorText="#fff">{{ item.num }}</MYButton>
                    <MYText Tecolor="var(--navbar-text)" class="context">{{ item.context }}</MYText>
                </div>
            </MYCol>
        </MYRow>

        <div class="content-wrapper">
            <div class="template-container">
                <MYText Tecolor="var(--navbar-text)" class="template-title">监控概览</MYText>
                <MYRow :gutter="20" class="template-row" justify="space-between">
                    <!-- 命令统计卡片 -->
                    <MYCol :span="11" class="card-box">
                        <MYCard class="chart-card">
                            <template #header>
                                <PieChart style="width: 1em; height: 1em; vertical-align: middle;" />
                                <span style="color: var(--general); margin: 10px;">命令统计</span>
                            </template>
                            <template #body>
                                <div class="custom-table custom-table--enable-row-hover custom-table--medium">
                                    <div ref="commandstats" style="height: 350px" />
                                </div>
                            </template>
                        </MYCard>
                    </MYCol>

                    <!-- 内存信息卡片 -->
                    <MYCol :span="11" class="card-box">
                        <MYCard class="chart-card">
                            <template #header>
                                <Odometer style="width: 1em; height: 1em; vertical-align: middle;" />
                                <span style="color: var(--general); margin: 10px;">内存信息</span>
                            </template>
                            <template #body>
                                <div class="custom-table custom-table--enable-row-hover custom-table--medium">
                                    <div ref="usedmemory" style="height: 300px" />
                                </div>
                            </template>
                        </MYCard>
                    </MYCol>
                </MYRow>
            </div>

            <div class="template-master">
                <div class="template-slave">
                    <MYText Tecolor="var(--navbar-text)" class="fast-title">快速入口</MYText>
                    <MYButton type="primary" class="document">
                        <MYa href="/api/leading" color="#fff" underline>
                            查阅接口文档
                        </MYa>
                    </MYButton>
                    <MYButton type="primary" colorText="#fff" class="document">
                        <MYa href="/tool/build" color="#fff" underline>
                            表单构建
                        </MYa>
                    </MYButton>
                    <MYButton type="primary" colorText="#fff" class="document">
                        <MYa href="/system/user" color="#fff" underline>
                            用户管理
                        </MYa>
                    </MYButton>
                    <MYButton type="primary" colorText="#fff" class="document">
                        <MYa href="/monitor/online" color="#fff" underline>
                            在线用户
                        </MYa>
                    </MYButton>
                </div>
                <div class="template-notice">
                    <MYText Tecolor="var(--navbar-text)" class="fast-title">系统公告</MYText>
                    <div class="timeline-container">
                        <MYText Tecolor="var(--general)">暂无</MYText>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getCache } from '@/api/monitor/cache';
import modal from '@/plugins/modal';
import * as echarts from 'echarts';

const cache = ref([]) as any;
const commandstats = ref(null);
const usedmemory = ref(null);
function getList() {
    modal.loading("正在加载缓存监控数据，请稍候！");
    getCache().then(response => {
        modal.closeLoading();
        cache.value = response.data;

        const commandstatsIntance = echarts.init(commandstats.value, "macarons");
        commandstatsIntance.setOption({
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name: "命令",
                    type: "pie",
                    roseType: "radius",
                    radius: [15, 95],
                    center: ["50%", "38%"],
                    data: response.data.commandStats,
                    animationEasing: "cubicInOut",
                    animationDuration: 1000
                }
            ]
        });

        const usedmemoryInstance = echarts.init(usedmemory.value, "macarons");
        usedmemoryInstance.setOption({
            tooltip: {
                formatter: "{b} <br/>{a} : " + cache.value.info.used_memory_human
            },
            series: [
                {
                    name: "峰值",
                    type: "gauge",
                    min: 0,
                    max: 1000,
                    detail: {
                        formatter: cache.value.info.used_memory_human
                    },
                    data: [
                        {
                            value: parseFloat(cache.value.info.used_memory_human),
                            name: "内存消耗"
                        }
                    ]
                }
            ]
        });

        window.addEventListener("resize", () => {
            commandstatsIntance.resize();
            usedmemoryInstance.resize();
        });
    });
}

getList();
const data = reactive({
    appList: [
        {
            name: '路由数量',
            total: '32',
            num: '+100%',
            type: "primary" as const,
            context: '活跃项目',
        },
        {
            name: '在线用户',
            total: '1',
            num: '+0%',
            type: "primary" as const,
            context: '当前登录人数',
        },
        {
            name: '登录失败',
            total: '0',
            num: '+0%',
            type: "success" as const,
            context: '登录失败IP',
        },
        {
            name: '登录日志',
            total: '1',
            num: '100%',
            type: "danger" as const,
            context: '当前登录日志',
        }
    ]
})
</script>

<style lang="scss" scoped>
.dashboard-container {
    height: auto;
    padding: 20px;
    border-radius: 12px;
}

.app-list {
    position: relative;
    left: 30px;
    width: 230px;
    height: 130px;
    flex-shrink: 0;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    }

    .name {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 16px;
    }

    .total {
        position: absolute;
        top: 35px;
        left: 10px;
        font-size: 30px;
    }

    .num {
        position: absolute;
        top: 45px;
        right: 10px;
        font-size: 16px;
    }

    .context {
        position: absolute;
        bottom: 10px;
        left: 10px;
        font-size: 12px;
    }
}

:deep(.my-col) {
    flex: 0 0 270px;
}

.content-wrapper {
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-top: 20px;
    margin-left: 30px;
}

.template-container {
    flex: 1;
    height: auto;
    padding: 30px;
    background: var(--index-bg-color);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    max-width: calc(100% - 490px);

    .template-title {
        font-size: 20px;
        display: block;
        margin-bottom: 20px;
    }

    .template-row {
        display: flex;
        justify-content: space-between;
    }

    .card-box {
        flex: 0 1 48%;
    }

    .chart-card {
        height: 100%;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
    }
}

.template-master {
    width: 370px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.template-slave {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: 260px;
    background: var(--index-bg-color);
    flex-shrink: 0;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

    .fast-title {
        font-size: 20px;
    }

    .document {
        width: 80%;
    }
}

.template-notice {
    width: 100%;
    height: 360px;
    background: var(--index-bg-color);
    flex-shrink: 0;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

    .fast-title {
        font-size: 20px;
        padding: 20px
    }

    .timeline-container {
        position: absolute;
        right: 270px;
    }

    .activity-item {
        span {
            display: block;
        }
    }
}
</style>
