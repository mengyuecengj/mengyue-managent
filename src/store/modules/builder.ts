// stores/builder.ts
import { defineStore } from 'pinia'
import { ComponentInstance, ComponentMeta, PageSchema } from '@/types/views/builder'

export const useBuilderStore = defineStore('builder', {
  state: () => ({
    // 当前页面schema
    pageSchema: {
      id: 'page-1',
      name: '未命名页面',
      components: []
    } as PageSchema,
    
    // 当前选中的组件
    selectedComponent: null as ComponentInstance | null,
    
    // 组件库
    componentLibrary: [
      {
        id: 'button',
        type: 'button',
        name: '按钮',
        category: 'basic',
        props: { text: '按钮', type: 'primary' },
        styles: {}
      },
      {
        id: 'container',
        type: 'container',
        name: '容器',
        category: 'layout', 
        props: {},
        styles: { padding: '20px', border: '1px dashed #ccc' }
      }
    ] as ComponentMeta[]
  }),

  actions: {
    // 添加组件到画布
    addComponent(componentType: string, position?: { x: number; y: number }) {
      const meta = this.componentLibrary.find(c => c.type === componentType)
      if (!meta) return
      
      const instance: ComponentInstance = {
        id: `comp-${Date.now()}`,
        type: componentType,
        props: { ...meta.props },
        styles: { ...meta.styles }
      }
      
      this.pageSchema.components.push(instance)
      this.selectedComponent = instance
    },
    
    // 更新组件属性
    updateComponentProps(componentId: string, props: Record<string, any>) {
      const component = this.pageSchema.components.find(c => c.id === componentId)
      if (component) {
        component.props = { ...component.props, ...props }
      }
    },
    
    // 删除组件
    removeComponent(componentId: string) {
      this.pageSchema.components = this.pageSchema.components.filter(
        c => c.id !== componentId
      )
      if (this.selectedComponent?.id === componentId) {
        this.selectedComponent = null
      }
    },
    
    // 清空画布
    clearCanvas() {
      this.pageSchema.components = []
      this.selectedComponent = null
    }
  }
})