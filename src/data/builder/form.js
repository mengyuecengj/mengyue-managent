export const materialList = [
    {
        type: 'input',
        label: '输入框',
        defaultValue: '',
        options: { placeholder: '请输入内容' }
    },
    {
        type: 'rate',
        label: '评分',
        defaultValue: 0,
        options: { max: 5 }
    },
    {
        type: 'switch',
        label: '开关',
        defaultValue: 0,
        options: { activeText: '是', inactiveText: '否' }
    },
    // {
    //   type: 'select',
    //   label: '下拉框',
    //   defaultValue: '',
    //   options: {
    //     placeholder: '请选择',
    //     options: [
    //       { label: '选项1', value: '1' },
    //       { label: '选项2', value: '2' },
    //       { label: '选项3', value: '3' }
    //     ]
    //   }
    // },
    {
        type: 'radio',
        label: '单选框',
        defaultValue: '',
        options: {}
    },
    {
        type: 'checkbox',
        label: '多选框',
        defaultValue: '',
        options: {}
    },
    {
        type: 'button',
        label: '按钮',
        defaultValue: '',
        options: {
            type: 'primary',
            label: '默认按钮', // slot 文本
            size: 'large',
            disabled: false,
            icon: '', // 默认无图标
            colorText: '', // 默认空，使用组件默认颜色
            colorBg: '' // 默认空
        }
    },
    {
        type: 'colorPicker',
        label: '颜色选择',
        defaultValue: '',
        options: { size: 'large' }
    },
    {
        type: 'slidebar',
        label: '滑块',
        defaultValue: 0,
        options: { min: 0, max: 100, step: 1, showInput: true }
    },
    // {
    //   type: 'badge',
    //   label: '勋章',
    //   defaultValue: '',
    //   options: { value: 1, content:'5' }
    // },
    // {
    //   type: 'collapse',
    //   label: '折叠面板',
    //   defaultValue: '',
    //   options: { defaultActiveKey: ['1'] }
    // },
    // {
    //   type: 'progress',
    //   label: '进度条',
    //   defaultValue: 0,
    //   options: { percentage: '50', status: 'success' }
    // },
    // {
    //   type: 'result',
    //   label: '结果',
    //   defaultValue: '',
    //   options: { title: '标题', subTitle: '副标题', icon: 'el-icon-success' }
    // },
    // {
    //   type: 'pagination',
    //   label: '分页器',
    //   defaultValue: '',
    //   options: { total: 100, pageSize: 10, layout: 'total, sizes, prev, pager, next, jumper' }
    // },   
];
