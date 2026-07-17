import { Block } from '@/types/views/builder'
import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editor', () => {
    const blocks = ref<Block[]>([
        {
            type: 'input',
            labelKey: 'system.builder.components.input',
            label: '默认输入框',                       
            options: {
                modelValue: '',
                placeholderKey: 'system.builder.props.placeholder',
                placeholder: '请输入内容',
                width: '100%',
                maxLength: '',
                showWordLimit: false,
                clearable: false,
                disabled: false,
                size: 'default',
                labelWidth: '100px'
            }
        }
    ])

    const currentBlock = ref<number | null>(null)

    const addBlock = (block: Block) => blocks.value.push(block)

    const updateBlock = (newBlock: Block[]) => { blocks.value = newBlock }

    const selectBlock = (param: number | Block | null) => {
        if (param === null) {
            currentBlock.value = null
            return
        }
        if (typeof param === 'number') {
            if (param >= 0 && param < blocks.value.length) currentBlock.value = param
        } else {
            const index = blocks.value.findIndex(b => b === param)
            if (index !== -1) currentBlock.value = index
        }
    }

    const selectedBlock = computed(() => currentBlock.value === null ? null : blocks.value[currentBlock.value])

    const clearAll = () => {
        blocks.value = []
        currentBlock.value = null
    }

    return { 
        blocks, 
        currentBlock,
        selectedBlock,
        addBlock, 
        updateBlock, 
        selectBlock,
        clearAll
    }
})