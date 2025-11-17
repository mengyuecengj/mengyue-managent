// hooks/useApiDocumentation.ts
import { ref, computed, nextTick, watch, onMounted } from 'vue';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-javascript';
export function useApiDocumentation(apiList) {
    // 搜索和筛选状态
    const searchKeyword = ref('');
    const filterMethod = ref('');
    const selectedApi = ref(null);
    // 方法类型映射
    const getMethodType = (method) => {
        const types = {
            GET: 'success',
            POST: 'primary',
            PUT: 'warning',
            DELETE: 'danger'
        };
        return types[method] || 'primary';
    };
    // 筛选后的 API 列表
    const filteredApis = computed(() => {
        let filtered = apiList.value;
        // 按方法筛选
        if (filterMethod.value) {
            filtered = filtered.filter((api) => api.method === filterMethod.value);
        }
        // 按关键词搜索
        if (searchKeyword.value) {
            const keyword = searchKeyword.value.toLowerCase();
            filtered = filtered.filter((api) => api.url.toLowerCase().includes(keyword) ||
                api.description.toLowerCase().includes(keyword) ||
                api.method.toLowerCase().includes(keyword));
        }
        // 如果没有选中任何 API，自动选中第一个
        if (filtered.length > 0 && !selectedApi.value) {
            selectedApi.value = filtered[0];
        }
        return filtered;
    });
    // 选择 API
    const selectApi = (api) => {
        selectedApi.value = api;
        highlightCode();
    };
    // 重置查询条件
    const resetQuery = () => {
        searchKeyword.value = '';
        filterMethod.value = '';
    };
    // 生成请求示例
    const generateRequestExample = (api) => {
        const baseUrl = 'https://api.example.com';
        if (api.method === 'GET') {
            if (api.request?.query && Object.keys(api.request.query).length > 0) {
                const params = Object.keys(api.request.query)
                    .map(key => `${key}=value`)
                    .join('&');
                return `// ${api.description}
${api.method} ${baseUrl}${api.url}?${params}

// 使用 fetch
fetch('${baseUrl}${api.url}?${params}', {
  method: '${api.method}',
  headers: {
    'Content-Type': 'application/json',
    ${api.requiresAuth ? "'Authorization': 'Bearer your-token'" : ''}
  }
})`;
            }
            else {
                return `// ${api.description}
${api.method} ${baseUrl}${api.url}

// 使用 fetch
fetch('${baseUrl}${api.url}', {
  method: '${api.method}',
  headers: {
    'Content-Type': 'application/json',
    ${api.requiresAuth ? "'Authorization': 'Bearer your-token'" : ''}
  }
})`;
            }
        }
        else {
            const bodyParams = api.request?.body ? Object.keys(api.request.body).map(key => `${key}: "value"`).join(',\n    ') : '';
            return `// ${api.description}
${api.method} ${baseUrl}${api.url}

// 使用 fetch
fetch('${baseUrl}${api.url}', {
  method: '${api.method}',
  headers: {
    'Content-Type': 'application/json',
    ${api.requiresAuth ? "'Authorization': 'Bearer your-token'" : ''}
  },
  body: JSON.stringify({
    ${bodyParams}
  })
})`;
        }
    };
    // 生成响应示例
    const generateResponseExample = (api) => {
        return JSON.stringify(api.response, null, 2);
    };
    // 高亮代码 - 修复版本
    const highlightCode = () => {
        nextTick(() => {
            // 给一点延迟确保 DOM 完全渲染
            setTimeout(() => {
                const blocks = document.querySelectorAll('pre code');
                blocks.forEach((block) => {
                    Prism.highlightElement(block);
                });
            }, 100);
        });
    };
    // 监听选中的 API 变化
    watch(selectedApi, () => {
        highlightCode();
    });
    // 初始高亮
    onMounted(() => {
        // 等待组件完全挂载后再高亮
        setTimeout(() => {
            highlightCode();
        }, 200);
    });
    return {
        searchKeyword,
        filterMethod,
        selectedApi,
        filteredApis,
        getMethodType,
        selectApi,
        resetQuery,
        generateRequestExample,
        generateResponseExample,
        highlightCode
    };
}
