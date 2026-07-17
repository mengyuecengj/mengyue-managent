<template>
  <div class="api-reference-container">
    <!-- 标题 -->
    <div class="page-header">
      <MYText textColor="var(--general)" size="24px">
        {{ tModule('title') }}
      </MYText>

      <div class="search-box">
        <MYInput
          v-model="searchKeyword"
          :placeholder="tCommon('searchPlaceholder')"
          clearable
          prefix-icon="Search"
          style="width: 300px"
          placeholderColor="var(--navbar-text)"
          textColor="var(--navbar-text)"
        />

        <MYSelect
          v-model="filterMethod"
          :placeholder="tCommon('filterMethodPlaceholder')"
          clearable
        >
          <MYOption label="GET" value="GET" />
          <MYOption label="POST" value="POST" />
          <MYOption label="PUT" value="PUT" />
          <MYOption label="DELETE" value="DELETE" />
        </MYSelect>

        <MYButton type="info" plain @click="resetQuery">
          {{ tCommon('resetButton') }}
        </MYButton>
      </div>
    </div>

    <!-- 主体 -->
    <div class="api-main-content">
      <MYScrollbar height="100%">
        <div class="api-list-sidebar">
          <MYText textColor="var(--general)" class="sidebar-header">
            {{ tCommon('sidebarHeader') }}
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
                <div class="api-description">
                  {{ getDesc(api.description) }}
                </div>
              </div>

              <MYButton
                plain
                v-if="api.requiresAuth"
                type="warning"
                size="small"
                class="auth-tag"
              >
                {{ tCommon('authRequired') }}
              </MYButton>
            </div>
          </div>
        </div>
      </MYScrollbar>

      <!-- 右侧 -->
      <div class="api-detail-content">
        <div v-if="selectedApi" class="api-detail">
          <div class="api-detail-header">
            <div class="method-tag-large" :class="getMethodType(selectedApi.method)">
              {{ selectedApi.method }}
            </div>

            <div class="api-main-info">
              <div class="api-url-large">{{ selectedApi.url }}</div>
              <div class="api-description-large">
                {{ getDesc(selectedApi.description) }}
              </div>
            </div>

            <MYButton
              plain
              v-if="selectedApi.requiresAuth"
              type="warning"
              size="large"
            >
              {{ tCommon('authRequired') }}
            </MYButton>
          </div>

          <!-- 基本信息 -->
          <div class="detail-section">
            <MYText textColor="var(--general)" size="20px" class="basic">
              {{ tCommon('basicInfo') }}
            </MYText>

            <div class="custom-table">
              <div class="table-row header">
                <div class="table-cell">{{ tCommon('tableProperty') }}</div>
                <div class="table-cell-value">{{ tCommon('tableValue') }}</div>
              </div>

              <div class="table-row">
                <div class="table-cell label">
                  {{ tCommon('interfaceDesc') }}
                </div>
                <div class="table-cell value">
                  {{ getDesc(selectedApi.description) }}
                </div>
              </div>

              <div class="table-row">
                <div class="table-cell label">
                  {{ tCommon('requestMethod') }}
                </div>
                <div class="table-cell value">
                  <span class="custom-tag method" :class="getMethodType(selectedApi.method)">
                    {{ selectedApi.method }}
                  </span>
                </div>
              </div>

              <div class="table-row">
                <div class="table-cell label">
                  {{ tCommon('interfacePath') }}
                </div>
                <div class="table-cell value">
                  <span class="api-path">{{ selectedApi.url }}</span>
                </div>
              </div>

              <div class="table-row">
                <div class="table-cell label">
                  {{ tCommon('authRequirement') }}
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
                        ? tCommon('requiresAuth')
                        : tCommon('noAuth')
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 响应 -->
          <div class="detail-section">
            <MYText textColor="var(--general)" size="20px" class="basic">
              {{ tCommon('responseExample') }}
            </MYText>

            <div class="code-block">
              <pre><code class="language-json">
{{ generateResponseExample(selectedApi) }}
              </code></pre>
            </div>
          </div>

          <!-- 调用 -->
          <div class="detail-section">
            <MYText textColor="var(--general)" size="20px" class="basic">
              {{ tCommon('callExample') }}
            </MYText>

            <div class="code-block">
              <pre><code class="language-javascript">
{{ selectedApi.codeExample || generateRequestExample(selectedApi) }}
              </code></pre>
            </div>
          </div>

          <!-- 错误 -->
          <div class="detail-section" v-if="selectedApi.errorResponse">
            <MYText textColor="var(--general)" size="20px" class="basic">
              {{ tCommon('errorResponseExample') }}
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
import { useI18n } from 'vue-i18n'
import { apiUser } from '@/api-data/system/userApi'
import { useApiDocumentation } from '@/hooks/useApiDocumentation'

const module = 'user'

// i18n
const { t, locale } = useI18n()

// 🔥 封装翻译方法（核心优化点）
const tCommon = (key: string) => t(`apiReferenceCommon.${key}`)
const tModule = (key: string) => t(`apiReferenceModules.${module}.${key}`)

// 🔥 支持 description 多语言（高级优化）
const getDesc = (desc: any) => {
  if (typeof desc === 'object') {
    return desc[locale.value] || desc['zh']
  }
  return desc
}

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