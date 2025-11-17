<template>
  <div class="app-container">
    <h4 style="color: var(--general);">基本信息</h4>
    <MYForm :model-value="form" labelWidth="80">
      <MYRow>
        <MYCol :span="8" :offset="2">
          <MYForm-item label="用户昵称" prop="nickName">
            <MYInput v-model="form.nickName" disabled placeholderColor="var(--navbar-text)"
              textColor="var(--navbar-text)" />
          </MYForm-item>
        </MYCol>
        <MYCol :span="8" :offset="2">
          <MYForm-item label="登录账号" prop="userName">
            <MYInput v-model="form.userName" disabled placeholderColor="var(--navbar-text)"
              textColor="var(--navbar-text)" />
          </MYForm-item>
        </MYCol>
      </MYRow>
    </MYForm>
    <h4 style="color: var(--general);">角色信息</h4>
    <MYTable v-loading="loading" row-key="roleId" ref="roleRef" @selection-change="handleSelectionChange"
      :data="roles.slice((pageNum - 1) * pageSize, pageNum * pageSize)" headerBackgroundColor="var(--table-header-bg)"
      borderColor="var(--table-border-color)" bodyBackgroundColor="var(--table-body-bg)"
      headerTextColor="var(--general)" bodyTextColor="var(--general)">
      <MYTable-column label="序号" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </MYTable-column>
      <MYTable-column type="selection" :reserve-selection="true" :selectable="checkSelectable" width="55" />
      <MYTable-column label="角色编号" align="center" prop="roleId" />
      <MYTable-column label="角色名称" align="center" prop="roleName" />
      <MYTable-column label="权限字符" align="center" prop="roleKey" />
      <MYTable-column label="创建时间" align="center" prop="createTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </MYTable-column>
    </MYTable>
    <pagination class="pagination-container" v-show="total > 0" :total="total" v-model:page="pageNum"
      v-model:limit="pageSize" />
    <div style="text-align: center;">
      <MYButton type="primary" @click="submitForm()">提交</MYButton>
      <MYButton type="info" @click="close()" style="margin-left: 20px;">返回</MYButton>
    </div>
  </div>
</template>

<script setup lang="ts" name="AuthRole">
import modal from '@/plugins/modal'
import tab from '@/plugins/tab'
import { useRoute } from 'vue-router';
import { parseTime } from '@/utils/general'
import { getAuthRole, updateAuthRole } from '@/api/system/user';
import { Role, UserInfo } from '@/types/views/userAuthRole';
import { useRouter } from 'vue-router'
import { MYInput } from 'mengyue-plus';

const route = useRoute();
const router = useRouter();
const loading = ref<boolean>(true);
const pageNum = ref<number>(1);
const pageSize = ref<number>(10);
const roleIds = ref<(number | string)[]>([]);
const roles = ref<Role[]>([]);
const total = ref<number>(0);

const form = ref<UserInfo>({
  nickName: undefined,
  userName: undefined,
  userId: undefined
});

// 单机选中的行数
// function clickRow(row: Role): void {
//   if(checkSelectable(row)) {
//     refs["roleRef"].toggleRowSelection(row);
//   }
// }

// 多选框选中的数据
function handleSelectionChange(selection: Role[]): void {
  roleIds.value = selection.map(item => item.roleId);
}

// 保存选中的数据编号
function getRowKey(row: Role) {
  return row.roleId.toString();
}

// 检查角色状态
function checkSelectable(row: Role): boolean {
  return row.status === '0';
}

// 关闭按钮
function close(): void {
  modal.msgSuccess("返回用户管理页")
  router.push("/system/user")
  // const obj = { path: "/system/user" };
  // tab.closeOpenPage(obj.path);
}

// 提交按钮
function submitForm(): void {
  const userId = form.value.userId;
  const rIds = roleIds.value.join(",");
  updateAuthRole({ userId: userId, roleIds: rIds }).then((res) => {
    modal.msgSuccess("授权成功");
    close();
  });
};

// 初始化加载数据
(() => {
  const userId = route.params?.userId as string | undefined;
  if (userId) {
    loading.value = true;
    getAuthRole(userId).then((response: any) => {
      form.value = response.user;
      roles.value = response.roles;
      total.value = roles.value.length;
      // nextTick(() => {
      //   roles.value.forEach((row: Role) => {
      //     if(row.flag) {
      //       proxy.$refs["roleRef"].toggleRowSelection(row);
      //     }
      //   });
      // });
      loading.value = false;
    });
  }
})();
</script>

<style lang="scss" scoped></style>
