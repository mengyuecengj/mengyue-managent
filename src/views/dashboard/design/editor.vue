<template>
  <div class="dashboard-top">
    <div class="top-nav">
      <div class="nav-left">
        <MYDropdown v-for="(config, index) in dropdownConfigs" :key="index" trigger="click" placement="bottom-end"
          @command="handleCommand">
          <span class="my-dropdown-link">
            <MYText class="content">{{ config.title }}</MYText>
          </span>
          <template #dropdown>
            <MYScrollbar class="scrollbar-containers" ScrollWidth="4px" trackColor="transparent">
              <div class="dropdown-columns">
                <div class="column">
                  <MYDropdown-item v-for="item in config.items" :key="item.value" :command="item"
                    @mouseenter="handleHover(item)">
                    {{ item.label }}
                  </MYDropdown-item>
                </div>
                <div class="column">
                  <SmoothDndContainer class="dropdown-container" behaviour="copy" group-name="components" tag="div"
                    :get-child-payload="(index: number) => getChildPayload(index)">
                    <SmoothDndDraggable v-for="child in activeChildren" :key="child.value">
                      <MYDropdown-item :command="child.value">
                        {{ child.label }}
                      </MYDropdown-item>
                    </SmoothDndDraggable>
                  </SmoothDndContainer>
                </div>
              </div>
            </MYScrollbar>
          </template>
        </MYDropdown>
        <div class="my-dropdown-link">
          <MYText Tecolor="#fff" size="large" style="margin-bottom: 5px;" @click="dashboardStore.togglePreview()">
            {{ dashboardStore.previewMode ? '退出预览' : '预览' }}
          </MYText>
          <MYText Tecolor="#fff" size="large" style="margin-bottom: 5px;" @click="dashboardStore.saveCurrentDashboard()">保存</MYText>
        </div>
      </div>
      <div class="nav-right">
        <MYButton @click="toggleBrowserFullscreen" plain>
          {{ browserFullscreen ? '退出可视化全屏' : '进入可视化全屏' }}
        </MYButton>
        <MYButton @click="gotoexit" style="margin-left: 8px" type="danger" plain>退出可视化系统</MYButton>
      </div>
    </div>
    <div class="dashboard-content">
      <div class="dashboard-left" v-if="!dashboardStore.previewMode">
        <div class="dashboard-title">
          <MYText Tecolor="var(--general)" size="20px">图层</MYText>
        </div>
        <MYScrollbar height="calc(100vh - 53px)" ScrollWidth="4px">
          <div class="layers-list">
            <div v-for="block in layersSorted" :key="block.id" class="layer-item"
              :class="{ active: dashboardStore.selectedId === block.id }" @click="dashboardStore.selectBlock(block.id)"
              @dblclick="startRename(block)" @contextmenu.prevent="handleContextMenu($event, block)">
              <span class="layer-name">
                {{ editingId === block.id ? '' : block.name }}
                <input v-if="editingId === block.id" v-model="editngName" @blur="finishRename(block.id)"
                  @keyup.enter="finishRename(block.id)" @click.stop ref="renameInput" class="rename-input" />
              </span>
            </div>
          </div>
        </MYScrollbar>
      </div>
      <!-- 中心画布区域（核心改造部分） -->
      <div class="dashboard-center">
        <!-- 外层滚动容器（只有这里出滚动条） -->
        <MYScrollbar height="100vh" ScrollWidth="4px" @mouse.self="cancelSelect">
          <div :class="['canvas-outer', { 'preview-fullscreen': dashboardStore.previewMode }]"
            @mousemove="updateMousePosition">
            <!-- 居中容器（让画布在视野中居中） -->
            <div class="canvas-wrapper">
              <!-- 真实画布（尺寸由 canvasStyle 控制） -->
              <div class="canvas-placeholder" :style="canvasStyle" @mousedown="cancelSelect">
                <SmoothDndContainer class="block-group" group-name="components" @drop="handleDrop">
                  <SmoothDndDraggable v-for="block in chartBlocks" :key="block.id">
                    <DraggableResizableBlock :block="block" />
                  </SmoothDndDraggable>
                </SmoothDndContainer>

                <!-- 空状态提示 -->
                <div v-if="!chartBlocks.length" class="empty-hint">
                  从左侧拖入组件
                </div>

                <!-- 尺寸标签 -->
                <div class="size-tag">
                  {{ screen.width }}×{{ screen.height }}
                </div>
              </div>
            </div>
          </div>
         </MYScrollbar>
      </div>
      <Teleport to="body">
        <Transition name="fade">
          <ul v-show="menuVisible" class="context-menu" :style="{ left: `${menuLeft}px`, top: `${menuTop}px` }"
            role="menu">
            <li role="menuitem" @click="contextDelete()">
              <MYClose class="li-icon"></MYClose>
              <span>删除图层</span>
            </li>
            <li role="menuitem" @click="contextCopy()">
              <MYOdometerText class="li-icon"></MYOdometerText>
              <span>复制图层</span>
            </li>
          </ul>
        </Transition>
      </Teleport>
      <div class="dashboard-right" v-if="!dashboardStore.previewMode">
        <div class="dashboard-title">
          <MYText Tecolor="var(--general)" size="20px">操作</MYText>
          <MYScrollbar height="calc(100vh - 53px)" ScrollWidth="4px">
            <operation v-if="!selectBlock" />
            <component v-else :is="propsPanelComponent" :config="selectBlock.config" :block="selectBlock" />
          </MYScrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { dropdownConfigs, findComponentConfig } from '@/data/dashboard/dropdownTop';
import { toggleBrowserFullscreen } from '@/utils/dashboard';
import { SmoothDndContainer } from '@/components/SmoothDnd/SmoothDndContainer';
import { SmoothDndDraggable } from '@/components/SmoothDnd/SmoothDndDraggable';
import { useDashboardStore } from '@/store/modules/dashboard';
import { DropResult } from 'smooth-dnd';
import DraggableResizableBlock from '@/components/dashboard/blocks/DraggableResizableBlock.vue';
import operation from './operation.vue'
import { getPropsPanel } from '@/components/dashboard/propsPanel';
import { resolveComponentByType } from '@/utils/resolveComponentByType'

const dashboardStore = useDashboardStore()
const { blocks: chartBlocks, screen } = storeToRefs(dashboardStore) // 新增 screen 解构
const router = useRouter();
const browserFullscreen = ref(false);
const activeChildren = ref<any[]>([])
const menuVisible = ref(false)
const menuLeft = ref(0)
const menuTop = ref(0)
const currentRightClickBlockId = ref<string | null>(null)

const cancelSelect = (e: MouseEvent) => {
  // 如果点击落在某个图层（或图层内部元素）上，则不取消选中
  const target = e.target as HTMLElement | null
  if (target && target.closest && target.closest('.chart-block')) {
    return
  }

  // 使用 store 的方法取消选中（优先用已有方法）
  if (typeof dashboardStore.selectBlock === 'function') {
    dashboardStore.selectBlock(null)
  } else {
    dashboardStore.selectedId = null
  }
}


const handleContextMenu = (e: MouseEvent, block: any) => {
  e.preventDefault()
  currentRightClickBlockId.value = block.id
  menuVisible.value = true
  menuLeft.value = e.clientX
  menuTop.value = e.clientY

  const closeMenu = () => {
    menuVisible.value = false
    document.removeEventListener('click', closeMenu)
  }
  setTimeout(() => {
    document.addEventListener('click', closeMenu)
  }, 100)
}

const selectBlock = computed(() => {
  return chartBlocks.value.find(item => item.id === dashboardStore.selectedId)

})

const propsPanelComponent = computed(() => {
  if (!selectBlock.value) return null
  return getPropsPanel(selectBlock.value.type) || 'div'
})

const handleHover = (item: any) => {
  activeChildren.value = item.children || []
}

const layersSorted = computed(() => {
  return [...chartBlocks.value].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
})

const editingId = ref<string | null>(null)
const editngName = ref('')

const startRename = async (block: any) => {
  editingId.value = block.id
  editngName.value = block.name
  await nextTick()
    ; (document.querySelector('.rename-input') as HTMLInputElement)?.focus()
}

const finishRename = (id: string) => {
  if (editngName.value.trim()) {
    dashboardStore.renameBlock(id, editngName.value.trim())
  }
  editingId.value = null
}

const canvasStyle = computed(() => ({
  width: `${screen.value.width}px`,
  height: `${screen.value.height}px`,
  backgroundColor: screen.value.backgroundColor, // 使用 screen.value
  backgroundImage: screen.value.backgroundImage ? `url(${screen.value.backgroundImage})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}))

// 深度克隆对象，确保每个组件都是独立的
const deepClone = (obj: any): any => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (obj instanceof Object) {
    const clonedObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}

const mouseX = ref(0)
const mouseY = ref(0)
const updateMousePosition = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

const handleDrop = (dropResult: DropResult) => {
  const { payload, addedIndex } = dropResult
  if (!payload || addedIndex === null) return

  // 用鼠标位置计算 x/y（移除 dropEvent）
  const canvas = document.querySelector('.canvas-placeholder') as HTMLElement | null
  const rect = canvas?.getBoundingClientRect()
  const x = mouseX.value - (rect?.left || 0) - 200 || 200 // 偏移以块居中
  const y = mouseY.value - (rect?.top || 0) - 150 || 200

  dashboardStore.addBlock(payload.type, payload.component || payload.config, x, y)
}

const getChildPayload = (index: number) => {
  const child = activeChildren.value[index]
  if (!child?.componentConfig) return null

  if (child.type === 'decoration') {
    return {
      type: child.value,
      component: child.componentConfig // 直接传
    }
  } else {
    return {
      type: child.value,
      config: JSON.parse(JSON.stringify(child.componentConfig))
    }
  }
}

const handleCommand = (command: string) => {
  const componentConfig = findComponentConfig(command)
  if (!componentConfig) return
}

const contextDelete = () => {
  if (!currentRightClickBlockId.value) true
  if (currentRightClickBlockId.value) {
    dashboardStore.removeBlock(currentRightClickBlockId.value);
    menuVisible.value = false;
  }
  menuVisible.value = false
}

const contextCopy = () => {
  if (!currentRightClickBlockId.value) true
  if (currentRightClickBlockId.value) {
    dashboardStore.copyBlock(currentRightClickBlockId.value);
    menuVisible.value = false;
  }
  menuVisible.value = false
}

const handleFullscreenChange = () => {
  browserFullscreen.value = !!document.fullscreenElement;
};

const gotoexit = () => {
  router.push("/dashboard/design/list");
};

const saveScreen = () => {
  const data = {
    screen: dashboardStore.screen,
    blocks: dashboardStore.blocks.map(b => ({
      ...b,
      component: undefined   // 🚨 不能保存组件对象
    }))
  }

  localStorage.setItem('dashboard-screen', JSON.stringify(data))
  ElMessage.success('保存成功！')
}

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  onMounted(() => {
  const saved = localStorage.getItem('dashboard-screen')
  if (!saved) return

  const data = JSON.parse(saved)

  dashboardStore.screen = data.screen
  dashboardStore.blocks = data.blocks.map((b: any) => ({
    ...b,
    component: resolveComponentByType(b)   // 🔥 自动还原
  }))
})

});
</script>

<style scoped lang="scss">
.dashboard-center {
  overflow: auto !important;
}

.bar-chart-renderer {
  width: 100% !important;
  height: 100% !important;
}

.multi-column-dropdown {
  width: 320px !important;
}

.dropdown-columns {
  display: flex;
  min-height: 200px;
  height: auto;
}

.column {
  flex: 1;
  border-right: 1px solid var(--el-border-color-light);

  &:last-child {
    border-right: none;
  }
}

.my-dropdown-link {
  color: #fff;
  display: flex;
  align-items: center;
  gap: 32px; // 控制“预览”和“保存”之间的间距
  font-size: 16px; // 与下拉菜单字体一致
  cursor: pointer;
}

.my-dropdown-link .content {
  font-size: 16px;
}

.canvas-placeholder {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 600px;
  background: #0f0f0f url('data:image/svg+xml,...网格背景...') repeat;
  overflow: hidden;
}

.block-group {
  width: 100%;
  height: 100%;
}

.layers-list {
  margin-top: 12px;
  max-height: calc(100% - 53px);
}

.layer-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  margin: 4px 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
  color: #ddd;

  &:hover {
    background: rgba(64, 158, 255, 0.2);
  }

  &.active {
    background: rgba(64, 158, 255, 0.4);
    color: white;
    font-weight: 500;
  }
}

.layer-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rename-input {
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid #409eff;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  outline: none;
}

.canvas-outer {
  flex: 1;
  overflow: auto;
  background: #111;
  padding: 40px;
  // 可选：网格背景
  background-image: radial-gradient(circle, #222 1px, transparent 1px);
  background-size: 20px 20px;
}

.canvas-wrapper {
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.canvas-placeholder {
  position: relative;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.8);
  border: 1px solid #333;
  overflow: hidden;
  // 关键：移除 width: 100%！让它由 canvasStyle 控制
}

.block-group {
  width: 100%;
  height: 100%;
}

.context-menu {
  position: fixed;
  z-index: 9999;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 4px 0;
  min-width: 120px;
  list-style: none;
  margin: 0;

  li {
    padding: 8px 12px;
    cursor: pointer;
    display: flex;
    align-items: center;

    .li-icon {
      margin-right: 8px;
      width: 16px;
      height: 16px;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

:deep(.el-dropdown-menu__item) {
  padding: 8px 16px;
  font-size: 14px;
  color: var(--el-text-color-regular);

  &:hover {
    background-color: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
  }
}

/* 预览时让画布区域铺满屏幕 */
.preview-fullscreen {
  position: fixed !important;
  z-index: 99980;
  left: 0;
  top: 0;
  width: 100vw !important;
  height: 100vh !important;
  padding: 0 !important;
  background: var(--el-color-black, #0a0a0a);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 预览退出悬浮按钮 */
.preview-exit-btn {
  position: fixed;
  top: 18px;
  right: 18px;
  z-index: 99990;
}

/* 确保 canvas 内真实画布仍按 canvasStyle 控制尺寸（不要破坏） */
.preview-fullscreen .canvas-wrapper {
  justify-content: center;
  align-items: center;
}

/* 当全屏预览时隐藏滚动条背景、padding 等视觉杂项（可选） */
.preview-fullscreen .canvas-placeholder {
  box-shadow: none;
  border: none;
  min-height: 0;
}
</style>