import { useEditorStore } from '@/store/modules/editor'
const editorStore = useEditorStore()
const selectedBlock = computed(() => editorStore.selectedBlock)

interface PropItem {
    key: string
    label: string
    type: 'input' | 'switch' | 'select'
    placeholder?: string          // 可选
    inputType?: string            // 可选（如 number）
    // select 专用，可选
    options?: Array<{
        label: string
        value: string | number | boolean
    }>
}

export const propertiesConfig = computed((): PropItem[] => {
    const type = (selectedBlock.value?.type || 'default') as keyof typeof configs

    const configs: Record<string, PropItem[]> = {
        input: [
            { key: 'width', label: '组件宽度', type: 'input', placeholder: '请输入组件宽度(如100%或200px)' },
            { key: 'height', label: '组件高度', type: 'input', placeholder: '请输入组件高度' },
            { key: 'placeholder', label: '内容', type: 'input', placeholder: 'placeholder提示' },
            { key: 'maxlength', label: '输入上限', type: 'input', placeholder: '请输入输入上限(如10)', inputType: 'number' },
            { key: 'textColor', label: '文本颜色', type: 'input', placeholder: '请输入文本颜色(如#333)' },
            { key: 'placeholderColor', label: '占位符颜色', type: 'input', placeholder: '请输入占位符颜色(如#ccc)' },
            { key: 'wordLimit', label: '输入统计', type: 'switch' },
            { key: 'disabled', label: '是否禁用', type: 'switch' },
            { key: 'clearable', label: '能否清空', type: 'switch' },
            { key: 'showPassword', label: '显示密码', type: 'switch' },
        ],
        badge: [
            { key: 'dot', label: '小圆点', type: 'switch' },
            { key: 'color', label: '颜色', type: 'input' },
            { key: 'position', label: '位置', type: 'input' }
        ],
        collapse: [
            { key: 'accordion', label: '手风琴模式', type: 'switch' },
        ],
        rate: [
            { key: 'max', label: '最大值', type: 'input', placeholder: '请输入最大值（如5）', inputType: 'number' },
        ],
        radio: [
            { key: 'disabled', label: '是否禁用', type: 'switch' },
            {
                key: 'direction',
                label: '显示方向',
                type: 'select',
                options: [
                    { label: '横向排列', value: 'horizontal' },
                    { label: '纵向排列', value: 'vertical' }
                ]
            }
        ],
        checkbox: [
            { key: 'disabled', label: '是否禁用', type: 'switch' },
            {
                key: 'direction',
                label: '显示方向',
                type: 'select',
                options: [
                    { label: '横向排列', value: 'horizontal' },
                    { label: '纵向排列', value: 'vertical' }
                ]
            },
            { key: 'gap', label: '选项间隔', type: 'input', placeholder: '如 20px' },
        ],
        switch: [
            { key: 'disabled', label: '是否禁用', type: 'switch' },
            { key: 'text', label: '文本', type: 'input' },
            {
                key: 'size', label: '尺寸', type: 'select',
                options: [
                    { label: 'mini', value: 'mini' },
                    { label: 'supersmall', value: 'supersmall' },
                    { label: 'small', value: 'small' },
                    { label: 'medium', value: 'medium' },
                    { label: 'large', value: 'large' },
                    { label: 'biglarge', value: 'biglarge' },
                    { label: 'superlarge', value: 'superlarge' }
                ]
            }
        ],
        button: [
            { key: 'label', label: '按钮文本', type: 'input', placeholder: '请输入按钮文本' },
            { key: 'icon', label: '图标', type: 'input', placeholder: '请输入图标类名（如 MYSearch）' },
            { key: 'colorText', label: '自定义文本颜色', type: 'input', placeholder: '请输入颜色（如 #ffffff）' },
            { key: 'colorBg', label: '自定义背景颜色', type: 'input', placeholder: '请输入颜色（如 #409EFF）' }
        ],
        slidebar: [
            { key: 'disabled', label: '是否禁用', type: 'switch' },
            { key: 'size', label: '滑块大小', type: 'input', placeholder: '请输入滑块大小(如20px)' },
            { key: 'thumbColor', label: '滑块颜色', type: 'input', placeholder: '请输入滑块颜色(如#333)' },
            { key: 'trackColor', label: '轨道颜色', type: 'input', placeholder: '请输入轨道颜色(如#ccc)' },
            { key: 'noNum', label: '不显示数字', type: 'switch' },
        ],
        progress: [
            { key: 'percentage', label: '进度百分比', type: 'input', placeholder: '请输入进度百分比(如50)' },
            { key: 'status', label: '进度条样式', type: 'input' }
        ],
        result: [
            { key: 'title', label: '主标题', type: 'input', placeholder: '请输入标题' },
            { key: 'subTitle', label: '副标题', type: 'input', placeholder: '请输入副标题' },
            { key: 'icon', label: '图标', type: 'input', placeholder: '请输入图标类名' },
        ],
        pagination: [
            { key: 'total', label: '总数据条数', type: 'input', placeholder: '请输入总数据条数', inputType: 'number' },
            { key: 'pageSize', label: '每页条数', type: 'input', placeholder: '请输入每页显示条数', inputType: 'number' },
            { key: 'currentPage', label: '当前页码', type: 'input', placeholder: '请输入当前页码', inputType: 'number' },
            { key: 'layout', label: '布局', type: 'input', placeholder: '请输入布局（如 prev,pager,next）' },
            { key: 'maxPagerCount', label: '最大页码数', type: 'input', placeholder: '请输入最大页码按钮数量', inputType: 'number' },
            { key: 'disabled', label: '禁用', type: 'switch', },
            { key: 'prneColor', label: '上一页/下一页背景色', type: 'input', placeholder: '请输入颜色（如 #409EFF）' },
            { key: 'prneTextColor', label: '上一页/下一页文字色', type: 'input', placeholder: '请输入颜色（如 #ffffff）' },
            { key: 'itemColor', label: '页码背景色', type: 'input', placeholder: '请输入颜色（如 #f5f5f5）' },
            { key: 'itemTextColor', label: '页码文字色', type: 'input', placeholder: '请输入颜色（如 #666）' },
            { key: 'activeItemColor', label: '当前页背景色', type: 'input', placeholder: '请输入颜色（如 #409EFF）' },
            { key: 'activeItemTextColor', label: '当前页文字色', type: 'input', placeholder: '请输入颜色（如 #ffffff）' },
        ],
        border: [
            // 边框样式
            {
                key: 'borderStyle', label: '边框样式', type: 'input', placeholder: '如 solid 或 dashed'
            },

            // 边框厚度
            { key: 'borderWidth', label: '边框厚度', type: 'input', placeholder: '如 1px 或 2rem', inputType: 'string' },

            // 边框颜色
            { key: 'borderColor', label: '边框颜色', type: 'input', placeholder: '如 #2c2 或 red' },

            // 四边独立颜色
            { key: 'topColor', label: '上边框颜色', type: 'input', placeholder: '如 #2c2' },
            { key: 'bottomColor', label: '下边框颜色', type: 'input', placeholder: '如 #2c2' },
            { key: 'leftColor', label: '左边框颜色', type: 'input', placeholder: '如 #2c2' },
            { key: 'rightColor', label: '右边框颜色', type: 'input', placeholder: '如 #2c2' },

            // 背景色与文字色
            { key: 'colorBg', label: '背景色', type: 'input', placeholder: '如 #fff 或 white' },

            // 阴影
            { key: 'boxShadow', label: '阴影效果', type: 'input', placeholder: '如 0 2px 4px rgba(0,0,0,0.1)' },

            // 尺寸
            { key: 'width', label: '宽度', type: 'input', placeholder: '如 200px 或 50%' },
            { key: 'height', label: '高度', type: 'input', placeholder: '如 100px 或 100vh' },
        ],
        default: []
    }

    return configs[type] || configs.default
})
