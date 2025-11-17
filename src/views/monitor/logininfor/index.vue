<template>
    <div class="app-container">
        <MYRow :gutter="20">
            <MYForm :modelValue="queryParams" ref="queryRef" v-show="showSearch" :inline="true" labelWidth="68">
                <MYRow :gutter="16">
                    <!-- 角色名称 -->
                    <MYCol :span="6">
                        <MYForm-item label="登录地址" prop="ipaddr">
                            <MYInput v-model="queryParams.ipaddr" placeholder="请输入登录地址" clearable
                                @keyup.enter="handleQuery" placeholderColor="var(--navbar-text)"
                                textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>

                    <!-- 权限字符 -->
                    <MYCol :span="6">
                        <MYForm-item label="用户名称" prop="userName">
                            <MYInput v-model="queryParams.userName" placeholder="请输入用户名称" clearable
                                @keyup.enter="handleQuery" placeholderColor="var(--navbar-text)"
                                textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>

                    <!-- 状态 -->
                    <MYCol :span="7">
                        <MYForm-item label="状态" prop="status">
                            <MYSelect v-model="queryParams.status" placeholder="状态" clearable>
                                <MYOption v-for="dict in sys_common_status" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </MYSelect>
                        </MYForm-item>
                    </MYCol>

                    <!-- 搜索按钮 -->
                    <MYCol :span="2">
                        <MYForm-item>
                            <MYButton type="primary" icon="MYSearch" @click="handleQuery">搜索</MYButton>
                        </MYForm-item>
                    </MYCol>

                    <!-- 重置按钮 -->
                    <MYCol :span="1">
                        <MYForm-item>
                            <MYButton type="info" icon="MYRefreshRight" @click="resetQuery">重置</MYButton>
                        </MYForm-item>
                    </MYCol>
                </MYRow>
            </MYForm>
        </MYRow>
        <MYRow :gutter="10" class="mb8">
            <MYCol :span="2">
                <MYButton type="danger" icon="MYDelete" :disabled="multiple" @click="handleDelete"
                    v-hasPermi="['monitor:logininfor:remove']">删除</MYButton>
            </MYCol>
            <MYCol :span="2">
                <MYButton type="danger" icon="MYDelete" @click="handleClean" v-hasPermi="['monitor:logininfor:remove']">
                    清空</MYButton>
            </MYCol>
            <!-- <MYCol :span="2">
                <MYButton type="primary" icon="MYUnlock" :disabled="single" @click="handleUnlock"
                    v-hasPermi="['monitor:logininfor:unlock']">解锁</MYButton>
            </MYCol> -->
            <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </MYRow>
        <MYTable row-key="infoId" headerBackgroundColor="var(--table-header-bg)" borderColor="var(--table-border-color)"
            bodyBackgroundColor="var(--table-body-bg)" headerTextColor="var(--general)" bodyTextColor="var(--general)"
            ref="logininforRef" v-loading="loading" :data="logininforList" @selection-change="handleSelectionChange"
            :default-sort="defaultSort" @sort-change="handleSortChange" table-layout="fixed">
            <MYTableColumn type="selection" width="60" align="center" />
            <MYTableColumn label="访问编号" align="center" prop="infoId" width="100" />
            <MYTableColumn label="用户名称" align="center" prop="userName" width="120" :show-overflow-tooltip="true"
                sortable="custom" />
            <MYTableColumn label="地址" align="center" prop="ipaddr" width="120" :show-overflow-tooltip="true" />
            <MYTableColumn label="登录地点" align="center" prop="loginLocation" width="120" :show-overflow-tooltip="true" />
            <MYTableColumn label="操作系统" align="center" prop="os" width="120" :show-overflow-tooltip="true" />
            <MYTableColumn label="浏览器" align="center" prop="browser" width="120" />
            <MYTableColumn label="登录状态" align="center" prop="status" width="100" />
            <template #status="scope">
                <dict-tag :options="sys_common_status" :value="scope.row.status" />
            </template>
            <MYTableColumn label="描述" align="center" prop="msg" width="150" :show-overflow-tooltip="true" />
            <MYTableColumn label="访问时间" align="center" prop="loginTime" width="180" sortable="custom">
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
import { MYOption } from 'mengyue-plus';
import modal from '@/plugins/modal';
const { proxy } = getCurrentInstance() as any;
const { sys_common_status } = proxy.useDict('sys_common_status');
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
