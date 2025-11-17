import { ref, toRefs } from 'vue';
import useDictStore from '@/store/modules/dict';
import { getDicts } from '@/api/system/dict/data';

interface DictItem {
  label: string;
  value: string;
  elTagType?: string;
  elTagClass?: string;
}

export function useDict(...args: string[]) {
  const res = ref<Record<string, DictItem[]>>({});
  const dictLoaded = ref<Record<string, boolean>>({});

  args.forEach((dictType: string) => {
    res.value[dictType] = [];
    dictLoaded.value[dictType] = false;

    // 先尝试从缓存获取
    const cached = useDictStore().getDict(dictType);
    if (cached && Array.isArray(cached)) {
      res.value[dictType] = cached;
      dictLoaded.value[dictType] = true;
    } else {
      // 从API获取
      getDicts(dictType)
        .then((resp: any) => {          
          if (resp.code === 200 && Array.isArray(resp.data)) {
            const dictData = resp.data.map((p: any) => ({
              label: p.dictLabel || '',
              value: p.dictValue || '',
              elTagType: p.listClass,
              elTagClass: p.cssClass,
            }));
            
            res.value[dictType] = dictData;
            // 修复：存储数组而不是字符串
            useDictStore().setDict(dictType, dictData);
            dictLoaded.value[dictType] = true;
          } else {
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
