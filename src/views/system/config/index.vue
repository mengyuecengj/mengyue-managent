<template>
    <div class="app-container">
        <MYRow :gutter="20">
            <MYForm :modelValue="queryParams" ref="queryRef" :inline="true" labelWidth="68">
                <MYRow :gutter="16">
                    <!-- 参数名称 -->
                    <MYCol :span="6">
                        <MYForm-item label="参数名称" prop="configName">
                            <MYInput v-model="queryParams.configName" placeholder="请输入参数名称" clearable
                                placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>

                    <!-- 参数类型 -->
                    <MYCol :span="6">
                        <MYForm-item label="" prop="configCode">
                            <MYInput v-model="queryParams.configCode" placeholder="请输入参数键名" clearable
                                placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>

                    <!-- 状态 -->
                    <MYCol :span="7">
                        <MYForm-item label="系统内置" prop="status">
                            <MYSelect v-model="queryParams.status" placeholder="系统内置" clearable style="width: 200px;">
                                <MYOption v-for="dict in sys_yes_no" :key="dict.value" :label="dict.label"
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
                <MYButton type="primary" icon="MYPlus" @click="configAdd">新增</MYButton>
            </MYCol>
            <MYCol :span="2">
                <MYButton type="success" icon="MYEdit" :disabled="single" @click="handleConfigUpdate">修改</MYButton>
            </MYCol>
            <MYCol :span="2">
                <MYButton type="danger" icon="MYDelete" :disabled="multiple" @click="handleDelete">删除</MYButton>
            </MYCol>
            <MYCol :span="2">
                <MYButton type="danger" icon="MYLoadingA" @click="refresh">刷新缓存</MYButton>
            </MYCol>
        </MYRow>

        <MYTable :data="currentPageData" row-key="configId" headerBackgroundColor="var(--table-header-bg)"
            borderColor="var(--table-border-color)" bodyBackgroundColor="var(--table-body-bg)"
            headerTextColor="var(--general)" bodyTextColor="var(--general)" @select-change="handleSelectionChange"
            @selection-change="handleSelectionChange">
            <MYTable-column type="selection" width="55" align="center" />
            <MYTable-column label="参数主键" prop="configId" width="120" />
            <MYTable-column label="参数名称" prop="configName" :show-overflow-tooltip="true" width="150" />
            <MYTable-column label="参数键名" prop="configCode" :show-overflow-tooltip="true" width="150" />
            <MYTable-column label="参数键值" prop="configValue" :show-overflow-tooltip="true" width="150" />
            <MYTable-column label="系统内置" align="center" width="100" prop="type" />
            <template #type="scope">
                <dict-tag :options="sys_yes_no" :value="scope.row.status" />
            </template>
            <!-- <MYTable-column label="备注" prop="remark" :show-overflow-tooltip="true" /> -->
            <MYTable-column label="创建时间" align="center" prop="createTime" width="180" />
            <MYTable-column label="操作" align="center" width="200" class-name="small-padding fixed-width"
                prop="operation" />
            <template #operation="scope">
                <MYButton type="primary" size="small" icon="MYEdit" @click="handleConfigUpdate(scope.row)" colorBg="var(--table-body-bg)"
          colorText="var(--general-text)">修改</MYButton>
                <MYButton type="danger" size="small" icon="MYDelete" @click="handleDelete(scope.row)" colorBg="var(--table-body-bg)"
          colorText="var(--general-text)">删除</MYButton>
            </template>
        </MYTable>

        <pagination class="pagination-container" v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
            v-model:limit="queryParams.pageSize" @pagination="handlePagination" />

        <MYDialog :title="title" v-model="open" width="600px" height="450px" append-to-body backgroundColor="#0b1115">
            <MYForm class="dialog_form" style="background-color: transparent !important;" ref="formRef" :model-value="data.form" :rules="rules" labelWidth="80">
                <MYRow :gutter="20">
                    <MYCol :span="20">
                        <MYForm-item label="参数名称" prop="configName">
                            <MYInput v-model="form.configName" placeholder="请输入参数名称" clearable
                                placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>
                    <MYCol :span="20">
                        <MYForm-item label="参数键名" prop="configCode">
                            <MYInput v-model="form.configCode" placeholder="请输入参数键名" clearable
                                placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>
                    <MYCol :span="20">
                        <MYForm-item label="参数键值" prop="configCode">
                            <MYInput v-model="form.configValue" placeholder="请输入参数键值" clearable
                                placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>
                    <MYCol :span="20">
                        <MYForm-item label="系统内置" prop="status">
                            <MYRadio-group v-model="form.status">
                                <MYRadio v-for="dict in sys_yes_no" :key="dict.value" :value="dict.value">
                                    {{ dict.label }}
                                </MYRadio>
                            </MYRadio-group>
                        </MYForm-item>
                    </MYCol>
                    <MYCol :span="20">
                        <MYForm-item label="备注" prop="remark">
                            <MYInput v-model="form.remark" placeholder="请输入备注" clearable
                                placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>
                </MYRow>
            </MYForm>
            <template #footer>
                <div class="dialog-footer">
                    <MYButton style="margin-right: 20px;" type="primary" @click="submitAddDict">确定</MYButton>
                    <MYButton type="info" @click="cancel">取消</MYButton>
                </div>
            </template>
        </MYDialog>
    </div>
</template>

<script setup lang="ts">
import { listConfig, getConfig, delConfig, updateConfig, addConfig } from '@/api/system/config'
import { refreshCache } from '@/api/system/dict'
import { DictResult } from '@/types/views/user'
import { useDict } from '@/utils/dict'
import modal from '@/plugins/modal';

// 定义接口
interface ConfigItem {
    configId: number;
    configName: string;
    configCode: string;
    status: string;
    remark: string;
    createTime: string;
}

interface ConfigForm {
    configId?: number;
    configName: string;
    configCode: string;
    configValue: string;
    status: string;
    remark: string;
    createTime?: string;
}

interface QueryParams {
    configName: string;
    configCode: string;
    status: string;
    pageSize: number;
    pageNum: number;
}

// 使用参数
const { sys_yes_no } = useDict('sys_yes_no') as unknown as DictResult;

// 响应式数据
const allConfigList = ref<ConfigItem[]>([])
const loading = ref(true)
const total = ref(0)
const open = ref(false)
const ids = ref<number[]>([])
const single = ref(true)
const multiple = ref(true)
const title = ref('添加参数')
const queryRef = ref()
const formRef = ref()

// 计算当前页数据
const currentPageData = computed(() => {
    const start = (queryParams.value.pageNum - 1) * queryParams.value.pageSize
    const end = start + queryParams.value.pageSize
    return allConfigList.value.slice(start, end)
})

// 表单验证规则
const rules = {
    configName: [
        { required: true, message: '参数名称不能为空', trigger: 'blur' }
    ],
    configCode: [
        { required: true, message: '参数键名不能为空', trigger: 'blur' }
    ],
    configValue: [  // 添加configValue的验证
        { required: true, message: '参数键值不能为空', trigger: 'blur' }
    ]
}
const data = reactive({
    form: {
        configId: undefined as number | undefined,
        configName: '',
        configCode: '',
        configValue: '',
        status: '0',
        remark: '',
        createTime: ''
    } as ConfigForm,
    queryParams: {
        configName: '',
        configCode: '',
        configValue: '',
        status: '',
        pageSize: 10,
        pageNum: 1
    } as QueryParams
})

const { queryParams, form } = toRefs(data)

// 重置表单
const reset = () => {
    form.value = {
        configId: undefined,
        configName: '',
        configCode: '',
        configValue: '',
        status: '0',
        remark: '',
        createTime: ''
    }
    if (formRef.value) {
        formRef.value.clearValidate()
    }
}

// 获取参数列表
// 获取参数列表 - 添加详细调试
const getList = async () => {
    loading.value = true;
    
    try {
        const response: any = await listConfig(queryParams.value);        
        if (response && response.code === 200) {            
            // 处理数据
            const data = response.data.rows || response.data.list || response.data || [];
            
            allConfigList.value = data;
            total.value = response.data.total || data.length;
        } else {
            console.warn('⚠️ API 返回非200状态:', response?.code);
            allConfigList.value = [];
            total.value = 0;
        }
    } catch (error: any) {
        console.error('💥 获取列表失败:', error);
        console.error('错误详情:', error.message);
        allConfigList.value = [];
        total.value = 0;
    } finally {
        loading.value = false;
    }
}

// 分页事件处理
const handlePagination = (pagination: any) => {
    queryParams.value.pageNum = pagination.page
    queryParams.value.pageSize = pagination.limit
}

// 搜索
// 搜索 - 添加详细调试
const handleQuery = () => {
    
    queryParams.value.pageNum = 1;
    
    getList();
}

// 重置查询
const resetQuery = () => {
    queryParams.value = {
        configName: '',
        configCode: '',
        status: '',
        pageSize: 10,
        pageNum: 1
    }
    if (queryRef.value) {
        queryRef.value.resetFields()
    }
    getList()
}

// 表格选择事件
const handleSelectionChange = (selection: ConfigItem[]) => {
    ids.value = selection.map(item => item.configId)
    single.value = selection.length !== 1
    multiple.value = selection.length === 0
}

// 新增参数
const configAdd = () => {
    reset()
    title.value = '添加参数'
    open.value = true
}

// 修改参数
const handleConfigUpdate = (row?: ConfigItem) => {
    let dictId: number | undefined

    if (row && row.configId) {
        dictId = row.configId
    } else if (ids.value.length === 1) {
        dictId = ids.value[0]
    } else {
        modal.msgError('请选择要修改的参数')
        return
    }

    reset()
    title.value = '修改参数'

    getConfig(String(dictId)).then((res: any) => {
        if (res.code === 200) {
            form.value = { ...res.data }
            open.value = true
        }
    }).catch(error => {
        modal.msgError('获取参数详情失败')
    })
}

// 提交表单
const submitAddDict = async () => {
    if (!formRef.value) {
        return
    }1

    try {
        await formRef.value.validate()

        if (form.value.configId) {
            const response: any = await updateConfig(form.value)
            if (response.code === 200) {
                modal.msgSuccess('修改成功')
                open.value = false
                getList()
            } else {
                modal.msgError(response.msg || '修改失败')
            }
        } else {
            const response: any = await addConfig(form.value)
            if (response.code === 200) {
                modal.msgSuccess('新增成功')
                open.value = false
                getList()
            } else {
                modal.msgError(response.msg || '新增失败')
            }
        }
    } catch (error) {
        modal.msgError('提交失败，请检查表单')
    }
}

// 删除参数
// 删除参数 - 修复版本
const handleDelete = async (row?: ConfigItem | PointerEvent) => {
    // 处理事件对象的情况
    let actualRow: ConfigItem | undefined;
    let actualIds: number[] = [];
    
    if (row && 'configId' in (row as ConfigItem)) {
        // 如果传入的是行数据
        actualRow = row as ConfigItem;
        actualIds = [actualRow.configId];
    } else if (ids.value.length > 0) {
        // 如果通过复选框选择删除
        actualIds = [...ids.value];
    } else {
        console.error('❌ 未选择要删除的参数');
        modal.msgError('请选择要删除的参数');
        return;
    }

    if (actualIds.length === 0 || actualIds.some(id => !id)) {
        console.error('❌ 参数ID无效:', actualIds);
        modal.msgError('参数ID无效');
        return;
    }
    modal.confirm(`是否确认删除参数编号为"${actualIds}"的数据项?`).then(() => {
        
        // 如果是单个删除，使用单个删除接口
        if (actualIds.length === 1) {
            return delConfig(actualIds[0]);
        } else {
            // 如果是批量删除，使用批量删除接口（如果有的话）
            return delConfig(actualIds.join(','));
        }
    }).then((response: any) => {        
        if (response && response.code === 200) {
            getList();
            modal.msgSuccess('删除成功');
        } else {
            modal.msgError(response?.message || response?.msg || '删除失败');
        }
    }).catch((error) => {
        modal.msgError('删除操作异常: ' + (error.message || '未知错误'));
    });
}

// 刷新缓存
const refresh = async () => {
    const response: any = await refreshCache()
    if (response.code === 200) {
        modal.msgSuccess('刷新成功')
    } else {
        modal.msgError('刷新失败')
    }
}

// 取消对话框
const cancel = () => {
    open.value = false
    reset()
}

// 组件挂载时获取数据
onMounted(() => {
    getList()
})
</script>
