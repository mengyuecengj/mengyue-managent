// propertiesConfig.ts
import { useEditorStore } from '@/store/modules/editor';
const editorStore = useEditorStore();
const selectedBlock = computed(() => editorStore.selectedBlock);
export const propertiesConfig = computed(() => {
    const type = (selectedBlock.value?.type || 'default');
    const configs = {
        input: [
            { key: 'width', label: 'width', type: 'input', placeholderKey: 'system.builder.props.width' },
            { key: 'height', label: 'height', type: 'input', placeholderKey: 'system.builder.props.height' },
            { key: 'placeholder', label: 'placeholder', type: 'input', placeholderKey: 'system.builder.props.placeholder' },
            { key: 'maxLength', label: 'maxLength', type: 'input', placeholderKey: 'system.builder.props.maxLength', inputType: 'number' },
            { key: 'textColor', label: 'textColor', type: 'input', placeholderKey: 'system.builder.props.textColor' },
            { key: 'placeholderColor', label: 'placeholderColor', type: 'input', placeholderKey: 'system.builder.props.placeholderColor' },
            { key: 'wordLimit', label: 'wordLimit', type: 'switch' },
            { key: 'disabled', label: 'disabled', type: 'switch' },
            { key: 'clearable', label: 'clearable', type: 'switch' },
            { key: 'showPassword', label: 'showPassword', type: 'switch' },
        ],
        badge: [
            { key: 'dot', label: 'dot', type: 'switch' },
            { key: 'color', label: 'color', type: 'input', placeholderKey: 'system.builder.props.color' },
            { key: 'position', label: 'position', type: 'input' }
        ],
        collapse: [
            { key: 'accordion', label: 'accordion', type: 'switch' },
        ],
        rate: [
            { key: 'max', label: 'max', type: 'input', placeholderKey: 'system.builder.props.max', inputType: 'number' },
        ],
        radio: [
            { key: 'disabled', label: 'disabled', type: 'switch' },
            {
                key: 'directions',
                label: 'directions',
                type: 'select',
                options: [
                    { label: 'system.builder.props.direction.horizontal', value: 'horizontal' },
                    { label: 'system.builder.props.direction.vertical', value: 'vertical' }
                ]
            }
        ],
        checkbox: [
            { key: 'disabled', label: 'disabled', type: 'switch' },
            {
                key: 'directions',
                label: 'direction',
                type: 'select',
                options: [
                    { label: 'system.builder.props.direction.horizontal', value: 'horizontal' },
                    { label: 'system.builder.props.direction.vertical', value: 'vertical' }
                ]
            },
            { key: 'gap', label: 'gap', type: 'input', placeholderKey: 'system.builder.props.gap' },
        ],
        switch: [
            { key: 'disabled', label: 'disabled', type: 'switch' },
            { key: 'text', label: 'text', type: 'input' },
            {
                key: 'size', label: 'size', type: 'select', options: [
                    { label: 'mini', value: 'mini' }, { label: 'small', value: 'small' },
                    { label: 'medium', value: 'medium' }, { label: 'large', value: 'large' }
                ]
            }
        ],
        button: [
            { key: 'label', label: 'label', type: 'input', placeholderKey: 'system.builder.props.label' },
            { key: 'icon', label: 'icon', type: 'input', placeholderKey: 'system.builder.props.icon' },
            { key: 'colorText', label: 'colorText', type: 'input', placeholderKey: 'system.builder.props.colorText' },
            { key: 'colorBg', label: 'colorBg', type: 'input', placeholderKey: 'system.builder.props.colorBg' }
        ],
        slidebar: [
            { key: 'disabled', label: 'disabled', type: 'switch' },
            { key: 'size', label: 'size', type: 'input', placeholderKey: 'system.builder.props.size' },
            { key: 'thumbColor', label: 'thumbColor', type: 'input' },
            { key: 'trackColor', label: 'trackColor', type: 'input' },
            { key: 'noNum', label: 'noNum', type: 'switch' },
        ],
        progress: [
            { key: 'percentage', label: 'percentage', type: 'input', placeholderKey: 'system.builder.props.percentage' },
            { key: 'status', label: 'status', type: 'input' }
        ],
        result: [
            { key: 'title', label: 'title', type: 'input', placeholderKey: 'system.builder.props.title' },
            { key: 'subTitle', label: 'subTitle', type: 'input', placeholderKey: 'system.builder.props.subTitle' },
            { key: 'icon', label: 'icon', type: 'input', placeholderKey: 'system.builder.props.icon' },
        ],
        pagination: [
            { key: 'total', label: 'total', type: 'input', placeholderKey: 'system.builder.props.total', inputType: 'number' },
            { key: 'pageSize', label: 'pageSize', type: 'input', placeholderKey: 'system.builder.props.pageSize', inputType: 'number' },
            { key: 'currentPage', label: 'currentPage', type: 'input', placeholderKey: 'system.builder.props.currentPage', inputType: 'number' },
            { key: 'layout', label: 'layout', type: 'input' },
            { key: 'disabled', label: 'disabled', type: 'switch' },
        ],
        border: [
            { key: 'borderStyle', label: 'borderStyle', type: 'input', placeholderKey: 'system.builder.props.borderStyle' },
            { key: 'borderWidth', label: 'borderWidth', type: 'input', placeholderKey: 'system.builder.props.borderWidth' },
            { key: 'borderColor', label: 'borderColor', type: 'input', placeholderKey: 'system.builder.props.borderColor' },
            { key: 'topColor', label: 'topColor', type: 'input', placeholderKey: 'system.builder.props.topColor' },
            { key: 'bottomColor', label: 'bottomColor', type: 'input', placeholderKey: 'system.builder.props.bottomColor' },
            { key: 'leftColor', label: 'leftColor', type: 'input', placeholderKey: 'system.builder.props.leftColor' },
            { key: 'rightColor', label: 'rightColor', type: 'input', placeholderKey: 'system.builder.props.rightColor' },
            { key: 'colorBg', label: 'colorBg', type: 'input', placeholderKey: 'system.builder.props.colorBg' },
            { key: 'boxShadow', label: 'boxShadow', type: 'input', placeholderKey: 'system.builder.props.boxShadow' },
            { key: 'width', label: 'width', type: 'input', placeholderKey: 'system.builder.props.width' },
            { key: 'height', label: 'height', type: 'input', placeholderKey: 'system.builder.props.height' },
        ],
        default: []
    };
    return configs[type] || configs.default;
});
