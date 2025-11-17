<template>
  <div class="app-container">
    <MYRow :gutter="10">
      <!-- 基本信息卡片 -->
      <MYCol :span="24" class="card-box">
        <MYCard>
          <template #header>
            <Monitor style="width: 1em; height: 1em; vertical-align: middle;" /> 
            <span style="color: var(--general)">基本信息</span>
          </template>
          <template #body>
            <div class="custom-table custom-table--enable-row-hover custom-table--medium">
              <table cellspacing="0" style="width: 100%">
                <tbody>
                  <tr>
                    <td class="custom-cell leaf">
                      <div class="cell">Redis版本</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="cache.info">{{ cache.info.redis_version }}</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell">运行模式</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="cache.info">{{ cache.info.redis_mode == "standalone" ? "单机" : "集群" }}</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell">端口</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="cache.info">{{ cache.info.tcp_port }}</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell">客户端数</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="cache.info">{{ cache.info.connected_clients }}</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="custom-cell leaf">
                      <div class="cell">运行时间(天)</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="cache.info">{{ cache.info.uptime_in_days }}</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell">使用内存</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="cache.info">{{ cache.info.used_memory_human }}</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell">使用CPU</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="cache.info">{{ parseFloat(cache.info.used_cpu_user_children).toFixed(2) }}</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell">内存配置</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="cache.info">{{ cache.info.maxmemory_human }}</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="custom-cell leaf">
                      <div class="cell">AOF是否开启</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="cache.info">{{ cache.info.aof_enabled == "0" ? "否" : "是" }}</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell">RDB是否成功</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="cache.info">{{ cache.info.rdb_last_bgsave_status }}</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell">Key数量</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="cache.dbSize">{{ cache.dbSize }}</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell">网络入口/出口</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="cache.info">{{ cache.info.instantaneous_input_kbps }}kps/{{ cache.info.instantaneous_output_kbps }}kps</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </MYCard>
      </MYCol>

      <!-- 命令统计卡片 -->
      <MYCol :span="12" class="card-box">
        <MYCard style="margin-top: 20px;">
          <template #header>
            <PieChart style="width: 1em; height: 1em; vertical-align: middle;" /> 
            <span style="color: var(--general)">命令统计</span>
          </template>
          <template #body>
            <div class="custom-table custom-table--enable-row-hover custom-table--medium">
              <div ref="commandstats" style="height: 350px" />
            </div>
          </template>
        </MYCard>
      </MYCol>

      <!-- 内存信息卡片 -->
      <MYCol :span="12" class="card-box">
        <MYCard style="margin-top: 20px;">
          <template #header>
            <Odometer style="width: 1em; height: 1em; vertical-align: middle;" /> 
            <span style="color: var(--general)">内存信息</span>
          </template>
          <template #body>
            <div class="custom-table custom-table--enable-row-hover custom-table--medium">
              <div ref="usedmemory" style="height: 350px" />
            </div>
          </template>
        </MYCard>
      </MYCol>
    </MYRow>
  </div>
</template>

<script setup name="Cache" lang="ts">
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
</script>

<style scoped lang="scss">
/* 表格容器 */
.custom-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  color: var(--general-text); // 动态文本颜色
  background-color: var(--table-body-bg); // 动态背景颜色
  border: 1px solid var(--table-border-color); // 动态边框颜色
  box-shadow: 0 200px 12px rgba(0, 0, 0, 0.1);
}

/* 表格单元格 */
.custom-cell {
  padding: 8px 16px;
  text-align: left;
  border-bottom: 1px solid var(--table-border-color); // 动态边框颜色
}

/* 表头单元格 */
.custom-cell.leaf {
  font-weight: bold;
  background-color: var(--table-header-bg); // 动态表头背景颜色
  color: var(--tags-item-text); // 动态表头文字颜色
}

/* 鼠标悬停效果 */
.custom-table--enable-row-hover tr:hover {
  background-color: var(--tags-bg-hover); // 动态悬停背景颜色
}

/* 卡片样式 */
.card-box {
  margin-bottom: 20px;
  background-color: var(--dialog-bg); // 动态卡片背景颜色
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

/* 危险文本颜色 */
.text-danger {
  color: var(--tags-close-hover); // 动态危险文本颜色
}
</style>