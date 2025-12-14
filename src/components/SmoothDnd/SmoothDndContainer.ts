/**
 * SmoothDndContainer 组件
 * 
 * 本组件是对 smooth-dnd 库的 Vue 3 封装，提供拖放(drag and drop)功能的组件化实现
 * 主要功能：
 * 1. 将 smooth-dnd 库的 API 转换为 Vue 组件可用的形式
 * 2. 支持自定义容器标签类型（通过 tag prop）
 * 3. 将 smooth-dnd 的原生事件转换为 Vue 自定义事件
 * 4. 提供完整的生命周期管理（初始化和销毁）
 * 
 * 
 * 依赖：
 * - smooth-dnd: 提供底层拖放功能
 * - @/utils/general: 提供 tag 验证和处理工具函数
 * 
 * 特点：
 * - 类型安全：使用 TypeScript 定义完整类型
 * - 事件系统：完整映射 smooth-dnd 事件到 Vue 事件
 * - 灵活渲染：支持自定义容器标签类型
 * - 资源管理：组件卸载时自动清理拖放实例
 */

import { getTagProps, validateTagProp } from '@/utils/general'
import { dropHandlers, smoothDnD, type SmoothDnD } from 'smooth-dnd'
import { ref, defineComponent } from 'vue'

smoothDnD.dropHandler = dropHandlers.reactDropHandler().handler;
smoothDnD.wrapChild = false;

// 定义 Vue 组件可触发的自定义事件类型
// 这些事件对应 smooth-dnd 库的核心拖放交互点
type EventKey = 'drag-start' | 'drag-end' | 'drop' | 'drag-enter' | 'drag-leave' | 'drop-ready'

// 事件名称映射表：将 Vue 事件名映射到 smooth-dnd 回调函数名
// 作用是将 smooth-dnd 触发的原生事件转换为 Vue 组件可监听的自定义事件
const eventEmitterMap: Record<EventKey, string> = {
    'drag-start': 'onDragStart',    // 拖拽开始时触发
    'drag-end': 'onDragEnd',        // 拖拽结束时触发
    drop: 'onDrop',               // 元素被放置时触发
    'drag-enter': 'onDragEnter',    // 拖拽元素进入容器时触发
    'drag-leave': 'onDragLeave',    // 拖拽元素离开容器时触发
    'drop-ready': 'onDropReady'     // 拖拽元素准备放置时触发
}

export const SmoothDndContainer = defineComponent({
    name: 'SmoothDndContainer',
    
    // setup 函数用于声明响应式状态和逻辑
    setup() {
        const containerRef = ref<HTMLElement | null>(null)
        
        return {
            containerRef,
            container: null as SmoothDnD | null
        }
    },
    
    // 组件挂载到 DOM 后执行
    mounted() {
        // 复制组件 props 到新对象(避免直接修改只读的 $props)
        const options: any = Object.assign({}, this.$props);

        // 遍历所有事件映射，为 smooth-dnd 添加事件处理
        for (const key in eventEmitterMap) {
            const eventKey = key as EventKey;
            // 将 smooth-dnd 的回调函数设置为触发 Vue 自定义事件
            options[eventEmitterMap[eventKey]] = (props: any) => {
                // 触发 Vue 组件事件，使父组件可通过 @drag-start 等方式监听
                this.$emit(eventKey, props)
            }
        }

        options.getGhostParent = () => document.body

        // 获取需要应用拖放功能的 DOM 元素
        // 使用 containerRef.value 替代之前的 $refs.container
        const containerElement = this.containerRef || this.$el

        // 初始化 smooth-dnd 拖放功能
        // 将配置好的选项应用到 DOM 容器
        this.container = smoothDnD(containerElement, options)
    },
    
    // 组件从 DOM 中移除前执行
    unmounted() {
        if (this.container) {
            // 销毁 smooth-dnd 容器实例，释放资源
            // 避免内存泄漏和不必要的事件监听
            this.container.dispose()
        }
    },
    
    // 声明组件可触发的自定义事件
    emits: ['drop', 'drag-start', 'drag-end', 'drag-enter', 'drag-leave', 'drop-ready'],
    
    // 定义组件的 props
    props: {
        // 布局方向：'vertical'（垂直）或 'horizontal'（水平）
        orientation: { type: String, default: 'vertical' },
        // 拖出容器时是否自动移除元素
        removeOnDropOut: { type: Boolean, default: false },
        // 是否启用自动滚动（当拖拽接近容器边缘时）
        autoScrollEnabled: { type: Boolean, default: true },
        // 动画持续时间（毫秒）
        animationDuration: { type: Number, default: 250 },
        // 拖拽行为：'move'（移动）或 'copy'（复制）
        behaviour: String,
        // 分组名称，相同组内的元素可以相互拖拽
        groupName: String,
        // 拖拽手柄选择器，指定哪些子元素可以触发拖拽
        dragHandleSelector: String,
        // 非拖拽区域选择器，指定哪些子元素不能触发拖拽
        nonDragAreaSelector: String,
        // 锁定拖拽轴向：'x' 或 'y'
        lockAxis: String,
        // 拖拽时应用的 CSS 类
        dragClass: String,
        // 放置时应用的 CSS 类
        dropClass: String,
        // 拖拽开始延迟时间（毫秒）
        dragBeginDelay: Number,
        // 获取拖拽元素有效载荷的函数
        getChildPayload: Function,
        // 是否应该动画化放置过程
        shouldAnimateDrop: Function,
        // 是否应该接受放置操作
        shouldAcceptDrop: Function,
        // 获取幽灵元素父容器的函数
        getGhostParent: Function,
        // 放置占位符配置
        dropPlaceholder: [Object, Boolean],
        // 容器标签类型，支持字符串或对象配置
        // 使用 validateTagProp 进行验证，确保 tag 值有效
        tag: {
            validator: validateTagProp,
            default: 'div'
        }
    },
    
    // 自定义渲染函数
    render() {
        // 获取处理后的 tag 属性，支持自定义标签和 class 合并
        const tagProps = getTagProps(this)
        
        // 使用 Vue 的 h 函数创建虚拟 DOM
        // 1. tagProps.value: 动态确定的标签名（如 'div', 'ul' 等）
        // 2. Object.assign: 合并 ref 和其他 props
        // 3. this.$slots.default?.(): 渲染默认插槽内容
        return h(
            tagProps.value,
            Object.assign({}, {ref: this.containerRef}, tagProps.props),
            this.$slots.default?.()
        )
    }
})
