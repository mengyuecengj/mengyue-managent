<template>
    <div class="dashboard-description">
        <div class="create-dashboard" @click="open = true">
            <MYPlus size="30px" color="#8EEEFF" />
            <MYText textColor="#8EEEFF">{{ $t('dashboard.design.newDashboard') }}</MYText>
        </div>
        <div class="dashboard-list" v-for="item in dashboardData.list" :key="item.id">
            <MYButton @click="gotoEditor(item.id)" class="dashboard-button" type="primary">{{ $t('dashboard.design.edit') }}</MYButton>
            <div class="dashboard-list-item">
                <div class="dashboard-item-left">
                    <MYText textColor="var(--general)">{{ item.name }}</MYText>
                </div>
                <div class="dashboard-item-right">
                    <MYDelete size="16px" color="var(--general)" @click="delDashboard(item)" />
                </div>
            </div>
        </div>
        <MYDialog :title="$t('dashboard.design.newDashboard')" v-model="open" height="350px" width="450px" backgroundColor="#0c1115 !important">
            <MYForm v-model="form" class="dialog_form" label-width="80">
                <MYForm-item>
                    <MYText textColor="var(--general)">{{ $t('dashboard.design.dashboardName') }}</MYText>
                    <MYInput v-model="form.dashboardName" class="dashboard-input" width="300px" :placeholder="$t('dashboard.design.placeholderName')" />
                </MYForm-item>
                <MYForm-item>
                    <MYText textColor="var(--general)">{{ $t('dashboard.design.dashboardDesc') }}</MYText>
                    <MYInput v-model="form.dashboardDesc" class="dashboard-input" width="300px"
                        :placeholder="$t('dashboard.design.placeholderDesc')" />
                </MYForm-item>
            </MYForm>
            <template #footer>
                <div class="dashboard-dialog-button">
                    <MYButton type="primary" @click="addhandle">{{ $t('dashboard.design.confirm') }}</MYButton>
                    <MYButton type="info" @click="open = false">{{ $t('dashboard.design.cancel') }}</MYButton>
                </div>
            </template>
        </MYDialog>
    </div>
</template>

<script setup lang="ts">
import { getDashboardList, addDashboard, deleteDashboard, type DashboardItem } from '@/api/dashboard/dashboard';
import { useDashboardStore } from '@/store/modules/dashboard';
import modal from '@/plugins/modal';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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
        ElMessage.error(t('message.getListFailed'));
    } finally {
        loading.value = false;
    }
}
dashboardList();

const addhandle = async () => {
    if (!form.dashboardName.trim()) {
        ElMessage.warning(t('message.pleaseFillName'))
        return
    }

    try {
        const res = await addDashboard({
            dashboardName: form.dashboardName.trim(),
            dashboardDesc: form.dashboardDesc
        })

        if (res.code === 200) {
            ElMessage.success(t('message.createSuccess'))
            await dashboardList()
            open.value = false
            form.dashboardName = ''
            form.dashboardDesc = ''
        }
    } catch (err) {
        ElMessage.error(t('message.createFailed'))
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
            modal.msgSuccess(t('message.deleteSuccess'));
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