<template>
   <div class="app-container">
      <MYRow :gutter="20">
         <MYCol :span="6" :xs="24">
            <MYCard class="box-card">
               <template v-slot:header>
                  <div class="clearfix">
                     <span class="person">个人信息</span>
                  </div>
                  <MYBorder borderStyle="solid" borderColor="rgba(0, 0, 0, 0.1)" />
               </template>
               <template #body>
                  <div>
                     <div class="text-center">
                        <userAvatar />
                     </div>
                     <ul class="list-group list-group-striped">
                        <li class="list-group-item">
                           <svg-icon icon-class="user" />
                           <span>用户名称</span>
                           <div class="pull-right">{{ state.user.userName }}</div>
                        </li>
                        <li class="list-group-item">
                           <svg-icon icon-class="phone" />
                           <span>手机号码</span>
                           <div class="pull-right">{{ state.user.phonenumber }}</div>
                        </li>
                        <li class="list-group-item">
                           <svg-icon icon-class="email" />
                           <span>用户邮箱</span>
                           <div class="pull-right">{{ state.user.email }}</div>
                        </li>
                        <li class="list-group-item">
                           <svg-icon icon-class="tree" />
                           <span>所属部门</span>
                           <div class="pull-right" v-if="state.user.dept">{{ state.user.dept.deptName }} / {{
                              state.postGroup }}</div>
                        </li>
                        <li class="list-group-item">
                           <svg-icon icon-class="peoples" />
                           <span>所属角色</span>
                           <div class="pull-right">{{ state.roleGroup }}</div>
                        </li>
                        <li class="list-group-item">
                           <svg-icon icon-class="date" />
                           <span>创建日期</span>
                           <div class="pull-right">{{ state.user.createTime }}</div>
                        </li>
                     </ul>
                  </div>
               </template>
            </MYCard>
         </MYCol>
         <MYCol :span="18" :xs="24">
            <MYCard class="box-card">
               <template v-slot:header>
                  <div class="clearfix">
                     <span class="person">基本资料</span>
                  </div>
                  <MYBorder borderStyle="solid" borderColor="rgba(0, 0, 0, 0.1)" />
               </template>
               <template #body>
                  <userInfo :user="state.user" />
               </template>
            </MYCard>
         </MYCol>
      </MYRow>
   </div>
</template>

<script setup name="Profile" lang="ts">
import userAvatar from "./userAvatar.vue";
import userInfo from "./userInfo.vue";
import resetPwd from "./resetPwd.vue";
import { getUserProfile } from "@/api/system/user";

const activeTab = ref("userinfo");
const state = reactive({
   user: {
      userName: "",
      nickName: "",
      email: "",
      phonenumber: "",
      sex: "",
      avatar: "",
      dept: {
         deptName: ""
      },
      createTime: ""
   },
   roleGroup: {},
   postGroup: {}
});

function getUser() {
   getUserProfile().then((response: any) => {
      state.user = response.data;
      state.roleGroup = response.roleGroup;
      state.postGroup = response.postGroup;
   });
};

getUser();
</script>
<style scoped lang="scss">
.box-card {
   background-color: transparent;
   box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);

   .clearfix .person {
      font-size: 16px;
      color: var(--general);
      font-weight: 600;
   }

   .text-center {
      display: flex;
      justify-content: center;
      cursor: pointer;
   }

   .list-group {
      margin-top: 30px;

      .list-group-item {
         border-top: 1px solid rgba(0, 0, 0, 0.1);
         border-bottom: 1px solid rgba(0, 0, 0, 0.1);
         line-height: 30px;
         display: flex;
         align-items: center;
         flex-wrap: nowrap;
         font-size: 14px;

         span {
            margin-left: 10px;
         }

         .pull-right {
            margin-left: auto;
         }
      }
   }
}
</style>