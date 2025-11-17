<template>
  <div class="app-container" ref="tableContainer">
    <MYRow :gutter="20">
      <MYForm :modelValue="queryParams" ref="queryRef" :inline="true" v-show="showSearch" :rules="queryRules">
        <MYRow :gutter="20">
          <MYCol :span="9">
            <MYForm-item prop="menuName" label="菜单名称">
              <MYInput v-model="queryParams.menuName" placeholder="请输入菜单名称" clearable style="width: 200px"
                @keyup.enter="handleQuery" placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
            </MYForm-item>
          </MYCol>

          <MYCol :span="8">
            <MYForm-item prop="status" label="状态">
              <MYSelect v-model="queryParams.status" placeholder="菜单状态" clearable style="width: 200px">
                <MYOption v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </MYSelect>
            </MYForm-item>
          </MYCol>

          <MYCol :span="3">
            <MYForm-item>
              <MYButton type="primary" icon="MYSearch" @click="handleQuery">
                搜索
              </MYButton>
            </MYForm-item>
          </MYCol>

          <MYCol :span="4">
            <MYForm-item>
              <MYButton type="info" icon="MYRefreshRight" @click="resetQuery">
                重置
              </MYButton>
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
    <MYTable v-if="refreshTable" v-loading="loading" :data="menuList" row-key="menuId"
      headerBackgroundColor="var(--table-header-bg)" borderColor="var(--table-border-color)"
      bodyBackgroundColor="var(--table-body-bg)" headerTextColor="var(--general)" bodyTextColor="var(--general)"
      :default-expand-all="isExpandAll" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <MYTable-column prop="menuName" label="菜单名称" :show-overflow-tooltip="true" width="160"></MYTable-column>
      <MYTable-column prop="icon" label="图标" align="center" width="100" />
      <template #icon="scope">
        <svg-icon :icon-class="scope.row.icon" />
      </template>
      <MYTable-column prop="orderNum" label="排序" width="60"></MYTable-column>
      <MYTable-column prop="perms" label="权限标识" :show-overflow-tooltip="true"></MYTable-column>
      <MYTable-column prop="component" label="组件路径" :show-overflow-tooltip="true"></MYTable-column>
      <MYTable-column prop="body" label="状态" width="100" />
      <template #body="scope">
        <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
      </template>
      <MYTable-column label="创建时间" align="center" width="200" prop="createTime">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </MYTable-column>
      <MYTable-column label="操作" prop="operation" align="center" width="210" class-name="small-padding fixed-width" />
      <template #operation="scope">
        <MYButton size="supersmall" link type="primary" icon="MYEdit" colorBg="var(--table-body-bg)"
          colorText="var(--general-text)" @click="handleUpdate(scope.row)" v-hasPermi="['system:menu:edit']">修改
        </MYButton>
        <MYButton size="supersmall" link type="primary" icon="MYPlus" colorBg="var(--table-body-bg)"
          colorText="var(--general-text)" @click="handleAdd(scope.row)" v-hasPermi="['system:menu:add']">新增</MYButton>
        <MYButton size="supersmall" link type="primary" icon="MYDelete" colorBg="var(--table-body-bg)"
          colorText="var(--general-text)" @click="handleDelete(scope.row)" v-hasPermi="['system:menu:remove']">删除
        </MYButton>
      </template>
    </MYTable>
    <MYDialog :title="title" v-model="open" width="550px" height="660px" backgroundColor="var(--dialog-bg) !important"
      textColor="var(--general)" :show-close="false" append-to-body>
      <MYForm class="dialog_form" :model="form" ref="menuRef" value-width="100px">
        <MYForm-item value="菜单名称" label="上级菜单" prop="menuName" :rules="[{ required: true, message: '请输入菜单名称' }]">
          <MYTree-select class="tree-border" :data="menuOptions" show-checkbox ref="menuRef" node-key="id"
            :check-strictly="!form.menuName" empty-text="加载中，请稍候" :props="{ label: 'label', children: 'children' }"
            backgroundColor="#0f1115" />
        </MYForm-item>
        <!-- <MYForm-item value="父菜单" prop="parentId">
          <MYSelect v-model="form.parentId" placeholder="请选择父菜单">
            <MYOption v-for="menu in menuOptions" :key="menu.menuId" :label="menu.menuName" :value="menu.menuId" />
          </MYSelect>
        </MYForm-item> -->
        <MYForm-item value="图标" prop="icon" label="菜单图标">
          <MYSelect></MYSelect>
        </MYForm-item>
        <MYForm-item value="菜单类型" prop="menuType" label="菜单类型">
          <MYRadio-group v-model="form.menuType">
            <MYRadio value="M">目录</MYRadio>
            <MYRadio value="C">菜单</MYRadio>
            <MYRadio value="F">按钮</MYRadio>
          </MYRadio-group>
        </MYForm-item>
        <MYForm-item value="排序" prop="orderNum" label="排序">
          <MYInputNumber v-model="form.orderNum" :min="0" />
        </MYForm-item>
        <MYForm-item value="是否外链" prop="isFrame" label="外链">
          <MYRadio-group v-model="form.isFrame">
            <MYRadio value="1">是</MYRadio>
            <MYRadio value="0">否</MYRadio>
          </MYRadio-group>
        </MYForm-item>
        <MYForm-item value="是否缓存" prop="isCache" label="缓存">
          <MYRadio-group v-model="form.isCache">
            <MYRadio value="0">缓存</MYRadio>
            <MYRadio value="1">不缓存</MYRadio>
          </MYRadio-group>
        </MYForm-item>
        <MYForm-item value="显示状态" prop="visible" label="显示状态">
          <MYRadio-group v-model="form.visible">
            <MYRadio v-for="dict in sys_show_hide" :key="dict.value" :value="dict.value">{{ dict.label }}</MYRadio>
          </MYRadio-group>
        </MYForm-item>
        <MYForm-item value="菜单状态" prop="status" label="菜单状态">
          <MYRadio-group v-model="form.status">
            <MYRadio v-for="dict in sys_normal_disable" :key="dict.value" :value="dict.value">{{ dict.label
            }}</MYRadio>
          </MYRadio-group>
        </MYForm-item>
        <MYForm-item v-if="form.menuType !== 'F'" value="路由地址" prop="path">
          <MYInput v-model="form.path" placeholder="请输入路由地址" />
        </MYForm-item>
        <MYForm-item v-if="form.menuType === 'C'" value="组件路径" prop="component">
          <MYInput v-model="form.component" placeholder="请输入组件路径" />
        </MYForm-item>
        <MYForm-item v-if="form.menuType !== 'M'" value="权限标识" prop="perms">
          <MYInput v-model="form.perms" placeholder="请输入权限标识" />
        </MYForm-item>
      </MYForm>
      <template #footer>
        <MYButton style="margin-right: 20px;" type="primary" @click="submitForm">确定</MYButton>
        <MYButton type="info" @click="open = false">取消</MYButton>
      </template>
    </MYDialog>
  </div>
</template>


<script setup lang="ts" name="Menu">
import { reactive, ref, nextTick, getCurrentInstance } from 'vue'
import { addMenu, delMenu, getMenu, listMenu } from '@/api/system/menu'
import { parseTime } from '@/utils/general'
import type { MenuRow, MenuForm, MenuOption } from '@/types/views/menu'

const { proxy } = getCurrentInstance() as any

// 字典
const { sys_show_hide, sys_normal_disable } = proxy.useDict('sys_show_hide', 'sys_normal_disable')

// 表格及表单状态
const menuList = ref<MenuRow[]>([])
const loading = ref(false)
const showSearch = ref(true)
const open = ref(false)
const title = ref('')
const isExpandAll = ref(false)
const refreshTable = ref(true)
const tableContainer = ref<HTMLElement | null>(null)
const queryRef = ref<any>(null)
const menuRef = ref<any>(null)
const menuOptions = ref<MenuOption[]>([])

// reactive 对象
const data = reactive({
  form: {
    parentId: 0,
    menuType: 'M',
    isFrame: '1',
    isCache: '0',
    visible: '0',
    status: '0'
  } as MenuForm,
  queryParams: {
    menuName: '',
    visible: '',
    status: ''
  }
})

const { form, queryParams } = data

const queryRules = {
  menuName: [{ type: 'string' as const, message: '菜单名称必须为字符串', trigger: 'blur' }],
  status: [{ type: 'string' as const, message: '状态必须为字符串', trigger: 'change' }]
}

// -------------------------- 工具函数：递归过滤树 --------------------------
function filterTree(data: MenuRow[], keyword: string): MenuRow[] {
  const res: MenuRow[] = []
  for (const node of data) {
    const children = node.children ? filterTree(node.children, keyword) : []
    if ((node.menuName && node.menuName.includes(keyword)) || children.length) {
      res.push({ ...node, children })
    }
  }
  return res
}

// -------------------------- API --------------------------
async function getList() {
  const params: Record<string, any> = {}
  if (queryParams.menuName?.trim()) params.menuName = queryParams.menuName.trim()
  if (queryParams.status) params.status = queryParams.status
  if (queryParams.visible) params.visible = queryParams.visible

  loading.value = true
  try {
    const response = await listMenu(params)
    let list: MenuRow[] = response.data || []

    // ✅ 多级搜索
    if (queryParams.menuName?.trim()) {
      list = filterTree(list, queryParams.menuName.trim())
    }

    // 转树
    menuList.value = proxy.handleTree(list, 'menuId')
  } catch (err) {
    console.error(err)
    proxy.$modal.msgError('获取菜单列表失败')
  } finally {
    loading.value = false
  }
}

async function getTreeselect() {
  menuOptions.value = []
  try {
    const response = await listMenu()
    const menu: MenuOption = { menuId: 0, menuName: '主类目', children: [] }
    menu.children = proxy.handleTree(response.data, 'menuId') as MenuOption[]
    menuOptions.value.push(menu)
  } catch (err) {
    console.error('Failed to fetch treeselect:', err)
  }
}

// -------------------------- 操作 --------------------------
function handleQuery() {
  getList()
}

function resetQuery() {
  queryParams.menuName = ''
  queryParams.status = ''
  queryParams.visible = ''
  getList()
}

function resetForm() {
  form.parentId = 0
  form.menuType = 'M'
  form.isFrame = '1'
  form.isCache = '0'
  form.visible = '0'
  form.status = '0'
  form.menuName = ''
  form.icon = ''
  form.orderNum = undefined
  form.path = ''
  form.component = ''
  form.perms = ''
  if (menuRef.value) proxy.resetForm(menuRef.value)
}

async function handleAdd(row?: MenuRow) {
  resetForm()
  await getTreeselect()
  form.parentId = row?.menuId || 0
  open.value = true
  title.value = '添加菜单'
}

async function handleUpdate(row: MenuRow) {
  resetForm()
  await getTreeselect()
  const response = await getMenu(row.menuId.toString())
  Object.assign(form, response.data)
  open.value = true
  title.value = '修改菜单'
}

async function handleDelete(row: MenuRow) {
  try {
    await proxy.$modal.confirm(`是否确认删除名称为"${row.menuName}"的数据项?`)
    await delMenu(row.menuId.toString())
    getList()
    proxy.$modal.msgSuccess('删除成功')
  } catch {}
}

function submitForm() {
  if (menuRef.value) {
    menuRef.value.validate((valid: boolean) => {
      if (valid) {
        addMenu(JSON.stringify(form)).then(() => {
          proxy.$modal.msgSuccess('新增成功')
          open.value = false
          getList()
        })
      }
    })
  }
}

// -------------------------- 表格折叠 --------------------------
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

// -------------------------- 初始化 --------------------------
getList()
</script>
