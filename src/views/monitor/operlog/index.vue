<template>
    <div class="app-container">
        <MYRow :gutter="20">
            <MYForm :modelValue="queryParams" ref="queryRef" v-show="showSearch" :inline="true" labelWidth="68">
                <MYRow :gutter="24">
                    <MYCol :span="8">
                        <MYForm-item :label="t('system.operlog.address')" prop="operIp">
                            <MYInput v-model="queryParams.operIp" :placeholder="t('system.operlog.placeholder.placeholderOperationAddress')" clearable
                                @keyup.enter="handleQuery" placeholderColor="var(--navbar-text)"
                                textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>

                    <MYCol :span="8">
                        <MYForm-item :label="t('system.operlog.module')" prop="title">
                            <MYInput v-model="queryParams.title" :placeholder="t('system.operlog.placeholder.placeholderOperationModule')" clearable
                                @keyup.enter="handleQuery" placeholderColor="var(--navbar-text)"
                                textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>

                    <MYCol :span="7">
                        <MYForm-item :label="t('system.operlog.status')" prop="status">
                            <MYSelect v-model="queryParams.status" :placeholder="t('system.user.placeholder.status')" clearable>
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
        <MYRow :gutter="16" class="mb8">
            <MYCol :span="2.5">
                <MYButton type="danger" icon="MYDelete" :disabled="multiple" @click="handleDelete"
                    v-hasPermi="['monitor:operlog:remove']">{{ t('system.user.button.delete') }}</MYButton>
            </MYCol>
            <MYCol :span="2">
                <MYButton type="danger" icon="MYDelete" @click="handleClean" v-hasPermi="['monitor:operlog:remove']">{{ t('system.operlog.clear') }}</MYButton>
            </MYCol>
            <!-- <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar> -->
        </MYRow>
        <MYTable row-key="operId" headerBackgroundColor="var(--table-header-bg)" borderColor="var(--table-border-color)"
            bodyBackgroundColor="var(--table-body-bg)" headerTextColor="var(--general)" bodyTextColor="var(--general)"
            ref="operlogRef" v-loading="loading" :data="operlogList" @selection-change="handleSelectionChange"
            :default-sort="defaultSort" @sort-change="handleSortChange">
            <MYTable-column type="selection" width="50" align="center" />
            <MYTable-column :label="t('system.operlog.logId')" align="center" prop="operId" />
            <MYTable-column :label="t('system.operlog.systemModule')" align="center" prop="title" :show-overflow-tooltip="true" />
            <MYTable-column :label="t('system.operlog.operationType')" align="center" prop="businessType" />
            <template #businessType="scope">
                <dict-tag :options="sys_oper_type" :value="scope.row.businessType" />
            </template>
            <MYTable-column :label="t('system.operlog.operationPerson')" align="center" width="110" prop="operName" :show-overflow-tooltip="true" />
            <MYTable-column :label="t('system.operlog.operationAddress')" align="center" prop="operIp" width="130" :show-overflow-tooltip="true" />
            <MYTable-column :label="t('system.operlog.operationLocation')" align="center" prop="operLocation" width="130" :show-overflow-tooltip="true" />
            <MYTable-column :label="t('system.operlog.operationStatus')" align="center" prop="status" />
            <template #status="scope">
                <dict-tag :options="sys_common_status" :value="scope.row.status" />
            </template>
            <MYTable-column :label="t('system.operlog.operationDate')" align="center" prop="operTime" width="180" sortable="custom"
                :sort-orders="['descending', 'ascending']" />
            <MYTable-column :label="t('system.operlog.timeConsuming')" prop="costTime" />
            <template #costTime="scope">
                <span>{{ scope.row.costTime }} {{ t('system.operlog.timeConsuming') }}</span>
            </template>
            <MYTable-column :label="t('system.user.table.operation')" align="center" prop="operation" class-name="small-padding fixed-width" />
            <template #operation="scope">
                <MYButton link type="primary" icon="MYViewEye" @click="handleView(scope.row)"
                    colorBackground="transparent" colorText="var(--general-text)">{{ t('system.operlog.details') }}</MYButton>
            </template>
        </MYTable>
        <pagination class="pagination-container" v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
            v-model:limit="queryParams.pageSize" @pagination="getList" />

        <!-- 操作日志详细 -->
        <MYDialog :title="t('system.operlog.operationLogDetails')" v-model="open" width="800px" height="650px" append-to-body backgroundColor="var(--dialog-bg) !important" textColor="var(--general)">
            <MYForm class="dialog_form" :model="form" label-width="100px">
                <MYRow>
                    <MYCol :span="12">
                        <MYForm-item :label="t('system.operlog.systemModule') + ': '"> {{ form.title }} / {{ form.type ? typeFormat(form.type) : '' }}</MYForm-item>
                        <MYForm-item :label="t('system.operlog.loginInformation') + ': '"> {{ form.operName }} / {{ form.operIp }} / {{ form.operLocation }}</MYForm-item>
                    </MYCol>
                    <MYCol :span="12">
                        <MYForm-item :label="t('system.operlog.requestUrl') + ': '"> {{ form.operUrl }}</MYForm-item>
                        <MYForm-item :label="t('system.operlog.requestMethod') + ': '"> {{ form.requestMethod }}</MYForm-item>
                    </MYCol>
                    <MYCol :span="24">
                        <MYForm-item :label="t('system.operlog.operationMethod') + ': '"> {{ form.method }}</MYForm-item>
                    </MYCol>
                    <MYCol :span="24">
                        <MYForm-item :label="t('system.operlog.requestParameters') + ': '"> {{ form.operParam }}</MYForm-item>
                    </MYCol>
                    <MYCol :span="24">
                        <MYForm-item :label="t('system.operlog.returnParameters') + ': '"> {{ form.jsonResult }}</MYForm-item>
                    </MYCol>
                    <MYCol :span="8">
                        <MYForm-item :label="t('system.operlog.operationStatus') + ': '">
                            <div v-if="form.status === 0">{{ t('system.operlog.data.noAlerts') ? '正常' : '正常' }}</div>
                            <div v-else-if="form.status === 1">失败</div>
                        </MYForm-item>
                    </MYCol>
                    <MYCol :span="8">
                        <MYForm-item :label="t('system.operlog.operationTime') + ': '">
                            <span>{{ form.costTime }} {{ t('system.operlog.timeConsuming') }}</span>
                        </MYForm-item>
                    </MYCol>
                    <MYCol :span="8">
                        <MYForm-item :label="t('system.operlog.operationDate') + ': '"> {{ form.operTime }}</MYForm-item>
                    </MYCol>
                    <MYCol :span="24">
                        <MYForm-item :label="t('system.operlog.exceptionMessage') + ': '"> {{ form.errorMsg }}</MYForm-item>
                    </MYCol>
                </MYRow>
            </MYForm>
            <template #footer>
                <div class="dialog-footer">
                    <MYButton @click="open = false">{{ t('system.operlog.close') }}</MYButton>
                </div>
            </template>
        </MYDialog>
    </div>
</template>
<script setup lang="ts" name="Operlog">
import { list, delOperlog, cleanOperlog } from '@/api/monitor/operlog';
import modal from '@/plugins/modal';
import { useI18n } from 'vue-i18n';

interface OperLogRow {
    [x: string]: any;
    bussinessType: string | number;
}

const { proxy } = getCurrentInstance() as any;
const { sys_oper_type, sys_common_status } = proxy.useDict("sys_oper_type", "sys_common_status");

const { t } = useI18n();
const operlogList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<number[]>([]);
const multiple = ref(true);
const total = ref(0);
const dateRange = ref([]);
const defaultSort = ref({ prop: "operTime", order: "descending" });

// 初始查询参数
const initQueryParams = {
    pageNum: 1,
    pageSize: 10,
    operIp: undefined,
    title: undefined,
    operName: undefined,
    status: undefined,
    businessType: undefined,
    orderByColumn: undefined,
    isAsc: undefined,
};

const data = reactive({
    form: {
        operId: undefined,
        title: undefined,
        businessType: undefined,
        method: undefined,
        requestMethod: undefined,
        operatorType: undefined,
        operName: undefined,
        deptName: undefined,
        operUrl: undefined,
        operIp: undefined,
        operLocation: undefined,
        operParam: undefined,
        status: 0,
        errorMsg: undefined,
        operTime: undefined,
        costTime: undefined,
        jsonResult: undefined,
        type: undefined
    },
    queryParams: { ...initQueryParams }
});

const { queryParams, form } = toRefs(data);

// 查询登录日志
function getList() {
    loading.value = true;
    list(proxy.addDateRange(queryParams.value, dateRange.value)).then((res: any) => {
        operlogList.value = res.rows;
        total.value = res.total;
        loading.value = false;
    }).catch(() => {
        loading.value = false;
    });
}

// 操作日志类型字典翻译
function typeFormat(row: string): string {
    return proxy.selectDictLabel(sys_oper_type.value, (row as unknown as OperLogRow).businessType);
}

// 搜索按钮操作
function handleQuery() {
    queryParams.value.pageNum = 1;
    getList();
}

// 重置按钮操作 - 修复：正确重置所有参数
function resetQuery() {
    dateRange.value = [];
    // 重置查询参数为初始值
    Object.assign(queryParams.value, initQueryParams
    );
    // 如果有表单引用，也重置表单
    if (proxy.$refs.queryRef) {
        proxy.$refs.queryRef.resetFields();
    }
    handleQuery();
}

// 多选框按钮操作 - 修复：正确设置multiple状态
function handleSelectionChange(selection: any) {
    ids.value = selection.map((item: any) => item.operId);
    multiple.value = !selection.length;
}

// 排序触发事件
function handleSortChange(column: any) {
    queryParams.value.orderByColumn = column.prop;
    queryParams.value.isAsc = column.order;
    getList();
}

// 详细按钮操作
function handleView(row: any) {
    open.value = true;
    form.value = { ...row };
}

// 删除按钮操作 - 修复：正确处理单条删除和批量删除
function handleDelete(row?: any) {
    const operIds = row?.operId || ids.value;
    
    if (!operIds || (Array.isArray(operIds) && operIds.length === 0)) {
        modal.msgWarning("请选择要删除的数据项");
        return;
    }

    modal.confirm(`是否确认删除日志编号为"${operIds}"的数据项?`).then(() => {
        return delOperlog(operIds);
    }).then(() => {
        getList();
        modal.msgSuccess("删除成功");
        // 删除后清空选择
        if (proxy.$refs.operlogRef) {
            proxy.$refs.operlogRef.clearSelection();
        }
    }).catch(() => { });
}

// 清空按钮操作 - 修复：添加确认和错误处理
function handleClean() {
    modal.confirm("是否确认清空所有操作日志数据项?").then(() => {
        return cleanOperlog();
    }).then(() => {
        getList();
        proxy.$modal.msgSuccess("清空成功");
    }).catch(() => { });
}

onMounted(() => {
    getList();
});
</script>