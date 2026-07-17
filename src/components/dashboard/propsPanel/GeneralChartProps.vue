<template>
    <div v-if="selectedBlock" class="props-panel">
        <MYForm class="operation-list" v-model="formModel" :label-width="60">
            <MYScrollbar ScrollWidth="4px" height="100%">
                <MYForm-item :label="$t('dashboard.props.layerName')">
                    <MYInput v-model="selectedBlock.name" :placeholder="$t('dashboard.props.layerName')" placeholderColor="#fff"
                        @input="updateName" />
                </MYForm-item>
                <MYForm-item :label="$t('dashboard.props.hidden')">
                    <MYSwitch v-model="selectedBlock.visible" />
                </MYForm-item>
                <MYForm-item :label="$t('dashboard.props.color')" v-if="isBarChart">
                    <MYSelect-color v-model="selectedBlock.color" />
                </MYForm-item>
                <MYForm-item :label="$t('dashboard.props.maxWidth')" v-if="isBarChart">
                    <MYSlidebar v-model="barWidth" :max="100" :min="0" thumbColor="#409EFF" style="width: 100px;"
                        @change="updateBarWidth" />
                </MYForm-item>
                <MYForm-item :label="$t('dashboard.props.titleSetting')">
                    <MYSwitch v-model="selectedBlock.title" />
                </MYForm-item>
                <div v-if="selectedBlock.title === true">
                    <MYForm-item :label="$t('dashboard.props.title')">
                        <MYInput v-model="titleText" :placeholder="$t('dashboard.props.title')" @input="updateTitleText" />
                    </MYForm-item>
                    <MYForm-item :label="$t('dashboard.props.titleColor')">
                        <MYInput v-model="selectedBlock.titleColor" :placeholder="$t('dashboard.props.titleColor')" @input="updateTitleColor" />
                    </MYForm-item>
                    <MYForm-item :label="$t('dashboard.props.titleWeight')">
                        <MYInput v-model="selectedBlock.fontWeight" :placeholder="$t('dashboard.props.titleWeight')" @input="updateFontWeight" />
                    </MYForm-item>
                    <MYForm-item :label="$t('dashboard.props.titleSize')">
                        <MYInput v-model="selectedBlock.fontSize" :placeholder="$t('dashboard.props.titleSize')" @input="updateFontSize" />
                    </MYForm-item>
                </div>
                <MYForm-item :label="$t('dashboard.props.data')">
                    <MYButton @click="openDataDialog">{{ $t('dashboard.props.editData') }}</MYButton>
                    <MYDialog v-model="dataDialogVisible" @close="closeDataDialog" :title="$t('dashboard.props.dataEditor.title')" width="800px"
                        height="650px" :show-close="false" append-to-body>
                        <div class="data-editor-container">
                            <div class="data-table">
                                <div class="table-header">
                                    <div class="header-cell">{{ $t('dashboard.props.dataEditor.name') }}</div>
                                    <div class="header-cell">{{ $t('dashboard.props.dataEditor.value') }}</div>
                                    <div class="header-cell">{{ $t('dashboard.props.dataEditor.operation') }}</div>
                                </div>

                                <div class="table-body">
                                    <MYScrollbar ScrollWidth="4px" trackColor="transparent">
                                        <div v-for="(item, index) in currentData" :key="index" class="table-row">
                                            <div class="cell">
                                                <MYInput v-model="item.name" :placeholder="$t('dashboard.props.dataEditor.name')" />
                                            </div>
                                            <div class="cell">
                                                <MYInput v-model.number="item.value" type="number" :placeholder="$t('dashboard.props.dataEditor.value')" />
                                            </div>
                                            <div class="cell">
                                                <MYButton type="danger" @click="removeDataItem(index)"
                                                    class="btn-remove">{{ $t('dashboard.props.dataEditor.delete') }}
                                                </MYButton>
                                            </div>
                                        </div>
                                    </MYScrollbar>
                                </div>
                            </div>
                            <MYScrollbar ScrollWidth="4px" trackColor="transparent">
                                <div class="data-preview">
                                    <h4>{{ $t('dashboard.props.dataEditor.jsonPreview') }}</h4>
                                    <pre>{{ JSON.stringify(currentData, null, 2) }}</pre>
                                </div>
                            </MYScrollbar>

                            <div class="dialog-footer">
                                <MYButton @click="closeDataDialog">{{ $t('dashboard.props.dataEditor.cancel') }}</MYButton>
                                <MYButton type="primary" @click="saveData">{{ $t('dashboard.props.dataEditor.save') }}</MYButton>
                            </div>
                        </div>
                    </MYDialog>
                </MYForm-item>
                <MYForm-item :label="$t('dashboard.props.xAxisSetting')" v-if="isAxisChart">
                    <MYSwitch v-model="selectedBlock.xAlign" />
                </MYForm-item>
                <div v-if="selectedBlock.xAlign && isAxisChart">
                    <MYForm-item :label="$t('dashboard.props.xAxisName')">
                        <MYInput v-model="selectedBlock.xName" :placeholder="$t('dashboard.props.xAxisName')" @input="updateXName" />
                    </MYForm-item>
                    <MYForm-item :label="$t('dashboard.props.xAxisShow')">
                        <MYSwitch size="small" v-model="selectedBlock.xVisible" />
                    </MYForm-item>
                    <MYForm-item :label="$t('dashboard.props.xAxisGridLine')">
                        <MYSwitch size="small" v-model="selectedBlock.splitLine" />
                    </MYForm-item>
                    <div v-if="selectedBlock.splitLine">
                        <MYForm-item :label="$t('dashboard.props.xAxisGridLineColor')">
                            <MYInput v-model="selectedBlock.splitLineColor" :placeholder="$t('dashboard.props.xAxisGridLineColor')" />
                        </MYForm-item>
                    </div>
                    <MYForm-item :label="$t('dashboard.props.xAxisOffset')">
                        <MYSlidebar v-model="selectedBlock.xmove" :max="100" :min="0" thumbColor="#409EFF"
                            style="width: 100px;" />
                    </MYForm-item>
                    <MYForm-item :label="$t('dashboard.props.xAxisRotate')">
                        <MYSlidebar v-model="selectedBlock.xRotate" :max="100" :min="0" thumbColor="#409EFF"
                            style="width: 100px;" />
                    </MYForm-item>
                    <MYForm-item :label="$t('dashboard.props.xAxisReverse')">
                        <MYSwitch size="small" v-model="selectedBlock.xInverse" />
                    </MYForm-item>
                    <MYForm-item :label="$t('dashboard.props.xAxisFontSize')">
                        <MYInput v-model="selectedBlock.xDataSize" :placeholder="$t('dashboard.props.xAxisFontSize')" />
                    </MYForm-item>
                </div>
                <MYForm-item :label="$t('dashboard.props.yAxisSetting')" v-if="isAxisChart">
                    <MYSwitch v-model="selectedBlock.yAlign" />
                </MYForm-item>
                <div v-if="selectedBlock.yAlign && isAxisChart">
                    <MYForm-item :label="$t('dashboard.props.yAxisName')">
                        <MYInput v-model="selectedBlock.yName" :placeholder="$t('dashboard.props.yAxisName')" @input="updateYName" />
                    </MYForm-item>
                    <MYForm-item :label="$t('dashboard.props.yAxisShow')">
                        <MYSwitch size="small" v-model="selectedBlock.yVisible" />
                    </MYForm-item>
                    <MYForm-item :label="$t('dashboard.props.yAxisGridLine')">
                        <MYSwitch size="small" v-model="selectedBlock.ySplitLine" />
                    </MYForm-item>
                    <div v-if="selectedBlock.ySplitLine">
                        <MYForm-item :label="$t('dashboard.props.yAxisGridLineColor')">
                            <MYInput v-model="selectedBlock.ySplitLineColor" :placeholder="$t('dashboard.props.yAxisGridLineColor')" />
                        </MYForm-item>
                    </div>
                    <MYForm-item :label="$t('dashboard.props.yAxisReverse')">
                        <MYSwitch size="small" v-model="selectedBlock.yInverse" />
                    </MYForm-item>
                    <MYForm-item :label="$t('dashboard.props.yAxisFontSize')">
                        <MYInput v-model="selectedBlock.yDataSize" :placeholder="$t('dashboard.props.yAxisFontSize')" />
                    </MYForm-item>
                </div>
                <MYForm-item :label="$t('dashboard.props.valueSetting')">
                    <MYSwitch v-model="selectedBlock.dataSettingAlign" />
                </MYForm-item>
                <div v-if="selectedBlock.dataSettingAlign">
                    <MYForm-item :label="$t('dashboard.props.valueShow')">
                        <MYSwitch size="small" v-model="selectedBlock.dataAlign" />
                    </MYForm-item>
                    <div v-if="selectedBlock.dataAlign">
                        <MYForm-item :label="$t('dashboard.props.valueFontSize')">
                            <MYInput v-model="selectedBlock.dataSize" :placeholder="$t('dashboard.props.valueFontSize')" />
                        </MYForm-item>
                        <MYForm-item :label="$t('dashboard.props.valueFontColor')">
                            <MYInput v-model="selectedBlock.dataSizeColor" :placeholder="$t('dashboard.props.valueFontColor')" />
                        </MYForm-item>
                        <MYForm-item :label="$t('dashboard.props.valueFontWeight')">
                            <MYInput v-model="selectedBlock.dataWeight" :placeholder="$t('dashboard.props.valueFontWeight')" />
                        </MYForm-item>
                    </div>
                </div>
                <MYForm-item :label="$t('dashboard.props.coordinateMargin')" v-if="isAxisChart">
                    <MYSwitch v-model="selectedBlock.MPAlign" />
                </MYForm-item>
                <div v-if="selectedBlock.MPAlign && isAxisChart">
                    <MYForm-item :label="$t('dashboard.props.topMargin')">
                        <MYSlidebar v-model="selectedBlock.MPTop" :max="100" :min="0" thumbColor="#409EFF"
                            style="width: 100px;" />
                    </MYForm-item>
                    <MYForm-item :label="$t('dashboard.props.topMargin')">
                        <MYInput v-model="selectedBlock.MPTop" :placeholder="$t('dashboard.props.topMargin')" />
                    </MYForm-item>
                    <MYForm-item :label="$t('dashboard.props.bottomMargin')">
                        <MYSlidebar v-model="selectedBlock.MPBottom" :max="100" :min="0" thumbColor="#409EFF"
                            style="width: 100px;" />
                    </MYForm-item>
                    <MYForm-item :label="$t('dashboard.props.bottomMargin')">
                        <MYInput v-model="selectedBlock.MPBottom" :placeholder="$t('dashboard.props.bottomMargin')" />
                    </MYForm-item>
                    <MYForm-item :label="$t('dashboard.props.leftMargin')">
                        <MYSlidebar v-model="selectedBlock.MPLeft" :max="100" :min="0" thumbColor="#409EFF"
                            style="width: 100px;" />
                    </MYForm-item>
                    <MYForm-item :label="$t('dashboard.props.leftMargin')">
                        <MYInput v-model="selectedBlock.MPLeft" :placeholder="$t('dashboard.props.leftMargin')" />
                    </MYForm-item>
                    <MYForm-item :label="$t('dashboard.props.rightMargin')">
                        <MYSlidebar v-model="selectedBlock.MPRight" :max="100" :min="0" thumbColor="#409EFF"
                            style="width: 100px;" />
                    </MYForm-item>
                    <MYForm-item :label="$t('dashboard.props.rightMargin')">
                        <MYInput v-model="selectedBlock.MPRight" :placeholder="$t('dashboard.props.rightMargin')" />
                    </MYForm-item>
                </div>
            </MYScrollbar>
        </MYForm>
    </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from '@/store/modules/dashboard'
import { cloneDeep } from 'lodash-es'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 基础数据
const formModel = reactive({})
const dashboardStore = useDashboardStore()
const barChartTypes = ['basic-bar', 'horizontal-bar', 'stacked-bar', 'capsule-bar', 'line-bar', 'percent-bar']
const dataDialogVisible = ref(false)
const currentData = ref<Array<{ name: string; value: number }>>([])

// 定义轴图表类型
const axisChartTypes = [
    // 柱形图
    'basic-bar', 'horizontal-bar', 'stacked-bar', 'capsule-bar', 'line-bar', 'percent-bar',
    // 折线图
    'basic-line', 'area-line', 'smooth-line',
    // 散点图
    'basic-scatter'
]

// 计算属性
const selectedBlock = computed(() => {
    if (!dashboardStore.selectedId) return null
    return dashboardStore.blocks.find(b => b.id === dashboardStore.selectedId)
})

const isBarChart = computed(() => {
    if (!selectedBlock.value) return false
    return barChartTypes.includes(selectedBlock.value.type)
})

const isPieChart = computed(() => {
    if (!selectedBlock.value) return false
    return ['basic-pie', 'ring-pie', 'rose-pie', 'rotate-pie'].includes(selectedBlock.value.type)
})

const isAxisChart = computed(() => {
    if (!selectedBlock.value) return false
    return axisChartTypes.includes(selectedBlock.value.type)
})

// 图层名称相关
const updateName = (name: string) => {
    if (selectedBlock.value) {
        dashboardStore.renameBlock(selectedBlock.value.id, name)

        // 如果标题已开启，同步更新标题文本
        if (selectedBlock.value.title === true &&
            selectedBlock.value.config.options?.title) {
            updateTitleText(name)
        }
    }
}

// 最大宽度相关
const barWidth = computed({
    get() {
        const series = selectedBlock.value?.config?.options?.series?.[0] || {}

        if (!series?.barWidth) return 30

        const value = parseInt(series.barWidth) || 30
        return value
    },
    set(value) {
        updateBarWidth(value)
    }
})

const updateBarWidth = (value: number) => {
    if (!selectedBlock.value) {
        return
    }

    const block = selectedBlock.value

    if (!block.config.options) {
        block.config.options = {}
    }

    if (!block.config.options.series) {
        block.config.options.series = []
    }

    if (block.config.options.series.length === 0) {
        block.config.options.series.push({})
    }

    block.config.options.series[0].barWidth = `${value}%`
    const newConfig = {
        ...block.config,
        options: {
            ...block.config.options,
            series: [
                ...block.config.options.series
            ]
        }
    }

    dashboardStore.updateBlock(block.id, {
        config: newConfig
    })
}

// 标题设置相关 
const updateTitle = (show: boolean) => {
    if (!selectedBlock.value) return
    const block = selectedBlock.value
    if (!block.config.options) {
        block.config.options = {}
    }
    if (show) {
        block.config.options.title = {
            text: block.titleText,
            show: show,
            left: 'center',
            top: 'top',
            textStyle: {
                color: '#fff',
                fontSize: 16
            }
        }
    } else {
        if (block.config.options.title) {
            block.config.options.title = false
        } else {
            block.config.options.title = {
                show: false
            }
        }
    }
    const newConfig = {
        ...block.config,
        options: {
            ...block.config.options
        }
    }

    dashboardStore.updateBlock(block.id, {
        config: newConfig
    })
}

watch(() => selectedBlock.value?.title, (newVal: any) => {
    if (newVal !== undefined) {
        updateTitle(newVal)
    }
}, { immediate: true })

const titleText = computed({
    get() {
        if (!selectedBlock.value || !selectedBlock.value.config.options || !selectedBlock.value.config.options.title) {
            return selectedBlock.value?.name || ''
        }
        return selectedBlock.value.config.options.title.text || selectedBlock.value.name
    },
    set(value) {
        updateTitleText(value)
    }
})

const updateTitleText = (text: string) => {
    if (!selectedBlock.value || !selectedBlock.value.config.options) return

    const block = selectedBlock.value

    if (!block.config.options.title) {
        block.config.options.title = {
            text: '',
            show: false,
            left: 'center',
            top: 'top',
            textStyle: {
                color: '#fff',
                fontSize: 8
            }
        }
    }

    block.config.options.title.text = text || block.name

    if (!text && block.name) {
        block.config.options.title.text = block.name
    }

    const newConfig = {
        ...block.config,
        options: {
            ...block.config.options,
            title: {
                ...block.config.options.title
            }
        }
    }

    dashboardStore.updateBlock(block.id, {
        config: newConfig
    })
}

const updateTitleColor = (color: string) => {
    if (!selectedBlock.value || !selectedBlock.value.config.options || !selectedBlock.value.config.options.title) {
        return
    }
    if (!color) color = '#fff'

    selectedBlock.value.config.options.title.textStyle.color = color
}

const updateFontWeight = (thickness: string) => {
    if (!selectedBlock.value || !selectedBlock.value.config.options || !selectedBlock.value.config.options.title) {
        return
    }

    if (!thickness) thickness = '600'

    const block = selectedBlock.value
    const weight = thickness || '600'

    if (!block.config.options.title.textStyle) {
        block.config.options.title.textStyle = {}
    }

    block.config.options.title.textStyle.fontWeight = weight

    const newConfig = {
        ...block.config,
        options: {
            ...block.config.options,
            title: {
                ...block.config.options.title,
                textStyle: {
                    ...block.config.options.title.textStyle,
                    fontWeight: weight
                }
            }
        }
    }

    dashboardStore.updateBlock(block.id, {
        config: newConfig
    })
}

const updateFontSize = (fontSize: number) => {
    if (!selectedBlock.value || !selectedBlock.value.config.options || !selectedBlock.value.config.options.title) {
        return
    }
    if (!fontSize) fontSize = 8

    const block = selectedBlock.value
    const size = fontSize || 8

    if (!block.config.options.title.textStyle) {
        block.config.options.title.textStyle = {}
    }

    block.config.options.title.textStyle.fontSize = size

    const newConfig = {
        ...block.config,
        options: {
            ...block.config.options,
            title: {
                ...block.config.options.title,
                textStyle: {
                    ...block.config.options.title.textStyle,
                    fontSize: size
                }
            }
        }
    }

    dashboardStore.updateBlock(block.id, {
        config: newConfig
    })
}

// 数据编辑相关
const openDataDialog = () => {
    if (!selectedBlock.value) return

    const block = selectedBlock.value
    const options = block.config.options

    let currentDataList: Array<{ name: string; value: number }> = []

    if (isPieChart.value) {
        if (options?.series && options.series.length > 0 && Array.isArray(options.series[0].data)) {
            currentDataList = [...options.series[0].data.map((item: any) => ({
                name: item.name || '',
                value: item.value || 0
            }))]
        }
    } else {
        let names: string[] = []
        if (options?.xAxis) {
            if (Array.isArray(options.xAxis)) {
                if (options.xAxis.length > 0 && options.xAxis[0].data) {
                    names = [...options.xAxis[0].data]
                }
            } else if (options.xAxis.data) {
                names = [...options.xAxis.data]
            }
        }

        let values: number[] = []
        if (options?.series && options.series.length > 0 && options.series[0].data) {
            values = [...options.series[0].data]
        }

        currentDataList = names.map((name, index) => ({
            name,
            value: index < values.length ? values[index] : 0
        }))
    }

    if (currentDataList.length === 0) {
        currentDataList = []
    }

    currentData.value = currentDataList
    dataDialogVisible.value = true
}

// 关闭对话框
const closeDataDialog = () => {
    dataDialogVisible.value = false
}

// 删除数据项
const removeDataItem = (index: number) => {
    currentData.value.splice(index, 1)
}

// 保存数据
const saveData = () => {
    if (!selectedBlock.value) return

    const block = selectedBlock.value
    const options = block.config.options

    if (isPieChart.value) {
        if (options.series && options.series.length > 0) {
            options.series[0].data = currentData.value.map(item => ({
                name: item.name,
                value: item.value
            }))
        }
    } else {
        const names = currentData.value.map(item => item.name)
        const values = currentData.value.map(item => item.value)

        if (options.xAxis) {
            if (Array.isArray(options.xAxis)) {
                if (options.xAxis.length > 0) {
                    options.xAxis[0].data = names
                }
            } else {
                options.xAxis.data = names
            }
        }

        if (options.series && options.series.length > 0) {
            options.series[0].data = values
        }
    }

    const newConfig = {
        ...block.config,
        options: { ...options }
    }

    dashboardStore.updateBlock(block.id, {
        config: newConfig
    })

    closeDataDialog()
}

// X轴设置
const updateXName = (value: string) => {
    if (!selectedBlock.value) return

    const block = selectedBlock.value
    const xAxis = block.config.options.xAxis
    if (Array.isArray(xAxis)) {
        if (xAxis.length > 0) {
            xAxis[0].name = value
        }
    } else {
        xAxis.name = value
    }

    const newConfig = cloneDeep(block.config)

    dashboardStore.updateBlock(block.id, {
        config: newConfig
    })
}

// 数据x轴线条 / x轴线条颜色 / 偏移量 / 旋转角度 / 倒置数据 / 数据字号大小
const updateXAxisProperty = (
    property: 'xVisible' | 'splitLine' | 'splitLineColor' | 'xmove' | 'xRotate' | 'xInverse' | 'xDataSize',
    updater: (xAxis: any, newVal: boolean | string | number) => void
) => {
    watch(() => selectedBlock.value?.[property], (newVal: boolean | string | number | undefined) => {
        if (!selectedBlock.value || newVal === undefined) return

        const block = selectedBlock.value
        const options = block.config.options

        if (!options.xAxis) {
            options.xAxis = Array.isArray(options.xAxis) ? [] : {}
        }

        const xAxis = Array.isArray(options.xAxis) ? (options.xAxis[0] || (options.xAxis[0] = {})) : options.xAxis

        updater(xAxis, newVal)

        const newConfig = {
            ...block.config,
            options: { ...options }
        }

        dashboardStore.updateBlock(block.id, {
            config: newConfig
        })
    }, { immediate: true })
}

updateXAxisProperty('xVisible', (xAxis, newVal) => {
    if (!xAxis.axisLine) xAxis.axisLine = {}
    if (!xAxis.axisLabel) xAxis.axisLabel = {}

    xAxis.axisLine.show = newVal
    xAxis.axisLabel.show = newVal
})

updateXAxisProperty('splitLine', (xAxis, newVal) => {
    if (!xAxis.splitLine) xAxis.splitLine = {}
    xAxis.splitLine.show = newVal
})

updateXAxisProperty('splitLineColor', (xAxis, newVal) => {
    if (!xAxis.splitLine) xAxis.splitLine = {}
    if (!xAxis.splitLine.lineStyle) xAxis.splitLine.lineStyle = {}
    xAxis.splitLine.lineStyle.color = newVal
})

updateXAxisProperty('xmove', (xAxis, newVal) => {
    if (!xAxis.offset) xAxis.offset = 0
    xAxis.offset = newVal
})

updateXAxisProperty('xRotate', (xAxis, newVal) => {
    if (!xAxis.axisLabel.rotate) xAxis.axisLabel.rotate = 0
    xAxis.axisLabel.rotate = newVal
})

updateXAxisProperty('xInverse', (xAxis, newVal) => {
    if (!xAxis.inverse) xAxis.inverse = {}
    xAxis.inverse = newVal
})

updateXAxisProperty('xDataSize', (xAxis, newVal) => {
    if (!xAxis.axisLabel.fontSize) xAxis.axisLabel.fontSize = 12
    xAxis.axisLabel.fontSize = newVal
})

// y轴名字
const updateYName = (value: string) => {
    if (!selectedBlock.value) return
    const block = selectedBlock.value
    const yAxis = block.config.options.yAxis

    if (Array.isArray(yAxis)) {
        if (yAxis.length > 0) {
            yAxis[0].name = value
        }
    } else {
        yAxis.name = value
    }

    const newConfig = cloneDeep(block.config)

    dashboardStore.updateBlock(block.id, {
        config: newConfig
    })
}

// 数据y轴线条 / y轴线条颜色 / 偏移量 / 旋转角度 / 倒置数据 / 数据字号大小
const updateYAxisProperty = (
    property: 'yVisible' | 'ySplitLine' | 'ySplitLineColor' | 'yInverse' | 'yDataSize',
    updater: (yAxis: any, newVal: boolean | string | number) => void
) => {
    watch(() => selectedBlock.value?.[property], (newVal: boolean | string | number | undefined) => {
        if (!selectedBlock.value || newVal === undefined) return

        const block = selectedBlock.value
        const options = block.config.options

        if (!options.yAxis) {
            options.yAxis = Array.isArray(options.yAxis) ? [] : {}
        }

        const yAxis = Array.isArray(options.yAxis) ?
            (options.yAxis[0] || (options.yAxis[0] = {})) :
            options.yAxis

        updater(yAxis, newVal)

        const newConfig = {
            ...block.config,
            options: { ...options }
        }

        dashboardStore.updateBlock(block.id, {
            config: newConfig
        })
    }, { immediate: true })
}

updateYAxisProperty('yVisible', (yAxis, newVal) => {
    if (!yAxis.axisLine) yAxis.axisLine = {}
    if (!yAxis.axisLabel) yAxis.axisLabel = {}

    yAxis.axisLine.show = newVal
    yAxis.axisLabel.show = newVal
})

updateYAxisProperty('ySplitLine', (yAxis, newVal) => {
    if (!yAxis.splitLine) yAxis.splitLine = {}
    yAxis.splitLine.show = newVal
})

updateYAxisProperty('ySplitLineColor', (yAxis, newVal) => {
    if (!yAxis.splitLine) yAxis.splitLine = {}
    if (!yAxis.splitLine.lineStyle) yAxis.splitLine.lineStyle = {}
    yAxis.splitLine.lineStyle.color = newVal
})

updateYAxisProperty('yInverse', (yAxis, newVal) => {
    yAxis.inverse = newVal
})

updateYAxisProperty('yDataSize', (yAxis, newVal) => {
    if (!yAxis.axisLabel) yAxis.axisLabel = {}
    yAxis.axisLabel.fontSize = newVal
})

// 数据标签设置
const updateSeriesProperty = (
    property: 'dataAlign' | 'dataSize' | 'dataSizeColor' | 'dataWeight',
    updater: (series: any, newVal: string | number | boolean) => void
) => {
    watch(() => selectedBlock.value?.[property], (newVal: string | number | boolean | undefined) => {
        if (!selectedBlock.value || newVal === undefined) return

        const block = selectedBlock.value
        const options = block.config.options

        if (!options.series || options.series.length === 0) {
            options.series = [{}]
        }

        options.series.forEach((series: any) => {
            updater(series, newVal)
        })

        const newConfig = {
            ...block.config,
            options: { ...options }
        }

        dashboardStore.updateBlock(block.id, {
            config: newConfig
        })
    }, { immediate: true })
}

updateSeriesProperty('dataAlign', (series, newVal) => {
    if (!series.label) series.label = {}
    series.label.show = newVal
})

updateSeriesProperty('dataSize', (series, newVal) => {
    if (!series.label) series.label = { show: true, position: 'top' }
    series.label.fontSize = parseInt(newVal as string) || 12
})

updateSeriesProperty('dataSizeColor', (series, newVal) => {
    if (!series.label) series.label = { show: true, position: 'top' }
    series.label.color = newVal || '#fff'
})

updateSeriesProperty('dataWeight', (series, newVal) => {
    if (!series.label) series.label = { show: true, position: 'top' }
    series.label.fontWeight = newVal || 'normal'
})

// 边距设置
const updateGridProperty = (
    property: 'MPTop' | 'MPBottom' | 'MPLeft' | 'MPRight',
    updater: (grid: any, newVal: number | string) => void
) => {
    watch(() => selectedBlock.value?.[property], (newVal: number | string | undefined) => {
        if (!selectedBlock.value || newVal === undefined) return

        const block = selectedBlock.value
        const options = block.config.options

        // 确保 grid 存在
        if (!options.grid) {
            options.grid = {}
        }

        // 应用具体更新逻辑
        updater(options.grid, newVal)

        // 更新配置
        const newConfig = {
            ...block.config,
            options: { ...options }
        }

        dashboardStore.updateBlock(block.id, {
            config: newConfig
        })
    }, { immediate: true })
}

// 顶边距
updateGridProperty('MPTop', (grid, newVal) => {
    grid.top = `${newVal}%`
})

// 底边距
updateGridProperty('MPBottom', (grid, newVal) => {
    grid.bottom = `${newVal}%`
})

// 左边距
updateGridProperty('MPLeft', (grid, newVal) => {
    grid.left = `${newVal}%`
})

// 右边距
updateGridProperty('MPRight', (grid, newVal) => {
    grid.right = `${newVal}%`
})
</script>