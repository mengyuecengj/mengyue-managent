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
      <div class="dashboard-center">
        <MYScrollbar height="100vh" ScrollWidth="4px" @mouse.self="cancelSelect">
          <div :class="['canvas-outer', { 'preview-fullscreen': dashboardStore.previewMode }]"
            @mousemove="updateMousePosition">
            <div class="canvas-wrapper">
              <div class="canvas-placeholder" :style="canvasStyle" @mousedown="cancelSelect">
                <SmoothDndContainer class="block-group" group-name="components" @drop="handleDrop">
                  <SmoothDndDraggable v-for="block in chartBlocks" :key="block.id">
                    <DraggableResizableBlock :block="block" />
                  </SmoothDndDraggable>
                </SmoothDndContainer>

                <div v-if="!chartBlocks.length" class="empty-hint">
                  从左侧拖入组件
                </div>

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
const { blocks: chartBlocks, screen } = storeToRefs(dashboardStore)
const router = useRouter();
const browserFullscreen = ref(false);
const activeChildren = ref<any[]>([])
const menuVisible = ref(false)
const menuLeft = ref(0)
const menuTop = ref(0)
const currentRightClickBlockId = ref<string | null>(null)

const cancelSelect = (e: MouseEvent) => {
  const target = e.target as HTMLElement | null
  if (target && target.closest && target.closest('.chart-block')) {
    return
  }

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
  backgroundColor: screen.value.backgroundColor,
  backgroundImage: screen.value.backgroundImage ? `url(${screen.value.backgroundImage})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}))

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
      component: child.componentConfig
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

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  onMounted(() => {
  const saved = localStorage.getItem('dashboard-screen')
  if (!saved) return

  const data = JSON.parse(saved)

  dashboardStore.screen = data.screen
  dashboardStore.blocks = data.blocks.map((b: any) => ({
    ...b,
    component: resolveComponentByType(b)
  }))
})

});
</script>
