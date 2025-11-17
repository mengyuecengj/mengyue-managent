<template>
    <div class="app-container">
        <MYRow :gutter="20">
            <MYForm :modelValue="queryParams" ref="queryRef" :inline="true">
                <MYRow :gutter="20">
                    <MYCol :span="9">
                        <MYForm-item label="登录地址" prop="ipaddr">
                            <MYInput v-model="queryParams.ipaddr" placeholder="请输入登录地址" clearable
                                @keyup.enter="handleQuery" placeholderColor="var(--navbar-text)"
                                textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>
                    <MYCol :span="8">
                        <MYForm-item label="操作系统" prop="os">
                            <MYInput v-model="queryParams.os" placeholder="请输入操作系统" clearable
                                @keyup.enter="handleQuery" placeholderColor="var(--navbar-text)"
                                textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>
                    <MYCol :span="3">
                        <MYForm-item>
                            <MYButton type="primary" icon="MYSearch" @click="handleQuery">搜索</MYButton>
                        </MYForm-item>
                    </MYCol>
                    <MYCol :span="4">
                        <MYForm-item>
                            <MYButton type="info" icon="MYRefreshRight" @click="resetQuery">重置</MYButton>
                        </MYForm-item>
                    </MYCol>
                </MYRow>
            </MYForm>
        </MYRow>
        <MYTable headerBackgroundColor="var(--table-header-bg)" borderColor="var(--table-border-color)"
            bodyBackgroundColor="var(--table-body-bg)" headerTextColor="var(--general)" bodyTextColor="var(--general)"
            v-loading="loading" :data="onlineList.slice((pageNum - 1) * pageSize, pageNum * pageSize)"
            style="width: 100%">
            <MYTable-column label="序号" width="80" align="center" prop="index" />
            <MYTable-column label="回话编号" align="center" prop="tokenId" :show-overflow-tooltip="true" />
            <MYTable-column label="登录名称" align="center" prop="userName" :show-overflow-tooltip="true" />
            <MYTable-column label="所属部门" align="center" prop="deptName" :show-overflow-tooltip="true" />
            <MYTable-column label="主机" align="center" prop="ipaddr" :show-overflow-tooltip="true" />
            <MYTable-column label="登录地点" align="center" prop="loginLocation" :show-overflow-tooltip="true" />
            <MYTable-column label="操作系统" align="center" prop="os" :show-overflow-tooltip="true" />
            <MYTable-column label="浏览器" align="center" prop="browser" :show-overflow-tooltip="true" />
            <MYTable-column label="登录时间" align="center" prop="loginTime" sortable="180">
                <template #default="scope">
                    <span>{{ parseTime(scope.row.loginTime) }}</span>
                </template>
            </MYTable-column>
            <MYTable-column label="操作" align="center" prop="operation" class-name="small-padding fixed-width" />
            <template #operation="scope">
                <MYButton type="primary" link icon="MYDelete" @click="handleForceLogout(scope.row)"
                    v-hasPermi="['monitor:online:forceLogout']" colorBg="var(--table-body-bg)"
                    colorText="var(--general-text)">
                    强退
                </MYButton>
            </template>
        </MYTable>
        <pagination class="pagination-container" v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
            v-model:limit="queryParams.pageSize" />
    </div>
</template>

<script setup name="Online" lang="ts">
import modal from '@/plugins/modal'
import { getCurrentInstance, ref } from 'vue';
import { forceLogout, list as initData } from '@/api/monitor/online';
import { parseTime } from '@/utils/general';

// 定义在线用户的数据结构
interface OnlineUser {
    tokenId: string;
    userName: string;
    deptName: string;
    ipaddr: string;
    loginLocation: string;
    browser: string;
    os: string;
    loginTime: string;
}

const { proxy } = getCurrentInstance() as any;

// 明确指定 onlineList 的类型为 OnlineUser[]
const onlineList = ref<OnlineUser[]>([]);
const loading = ref<boolean>(true);
const total = ref<number>(0);
const pageNum = ref<number>(1);
const pageSize = ref<number>(10);

const initQueryParams = {
    pageNum: 1,
    pageSize: 10,
    tokenId: undefined,
    deptName: undefined,
    ipaddr: undefined,
    loginLocation: undefined,
    browser: undefined,
    os: undefined,
    loginTime: undefined,
    status: undefined,
    orderByColumn: undefined,
    isAsc: undefined
};

const queryParams = ref({
    pageNum: 1,
    pageSize: 10,
    tokenId: undefined,
    deptName: undefined,
    ipaddr: undefined,
    loginLocation: undefined,
    browser: undefined,
    os: undefined,
    loginTime: undefined,
    status: undefined,
    orderByColumn: undefined,
    isAsc: undefined
});
const dateRange: Ref<string[]> = ref([]);

// 查询登录日志列表
function getList() {
    loading.value = true;
    initData(proxy.addDateRange(queryParams.value, dateRange.value)).then((res: any) => {
        onlineList.value = res.rows; // 确保 res.rows 是 OnlineUser[] 类型
        total.value = res.total;
        loading.value = false;
    });
}

// 搜索按钮
function handleQuery() {
    pageNum.value = 1;
    getList();
}

// 重置按钮
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

// 强退按钮
function handleForceLogout(row: OnlineUser) {
    modal.confirm('是否确认强退名称为"' + row.userName + '"的数据项?').then(function () {
        return forceLogout(row.tokenId);
    }).then(() => {
        // 立即从本地数据中移除被强退的用户，无需等待接口返回
        onlineList.value = onlineList.value.filter(user => user.tokenId !== row.tokenId);
        total.value = onlineList.value.length;
        modal.msgSuccess("强退成功");
    }).catch(() => { });
}

getList();
</script>