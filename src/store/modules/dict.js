// store/modules/dict.ts - 修复版本
import { defineStore } from 'pinia';
const useDictStore = defineStore('dict', {
    state: () => ({
        dict: []
    }),
    actions: {
        // 获取字典
        getDict(_key) {
            if (!_key)
                return null;
            try {
                for (let i = 0; i < this.dict.length; i++) {
                    if (this.dict[i].key === _key) {
                        // 确保返回的是数组
                        const value = this.dict[i].value;
                        if (Array.isArray(value)) {
                            return value;
                        }
                        return null;
                    }
                }
            }
            catch (e) {
                return null;
            }
            return null;
        },
        // 设置字典 - 修复参数类型
        setDict(_key, value) {
            if (!_key)
                return;
            this.removeDict(_key);
            this.dict.push({
                key: _key,
                value: value
            });
        },
        // 删除字典
        removeDict(_key) {
            const index = this.dict.findIndex(item => item.key === _key);
            if (index !== -1) {
                this.dict.splice(index, 1);
                return true;
            }
            return false;
        },
        // 清空字典
        cleanDict() {
            this.dict = [];
        }
    }
});
export default useDictStore;
