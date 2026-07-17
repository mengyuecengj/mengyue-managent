// 基础组件
export const materialList = [
  {
    type: 'button',
    labelKey: 'system.builder.components.button',
    label: '按钮',
    options: {
      type: 'primary',
      labelKey: 'system.builder.components.button',   // 按钮文字
      label: '默认按钮',
      size: 'large',
      disabled: false
    }
  },
  {
    type: 'border',
    labelKey: 'system.builder.components.border',
    label: '边框',
    options: { borderStyle: 'solid', borderColor: '#2c2', height: '10px' }
  },

  // 表单组件
  {
    type: 'input',
    labelKey: 'system.builder.components.input',
    label: '输入框',
    options: {
      placeholderKey: 'system.builder.props.placeholder',
      placeholder: '请输入内容'
    }
  },
  {
    type: 'select',
    labelKey: 'system.builder.components.select',
    label: '下拉框',
    options: {
      placeholderKey: 'system.builder.props.selectPlaceholder',  // ← 新增
      placeholder: '请选择',
      options: [
        { labelKey: 'system.builder.options.option1', label: '选项1', value: '1' },
        { labelKey: 'system.builder.options.option2', label: '选项2', value: '2' },
        { labelKey: 'system.builder.options.option3', label: '选项3', value: '3' }
      ]
    }
  },
  {
    type: 'radio',
    labelKey: 'system.builder.components.radio',
    label: '单选框',
    options: {
      optionList: [
        { labelKey: 'system.builder.options.option1', label: '选项一', value: '1' },
        { labelKey: 'system.builder.options.option2', label: '选项二', value: '2' }
      ],
      border: false,
      size: 'default'
    }
  },
  {
    type: 'checkbox',
    labelKey: 'system.builder.components.checkbox',
    label: '多选框',
    options: {
      modelValue: ['1'],
      optionList: [
        { labelKey: 'system.builder.options.option1', label: '选项一', value: '1' },
        { labelKey: 'system.builder.options.option2', label: '选项二', value: '2' },
        { labelKey: 'system.builder.options.option3', label: '选项三', value: '3' }
      ],
      border: false,
      size: 'default'
    }
  },
  {
    type: 'switch',
    labelKey: 'system.builder.components.switch',
    label: '开关',
    options: {
      activeTextKey: 'system.builder.props.activeText',
      activeText: '是',
      inactiveTextKey: 'system.builder.props.inactiveText',
      inactiveText: '否'
    }
  },
  {
    type: 'rate',
    labelKey: 'system.builder.components.rate',
    label: '评分',
    options: { max: 5 }
  },
  {
    type: 'colorPicker',
    labelKey: 'system.builder.components.colorPicker',
    label: '颜色选择',
    options: { size: 'large' }
  },
  {
    type: 'slidebar',
    labelKey: 'system.builder.components.slidebar',
    label: '滑块',
    options: { min: 0, max: 100, step: 1, showInput: true }
  },

  // 数据展示组件（result 主标题/副标题）
  {
    type: 'result',
    labelKey: 'system.builder.components.result',
    label: '结果',
    options: {
      titleKey: 'system.builder.props.title',
      title: '主标题',
      subTitleKey: 'system.builder.props.subTitle',
      subTitle: '副标题',
      icon: 'primary'
    }
  },
  {
    type: 'timeline',
    label: '时间轴',
    defaultValue: '',
    slot: true,
    children: [
      {
        type: 'timelineItem',
        label: '测试时间一',
        options: {
          color: 'primary',
          timestamp: '2025-01-01'
        },
        content: '事件一：项目启动'
      },
      {
        type: 'timelineItem',
        label: '测试时间二',
        options: {
          color: 'success',
          timestamp: '2025-02-15'
        },
        content: '事件二：需求分析完成'
      }
    ],
    options: {}
  },

  // 导航组件
  {
    type: 'pagination',
    label: '分页器',
    defaultValue: '',
    options: {
      total: 50,
      pageSize: 10,
      layout: 'prev,pager,next',
      currentPage: 1
    }
  },

  // 布局组件
  {
    type: 'collapse',
    label: '折叠面板',
    defaultValue: [],
    slot: true,
    children: [
      {
        type: 'collapseItem',
        options: {
          title: '功能特性',
          name: '1'
        },
        children: [
          {
            type: 'input',
            label: '输入框',
            defaultValue: '',
            options: { placeholder: '请输入内容' }
          }
        ]
      },
      {
        type: 'collapseItem',
        label: '用户体验',
        options: {
          title: '用户体验',
          name: '2'
        },
        children: [
          {
            type: 'button',
            label: '按钮',
            defaultValue: '',
            options: {
              type: 'primary',
              label: '默认按钮'
            }
          }
        ]
      }
    ],
    options: {
      defaultActiveKey: ['1']
    }
  }
]