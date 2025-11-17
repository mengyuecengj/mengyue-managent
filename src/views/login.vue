<template>
    <div class="login-app">
        <!-- 背景装饰 -->
        <div class="background-decor">
            <!-- SVG 网格 -->
            <svg class="grid" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#smallGrid)" />
            </svg>
        </div>

        <!-- 左侧介绍 -->
        <div class="left-container">
            <MYText type="info" size="36px" class="brand-title">
                MengYue低代码平台
            </MYText>
            <MYText type="default" size="20px" class="brand-subtitle">
                建筑未来 · 码力全开
            </MYText>
            <MYText type="default" size="16px" class="brand-desc">
                简筑未来应用，低码引擎驱动创造力；<br />
                可视化搭建无门槛，让每个人都可以搭积木式开发，创无限可能。
            </MYText>
        </div>

        <!-- 右侧登录卡片 -->
        <div class="right-container">
            <div class="login-box">
                <div class="login-title">
                    <MYText type="default" size="24px">MengYue低代码平台</MYText>
                </div>

                <MYForm class="form" ref="formRef" :rules="loginrules" :modelValue="formData">
                    <div class="form-item">
                        <MYForm-item prop="username" class="horizontal-item">
                            <div class="input-row">
                                <MYText type="default" class="form-label">账号</MYText>
                                <MYInput placeholder="请输入用户名" width="100%" class="form-input" auto-complete="off"
                                    v-model="formData.username" @blur="() => formRef?.validateField('username')" />
                            </div>
                        </MYForm-item>
                    </div>
                    <div class="form-item">
                        <MYForm-item prop="password" class="horizontal-item">
                            <div class="input-row">
                                <MYText type="default" class="form-label">密码</MYText>
                                <MYInput placeholder="请输入密码" type="password" width="100%" class="form-input"
                                    auto-complete="off" v-model="formData.password"
                                    @blur="() => formRef?.validateField('password')" />
                            </div>
                        </MYForm-item>
                    </div>
                    <div class="form-item">
                        <MYForm-item prop="code" class="horizontal-item">
                            <div class="input-row">
                                <MYText type="default" class="form-label">验证码</MYText>
                                <div class="code-wrapper">
                                    <MYInput placeholder="请输入验证码" width="100%" class="form-input"
                                        v-model="formData.code" auto-complete="off" @keyup.enter="login"
                                        @blur="() => formRef?.validateField('code')" />
                                    <div class="code-img">
                                        <span>0000</span> <!-- 临时静态，稍后动态 -->
                                    </div>
                                </div>
                            </div>
                        </MYForm-item>
                    </div>
                    <div class="form-item">
                        <MYButton type="primary" class="login-button-style" @click.prevent="login">登录</MYButton>
                    </div>
                </MYForm>
            </div>
        </div>

        <!-- 粒子容器 -->
        <ul class="particles">
            <li v-for="n in 15" :key="n"></li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import usePermissionStore from '@/store/modules/permission';

const route = useRoute();
const router = useRouter();
const formRef = ref();
const loading = ref(false);
const redirect = ref(undefined);
const loginStore = useUserStore();

const formData = ref({
    username: "",
    password: "",
    code: "",
    uuid: "", // 模拟 mock 返回的 uuid
})

const loginrules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
};

async function login() {
    if (!formRef.value) return;

    try {
        await formRef.value.validate();

        // 验证通过后的逻辑
        loading.value = true;

        loginStore.login(formData.value)
            .then(() => {
                const redirectPath = route.query.redirect as string;
                if (redirectPath && redirectPath !== '/logout') {
                    router.push(redirectPath);
                } else {
                    router.push("/");
                }
            })
            .catch((error) => {
                console.error('Login error:', error);
                loading.value = false;
            });
    } catch (error) {
        // 验证失败的处理
    }
}
</script>

<style lang="scss" scoped>
.login-app {
    height: 100vh;
    width: 100vw;
    display: flex;
    background: linear-gradient(135deg, #0d1117, #161b22);
    position: relative;
    overflow: hidden;
}

/* 背景装饰 */
.background-decor {
    position: absolute;
    inset: 0;
    z-index: 0;

    .grid {
        width: 200%;
        height: 200%;
        animation: gridMove 30s linear infinite;
    }

    /* 左上角光晕 */
    &::before {
        content: "";
        position: absolute;
        top: -120px;
        left: -120px;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: rgba(56, 189, 248, 0.08);
        filter: blur(100px);
        animation: pulse 8s ease-in-out infinite;
    }

    /* 右下角光晕 */
    &::after {
        content: "";
        position: absolute;
        bottom: -120px;
        right: -120px;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: rgba(139, 92, 246, 0.08);
        filter: blur(100px);
        animation: pulse 10s ease-in-out infinite alternate;
    }
}

/* 粒子 */
.particles {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    list-style: none;

    li {
        position: absolute;
        display: block;
        width: 6px;
        height: 6px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        bottom: -20px;
        animation: floatUp 15s linear infinite;
    }

    /* 随机位置 & 延迟 */
    li:nth-child(1) {
        left: 10%;
        animation-duration: 12s;
        animation-delay: 0s;
    }

    li:nth-child(2) {
        left: 20%;
        animation-duration: 18s;
        animation-delay: 2s;
    }

    li:nth-child(3) {
        left: 30%;
        animation-duration: 14s;
        animation-delay: 4s;
    }

    li:nth-child(4) {
        left: 40%;
        animation-duration: 20s;
        animation-delay: 1s;
    }

    li:nth-child(5) {
        left: 50%;
        animation-duration: 16s;
        animation-delay: 3s;
    }

    li:nth-child(6) {
        left: 60%;
        animation-duration: 22s;
        animation-delay: 5s;
    }

    li:nth-child(7) {
        left: 70%;
        animation-duration: 19s;
        animation-delay: 0s;
    }

    li:nth-child(8) {
        left: 80%;
        animation-duration: 15s;
        animation-delay: 6s;
    }

    li:nth-child(9) {
        left: 90%;
        animation-duration: 21s;
        animation-delay: 4s;
    }

    li:nth-child(10) {
        left: 25%;
        animation-duration: 17s;
        animation-delay: 2s;
    }

    li:nth-child(11) {
        left: 35%;
        animation-duration: 14s;
        animation-delay: 5s;
    }

    li:nth-child(12) {
        left: 55%;
        animation-duration: 19s;
        animation-delay: 1s;
    }

    li:nth-child(13) {
        left: 65%;
        animation-duration: 13s;
        animation-delay: 3s;
    }

    li:nth-child(14) {
        left: 75%;
        animation-duration: 22s;
        animation-delay: 6s;
    }

    li:nth-child(15) {
        left: 85%;
        animation-duration: 18s;
        animation-delay: 4s;
    }
}

@keyframes floatUp {
    0% {
        transform: translateY(0) scale(1);
        opacity: 0.8;
    }

    50% {
        opacity: 1;
        transform: translateY(-50vh) scale(1.2);
    }

    100% {
        transform: translateY(-100vh) scale(0.8);
        opacity: 0;
    }
}

/* 动效 - 背景光晕呼吸 */
@keyframes pulse {
    0% {
        transform: scale(1);
        opacity: 0.6;
    }

    50% {
        transform: scale(1.2);
        opacity: 1;
    }

    100% {
        transform: scale(1);
        opacity: 0.6;
    }
}

/* 动效 - 网格轻微流动 */
@keyframes gridMove {
    from {
        transform: translate(0, 0);
    }

    to {
        transform: translate(-100px, -100px);
    }
}

.left-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 8%;
    color: #f3f4f6;
    line-height: 1.8;
    z-index: 1;

    .brand-title {
        font-weight: bold;
        margin-bottom: 20px;
        color: #60a5fa;
    }

    .brand-subtitle {
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: 500;
        color: #e5e7eb;
    }

    .brand-desc {
        line-height: 1.6;
        opacity: 0.8;
        color: #9ca3af;
    }
}

.right-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;

    .login-box {
        width: 400px;
        padding: 40px;
        background: #1f2937;
        border-radius: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        animation: fadeInUp 0.6s ease;

        .login-title {
            text-align: center;
            margin-bottom: 30px;
            font-weight: bold;
        }

        .form {
            background-color: transparent;
        }

        .form-item {
            margin-bottom: 20px;
        }

        .horizontal-item {
            :deep(.my-form-item__content) {
                align-items: center;
            }
        }

        .input-row {
            display: flex;
            align-items: center;
            width: 100%;
        }

        .form-label {
            width: 70px;
            color: #d1d5db;
            font-weight: 500;
            margin-right: 10px;
            flex-shrink: 0;
        }

        .form-input {
            flex: 1;
        }

        .code-wrapper {
            display: flex;
            align-items: center;
            width: 100%;

            .form-input {
                flex: 1;
                margin-right: 10px;
            }

            .code-img {
                width: 80px;
                height: 36px;
                background: #374151;
                border-radius: 6px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: bold;
                color: #f9fafb;
                user-select: none;
                cursor: pointer;
            }
        }

        .login-button-style {
            width: 370px;
            height: 42px;
            font-size: 16px;
            border-radius: 8px;
            margin-left: 10px;
        }
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
