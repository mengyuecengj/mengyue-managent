<template>
    <div class="app-container">
        <MYRow :gutter="20">
            <MYForm :modelValue="queryParams" ref="queryRef" :inline="true" labelWidth="68">
                <MYRow :gutter="16">
                    <!-- 参数名称 -->
                    <MYCol :span="6">
                        <MYForm-item label="公告标题" prop="configName">
                            <MYInput v-model="queryParams.noticeTitle" placeholder="请输入公告标题" clearable
                                placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>

                    <!-- 参数类型 -->
                    <MYCol :span="6">
                        <MYForm-item label="操作人员" prop="createBy">
                            <MYInput v-model="queryParams.createBy" placeholder="请输入操作人员" clearable
                                placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>

                    <!-- 状态 -->
                    <MYCol :span="7">
                        <MYForm-item label="类型" prop="noticeType">
                            <MYSelect v-model="queryParams.noticeType" placeholder="系统内置" clearable
                                style="width: 200px;">
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
                <MYButton type="primary" icon="MYPlus" @click="noticeAdd">新增</MYButton>
            </MYCol>
            <MYCol :span="2">
                <MYButton type="success" icon="MYEdit" :disabled="single" @click="handleNoticeUpdate">修改</MYButton>
            </MYCol>
            <MYCol :span="2">
                <MYButton type="danger" icon="MYDelete" :disabled="multiple" @click="handleDelete">删除</MYButton>
            </MYCol>
            <MYCol :span="2">
                <MYButton type="danger" icon="MYLoadingA" @click="refresh">刷新缓存</MYButton>
            </MYCol>
        </MYRow>

        <MYTable :data="currentPageData" row-key="noticeId" headerBackgroundColor="var(--table-header-bg)"
            borderColor="var(--table-border-color)" bodyBackgroundColor="var(--table-body-bg)"
            headerTextColor="var(--general)" bodyTextColor="var(--general)" @select-change="handleSelectionChange"
            @selection-change="handleSelectionChange">
            <MYTable-column type="selection" width="55" align="center" />
            <MYTable-column label="序号" prop="noticeId" width="120" />
            <MYTable-column label="公告标题" prop="noticeTitle" :show-overflow-tooltip="true" width="150" />
            <MYTable-column label="公告类型" prop="noticeType" :show-overflow-tooltip="true" width="150" />
            <template #noticeType="scope">
                <dict-tag :options="sys_notice_type" :value="scope.row.status" />
            </template>
            <MYTable-column label="状态" align="center" width="100" prop="type" />
            <template #type="scope">
                <dict-tag :options="sys_yes_no" :value="scope.row.status" />
            </template>
            <MYTable-column label="创建者" prop="createBy" :show-overflow-tooltip="true" />
            <MYTable-column label="创建时间" align="center" prop="createTime" width="180" />
            <MYTable-column label="操作" align="center" width="200" class-name="small-padding fixed-width"
                prop="operation" />
            <template #operation="scope">
                <MYButton type="primary" size="small" icon="MYEdit" @click="handleNoticeUpdate(scope.row)" colorBg="var(--table-body-bg)"
          colorText="var(--general-text)">修改</MYButton>
                <MYButton type="danger" size="small" icon="MYDelete" @click="handleDelete(scope.row)" colorBg="var(--table-body-bg)"
          colorText="var(--general-text)">删除</MYButton>
            </template>
        </MYTable>

        <pagination class="pagination-container" v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
            v-model:limit="queryParams.pageSize" @pagination="handlePagination" />

        <MYDialog :title="title" v-model="open" width="600px" height="450px" append-to-body backgroundColor="#0b1115">
            <MYForm class="dialog_form" style="background-color: transparent !important;" ref="formRef"
                :model-value="form" :rules="rules" labelWidth="80">
                <MYRow :gutter="20">
                    <MYCol :span="20">
                        <MYForm-item label="公告标题" prop="noticeTitle">
                            <MYInput v-model="form.noticeTitle" placeholder="请输入公告标题" clearable
                                placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>
                    <!-- 添加公告类型字段 -->
                    <MYCol :span="20">
                        <MYForm-item label="公告类型" prop="noticeType">
                            <MYSelect v-model="form.noticeType" placeholder="请选择公告类型" clearable>
                                <MYOption v-for="dict in sys_notice_type" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </MYSelect>
                        </MYForm-item>
                    </MYCol>
                    <MYCol :span="20">
                        <MYForm-item label="状态" prop="status">
                            <MYRadio-group v-model="form.status">
                                <MYRadio v-for="dict in sys_yes_no" :key="dict.value" :value="dict.value">
                                    {{ dict.label }}
                                </MYRadio>
                            </MYRadio-group>
                        </MYForm-item>
                    </MYCol>
                    <!-- <MYCol :span="20">
                        <MYForm-item label="内容" prop="remark">
                            <MYInput v-model="form.remark" placeholder="请输入内容" clearable
                                placeholderColo     r="var(--navbar-text)" textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol> -->
                </MYRow>
            </MYForm>
            <template #footer>
                <div class="dialog-footer">
                    <MYButton style="margin-right: 20px;" type="primary" @click="submitAddNotice" >确定</MYButton>
                    <MYButton type="info" @click="cancel">取消</MYButton>
                </div>
            </template>
        </MYDialog>
    </div>
</template>

<script setup lang="ts">
import { listNotice, getNotice, delNotice, updateNotice, addNotice } from '@/api/system/notice'
import { refreshCache } from '@/api/system/dict'
import { DictResult } from '@/types/views/user'
import { useDict } from '@/utils/dict'
import modal from '@/plugins/modal';

// 定义接口
interface NoticeItem {
    noticeId: number | undefined;
    noticeTitle: string;
    noticeType: string;
    status: string;
    remark: string;
    updateTime: string;
}

interface NoticeForm {
    noticeId: number;
    noticeTitle: string;
    noticeType: string;
    status: string;
    remark: string;
    createTime?: string;
}

interface QueryParams {
    noticeId: number | string;
    noticeTitle: string;
    createBy: string;
    noticeType: string;
    status: string;
    pageSize: number;
    pageNum: number;
}

// 使用参数
const { sys_notice_type, sys_yes_no } = useDict('sys_notice_type', 'sys_yes_no') as unknown as DictResult;

// 响应式数据
const allNoticeList = ref<NoticeItem[]>([])
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
    return allNoticeList.value.slice(start, end)
})

// 表单验证规则
// 修正后的验证规则
const rules = {
    noticeTitle: [
        { required: true, message: '公告标题不能为空', trigger: 'blur' }
    ],
    noticeType: [
        { required: true, message: '公告类型不能为空', trigger: 'change' }
    ],
    status: [
        { required: true, message: '状态不能为空', trigger: 'change' }
    ],
    // remark: [
    //     { required: true, message: '内容不能为空', trigger: 'blur' }
    // ]
}

const data = reactive({
    form: {
        noticeId: undefined as number | undefined,
        noticeTitle: '',
        noticeType: '',
        status: '0',
        remark: '',
        updateTime: ''
    } as NoticeItem,
    queryParams: {
        noticeId: undefined as number | undefined,
        noticeTitle: '',
        createBy: '',
        status: '',
        noticeType: '',
        pageSize: 10,
        pageNum: 1
    } as QueryParams
})

const { queryParams, form } = toRefs(data)

// 重置表单
const reset = () => {
    form.value = {
        noticeId: undefined,
        noticeTitle: '',
        noticeType: '', // 确保有这个字段
        status: '0',
        remark: '',
        updateTime: ''
    } as NoticeItem
    if (formRef.value) {
        formRef.value.clearValidate()
    }
}

// 获取参数列表
const getList = async () => {
    loading.value = true;

    try {

        const response: any = await listNotice(queryParams.value);

        if (response && response.code === 200) {

            // 处理数据
            const data = response.data.rows || response.data.list || response.data || [];

            allNoticeList.value = data;
            total.value = response.data.total || data.length;
        } else {
            allNoticeList.value = [];
            total.value = 0;
        }
    } catch (error: any) {
        allNoticeList.value = [];
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
        noticeId: '',
        noticeTitle: '',
        createBy: '',
        noticeType: '',
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
// 表格选择事件 - 修复版本
const handleSelectionChange = (selection: NoticeItem[]) => {
    // 过滤掉 undefined 的 noticeId，确保只包含数字
    ids.value = selection
        .map(item => item.noticeId)
        .filter((id): id is number => id !== undefined) as number[];
    
    single.value = selection.length !== 1
    multiple.value = selection.length === 0
}

// 新增参数
const noticeAdd = () => {
    reset()
    title.value = '添加参数'
    open.value = true
}

// 修改参数
const handleNoticeUpdate = (row?: NoticeItem) => {
    let dictId: number | undefined

    if (row && row.noticeId) {
        dictId = row.noticeId
    } else if (ids.value.length === 1) {
        dictId = ids.value[0]
    } else {
        modal.msgError('请选择要修改的参数')
        return
    }

    // 添加类型检查，确保 dictId 是有效的数字
    if (dictId === undefined) {
        modal.msgError('参数ID无效')
        return
    }

    reset()
    title.value = '修改参数'

    getNotice(String(dictId)).then((res: any) => {
        if (res.code === 200) {
            form.value = { ...res.data }
            open.value = true
        }
    }).catch(error => {
        modal.msgError('获取参数详情失败')
    })
}

// 提交表单
const submitAddNotice = async () => {
    if (!formRef.value) {
        return
    } 1

    try {
        await formRef.value.validate()

        if (form.value.noticeId) {
            const response: any = await updateNotice(form.value)
            if (response.code === 200) {
                modal.msgSuccess('修改成功')
                open.value = false
                getList()
            } else {
                modal.msgError(response.msg || '修改失败')
            }
        } else {
            const response: any = await addNotice(form.value)
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
const handleDelete = async (row?: NoticeItem | PointerEvent) => {

    // 处理事件对象的情况
    let actualRow: NoticeItem | undefined;
    let actualIds: number[] = [];

    if (row && 'noticeId' in (row as NoticeItem)) {
        // 如果传入的是行数据
        actualRow = row as NoticeItem;
        
        // 检查 noticeId 是否为有效的数字
        if (actualRow.noticeId === undefined) {
            console.error('❌ 参数ID无效: undefined');
            modal.msgError('参数ID无效');
            return;
        }
        
        actualIds = [actualRow.noticeId];
    } else if (ids.value.length > 0) {
        // 如果通过复选框选择删除
        actualIds = [...ids.value];
    } else {
        modal.msgError('请选择要删除的参数');
        return;
    }

    // 再次检查所有ID是否有效
    if (actualIds.length === 0 || actualIds.some(id => id === undefined || id === null)) {
        console.error('❌ 参数ID无效:', actualIds);
        modal.msgError('参数ID无效');
        return;
    }

    modal.confirm(`是否确认删除公告编号为"${actualIds}"的数据项?`).then(() => {
        // 如果是单个删除，使用单个删除接口
        if (actualIds.length === 1) {
            return delNotice(actualIds[0]);
        } else {
            // 如果是批量删除，使用批量删除接口（如果有的话）
            return delNotice(actualIds.join(','));
        }
    }).then((response: any) => {

        if (response && response.code === 200) {
            getList();
            modal.msgSuccess('删除成功');
        } else {
            console.error('❌ 删除失败，响应:', response);
            modal.msgError(response?.message || response?.msg || '删除失败');
        }
    }).catch((error) => {
        console.error('💥 删除异常:', error);
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
