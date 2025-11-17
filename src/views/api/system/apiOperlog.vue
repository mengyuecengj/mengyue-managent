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

<script setup lang="ts">
import { apiOperlog } from '@/data/system/operlogApi'
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
} = useApiDocumentation(apiOperlog)
</script>
