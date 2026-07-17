<template>
  <div class="app-container">
    <h4 style="color: var(--general);">{{ t('system.user.authRole.basicInfo') }}</h4>
    <MYForm :model-value="form" label-width="80">
      <MYRow>
        <MYCol :span="8" :offset="2">
          <MYForm-item :label="t('system.user.authRole.form.nickName')" prop="nickName">
            <MYInput v-model="form.nickName" disabled placeholder-color="var(--navbar-text)"
              text-color="var(--navbar-text)" />
          </MYForm-item>
        </MYCol>
        <MYCol :span="8" :offset="2">
          <MYForm-item :label="t('system.user.authRole.form.userName')" prop="userName">
            <MYInput v-model="form.userName" disabled placeholder-color="var(--navbar-text)"
              text-color="var(--navbar-text)" />
          </MYForm-item>
        </MYCol>
      </MYRow>
    </MYForm>
    <h4 style="color: var(--general);">{{ t('system.user.authRole.roleInfo') }}</h4>
    <MYTable v-loading="loading" row-key="roleId" ref="roleRef" @selection-change="handleSelectionChange"
      :data="roles.slice((pageNum - 1) * pageSize, pageNum * pageSize)" header-background-color="var(--table-header-bg)"
      border-color="var(--table-border-color)" body-background-color="var(--table-body-bg)"
      header-text-color="var(--general)" body-text-color="var(--general)">
      <MYTable-column :label="t('system.user.authRole.table.index')" width="55" type="index" align="center">
        <template #default="scope">
          <span>{{ (pageNum - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </MYTable-column>
      <MYTable-column type="selection" :reserve-selection="true" :selectable="checkSelectable" width="55" />
      <MYTable-column :label="t('system.user.authRole.table.roleId')" align="center" prop="roleId" />
      <MYTable-column :label="t('system.user.authRole.table.roleName')" align="center" prop="roleName" />
      <MYTable-column :label="t('system.user.authRole.table.roleKey')" align="center" prop="roleKey" />
      <MYTable-column :label="t('system.user.authRole.table.createTime')" align="center" prop="createTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </MYTable-column>
    </MYTable>
    <pagination class="pagination-container" v-show="total > 0" :total="total" v-model:page="pageNum"
      v-model:limit="pageSize" />
    <div style="text-align: center;">
      <MYButton type="primary" @click="submitForm()">{{ t('system.user.authRole.button.submit') }}</MYButton>
      <MYButton type="info" @click="close()" style="margin-left: 20px;">{{ t('system.user.authRole.button.back') }}</MYButton>
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
import { useI18n } from 'vue-i18n'; // 新增导入

const { t } = useI18n(); // 新增i18n实例
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

// 多选框选中的数据
function handleSelectionChange(selection: Role[]): void {
  roleIds.value = selection.map(item => item.roleId);
}

// 检查角色状态
function checkSelectable(row: Role): boolean {
  return row.status === '0';
}

// 关闭按钮
function close(): void {
  modal.msgSuccess(t('system.user.authRole.button.back'))
  router.push("/system/user")
}

// 提交按钮
function submitForm(): void {
  const userId = form.value.userId;
  const rIds = roleIds.value.join(",");
  updateAuthRole({ userId: userId, roleIds: rIds }).then((res) => {
    modal.msgSuccess(t('system.user.authRole.button.submit') + "成功");
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
      loading.value = false;
    });
  }
})();
</script>