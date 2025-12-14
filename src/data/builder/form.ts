// 基础组件
export const materialList = [
  {
    type: 'button',
    label: '按钮',
    defaultValue: '',
    options: {
      type: 'primary',
      label: '默认按钮',
      size: 'large',
      disabled: false,
      icon: '',
      colorText: '',
      colorBg: ''
    }
  },
  {
    type: 'border',
    label: '边框',
    defaultValue: '',
    slot: true,
    options: {
      borderStyle: 'solid',
      borderColor: '#2c2',
      height: '10px'
    },
  },

  // 表单组件
  {
    type: 'input',
    label: '输入框',
    defaultValue: '',
    options: { placeholder: '请输入内容' }
  },
  {
    type: 'select',
    label: '下拉框',
    defaultValue: '',
    options: {
      placeholder: '请选择',
      options: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
        { label: '选项3', value: '3' }
      ]
    }
  },
  {
    type: 'radio',
    label: '单选框',
    options: {
      optionList: [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
      ],
      border: false,
      size: 'default',
    }
  },
  {
    type: 'checkbox',
    label: '多选框',
    options: {
      modelValue: ['1'],
      optionList: [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
        { label: '选项三', value: '3' },
      ],
      border: false,
      size: 'default',
    }
  },
  {
    type: 'switch',
    label: '开关',
    defaultValue: 0,
    options: { activeText: '是', inactiveText: '否' }
  },
  {
    type: 'rate',
    label: '评分',
    defaultValue: 0,
    options: { max: 5 }
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

  // 数据展示组件
  {
    type: 'badge',
    label: '勋章',
    defaultValue: '',
    slot: true,
    children: [
      {
        type: 'button',
        label: '按钮',
        options: {
          type: 'primary',
          label: '点击我',
          size: 'small',
          disabled: false,
        }
      }
    ],
    options: {
      value: 1,
      content: '5',
      type: 'primary',
    }
  },
  {
    type: 'progress',
    label: '进度条',
    defaultValue: "0",
    options: {
      percentage: "50",
      status: 'success'
    }
  },
  {
    type: 'result',
    label: '结果',
    defaultValue: '',
    options: { title: '主标题', subTitle: '副标题', icon: 'primary' }
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