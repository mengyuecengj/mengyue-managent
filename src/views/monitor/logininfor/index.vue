<template>
    <div class="app-container">
        <MYRow :gutter="20">
            <MYForm :modelValue="queryParams" ref="queryRef" v-show="showSearch" :inline="true" labelWidth="68">
                <MYRow :gutter="24">
                    <MYCol :span="8">
                        <MYForm-item :label="t('system.logininfor.loginAddress')" prop="ipaddr">
                            <MYInput v-model="queryParams.ipaddr" :placeholder="t('system.logininfor.placeholder.loginAdress')" clearable
                                @keyup.enter="handleQuery" placeholderColor="var(--navbar-text)"
                                textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>

                    <MYCol :span="8">
                        <MYForm-item :label="t('system.logininfor.userName')" prop="userName">
                            <MYInput v-model="queryParams.userName" :placeholder="t('system.logininfor.placeholder.userName')" clearable
                                @keyup.enter="handleQuery" placeholderColor="var(--navbar-text)"
                                textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>

                    <MYCol :span="7">
                        <MYForm-item :label="t('system.logininfor.status')" prop="status">
                            <MYSelect v-model="queryParams.status" :placeholder="t('system.logininfor.status')" clearable>
                                <MYOption v-for="dict in sys_common_status" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </MYSelect>
                        </MYForm-item>
                    </MYCol>

                    <MYCol :span="2.5">
                        <MYForm-item>
                            <MYButton type="primary" icon="MYSearch" @click="handleQuery">{{ t('system.user.query.search') }}</MYButton>
                        </MYForm-item>
                    </MYCol>

                    <MYCol :span="1">
                        <MYForm-item>
                            <MYButton type="info" icon="MYRefreshRight" @click="resetQuery">{{ t('system.user.query.reset') }}</MYButton>
                        </MYForm-item>
                    </MYCol>
                </MYRow>
            </MYForm>
        </MYRow>
        <MYRow :gutter="10" class="mb8">
            <MYCol :span="2.5">
                <MYButton type="danger" icon="MYDelete" :disabled="multiple" @click="handleDelete"
                    v-hasPermi="['monitor:logininfor:remove']">{{ t('system.user.button.delete') }}</MYButton>
            </MYCol>
            <MYCol :span="2">
                <MYButton type="danger" icon="MYDelete" @click="handleClean" v-hasPermi="['monitor:logininfor:remove']">
                    {{ t('system.logininfor.clean') }}</MYButton>
            </MYCol>
            <!-- <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar> -->
        </MYRow>
        <MYTable row-key="infoId" headerBackgroundColor="var(--table-header-bg)" borderColor="var(--table-border-color)"
            bodyBackgroundColor="var(--table-body-bg)" headerTextColor="var(--general)" bodyTextColor="var(--general)"
            ref="logininforRef" v-loading="loading" :data="logininforList" @selection-change="handleSelectionChange"
            :default-sort="defaultSort" @sort-change="handleSortChange" table-layout="fixed">
            <MYTableColumn type="selection" width="60" align="center" />
            <MYTableColumn :label="t('system.logininfor.accessId')" align="center" prop="infoId" width="100" />
            <MYTableColumn :label="t('system.logininfor.userName')" align="center" prop="userName" width="120" :show-overflow-tooltip="true"
                sortable="custom" />
            <MYTableColumn :label="t('system.logininfor.loginAddress')" align="center" prop="ipaddr" width="120" :show-overflow-tooltip="true" />
            <MYTableColumn :label="t('system.logininfor.loginLocation')" align="center" prop="loginLocation" width="120" :show-overflow-tooltip="true" />
            <MYTableColumn :label="t('system.logininfor.os')" align="center" prop="os" width="120" :show-overflow-tooltip="true" />
            <MYTableColumn :label="t('system.logininfor.browser')" align="center" prop="browser" width="120" />
            <MYTableColumn :label="t('system.logininfor.loginStatus')" align="center" prop="status" width="100" />
            <template #status="scope">
                <dict-tag :options="sys_common_status" :value="scope.row.status" />
            </template>
            <MYTableColumn :label="t('system.logininfor.description')" align="center" prop="msg" width="150" :show-overflow-tooltip="true" />
            <MYTableColumn :label="t('system.logininfor.accessTime')" align="center" prop="loginTime" width="180" sortable="custom">
                <template #default="scope">
                    <span>{{ parseTime(scope.row.loginTime) }}</span>
                </template>
            </MYTableColumn>
        </MYTable>
        <pagination class="pagination-container" v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
            v-model:limit="queryParams.pageSize" @pagination="getList" />
    </div>
</template>

<script setup lang="ts" name="logininfor">
import { parseTime } from '@/utils/general';
import { list, delLogininfor, cleanLogininfor, unlockLogininfor } from '@/api/monitor/logininfor';
import modal from '@/plugins/modal';
import { useI18n } from 'vue-i18n';

const { proxy } = getCurrentInstance() as any;
const { sys_common_status } = proxy.useDict('sys_common_status');
const { t } = useI18n();
const logininforList = ref([]);
const loading = ref<boolean>(true);
const showSearch = ref<boolean>(true);
const ids = ref([]);
const single = ref<boolean>(true);
const multiple = ref<boolean>(true);
const selectName = ref("");
const total = ref<number>(0);
const dateRange = ref([]);
const defaultSort = { prop: 'loginTime', order: 'descending' } as any;

const initQueryParams = {
    pageNum: 1,
    pageSize: 10,
    ipaddr: undefined,
    userName: undefined,
    status: undefined,
    orderByColumn: undefined,
    isAsc: undefined
}

// 查询参数
const queryParams = ref({
    pageNum: 1,
    pageSize: 10,
    ipaddr: undefined,
    userName: undefined,
    status: undefined,
    orderByColumn: undefined,
    isAsc: undefined
})

// 查询登录日志列表
function getList() {
    loading.value = true;
    list(proxy.addDateRange(queryParams.value, dateRange.value)).then((res: any) => {
        logininforList.value = res.rows;
        total.value = res.total;
        loading.value = false;
    })
}

// 搜索按钮操作
function handleQuery() {
    queryParams.value.pageNum = 1;
    getList();
}

// 重置按钮操作
function resetQuery() {
    dateRange.value = [];
    // 重置查询参数为初始值
    Object.assign(queryParams.value, initQueryParams);
    // 如果有表单引用，也重置表单
    if (proxy.$refs.queryRef) {
        proxy.$refs.queryRef.resetFields();
    }
    handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection: any) {
    ids.value = selection.map((item: any) => item.infoId);
    multiple.value = !selection.length;
    single.value = selection.length != 1;
    selectName.value = selection.map((item: any) => item.userName);
}

// 排序触发事件
function handleSortChange({ column, prop, order }: any) {
    queryParams.value.orderByColumn = column.prop;
    queryParams.value.isAsc = column.order;
    if (["loginTime"].includes(prop)) {
        getList();
    }
}

// 删除按钮操作
function handleDelete(row: any) {
    const infoIds = row.infoId || ids.value;
    modal.confirm('是否确认删除登录编号为"' + infoIds + '"的数据项?',).then(() => {
        return delLogininfor(infoIds);
    }).then(() => {
        getList();
        modal.msgSuccess("删除成功");
    }).catch(() => { })
}

// 清空按钮操作
function handleClean() {
    modal.confirm("是否确认清空所有登录日志数据项?",).then(() => {
        return cleanLogininfor();
    }).then(() => {
        getList();
        modal.msgSuccess("清空成功");
    }).catch(() => { })
}

// 解锁按钮操作
function handleUnlock() {
    const username = selectName.value;
    proxy.$modal.confirm('是否确认解锁用户"' + username + '"数据项?',).then(() => {
        return unlockLogininfor(username);
    }).then(() => {
        proxy.$modal.msgSuccess("用户" + username + "解锁成功");
    }).catch(() => { })
}

onMounted(() => {
    getList();
})
</script>
