import { defineStore } from 'pinia';
export const useEditorStore = defineStore('editor', () => {
    const blocks = ref([
        // 默认输入框
        {
            type: 'input',
            label: '默认输入框',
            options: {
                modelValue: '',
                placeholder: '请输入内容',
                // 添加缺失的默认属性，防止 undefined 错误
                width: '100%',
                maxLength: '',
                showWordLimit: false,
                clearable: false,
                disabled: false,
                size: 'default',
                labelWidth: '100px'
            }
        }
    ]);
    const currentBlock = ref(null); // 默认 null
    const addBlock = (block) => {
        blocks.value.push(block);
    };
    const updateBlock = (newBlock) => {
        blocks.value = newBlock;
    };
    // 修改 selectBlock 支持 number 或 Block
    const selectBlock = (param) => {
        if (param === null) {
            currentBlock.value = null;
            return;
        }
        if (typeof param === 'number') {
            if (param >= 0 && param < blocks.value.length) {
                currentBlock.value = param;
            }
        }
        else {
            // 查找 Block 的索引（使用 === 引用比较）
            const index = blocks.value.findIndex(b => b === param);
            if (index !== -1) {
                currentBlock.value = index;
            }
            else {
                console.warn('Block not found in blocks array');
            }
        }
    };
    const selectedBlock = computed(() => {
        if (currentBlock.value === null)
            return null;
        return blocks.value[currentBlock.value];
    });
    // deleteAll
    const clearAll = () => {
        blocks.value = [];
        currentBlock.value = null;
    };
    return {
        blocks,
        currentBlock,
        selectedBlock,
        addBlock,
        updateBlock,
        selectBlock,
        clearAll
    };
});
