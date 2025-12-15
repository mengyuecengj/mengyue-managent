<template>
    <div class="dashboard-description">
        <div class="create-dashboard" @click="open = true">
            <MYPlus size="30px" color="#8EEEFF" />
            <MYText Tecolor="#8EEEFF">新建大屏</MYText>
        </div>
        <div class="dashboard-list" v-for="item in dashboardData.list" :key="item.id">
            <MYButton @click="gotoEditor(item.id)" class="dashboard-button" type="primary">编辑</MYButton>
            <div class="dashboard-list-item">
                <div class="dashboard-item-left">
                    <MYText Tecolor="var(--general)">{{ item.name }}</MYText>
                </div>
                <div class="dashboard-item-right">
                    <MYDelete size="16px" color="var(--general)" @click="delDashboard(item)" />
                </div>
            </div>
        </div>
        <MYDialog title="新建大屏" v-model="open" height="300px" width="450px" backgroundColor="#0c1115 !important">
            <MYForm v-model="form" class="dialog_form" label-width="80">
                <MYForm-item>
                    <MYText Tecolor="var(--general)">大屏名称</MYText>
                    <MYInput v-model="form.dashboardName" class="dashboard-input" width="300px" placeholder="请输入大屏名称" />
                </MYForm-item>
                <MYForm-item>
                    <MYText Tecolor="var(--general)">大屏描述</MYText>
                    <MYInput v-model="form.dashboardDesc" class="dashboard-input" width="300px"
                        placeholder="请输入大屏基本描述" />
                </MYForm-item>
            </MYForm>
            <template #footer>
                <div class="dashboard-dialog-button">
                    <MYButton type="primary" @click="addhandle">确 定</MYButton>
                    <MYButton type="info" @click="open = false">取 消</MYButton>
                </div>
            </template>
        </MYDialog>
    </div>
</template>

<script setup lang="ts">
import { getDashboardList, addDashboard, deleteDashboard, type DashboardItem } from '@/api/dashboard/dashboard';
import { useDashboardStore } from '@/store/modules/dashboard';
import modal from '@/plugins/modal';

interface DashboardData {
    list: DashboardItem[];
    total: number;
}

const open = ref(false);
const loading = ref(false);
const router = useRouter();
const dashboardData = ref<DashboardData>({
    list: [],
    total: 0
});
const dashbaordStore = useDashboardStore();
const route = useRoute();

const form = reactive({
    dashboardName: '',
    dashboardDesc: ''
})

const dashboardList = async (params = {}) => {
    try {
        loading.value = true;
        const res = await getDashboardList(params);

        if (res.code === 200) {
            dashboardData.value.list = res.rows;
            dashboardData.value.total = res.total;
        }
    } catch (e) {
        ElMessage.error('获取大屏列表失败');
    } finally {
        loading.value = false;
    }
}
dashboardList();

const addhandle = async () => {
    if (!form.dashboardName.trim()) {
        ElMessage.warning('请填写大屏名称')
        return
    }

    try {
        // 关键修复：明确传字段，不要传整个 form！
        const res = await addDashboard({
            dashboardName: form.dashboardName.trim(),
            dashboardDesc: form.dashboardDesc
        })

        if (res.code === 200) {
            ElMessage.success('创建成功')
            await dashboardList()     // 刷新列表
            open.value = false
            form.dashboardName = ''
            form.dashboardDesc = ''
        }
    } catch (err) {
        ElMessage.error('创建失败')
    }
}

const delDashboard = (row: any) => {
    if (loading.value) return;

    loading.value = true;

    try {
        const dashboardId = row?.id;
        modal.confirm(`是否确认删除编号为"${dashboardId}"的数据项?`).then(() => {
            return deleteDashboard(dashboardId);
        }).then(() => {
            dashboardList();
            modal.msgSuccess('删除成功');
        }).catch(() => { });
    } finally {
        setTimeout(() => {
            loading.value = false;
        }, 500);
    }
}
const gotoEditor = (id: number) => {
    const dashboardId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    dashbaordStore.loadDashboard(dashboardId);
    dashbaordStore.restoreDashboard(dashboardId);
    router.push({
        name: 'DashboardEditor',
        params: { id: id.toString() }
    });
};
</script>
