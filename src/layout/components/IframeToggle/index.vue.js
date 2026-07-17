import InnerLink from "../InnerLink/index.vue";
import useTagsViewStore from "@/store/modules/tagsView";
import { useRoute } from "vue-router";
const route = useRoute();
const tagsViewStore = useTagsViewStore();
function iframeUrl(url, query) {
    if (Object.keys(query).length > 0) {
        let params = Object.keys(query).map((key) => key + "=" + query[key]).join("&");
        return url + "?" + params;
    }
    return url;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.tagsViewStore.iframeViews))) {
    /** @type {[typeof InnerLink, typeof InnerLink, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(InnerLink, new InnerLink({
        key: (item.path),
        iframeId: ('iframe' + index),
        src: (__VLS_ctx.iframeUrl(item.meta.link, item.query)),
    }));
    const __VLS_1 = __VLS_0({
        key: (item.path),
        iframeId: ('iframe' + index),
        src: (__VLS_ctx.iframeUrl(item.meta.link, item.query)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    __VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.route.path === item.path) }, null, null);
}
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            InnerLink: InnerLink,
            route: route,
            tagsViewStore: tagsViewStore,
            iframeUrl: iframeUrl,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
