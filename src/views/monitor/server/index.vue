<template>
  <div class="app-container">
    <MYRow :gutter="10">
      <!-- CPU 卡片 -->
      <MYCol :span="12" class="card-box">
        <MYCard>
          <template #header>
            <Cpu style="width: 1em; height: 1em; vertical-align: middle;" /> 
            <span style="color: var(--general)">CPU</span>
          </template>
          <template #body>
            <div class="custom-table custom-table--enable-row-hover custom-table--medium">
              <table cellspacing="0" style="width: 100%;">
                <thead>
                  <tr>
                    <th class="custom-cell leaf">
                      <div class="cell">属性</div>
                    </th>
                    <th class="custom-cell leaf">
                      <div class="cell">值</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="custom-cell leaf">
                      <div class="cell">核心数</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="server.cpu">{{ server.cpu.cpuNum }}</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="custom-cell leaf">
                      <div class="cell">用户使用率</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="server.cpu">{{ server.cpu.used }}%</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="custom-cell leaf">
                      <div class="cell">系统使用率</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="server.cpu">{{ server.cpu.sys }}%</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="custom-cell leaf">
                      <div class="cell">当前空闲率</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="server.cpu">{{ server.cpu.free }}%</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </MYCard>
      </MYCol>

      <!-- 内存卡片 -->
      <MYCol :span="12" class="card-box">
        <MYCard>
          <template #header>
            <Tickets style="width: 1em; height: 1em; vertical-align: middle;" /> 
            <span style="color: var(--general)">内存</span>
          </template>
          <template #body>
            <div class="custom-table custom-table--enable-row-hover custom-table--medium">
              <table cellspacing="0" style="width: 100%;">
                <thead>
                  <tr>
                    <th class="custom-cell leaf">
                      <div class="cell">属性</div>
                    </th>
                    <th class="custom-cell leaf">
                      <div class="cell">内存</div>
                    </th>
                    <th class="custom-cell leaf">
                      <div class="cell">JVM</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="custom-cell leaf">
                      <div class="cell">总内存</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="server.mem">{{ server.mem.total }}G</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="server.jvm">{{ server.jvm.total }}M</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="custom-cell leaf">
                      <div class="cell">已用内存</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="server.mem">{{ server.mem.used }}G</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="server.jvm">{{ server.jvm.used }}M</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="custom-cell leaf">
                      <div class="cell">剩余内存</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="server.mem">{{ server.mem.free }}G</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="server.jvm">{{ server.jvm.free }}M</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="custom-cell leaf">
                      <div class="cell">使用率</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="server.mem" :class="{ 'text-danger': server.mem.usage > 80 }">{{
                        server.mem.usage
                      }}%</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="server.jvm" :class="{ 'text-danger': server.jvm.usage > 80 }">{{
                        server.jvm.usage
                      }}%</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </MYCard>
      </MYCol>

      <!-- 服务器信息卡片 -->
      <MYCol :span="24" class="card-box">
        <MYCard style="margin-top: 20px;">
          <template #header>
            <Monitor style="width: 1em; height: 1em; vertical-align: middle;" /> 
            <span style="color: var(--general)">服务器信息</span>
          </template>
          <template #body>
            <div class="custom-table custom-table--enable-row-hover custom-table--medium">
              <table cellspacing="0" style="width: 100%;">
                <tbody>
                  <tr>
                    <td class="custom-cell leaf">
                      <div class="cell">服务器名称</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="server.sys">{{ server.sys.computerName }}</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell">操作系统</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="server.sys">{{ server.sys.osName }}</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="custom-cell leaf">
                      <div class="cell">服务器IP</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="server.sys">{{ server.sys.computerIp }}</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell">系统架构</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="server.sys">{{ server.sys.osArch }}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </MYCard>
      </MYCol>

      <!-- Java虚拟机信息卡片 -->
      <MYCol :span="24" class="card-box">
        <MYCard style="margin-top: 20px;">
          <template #header>
            <CoffeeCup style="width: 1em; height: 1em; vertical-align: middle;" /> 
            <span style="color: var(--general)">Java虚拟机信息</span>
          </template>
          <template #body>
            <div class="custom-table custom-table--enable-row-hover custom-table--medium">
              <table cellspacing="0" style="width: 100%; table-layout: fixed;">
                <tbody>
                  <tr>
                    <td class="custom-cell leaf">
                      <div class="cell">Java名称</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="server.jvm">{{ server.jvm.name }}</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell">Java版本</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="server.jvm">{{ server.jvm.version }}</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="custom-cell leaf">
                      <div class="cell">启动时间</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="server.jvm">{{ server.jvm.startTime }}</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell">运行时长</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" v-if="server.jvm">{{ server.jvm.runTime }}</div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="1" class="custom-cell leaf">
                      <div class="cell">安装路径</div>
                    </td>
                    <td colspan="3" class="custom-cell leaf">
                      <div class="cell" v-if="server.jvm">{{ server.jvm.home }}</div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="1" class="custom-cell leaf">
                      <div class="cell">项目路径</div>
                    </td>
                    <td colspan="3" class="custom-cell leaf">
                      <div class="cell" v-if="server.sys">{{ server.sys.userDir }}</div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="1" class="custom-cell leaf">
                      <div class="cell">运行参数</div>
                    </td>
                    <td colspan="3" class="custom-cell leaf">
                      <div class="cell" v-if="server.jvm">{{ server.jvm.inputArgs }}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </MYCard>
      </MYCol>

      <!-- 磁盘状态卡片 -->
      <MYCol :span="24" class="card-box">
        <MYCard style="margin-top: 20px;">
          <template #header>
            <MessageBox style="width: 1em; height: 1em; vertical-align: middle;" /> 
            <span style="color: var(--general)">磁盘状态</span>
          </template>
          <template #body>
            <div class="custom-table custom-table--enable-row-hover custom-table--medium">
              <table cellspacing="0" style="width: 100%;">
                <thead>
                  <tr>
                    <th class="custom-cell leaf">
                      <div class="cell">盘符路径</div>
                    </th>
                    <th class="custom-cell leaf">
                      <div class="cell">文件系统</div>
                    </th>
                    <th class="custom-cell leaf">
                      <div class="cell">盘符类型</div>
                    </th>
                    <th class="custom-cell leaf">
                      <div class="cell">总大小</div>
                    </th>
                    <th class="custom-cell leaf">
                      <div class="cell">可用大小</div>
                    </th>
                    <th class="custom-cell leaf">
                      <div class="cell">已用大小</div>
                    </th>
                    <th class="custom-cell leaf">
                      <div class="cell">已用百分比</div>
                    </th>
                  </tr>
                </thead>
                <tbody v-if="server.sysFiles">
                  <tr v-for="(sysFile, index) in server.sysFiles" :key="index">
                    <td class="custom-cell leaf">
                      <div class="cell">{{ sysFile.dirName }}</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell">{{ sysFile.sysTypeName }}</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell">{{ sysFile.typeName }}</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell">{{ sysFile.total }}</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell">{{ sysFile.free }}</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell">{{ sysFile.used }}</div>
                    </td>
                    <td class="custom-cell leaf">
                      <div class="cell" :class="{ 'text-danger': sysFile.usage > 80 }">{{ sysFile.usage }}%</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </MYCard>
      </MYCol>
    </MYRow>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getServer } from '@/api/monitor/server'
import modal from '@/plugins/modal'
import { ServerData } from '@/types/views/server'

const server = ref<ServerData>({})

function getList() {
  modal.loading("正在加载服务监控数据，请稍候！")
  getServer().then((response: any) => {
    server.value = response.data
    modal.closeLoading()
  })
}

getList()
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