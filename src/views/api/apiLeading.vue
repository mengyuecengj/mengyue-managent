<template>
    <div class="api-guide-container">
        <div class="guide-header">
            <h1 class="guide-title">API 文档使用指南</h1>
        </div>

        <div class="guide-content">
            <!-- 快速开始 -->
            <section class="guide-section">
                <h2 class="section-title">🚀 快速开始</h2>
                <div class="section-content">
                    <p>本系统已配置完整的 Axios 请求拦截器、响应拦截器和错误处理机制。您可以直接使用预设的实例进行 API 调用。</p>

                    <div class="code-block">
                        <pre><code class="language-javascript">// 导入配置好的 axios 实例
import request from '@/utils/request'
</code></pre>
                    </div>
                </div>
            </section>

            <!-- 响应处理 -->
            <section class="guide-section">
                <h2 class="section-title">📨 响应处理</h2>
                <div class="section-content">
                    <div class="response-examples">
                        <div class="example-item success">
                            <h4>成功响应 (code: 200)</h4>
                            <div class="code-block">
                                <pre><code class="language-json">{
  "code": 200,
  "message": "操作成功",
  "data": {
    "id": 1,
    "name": "示例数据"
  }
}</code></pre>
                            </div>
                        </div>

                        <div class="example-item error">
                            <h4>错误响应 (code: 500)</h4>
                            <div class="code-block">
                                <pre><code class="language-json">{
  "code": 500,
  "message": "服务器内部错误"
}</code></pre>
                            </div>
                        </div>

                        <div class="example-item auth">
                            <h4>认证失败 (code: 401)</h4>
                            <div class="code-block">
                                <pre><code class="language-json">{
  "code": 401,
  "message": "无效的会话"
}</code></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 最佳实践 -->
            <section class="guide-section">
                <h2 class="section-title">🎯 最佳实践</h2>
                <div class="section-content">
                    <div class="best-practices">
                        <div class="practice-item">
                            <h4>✅ 统一错误处理</h4>
                            <p>使用 try-catch 包装所有 API 调用，确保错误被正确捕获和处理</p>
                        </div>
                        <div class="practice-item">
                            <h4>✅ 参数验证</h4>
                            <p>在调用 API 前验证必要参数，避免无效请求</p>
                        </div>
                        <div class="practice-item">
                            <h4>✅ 用户反馈</h4>
                            <p>重要的操作（创建、更新、删除）提供成功/失败的用户提示</p>
                        </div>
                        <div class="practice-item">
                            <h4>✅ 加载状态</h4>
                            <p>长时间操作显示加载状态，提升用户体验</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 开始使用按钮 -->
            <div class="action-section">
                <p class="action-hint">详细请查看该后台系统的开发文档：链接</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('basic')

const tabs = [
    { id: 'basic', label: 'GET 请求' },
    { id: 'post', label: 'POST 请求' },
    { id: 'put', label: 'PUT 请求' },
    { id: 'delete', label: 'DELETE 请求' }
]
</script>

<style scoped>
.api-guide-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 24px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
}

.guide-header {
    color: white;
}

.guide-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 16px;
    background: linear-gradient(45deg, #fff, #e3f2fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.guide-subtitle {
    font-size: 1.25rem;
    opacity: 0.9;
    margin: 0;
}

.guide-section {
    margin-bottom: 60px;
    border-radius: 12px;
    padding: 32px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.section-title {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 24px;
    color: #2c3e50;
    display: flex;
    align-items: center;
    gap: 12px;
}

.section-content {
    font-size: 1.1rem;
    color: #555;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-top: 24px;
}

.feature-card {
    background: #f8fafc;
    padding: 24px;
    border-radius: 12px;
    border-left: 4px solid #667eea;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.feature-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.feature-icon {
    font-size: 2rem;
    margin-bottom: 12px;
}

.feature-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #2c3e50;
}

.feature-card p {
    color: #666;
    margin: 0;
}

.response-examples {
    display: grid;
    gap: 20px;
}

.example-item {
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid;
}

.example-item.success {
    background: #f0f9ff;
    border-left-color: #10b981;
}

.example-item.warning {
    background: #fffbeb;
    border-left-color: #f59e0b;
}

.example-item.error {
    background: #fef2f2;
    border-left-color: #ef4444;
}

.example-item.auth {
    background: #fff7ed;
    border-left-color: #ea580c;
}

.example-item h4 {
    margin-top: 0;
    margin-bottom: 12px;
    font-weight: 600;
}

.usage-examples {
    margin-top: 24px;
}

.tabs {
    display: flex;
    background: #f8fafc;
    border-radius: 8px;
    padding: 4px;
    margin-bottom: 24px;
}

.tab-button {
    flex: 1;
    padding: 12px 16px;
    border: none;
    background: transparent;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
}

.tab-button.active {
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    color: #667eea;
}

.tab-panel h4 {
    margin-top: 0;
    margin-bottom: 16px;
    color: #2c3e50;
}

.best-practices {
    display: grid;
    gap: 20px;
}

.practice-item {
    padding: 20px;
    background: #f0fdf4;
    border-radius: 8px;
    border-left: 4px solid #10b981;
}

.practice-item h4 {
    margin-top: 0;
    margin-bottom: 8px;
    color: #065f46;
}

.practice-item p {
    margin: 0;
    color: #047857;
}

.action-section {
    text-align: center;
    padding: 40px;
    border-radius: 16px;
    margin-top: 40px;
}

.action-hint {
    margin-top: 16px;
    color: #64748b;
    font-size: 0.95rem;
}

.code-block {
    background: #1a1a1a;
    border-radius: 8px;
    padding: 20px;
    overflow-x: auto;
    margin: 16px 0;
}

.code-block pre {
    margin: 0;
    color: #f8fafc;
    font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
}

code {
    background: #f1f5f9;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Monaco', 'Consolas', monospace;
    color: #e11d48;
    font-size: 0.9em;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .api-guide-container {
        padding: 20px 16px;
    }

    .guide-title {
        font-size: 2rem;
    }

    .guide-section {
        padding: 24px 16px;
    }

    .feature-grid {
        grid-template-columns: 1fr;
    }

    .tabs {
        flex-direction: column;
    }
}
</style>

<style>
/* 代码高亮样式 */
.language-javascript .token.keyword {
    color: #c678dd;
}

.language-javascript .token.function {
    color: #61afef;
}

.language-javascript .token.string {
    color: #98c379;
}

.language-javascript .token.comment {
    color: #5c6370;
}

.language-javascript .token.number {
    color: #d19a66;
}

.language-javascript .token.operator {
    color: #56b6c2;
}

.language-json .token.property {
    color: #e06c75;
}

.language-json .token.string {
    color: #98c379;
}

.language-json .token.number {
    color: #d19a66;
}
</style>