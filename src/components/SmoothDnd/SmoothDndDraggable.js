/**
 * SmoothDndDraggable 组件
 *
 * 本组件是对 smooth-dnd 库中可拖拽项(Draggable)的 Vue 3 封装
 * 主要功能：
 * 1. 作为可拖拽元素的包装容器
 * 2. 自动应用 smooth-dnd 所需的 CSS 类名
 * 3. 支持自定义标签类型
 *
 * - 配合 SmoothDndContainer 使用，作为可拖拽的列表项
 * - 在拖拽排序场景中包装每一个可排序的元素
 * - 可视化编辑器中可拖拽的组件项
 *
 *
 * 注意事项：
 * - 必须作为 SmoothDndContainer 的直接子元素使用
 * - 内容通过插槽传递
 */
import { getTagProps, validateTagProp } from "@/utils/general";
import { constants } from "smooth-dnd";
export const SmoothDndDraggable = defineComponent({
    name: 'SmoothDndDraggable',
    // 定义组件 props
    props: {
        // 容器标签类型，支持字符串或对象配置
        // 使用 validateTagProp 进行验证，确保 tag 值有效
        tag: {
            validator: validateTagProp,
            default: 'div' // 默认使用 div 标签
        }
    },
    // 自定义渲染函数
    render() {
        // 获取处理后的 tag 属性，并添加 smooth-dnd 所需的 wrapperClass
        // constants.wrapperClass 是 smooth-dnd 库定义的必须 CSS 类名
        const tagProps = getTagProps(this, constants.wrapperClass);
        // 使用 Vue 的 h 函数创建虚拟 DOM
        // 1. tagProps.value: 动态确定的标签名（如 'div', 'li' 等）
        // 2. Object.assign: 合并其他 props
        // 3. this.$slots.default?.(): 渲染默认插槽内容（实际的可拖拽内容）
        return h(tagProps.value, Object.assign({}, tagProps.props), this.$slots.default?.());
    }
});
