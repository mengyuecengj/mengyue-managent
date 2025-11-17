import { useEditorStore } from '@/store/modules/editor';
const editorStore = useEditorStore();
const selectedBlock = computed(() => editorStore.selectedBlock);
export const propertiesConfig = computed(() => {
    const type = (selectedBlock.value?.type || 'default');
    const configs = {
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
        rate: [
            { key: 'max', label: '最大值', type: 'input', placeholder: '请输入最大值（如5）', inputType: 'number' },
        ],
        radio: [
            { key: 'disabled', label: '是否禁用', type: 'switch' }
        ],
        checkbox: [
            { key: 'disabled', label: '是否禁用', type: 'switch' }
        ],
        button: [
            { key: 'label', label: '按钮文本', type: 'input', placeholder: '请输入按钮文本' },
            { key: 'icon', label: '图标', type: 'input', placeholder: '请输入图标类名（如 el-icon-search）' },
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
        default: []
    };
    return configs[type] || configs.default;
});
