<template>
  <div class="api-reference-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <MYText Tecolor="var(--general)" size="24px">用户管理 API 参考文档</MYText>
      <div class="search-box">
        <MYInput v-model="searchKeyword" placeholder="搜索接口名称、描述或路径..." clearable prefix-icon="Search"
          style="width: 300px" placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
        <MYSelect v-model="filterMethod" placeholder="筛选请求方法" clearable>
          <MYOption label="GET" value="GET" />
          <MYOption label="POST" value="POST" />
          <MYOption label="PUT" value="PUT" />
          <MYOption label="DELETE" value="DELETE" />
        </MYSelect>
        <MYButton type="info" plain @click="resetQuery">重置</MYButton>
      </div>
    </div>

    <!-- 主要内容区域：左右布局 -->
    <div class="api-main-content">
      <!-- 左侧 API 列表 -->
      <MYScrollbar height="100%">
        <div class="api-list-sidebar">
          <MYText Tecolor="var(--general)" class="sidebar-header">接口列表</MYText>
          <div class="api-items">
            <div v-for="api in filteredApis" :key="api.key" class="api-item"
              :class="{ active: selectedApi?.key === api.key }" @click="selectApi(api)">
              <div class="api-method-tag" :class="getMethodType(api.method)">
                {{ api.method }}
              </div>
              <div class="api-info">
                <div class="api-url">{{ api.url }}</div>
                <div class="api-description">{{ api.description }}</div>
              </div>
              <MYButton plain v-if="api.requiresAuth" type="warning" size="small" class="auth-tag">
                需登录认证
              </MYButton>
            </div>
          </div>
        </div>
      </MYScrollbar>

      <!-- 右侧 API 详情 -->
      <div class="api-detail-content">
        <div v-if="selectedApi" class="api-detail">
          <!-- API 头部 -->
          <div class="api-detail-header">
            <div class="method-tag-large" :class="getMethodType(selectedApi.method)">
              {{ selectedApi.method }}
            </div>
            <div class="api-main-info">
              <div class="api-url-large">{{ selectedApi.url }}</div>
              <div class="api-description-large">{{ selectedApi.description }}</div>
            </div>
            <MYButton plain v-if="selectedApi.requiresAuth" type="warning" size="large">
              需登录认证
            </MYButton>
          </div>

          <!-- 基本信息 -->
          <div class="detail-section">
            <MYText Tecolor="var(--general)" size="20px" class="basic">基本信息</MYText>
            <div class="custom-table">
              <div class="table-row header">
                <div class="table-cell">属性</div>
                <div class="table-cell-value">值</div>
              </div>
              <div class="table-row">
                <div class="table-cell label">接口描述</div>
                <div class="table-cell value">{{ selectedApi.description }}</div>
              </div>
              <div class="table-row">
                <div class="table-cell label">请求方法</div>
                <div class="table-cell value">
                  <span class="custom-tag method" :class="getMethodType(selectedApi.method)">
                    {{ selectedApi.method }}
                  </span>
                </div>
              </div>
              <div class="table-row">
                <div class="table-cell label">接口路径</div>
                <div class="table-cell value">
                  <span class="api-path">{{ selectedApi.url }}</span>
                </div>
              </div>
              <div class="table-row">
                <div class="table-cell label">认证要求</div>
                <div class="table-cell value">
                  <span class="custom-tag auth" :class="selectedApi.requiresAuth ? 'required' : 'not-required'">
                    <span class="tag-icon">{{ selectedApi.requiresAuth ? '🔒' : '🔓' }}</span>
                    {{ selectedApi.requiresAuth ? '需要登录认证' : '无需认证' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 响应示例 -->
          <div class="detail-section">
            <MYText Tecolor="var(--general)" size="20px" class="basic">响应示例</MYText>
            <div class="code-block">
              <pre><code class="language-json">{{ generateResponseExample(selectedApi) }}</code></pre>
            </div>
          </div>

          <!-- 调用示例 -->
          <div class="detail-section">
            <MYText Tecolor="var(--general)" size="20px" class="basic">调用示例</MYText>
            <div class="code-block">
              <pre><code class="language-javascript">{{ selectedApi.codeExample || generateRequestExample(selectedApi) }}</code></pre>
            </div>
          </div>

          <!-- 错误响应示例 -->
          <div class="detail-section" v-if="selectedApi.errorResponse">
            <MYText Tecolor="var(--general)" size="20px" class="basic">错误响应示例</MYText>
            <div class="code-block">
              <pre><code class="language-json">{{ JSON.stringify(selectedApi.errorResponse, null, 2) }}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-javascript'
import { apiUser } from '@/data/system/userApi'
import { ApiParameter } from '@/types/views/api'

// 搜索和筛选
const searchKeyword = ref('')
const filterMethod = ref('')
const selectedApi = ref<any>(null)

// 计算属性：筛选 API
const filteredApis = computed(() => {
  let filtered = apiUser.value

  // 按方法筛选
  if (filterMethod.value) {
    filtered = filtered.filter(api =>
      api.method === filterMethod.value
    )
  }

  // 按关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    filtered = filtered.filter(api =>
      api.url.toLowerCase().includes(keyword) ||
      api.description.toLowerCase().includes(keyword) ||
      api.method.toLowerCase().includes(keyword)
    )
  }

  // 如果没有选中任何 API，自动选中第一个
  if (filtered.length > 0 && !selectedApi.value) {
    selectedApi.value = filtered[0]
  }

  return filtered
})

// 选择 API
const selectApi = (api: any) => {
  selectedApi.value = api
  highlightCode()
}

// 方法类型映射
const getMethodType = (method: string): "success" | "primary" | "warning" | "danger" => {
  const types: Record<string, "success" | "primary" | "warning" | "danger"> = {
    GET: 'success',
    POST: 'primary',
    PUT: 'warning',
    DELETE: 'danger'
  };
  return types[method] || 'primary';
};

// 检查是否有请求参数
const hasRequestParameters = (api: any): boolean => {
  return !!(api.request && (api.request.query || api.request.params || api.request.body));
}

// 获取所有参数
const getAllParameters = (api: any): ApiParameter[] => {
  const parameters: ApiParameter[] = [];

  if (api.request?.query) {
    Object.entries(api.request.query).forEach(([key, value]) => {
      const typeStr = value as string;
      const isRequired = !typeStr.endsWith('?');
      const cleanType = isRequired ? typeStr : typeStr.slice(0, -1);

      parameters.push({
        name: key,
        type: cleanType,
        required: isRequired,
        description: getParameterDescription(key, cleanType)
      });
    });
  }

  if (api.request?.params) {
    Object.entries(api.request.params).forEach(([key, value]) => {
      const typeStr = value as string;
      const isRequired = !typeStr.endsWith('?');
      const cleanType = isRequired ? typeStr : typeStr.slice(0, -1);

      parameters.push({
        name: key,
        type: cleanType,
        required: isRequired,
        description: getParameterDescription(key, cleanType)
      });
    });
  }

  if (api.request?.body) {
    Object.entries(api.request.body).forEach(([key, value]) => {
      const typeStr = value as string;
      const isRequired = !typeStr.endsWith('?');
      const cleanType = isRequired ? typeStr : typeStr.slice(0, -1);

      parameters.push({
        name: key,
        type: cleanType,
        required: isRequired,
        description: getParameterDescription(key, cleanType)
      });
    });
  }

  return parameters;
}

// 获取参数描述
const getParameterDescription = (name: string, type: string): string => {
  const descriptions: Record<string, string> = {
    userId: '用户ID',
    userName: '用户名',
    nickName: '用户昵称',
    deptId: '部门ID',
    deptName: '部门名称',
    phonenumber: '手机号码',
    email: '邮箱地址',
    sex: '性别（0男 1女）',
    status: '状态（0正常 1停用）',
    remark: '备注信息',
    password: '密码',
    avatar: '头像URL',
    roleIds: '角色ID数组',
    postIds: '岗位ID数组',
    'params[beginTime]': '开始时间',
    'params[endTime]': '结束时间'
  }

  return descriptions[name] || '无描述'
}

// 生成请求示例
const generateRequestExample = (api: any): string => {
  const baseUrl = 'https://api.example.com'

  if (api.method === 'GET') {
    if (api.request?.query && Object.keys(api.request.query).length > 0) {
      const params = Object.keys(api.request.query)
        .map(key => `${key}=value`)
        .join('&')
      return `// ${api.description}
${api.method} ${baseUrl}${api.url}?${params}

// 使用 fetch
fetch('${baseUrl}${api.url}?${params}', {
  method: '${api.method}',
  headers: {
    'Content-Type': 'application/json',
    ${api.requiresAuth ? "'Authorization': 'Bearer your-token'" : ''}
  }
})`
    } else {
      return `// ${api.description}
${api.method} ${baseUrl}${api.url}

// 使用 fetch
fetch('${baseUrl}${api.url}', {
  method: '${api.method}',
  headers: {
    'Content-Type': 'application/json',
    ${api.requiresAuth ? "'Authorization': 'Bearer your-token'" : ''}
  }
})`
    }
  } else {
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
})`
  }
}

// 生成响应示例 - 使用 API 定义中的实际响应数据
const generateResponseExample = (api: any): string => {
  return JSON.stringify(api.response, null, 2);
}

// 重置查询条件
const resetQuery = () => {
  searchKeyword.value = '';
  filterMethod.value = '';
};

// 高亮代码
const highlightCode = () => {
  nextTick(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      Prism.highlightElement(block);
    });
  });
}

// 监听选中的 API 变化
watch(selectedApi, () => {
  highlightCode();
});

// 初始高亮
onMounted(() => {
  highlightCode();
})
</script> -->
<script setup lang="ts">
import { apiUser } from '@/data/system/userApi'
import { useApiDocumentation } from '@/hooks/useApiDocumentation'

const {
  searchKeyword,
  filterMethod,
  selectedApi,
  filteredApis,
  getMethodType,
  selectApi,
  resetQuery,
  generateRequestExample,
  generateResponseExample
} = useApiDocumentation(apiUser)
</script>

<style scoped></style>