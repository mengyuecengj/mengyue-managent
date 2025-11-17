<!-- 这个组件的主要作用是根据当前路由和 iframe 视图配置，动态渲染多个 iframe 元素。通过这种方式，可以在后台管理系统中集成外部网页或需要在独立 iframe 中渲染的页面。每个 iframe 的显示由路由路径控制，确保了每个 iframe 只在对应的页面中显示。 -->
<template>
  <inner-link v-for="(item, index) in tagsViewStore.iframeViews" :key="item.path" :iframeId="'iframe' + index"
    v-show="route.path === item.path"
    :src="iframeUrl(item.meta.link!, item.query as unknown as QueryParams)"></inner-link>
</template>

<script setup lang="ts">
import InnerLink from "../InnerLink/index.vue";
import useTagsViewStore from "@/store/modules/tagsView";
import { useRoute } from "vue-router";
interface QueryParams {
  [key: string]: string | number | boolean; // or whatever types your query params can be
}
const route = useRoute();
const tagsViewStore = useTagsViewStore();

function iframeUrl(url: string, query: QueryParams) {
  if (Object.keys(query).length > 0) {
    let params = Object.keys(query).map((key) => key + "=" + query[key]).join("&");
    return url + "?" + params;
  }
  return url;
}
</script>
