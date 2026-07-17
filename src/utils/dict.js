import { ref, toRefs } from 'vue';
import useDictStore from '@/store/modules/dict';
import { getDicts } from '@/api/system/dict/data';
export function useDict(...args) {
    const res = ref({});
    const dictLoaded = ref({});
    args.forEach((dictType) => {
        res.value[dictType] = [];
        dictLoaded.value[dictType] = false;
        // 先尝试从缓存获取
        const cached = useDictStore().getDict(dictType);
        if (cached && Array.isArray(cached)) {
            res.value[dictType] = cached;
            dictLoaded.value[dictType] = true;
        }
        else {
            // 从API获取
            getDicts(dictType)
                .then((resp) => {
                if (resp.code === 200 && Array.isArray(resp.data)) {
                    const dictData = resp.data.map((p) => ({
                        label: p.dictLabel || '',
                        value: p.dictValue || '',
                        elTagType: p.listClass,
                        elTagClass: p.cssClass,
                    }));
                    res.value[dictType] = dictData;
                    // 修复：存储数组而不是字符串
                    useDictStore().setDict(dictType, dictData);
                    dictLoaded.value[dictType] = true;
                }
                else {
                    res.value[dictType] = [];
                    dictLoaded.value[dictType] = true;
                }
            })
                .catch(error => {
                res.value[dictType] = [];
                dictLoaded.value[dictType] = true;
            });
        }
    });
    return {
        ...toRefs(res.value),
        dictLoaded: toRefs(dictLoaded.value),
    };
}
