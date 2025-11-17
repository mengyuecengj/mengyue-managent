<template>
  <MYForm ref="userRef" :model="form" :rules="rules" label-width="80px">
    <MYForm-item label="用户昵称" prop="nickName">
      <MYInput v-model="form.nickName" maxlength="30" placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
    </MYForm-item>
    <MYForm-item label="手机号码" prop="phonenumber">
      <MYInput v-model="form.phonenumber" maxlength="11" placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
    </MYForm-item>
    <MYForm-item label="邮箱" prop="email">
      <MYInput v-model="form.email" maxlength="50" placeholderColor="var(--navbar-text)" textColor="var(--navbar-text)" />
    </MYForm-item>
    <!-- <MYForm-item label="性别">
      <MYRaio-group v-model="form.sex">
        <MYRadio v-for="dict in sys_user_sex" :value="dict.value">{{ dict.label }}</MYRadio>
      </MYRaio-group>
    </MYForm-item> -->
    <MYForm-item>
      <MYButton type="primary" @click="submit">保存</MYButton>
      <MYButton style="margin-left: 30px;" type="danger" @click="close">关闭</MYButton>
    </MYForm-item>
  </MYForm>
</template>

<script setup lang="ts">
import modal from "@/plugins/modal";
import tab from '@/plugins/tab'
import { updateUserProfile } from "@/api/system/user";
import { ComponentInternalInstance } from "vue";
import { useDict } from '@/utils/dict'
import { DictResult } from "@/types/views/user";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_user_sex } = useDict("sys_normal_disable", "sys_user_sex") as unknown as DictResult;

const props = defineProps({
  user: {
    type: Object,
    phonenumber: "",
    email: "",
  }
}) as any;


const form = ref({
  nickName: "",
  phonenumber: "",
  email: "",
  sex: "0",
});
const rules = ref({
  nickName: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
  email: [{ required: true, message: "邮箱地址不能为空", trigger: "blur" }, { type: "email" as const, message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }],
  phonenumber: [{ required: true, message: "手机号码不能为空", trigger: "blur" }, { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }],
});

/** 提交按钮 */
function submit() {
  (proxy?.$refs.userRef as any).validate((valid: boolean) => {
    if (valid) {
      updateUserProfile(form.value).then(response => {
        modal.msgSuccess("修改成功");
        props.user.phonenumber = form.value.phonenumber;
        props.user.email = form.value.email;
      });
    }
  });
};

/** 关闭按钮 */
function close() {
  // tab.closePage();
  // 返回上一个页面或首页
  if (history.length > 1) {
    window.history.back();
  } else {
    tab.closePage('/'); // 或指定你想返回的页面
  }
};

// 回显当前登录用户信息
watch(() => props.user, user => {
  if (user) {
    form.value = { nickName: user.nickName, phonenumber: user.phonenumber, email: user.email, sex: user.sex };
  }
}, { immediate: true });
</script>
