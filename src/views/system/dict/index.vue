<template>
    <div class="app-container">
        <MYRow :gutter="20">
            <MYForm :modelValue="queryParams" ref="queryRef" :inline="true" labelWidth="68">
                <MYRow :gutter="16">
                    <!-- 字典名称 -->
                    <MYCol :span="6">
                        <MYForm-item label="字典名称" prop="dictName">
                            <MYInput v-model="queryParams.dictName" placeholder="请输入字典名称" clearable
                                placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>

                    <!-- 字典类型 -->
                    <MYCol :span="6">
                        <MYForm-item label="字典类型" prop="dictCode">
                            <MYInput v-model="queryParams.dictCode" placeholder="请输入字典类型" clearable
                                placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>

                    <!-- 状态 -->
                    <MYCol :span="7">
                        <MYForm-item label="状态" prop="status">
                            <MYSelect v-model="queryParams.status" placeholder="状态" clearable>
                                <MYOption v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label"
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
                <MYButton type="primary" icon="MYPlus" @click="dictAdd">新增</MYButton>
            </MYCol>
            <MYCol :span="2">
                <MYButton type="success" icon="MYEdit" :disabled="single" @click="dictUpdate">修改</MYButton>
            </MYCol>
            <MYCol :span="2">
                <MYButton type="danger" icon="MYDelete" :disabled="multiple" @click="handleDelete">删除</MYButton>
            </MYCol>
            <MYCol :span="2">
                <MYButton type="danger" icon="MYLoadingA" @click="refresh">刷新缓存</MYButton>
            </MYCol>
        </MYRow>

        <MYTable :data="currentPageData" row-key="dictId" headerBackgroundColor="var(--table-header-bg)"
            borderColor="var(--table-border-color)" bodyBackgroundColor="var(--table-body-bg)"
            headerTextColor="var(--general)" bodyTextColor="var(--general)" @select-change="handleSelectionChange"
            @selection-change="handleSelectionChange">
            <MYTable-column type="selection" width="55" align="center" />
            <MYTable-column label="字典编号" prop="dictId" width="120" />
            <MYTable-column label="字典名称" prop="dictName" :show-overflow-tooltip="true" width="150" />
            <MYTable-column label="字典类型" prop="dictCode" :show-overflow-tooltip="true" width="150" />
            <MYTable-column label="状态" align="center" width="100" prop="status" />
                <template #status="scope">
                    <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
                </template>
            <MYTable-column label="备注" prop="remark" :show-overflow-tooltip="true" />
            <MYTable-column label="创建时间" align="center" prop="createTime" width="180" />
            <MYTable-column label="操作" align="center" width="200" class-name="small-padding fixed-width" prop="operation" />
                <template #operation="scope">
                    <MYButton type="primary" size="small" icon="MYEdit" @click="dictUpdate(scope.row)" colorBg="var(--table-body-bg)"
          colorText="var(--general-text)">修改</MYButton>
                    <MYButton type="danger" size="small" icon="MYDelete" @click="handleDelete(scope.row)" colorBg="var(--table-body-bg)"
          colorText="var(--general-text)">删除</MYButton>
                </template>
        </MYTable>

        <pagination class="pagination-container" v-show="total > 0" :total="total" 
            v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" 
            @pagination="handlePagination" />

        <MYDialog :title="title" v-model="open" width="600px" height="450px" append-to-body backgroundColor="#0b1115">
            <MYForm class="dialog_form" ref="formRef" :model-value="data.form" :rules="rules" labelWidth="80">
                <MYRow :gutter="20">
                    <MYCol :span="20">
                        <MYForm-item label="字典名称" prop="dictName">
                            <MYInput v-model="data.form.dictName" placeholder="请输入字典名称" clearable
                                placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>
                    <MYCol :span="20">
                        <MYForm-item label="字典类型" prop="dictCode">
                            <MYInput v-model="data.form.dictCode" placeholder="请输入字典类型" clearable
                                placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>
                    <MYCol :span="20">
                        <MYForm-item label="状态" prop="status">
                            <MYRadio-group v-model="data.form.status">
                                <MYRadio v-for="dict in sys_normal_disable" :key="dict.value" :value="dict.value">
                                    {{ dict.label }}
                                </MYRadio>
                            </MYRadio-group>
                        </MYForm-item>
                    </MYCol>
                    <MYCol :span="20">
                        <MYForm-item label="备注" prop="remark">
                            <MYInput v-model="data.form.remark" placeholder="请输入备注" clearable
                                placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>
                </MYRow>
            </MYForm>
            <template #footer>
                <div class="dialog-footer">
                    <MYButton type="primary" @click="submitAddDict">确定</MYButton>
                    <MYButton type="info" @click="cancel">取消</MYButton>
                </div>
            </template>
        </MYDialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, computed } from 'vue'
import { listDict, addDict, updateDict, getDict, deleteDict, refreshCache } from '@/api/system/dict'
import { DictResult } from '@/types/views/user'
import { useDict } from '@/utils/dict'
import modal from '@/plugins/modal';

// 定义接口
interface DictItem {
  dictId: number;
  dictName: string;
  dictCode: string;
  status: string;
  remark: string;
  createTime: string;
}

interface DictForm {
  dictId?: number;
  dictName: string;
  dictCode: string;
  status: string;
  remark: string;
  createTime?: string;
}

interface QueryParams {
  dictName: string;
  dictCode: string;
  status: string;
  pageSize: number;
  pageNum: number;
}

// 使用字典
const { sys_normal_disable } = useDict('sys_normal_disable') as unknown as DictResult;

// 响应式数据
const allDictList = ref<DictItem[]>([])
const loading = ref(true)
const total = ref(0)
const open = ref(false)
const ids = ref<number[]>([])
const single = ref(true)
const multiple = ref(true)
const title = ref('添加字典')
const queryRef = ref()
const formRef = ref()

// 计算当前页数据
const currentPageData = computed(() => {
    const start = (queryParams.value.pageNum - 1) * queryParams.value.pageSize
    const end = start + queryParams.value.pageSize
    return allDictList.value.slice(start, end)
})

// 表单验证规则
const rules = {
    dictName: [
        { required: true, message: '字典名称不能为空', trigger: 'blur' }
    ],
    dictCode: [
        { required: true, message: '字典类型不能为空', trigger: 'blur' }
    ]
}

const data = reactive({
    form: {
        dictId: undefined as number | undefined,
        dictName: '',
        dictCode: '',
        status: '0',
        remark: '',
        createTime: ''
    } as DictForm,
    queryParams: {
        dictName: '',
        dictCode: '',
        status: '',
        pageSize: 10,
        pageNum: 1
    } as QueryParams
})

const { queryParams, form } = toRefs(data)

// 重置表单
const reset = () => {
    form.value = {
        dictId: undefined,
        dictName: '',
        dictCode: '',
        status: '0',
        remark: '',
        createTime: ''
    }
    if (formRef.value) {
        formRef.value.clearValidate()
    }
}

// 获取字典列表
const getList = async () => {
    loading.value = true
    try {
         const response: any = await listDict(queryParams.value)

        if (response && response.code === 200) {
            allDictList.value = response.data || []
            total.value = allDictList.value.length
        } else {
            allDictList.value = []
            total.value = 0
        }
    } catch (error) {
        allDictList.value = []
        total.value = 0
    } finally {
        loading.value = false
    }
}

// 分页事件处理
const handlePagination = (pagination: any) => {
    queryParams.value.pageNum = pagination.page
    queryParams.value.pageSize = pagination.limit
}

// 搜索
const handleQuery = () => {
    queryParams.value.pageNum = 1
    getList()
}

// 重置查询
const resetQuery = () => {
    queryParams.value = {
        dictName: '',
        dictCode: '',
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
const handleSelectionChange = (selection: DictItem[]) => {
    ids.value = selection.map(item => item.dictId)
    single.value = selection.length !== 1
    multiple.value = selection.length === 0
}

// 新增字典
const dictAdd = () => {
    reset()
    title.value = '添加字典'
    open.value = true
}

// 修改字典
const dictUpdate = (row?: DictItem) => {
    let dictId: number | undefined

    if (row && row.dictId) {
        dictId = row.dictId
    } else if (ids.value.length === 1) {
        dictId = ids.value[0]
    } else {
        modal.msgError('请选择要修改的字典')
        return
    }

    reset()
    title.value = '修改字典'

    getDict(String(dictId)).then((res: any) => {
        if (res.code === 200) {
            form.value = { ...res.data }
            open.value = true
        }
    }).catch(error => {
        modal.msgError('获取字典详情失败')
    })
}

// 提交表单
const submitAddDict = async () => {
    if (!formRef.value) {
        return
    }

    try {
        await formRef.value.validate()

        if (form.value.dictId) {
            const response: any = await updateDict(form.value)
            if (response.code === 200) {
                modal.msgSuccess('修改成功')
                open.value = false
                getList()
            } else {
                modal.msgError(response.msg || '修改失败')
            }
        } else {
            const response: any = await addDict(form.value)
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

// 删除字典
const handleDelete = async (row?: DictItem) => {
    const dictIds = row ? [row.dictId] : ids.value

    if (dictIds.length === 0) {
        modal.msgError('请选择要删除的字典')
        return
    }
    
    modal.confirm(`是否确认删除字典编号为"${dictIds}"的数据项?`).then(() => {
        return deleteDict(dictIds.join(','));
    }).then((response: any) => {
        if (response.code === 200) {
            getList();
            modal.msgSuccess('删除成功');
        } else {
            modal.msgError(response.msg || '删除失败')
        }
    }).catch(() => {
        // 用户取消删除
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
