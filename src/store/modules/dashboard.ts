import { defineStore } from 'pinia'
import { ref, reactive, markRaw, shallowRef } from 'vue'
import { findItem } from '@/data/dashboard/dropdownTop'
import { DashboardBlock } from '@/types/store/dashboard'
import modal from '@/plugins/modal'
import { cloneDeep } from 'lodash-es'

// 图表
const BASE_BLOCK_CONFIG = {
  visible: true,
  color: '#409EFF',
  widthX: 0,
  title: false,
  titleColor: '#fff',
  fontWeight: '600',
  fontSize: 8,
  xAlign: false,
  xName: '',
  xVisible: true,
  splitLine: false,
  splitLineColor: '#ccc',
  xmove: 0,
  xRotate: 0,
  xInverse: false,
  xDataSize: 12,
  yAlign: false,
  yName: '',
  yVisible: true,
  ySplitLine: true,
  ySplitLineColor: '#ccc',
  yInverse: false,
  yDataSize: 12,
  dataSettingAlign: false,
  dataAlign: false,
  dataSize: 12,
  dataSizeColor: "#fff",
  dataWeight: 600,
  MPAlign: false,
  MPTop: 10,
  MPBottom: 5,
  MPLeft: 5,
  MPRight: 5
} as const

export const useDashboardStore = defineStore('dashboard', () => {
  const blocks = ref<DashboardBlock[]>([])
  const selectedId = ref<string | null>(null)
  const previewMode = ref(false)
  const dashboards = ref<Record<string, any>>({})
  const currentId = ref<string>('')

  // 切换大屏
  const loadDashboard = (id: string) => {
    currentId.value = id

    // 如果没有这个大屏的数据，初始化一个空数组
    if (!dashboards.value[id]) {
      dashboards.value[id] = []
    }

    selectedId.value = null
  }
  const togglePreview = () => {
    previewMode.value = !previewMode.value
  }

  const screen = reactive({
    width: "1920",
    height: "1080",
    backgroundColor: '#0f0f0f',
    backgroundImage: '',
    title: '大屏展示1',
    description: '这是大屏的描述',
    thumbnail: ''
  })

  const getNextZIndex = (): number => {
    if (blocks.value.length === 0) return 1
    return Math.max(...blocks.value.map(b => b.zIndex)) + 1
  }

  const selectBlock = (id: string | null) => {
    selectedId.value = id
  }

  const createChartBlock = (item: any, componentConfig: any, defaultName: string) => {
    const config = cloneDeep(componentConfig)
    const defaultWidth = config.options?.width || 600
    const defaultHeight = config.options?.height || 400

    return {
      rendererType: 'chart' as const,
      config,
      component: null,
      defaultWidth,
      defaultHeight,
      defaultName
    }
  }

  const createDecorationBlock = (item: any, componentConfig: any, defaultName: string) => {
    return {
      rendererType: 'border' as const,
      config: item.config || {},
      component: markRaw(componentConfig),
      defaultWidth: 400,
      defaultHeight: 100,
      defaultName,
      content: 'dv-border-box1'
    }
  }

  const createTextBlock = (item: any, componentConfig: any, defaultName: string) => {
    return {
      rendererType: 'text' as const,
      config: {
        text: '这是一段文本内容',
        fontSize: "",
        color: '#fff',
        textAlign: 'center',
        fontWeight: ""
      },
      component: null,
      defaultWidth: 300,
      defaultHeight: 100,
      defaultName
    }
  }

  const createMapBlock = (item: any, componentConfig: any, defaultName: any) => {
    const config = cloneDeep(componentConfig)
    config.options = config.options || {}
    config.options.map = config.options.map || 'world'
    config.options.roam = config.options.roam ?? true
    config.options.label = config.options.label || { show: false }
    config.options.itemStyle = config.options.itemStyle || {
      areaColor: '#1d1d1d',
      borderColor: '#0af',
    }

    return {
      rendererType: 'map' as const,
      config,
      component: null,
      defaultWidth: 600,
      defaultHeight: 400,
      defaultName
    }
  }

  const addBlock = (value: string, componentConfig: any, x = 200, y = 200) => {
    const item = findItem(value)
    if (!item) {
      console.warn(`未找到组件: ${value}`)
      return
    }

    const defaultName = item.text || '未命名组件'
    let blockData: {
      rendererType: 'chart' | 'border' | 'text' | 'map' | undefined,
      config: any,
      component: any,
      defaultWidth: number,
      defaultHeight: number,
      defaultName: string,
      content?: string
    }

    switch (item.type) {
      case 'chart':
        blockData = createChartBlock(item, componentConfig, defaultName)
        break
      case 'decoration':
        blockData = createDecorationBlock(item, componentConfig, defaultName)
        break
      case 'text':
        blockData = createTextBlock(item, componentConfig, defaultName)
        break
      case 'map':
        blockData = createMapBlock(item, componentConfig, defaultName)
        break
      default:
        console.warn(`不支持的类型: ${item.type}`)
        return
    }

    const newBlock: DashboardBlock = {
      id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      type: value,
      name: blockData.defaultName,
      titleText: blockData.defaultName,
      config: blockData.config,
      rendererType: blockData.rendererType,
      component: shallowRef(blockData.component ?? null),
      x,
      y,
      width: blockData.defaultWidth.toString(),
      height: blockData.defaultHeight.toString(),
      zIndex: getNextZIndex(),
      content: blockData.content || '',
      ...BASE_BLOCK_CONFIG,

      // 边框
      borderName: blockData.defaultName,
      borderMasterColor: '',
      borderSlaveColor: '',
      backgroundColor: '',

      // 文本
      textName: blockData.defaultName,
      textVisible: false,
      textContainer: '这是段文本内容',
      textColor: '#fff',
      textSize: "",
      textWeight: "",

      // 地图
      mapSetting: false,
      mapScale: 1,
      mapNameVisible: false,
      mapNameSize: "",
      mapNameColor: '',
      mapNameColorHover: '',
      mapBorderWidth: 1,
      mapBorderColor: '',
      mapAreaColor: '',
      mapAreaColorHover: '',
      LeftRightPadding: 5,
      TopBottomPadding: 5
    }

    if (!newBlock.config) newBlock.config = {}

    // 针对不同类型设置不同的默认配置
    if (newBlock.rendererType === 'border') {
      newBlock.config.color = [newBlock.borderMasterColor, newBlock.borderSlaveColor]
    } else if (newBlock.rendererType === 'text') {
      newBlock.textColor = newBlock.textColor || '#fff'
      newBlock.textSize = newBlock.textSize || ""
      newBlock.textWeight = newBlock.textWeight || ""

      newBlock.config.color = newBlock.textColor
      newBlock.config.fontSize = newBlock.textSize
      newBlock.config.fontWeight = newBlock.textWeight?.toString()
    }

    blocks.value.push(newBlock)
    selectedId.value = newBlock.id
  }
  const updateBlock = (id: string, updates: Partial<DashboardBlock>) => {
    const block = blocks.value.find(b => b.id === id)
    if (!block) return

    Object.assign(block, updates)

    if ('borderMasterColor' in updates || 'borderSlaveColor' in updates) {
      const masterColor = 'borderMasterColor' in updates ? updates.borderMasterColor : block.borderMasterColor
      const slaveColor = 'borderSlaveColor' in updates ? updates.borderSlaveColor : block.borderSlaveColor

      if (!block.config) block.config = {}
      block.config.color = [masterColor, slaveColor]
    }

    // 如果更改了name且title为true，同步更新titleText
    if (updates.name !== undefined && block.title) {
      block.titleText = updates.name
    }

    // 同步文本属性到 config 对象
    if ('textContainer' in updates) {
      if (!block.config) block.config = {}
      block.config.text = updates.textContainer
    }

    if ('textColor' in updates) {
      if (!block.config) block.config = {}
      block.config.color = updates.textColor
    }

    if ('textSize' in updates) {
      if (!block.config) block.config = {}
      block.config.fontSize = updates.textSize
    }

    if ('textWeight' in updates) {
      if (!block.config) block.config = {}
      block.config.fontWeight = updates.textWeight
    }
  }
  const renameBlock = (id: string, newName: string) => {
    const block = blocks.value.find(b => b.id === id)
    if (block) {
      block.name = newName.trim()
      if (block.title) {
        block.titleText = newName.trim()
      }
    }
  }


  const removeBlock = (id: string) => {
    blocks.value = blocks.value.filter(b => b.id !== id)
    if (selectedId.value === id) {
      selectedId.value = null
    }
  }

  const copyBlock = (id: string) => {
    const block = blocks.value.find(b => b.id === id)
    if (!block) return

    const { id: _, ...cloneData } = block
    const newBlock: DashboardBlock = {
      ...cloneData,
      id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      x: block.x + 20,
      y: block.y + 20,
      zIndex: getNextZIndex(),
      component: block.component ? markRaw(block.component) : undefined
    }

    blocks.value.push(newBlock)
    selectedId.value = newBlock.id
  }

  const saveCurrentDashboard = () => {
    localStorage.setItem(
      `dashboard_${currentId.value}`,
      JSON.stringify(dashboards.value[currentId.value])
    )
    modal.msgSuccess('保存成功')
  }

  const restoreDashboard = (id: string) => {
    const data = localStorage.getItem(`dashboard_${id}`)
    if (data) {
      dashboards.value[id] = JSON.parse(data)
    }
  }

  const undo = () => {
    // @ts-ignore pinia-undo adds this
    this.undo()
  }

  const redo = () => {
    // @ts-ignore pinia-undo adds this
    this.redo()
  }

  return {
    screen,
    blocks,
    selectedId,
    previewMode,
    dashboards,
    currentId,
    loadDashboard,
    selectBlock,
    addBlock,
    updateBlock,
    removeBlock,
    renameBlock,
    copyBlock,
    togglePreview,
    saveCurrentDashboard,
    restoreDashboard,
    undo,
    redo
  }
}, {
  undo: {
    omit: ['previewMode', 'selectedId']
  }
})