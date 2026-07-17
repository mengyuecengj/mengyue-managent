<template>
    <div class="error-page">
        <div class="error-content">
            <!-- <h1>404</h1> -->
            <MYResult icon='error' />
            <p>{{ $t('error.back') }}</p>
            <MYButton type="primary" @click="goBack">
                {{ $t('error.title') }}
            </MYButton>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => router.back()
</script>

<style lang="scss" scoped>
.error-page {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;
    background: var(--navbar-hover-bg);

    .error-content {
        text-align: center;

        h1 {
            font-size: 80px;
            margin: 0;
            color: #999;
        }

        p {
            margin: 20px 0;
            color: #666;
        }
    }
}
</style>