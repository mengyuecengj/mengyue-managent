<template>
    <div class="app-container" ref="tableContainer">
        <MYRow :gutter="20">
            <MYForm :modelValue="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
                <MYRow :gutter="20">
                    <MYCol :span="9">
                        <MYForm-item label="部门名称" prop="deptName">
                            <MYInput v-model="queryParams.deptName" placeholder="请输入部门名称" clearable
                                @keyup.enter="handleQuery" placeholderColor="var(--navbar-text)"
                                textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>
                    <MYCol :span="8">
                        <MYForm-item label="状态" prop="status">
                            <MYSelect v-model="queryParams.status" placeholder="部门状态" clearable style="width: 170px">
                                <MYOption v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label"
                                    :value="dict.value" />
                            </MYSelect>
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
        <MYRow :gutter="10" class="mb8">
            <MYCol :span="3">
                <MYButton type="info" icon="MYSortAlt" @click="toggleExpandAll">展开/折叠</MYButton>
            </MYCol>
            <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </MYRow>
        <MYTable v-if="refreshTable" v-loading="loading" :data="deptList" row-key="deptId"
            headerBackgroundColor="var(--table-header-bg)" borderColor="var(--table-border-color)"
            bodyBackgroundColor="var(--table-body-bg)" headerTextColor="var(--general)" bodyTextColor="var(--general)"
            :default-expand-all="isExpandAll" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
            <MYTable-column prop="deptName" label="部门名称" width="260"></MYTable-column>
            <MYTable-column prop="orderNum" label="排序" width="200"></MYTable-column>
            <MYTable-column prop="status" label="状态" width="100" />
            <template #status="scope">
                <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
            </template>
            <MYTable-column prop="createTime" label="创建时间" width="200" align="center">
                <template #default="scope">
                    <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
            </MYTable-column>
            <MYTable-column label="操作" align="center" prop="operation" width="150"
                class-name="small-padding fixed-width" />
            <template #operation="scope">
                <div v-if="scope.row.roleId !== 1" class="operation-buttons">
                    <MYButton link type="primary" icon="MYEdit" @click="handleUpdate(scope.row)"
                        v-hasPermi="['system:dept:edit']" colorBg="var(--table-body-bg)"
                        colorText="var(--general-text)">修改</MYButton>
                    <MYButton link type="primary" icon="MYPlus" @click="handleAdd(scope.row)"
                        v-hasPermi="['system:dept:add']" colorBg="var(--table-body-bg)" colorText="var(--general-text)">
                        新增</MYButton>
                    <MYButton v-if="scope.row.deptId !== 0" link type="primary" icon="MYDelete"
                        @click="handleDelete(scope.row)" v-hasPermi="['system:dept:remove']"
                        colorBg="var(--table-body-bg)" colorText="var(--general-text)">删除</MYButton>
                </div>
            </template>
        </MYTable>
        <!-- 添加或修改部门对话框 -->
        <MYDialog height="390px" :title="title" v-model="open" width="600px" append-to-body backgroundColor="#0F1115">
            <MYForm ref="deptRef" :model="form" :rules="rules" label-width="80px">
                <MYRow :gutter="10">
                    <MYCol :span="24" v-if="form.parentId !== 0">
                        <MYForm-item label="上级部门" prop="parentId">
                            <MYTree-select v-model="form.parentId" :data="deptOptions"
                                :props="{ label: 'deptName', children: 'children', value: 'deptId' }" :multiple="false"
                                :filterable="false" :size="'large'" :popper-class="'custom-dropdown'"
                                backgroundColor="red" textColor="blue" activeColor="yellow" />
                        </MYForm-item>
                    </MYCol>
                    <MYCol :span="12">
                        <MYForm-item label="部门名称" prop="deptName">
                            <MYInput v-model="form.deptName" placeholder="请输入部门名称" placeholderColor="var(--navbar-text)"
                                textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>
                    <MYCol :span="12">
                        <MYForm-item label="显示顺序" prop="orderNum">
                            <MYInputNumber v-model="form.orderNum" controls-position="right" :min="0" />
                        </MYForm-item>
                    </MYCol>
                    <MYCol :span="12">
                        <MYForm-item label="负责人" prop="leader">
                            <MYInput v-model="form.leader" placeholder="请输入负责人" maxlength="20" placeholderColor="var(--navbar-text)"
                                textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>
                    <MYCol :span="12">
                        <MYForm-item label="联系电话" prop="phone">
                            <MYInput v-model="form.phone" placeholder="请输入联系电话" maxlength="11" placeholderColor="var(--navbar-text)"
                                textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>
                    <MYCol :span="12">
                        <MYForm-item label="邮箱" prop="email">
                            <MYInput v-model="form.email" placeholder="请输入邮箱" maxlength="50" placeholderColor="var(--navbar-text)"
                                textColor="var(--navbar-text)" />
                        </MYForm-item>
                    </MYCol>
                    <MYCol :span="12">
                        <MYForm-item label="部门状态">
                            <MYRadio-group v-model="form.status">
                                <MYRadio value="0">正常</MYRadio>
                                <MYRadio value="1">停用</MYRadio>
                            </MYRadio-group>
                        </MYForm-item>
                    </MYCol>
                </MYRow>
            </MYForm>
            <template #footer>
                <div class="dialog-footer">
                    <MYButton style="margin-right: 20px;" type="primary" @click="submitForm">确 定</MYButton>
                    <MYButton type="info" @click="cancel">取 消</MYButton>
                </div>
            </template>
        </MYDialog>
    </div>
</template>

<script setup lang="ts" name="Dept">
import { parseTime } from '@/utils/general';
import modal from '@/plugins/modal';
import { listDept, getDept, delDept, addDept, updateDept, listDeptExcludeChild } from '@/api/system/dept';
import { ComponentInternalInstance, getCurrentInstance } from 'vue';
import { ProxyInstance, Dept, QueryParams, FormRules, FormData } from '@/types/views/dept';
import { MYInput, MYOption, MYRadioGroup, MYSelect } from 'mengyue-plus';
import { spawn } from 'child_process';

// Refs and reactive data
const { proxy } = getCurrentInstance() as ComponentInternalInstance & { proxy: ProxyInstance };
const { sys_normal_disable } = proxy.useDict("sys_normal_disable");

const deptList = ref<Dept[]>([]);
const open = ref<boolean>(false);
const loading = ref<boolean>(true);
const showSearch = ref<boolean>(true);
const title = ref<string>("");
const deptOptions = ref<Dept[]>([]);
const tableContainer = ref<HTMLElement | null>(null)
const isExpandAll = ref<boolean>(true);
const refreshTable = ref<boolean>(true);

const data = reactive<{
    form: FormData;
    queryParams: QueryParams;
    rules: FormRules;
}>({
    form: {
        deptId: undefined,
        parentId: undefined,
        deptName: undefined,
        orderNum: 0,
        leader: undefined,
        phone: undefined,
        email: undefined,
        status: "0",
    },
    queryParams: {
        deptName: undefined,
        status: undefined,
    },
    rules: {
        parentId: [{ required: true, message: "上级部门不能为空", trigger: "blur" }],
        deptName: [{ required: true, message: "部门名称不能为空", trigger: "blur" }],
        orderNum: [{ required: true, message: "显示顺序不能为空", trigger: "blur" }],
        email: [{ type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }],
        phone: [{ pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }],
    },
});

const { queryParams, form, rules } = toRefs(data);
function filterTree(data: Dept[], keyword: string): Dept[] {
  const res: Dept[] = []
  for (const node of data) {
    const children = node.children ? filterTree(node.children, keyword) : []
    if ((node.deptName && node.deptName.includes(keyword)) || children.length) {
      res.push({ ...node, children })
    }
  }
  return res
}

// 查询部门列表
async function getList() {
  const params: Record<string, any> = {};
  
  // 构建查询参数
  if (queryParams.value.deptName?.trim()) params.deptName = queryParams.value.deptName.trim();
  if (queryParams.value.status) params.status = queryParams.value.status;
//   if (queryParams.value.visible) params.visible = queryParams.visible;

  loading.value = true; // 开启加载状态
  try {
    // 调用 API 获取部门列表
    const response = await listDept(params);
    let list: Dept[] = response.data || [];

    // ✅ 多级搜索：根据部门名称过滤
    if (queryParams.value.deptName?.trim()) {
      list = filterTree(list, queryParams.value.deptName.trim());
    }

    // 转换为树形结构
    deptList.value = proxy.handleTree(list, 'deptId');
  } catch (err) {
    console.error(err);
    modal.msgError('获取部门列表失败');
  } finally {
    loading.value = false; // 关闭加载状态
  }
}

// 取消按钮
function cancel() {
    open.value = false;
    reset();
}

// 表单重置
function reset() {
    form.value = {
        deptId: undefined,
        parentId: undefined,
        deptName: undefined,
        orderNum: 0,
        leader: undefined,
        phone: undefined,
        email: undefined,
        status: "0",
    };
    proxy.resetForm('deptRef');
}

// 搜索按钮操作
function handleQuery() {
    getList();
}

// 重置按钮操作
function resetQuery() {
    // proxy.resetForm("queryRef");
    queryParams.value.deptName = '';
    queryParams.value.status = '';
    // handleQuery();
    getList();
}

// 新增按钮操作
async function handleAdd(row?: Dept) {
    reset();
    try {
        const res = await listDept('');
        deptOptions.value = proxy.handleTree(res.data, "deptId");
    } catch (error) {
        console.error(error);
    }
    if (row) {
        form.value.parentId = row.deptId;
    }
    open.value = true;
    title.value = '添加部门';
}

// 展开/折叠
async function toggleExpandAll() {
  isExpandAll.value = !isExpandAll.value
  await nextTick()
  const root = tableContainer.value
  if (!root) return
  const EXPAND_ICON_SELECTOR = '.my-table__expand-icon'
  const EXPANDED_CLASS = 'my-table__expand-icon--expanded'

  const clickElements = (els: Element[]) => {
    for (const el of els) {
      try { (el as HTMLElement).click() } catch {}
    }
  }

  const MAX_ITER = 12
  if (isExpandAll.value) {
    for (let i = 0; i < MAX_ITER; i++) {
      const toClickNodeList = Array.from(root.querySelectorAll(`${EXPAND_ICON_SELECTOR}:not(.${EXPANDED_CLASS})`))
      if (toClickNodeList.length === 0) break
      clickElements(toClickNodeList)
      await nextTick()
    }
  } else {
    for (let i = 0; i < MAX_ITER; i++) {
      const expandedNodeList = Array.from(root.querySelectorAll(`${EXPAND_ICON_SELECTOR}.${EXPANDED_CLASS}`))
      if (expandedNodeList.length === 0) break
      clickElements(expandedNodeList.reverse())
      await nextTick()
    }
  }
}

// 修改按钮操作
async function handleUpdate(row: Dept) {
    reset();
    try {
        const [listRes, deptRes] = await Promise.all([
            listDeptExcludeChild(row.deptId),
            getDept(row.deptId),
        ]);
        deptOptions.value = proxy.handleTree(listRes.data, "deptId");
        form.value = deptRes.data;
        open.value = true;
        title.value = '修改部门';
    } catch (error) {
        console.error(error);
    }
}

// 提交按钮
function submitForm() {
    proxy.$refs['deptRef']?.validate((valid: boolean) => {
        if (valid) {
            if (form.value.deptId != undefined) {
                updateDept(JSON.stringify(form.value)).then(() => {
                    proxy.$message.success('修改成功');
                    open.value = false;
                    getList();
                });
            } else {
                addDept(JSON.stringify(form.value)).then(() => {
                    proxy.$message.success('新增成功');
                    open.value = false;
                    getList();
                });
            }
        }
    });
}

// 删除按钮操作
function handleDelete(row: Dept) {
    modal.confirm(`是否确认删除名称为"${row.deptName}"的数据项?`).then(() => {
        return delDept(row.deptId.toString());
    }).then(() => {
        proxy.$message.success("删除成功");
        getList();
    }).catch(() => { });
}

// Initial fetch
getList();
</script>
