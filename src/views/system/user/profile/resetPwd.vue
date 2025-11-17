<template>
  <MYForm ref="pwdRef" :model="user" :rules="rules" label-width="80px">
    <MYForm-item label="旧密码" prop="oldPassword">
      <MYInput v-model="user.oldPassword" placeholder="请输入旧密码" type="password" show-password />
    </MYForm-item>
    <MYForm-item label="新密码" prop="newPassword">
      <MYInput v-model="user.newPassword" placeholder="请输入新密码" type="password" show-password />
    </MYForm-item>
    <MYForm-item label="确认密码" prop="confirmPassword">
      <MYInput v-model="user.confirmPassword" placeholder="请确认新密码" type="password" show-password />
    </MYForm-item>
    <MYForm-item>
      <MYButton type="primary" @click="submit">保存</MYButton>
      <MYButton type="danger" @click="close">关闭</MYButton>
    </MYForm-item>
  </MYForm>
</template>

<script setup lang="ts">
import tab from '@/plugins/tab'
import modal from '@/plugins/modal';
import { updateUserPwd } from "@/api/system/user";
import { getCurrentInstance, reactive, ref } from 'vue';

const { proxy } = getCurrentInstance() as any;

const user = reactive({
  oldPassword: undefined,
  newPassword: undefined,
  confirmPassword: undefined
});

const equalToPassword = (rule: any, value: any, callback: any) => {
  if (user.newPassword !== value) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};

const rules = ref({
  oldPassword: [{ required: true, message: "旧密码不能为空", trigger: "blur" }],
  newPassword: [{ required: true, message: "新密码不能为空", trigger: "blur" }, { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }, { pattern: /^[^<>"'|\\]+$/, message: "不能包含非法字符：< > \" ' \\\ |", trigger: "blur" }],
  confirmPassword: [{ required: true, message: "确认密码不能为空", trigger: "blur" }, { required: true, validator: equalToPassword, trigger: "blur" }]
});

/** 提交按钮 */
function submit() {
  proxy.$refs.pwdRef.validate((valid: boolean) => {
    if (valid) {
      updateUserPwd(user.oldPassword, user.newPassword).then(response => {
        modal.msgSuccess("修改成功");
      });
    }
  });
};

/** 关闭按钮 */
function close() {
  if (history.length > 1) {
    window.history.back();
  } else {
    tab.closePage('/')
  }
};
</script>
