<template>
  <div class="api-reference-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <MYText textColor="var(--general)" size="24px">
        {{ $t('apiReferenceModules.cache.title') }}
      </MYText>

      <div class="search-box">
        <MYInput 
          v-model="searchKeyword" 
          :placeholder="$t('apiReferenceCommon.searchPlaceholder')" 
          clearable
          prefix-icon="Search"
          style="width: 300px"
          placeholderColor="var(--navbar-text)"
          textColor="var(--navbar-text)"
        />

        <MYSelect 
          v-model="filterMethod" 
          :placeholder="$t('apiReferenceCommon.filterMethodPlaceholder')" 
          clearable
        >
          <MYOption label="GET" value="GET" />
          <MYOption label="POST" value="POST" />
          <MYOption label="PUT" value="PUT" />
          <MYOption label="DELETE" value="DELETE" />
        </MYSelect>

        <MYButton type="info" plain @click="resetQuery">
          {{ $t('apiReferenceCommon.resetButton') }}
        </MYButton>
      </div>
    </div>

    <!-- 主体 -->
    <div class="api-main-content">
      <!-- 左侧 -->
      <MYScrollbar height="100%">
        <div class="api-list-sidebar">
          <MYText textColor="var(--general)" class="sidebar-header">
            {{ $t('apiReferenceCommon.sidebarHeader') }}
          </MYText>

          <div class="api-items">
            <div
              v-for="api in filteredApis"
              :key="api.key"
              class="api-item"
              :class="{ active: selectedApi?.key === api.key }"
              @click="selectApi(api)"
            >
              <div class="api-method-tag" :class="getMethodType(api.method)">
                {{ api.method }}
              </div>

              <div class="api-info">
                <div class="api-url">{{ api.url }}</div>
                <div class="api-description">{{ api.description }}</div>
              </div>

              <MYButton
                plain
                v-if="api.requiresAuth"
                type="warning"
                size="small"
                class="auth-tag"
              >
                {{ $t('apiReferenceCommon.authRequired') }}
              </MYButton>
            </div>
          </div>
        </div>
      </MYScrollbar>

      <!-- 右侧 -->
      <div class="api-detail-content">
        <div v-if="selectedApi" class="api-detail">
          <!-- 头部 -->
          <div class="api-detail-header">
            <div class="method-tag-large" :class="getMethodType(selectedApi.method)">
              {{ selectedApi.method }}
            </div>

            <div class="api-main-info">
              <div class="api-url-large">{{ selectedApi.url }}</div>
              <div class="api-description-large">
                {{ selectedApi.description }}
              </div>
            </div>

            <MYButton
              plain
              v-if="selectedApi.requiresAuth"
              type="warning"
              size="large"
            >
              {{ $t('apiReferenceCommon.authRequired') }}
            </MYButton>
          </div>

          <!-- 基本信息 -->
          <div class="detail-section">
            <MYText textColor="var(--general)" size="20px" class="basic">
              {{ $t('apiReferenceCommon.basicInfo') }}
            </MYText>

            <div class="custom-table">
              <div class="table-row header">
                <div class="table-cell">
                  {{ $t('apiReferenceCommon.tableProperty') }}
                </div>
                <div class="table-cell-value">
                  {{ $t('apiReferenceCommon.tableValue') }}
                </div>
              </div>

              <div class="table-row">
                <div class="table-cell label">
                  {{ $t('apiReferenceCommon.interfaceDesc') }}
                </div>
                <div class="table-cell value">
                  {{ selectedApi.description }}
                </div>
              </div>

              <div class="table-row">
                <div class="table-cell label">
                  {{ $t('apiReferenceCommon.requestMethod') }}
                </div>
                <div class="table-cell value">
                  <span class="custom-tag method" :class="getMethodType(selectedApi.method)">
                    {{ selectedApi.method }}
                  </span>
                </div>
              </div>

              <div class="table-row">
                <div class="table-cell label">
                  {{ $t('apiReferenceCommon.interfacePath') }}
                </div>
                <div class="table-cell value">
                  <span class="api-path">{{ selectedApi.url }}</span>
                </div>
              </div>

              <div class="table-row">
                <div class="table-cell label">
                  {{ $t('apiReferenceCommon.authRequirement') }}
                </div>
                <div class="table-cell value">
                  <span
                    class="custom-tag auth"
                    :class="selectedApi.requiresAuth ? 'required' : 'not-required'"
                  >
                    <span class="tag-icon">
                      {{ selectedApi.requiresAuth ? '🔒' : '🔓' }}
                    </span>
                    {{
                      selectedApi.requiresAuth
                        ? $t('apiReferenceCommon.requiresAuth')
                        : $t('apiReferenceCommon.noAuth')
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 响应示例 -->
          <div class="detail-section">
            <MYText textColor="var(--general)" size="20px" class="basic">
              {{ $t('apiReferenceCommon.responseExample') }}
            </MYText>

            <div class="code-block">
              <pre><code class="language-json">
{{ generateResponseExample(selectedApi) }}
              </code></pre>
            </div>
          </div>

          <!-- 调用示例 -->
          <div class="detail-section">
            <MYText textColor="var(--general)" size="20px" class="basic">
              {{ $t('apiReferenceCommon.callExample') }}
            </MYText>

            <div class="code-block">
              <pre><code class="language-javascript">
{{ selectedApi.codeExample || generateRequestExample(selectedApi) }}
              </code></pre>
            </div>
          </div>

          <!-- 错误示例 -->
          <div class="detail-section" v-if="selectedApi.errorResponse">
            <MYText textColor="var(--general)" size="20px" class="basic">
              {{ $t('apiReferenceCommon.errorResponseExample') }}
            </MYText>

            <div class="code-block">
              <pre><code class="language-json">
{{ JSON.stringify(selectedApi.errorResponse, null, 2) }}
              </code></pre>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { apiCache } from '@/api-data/monitor/cacheApi'
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
} = useApiDocumentation(apiCache)
</script>
