import { apiDept } from '@/data/system/deptApi';
import { useApiDocumentation } from '@/hooks/useApiDocumentation';
const { searchKeyword, filterMethod, selectedApi, filteredApis, getMethodType, selectApi, resetQuery, generateRequestExample, generateResponseExample } = useApiDocumentation(apiDept);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "api-reference-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-header" },
});
const __VLS_0 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    Tecolor: "var(--general)",
    size: "24px",
}));
const __VLS_2 = __VLS_1({
    Tecolor: "var(--general)",
    size: "24px",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "search-box" },
});
const __VLS_4 = {}.MYInput;
/** @type {[typeof __VLS_components.MYInput, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    modelValue: (__VLS_ctx.searchKeyword),
    placeholder: "搜索接口名称、描述或路径...",
    clearable: true,
    prefixIcon: "Search",
    ...{ style: {} },
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}));
const __VLS_6 = __VLS_5({
    modelValue: (__VLS_ctx.searchKeyword),
    placeholder: "搜索接口名称、描述或路径...",
    clearable: true,
    prefixIcon: "Search",
    ...{ style: {} },
    placeholderColor: "var(--navbar-text)",
    textColor: "var(--navbar-text)",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
const __VLS_8 = {}.MYSelect;
/** @type {[typeof __VLS_components.MYSelect, typeof __VLS_components.MYSelect, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    modelValue: (__VLS_ctx.filterMethod),
    placeholder: "筛选请求方法",
    clearable: true,
}));
const __VLS_10 = __VLS_9({
    modelValue: (__VLS_ctx.filterMethod),
    placeholder: "筛选请求方法",
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
const __VLS_12 = {}.MYOption;
/** @type {[typeof __VLS_components.MYOption, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    label: "GET",
    value: "GET",
}));
const __VLS_14 = __VLS_13({
    label: "GET",
    value: "GET",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
const __VLS_16 = {}.MYOption;
/** @type {[typeof __VLS_components.MYOption, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    label: "POST",
    value: "POST",
}));
const __VLS_18 = __VLS_17({
    label: "POST",
    value: "POST",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const __VLS_20 = {}.MYOption;
/** @type {[typeof __VLS_components.MYOption, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    label: "PUT",
    value: "PUT",
}));
const __VLS_22 = __VLS_21({
    label: "PUT",
    value: "PUT",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_24 = {}.MYOption;
/** @type {[typeof __VLS_components.MYOption, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    label: "DELETE",
    value: "DELETE",
}));
const __VLS_26 = __VLS_25({
    label: "DELETE",
    value: "DELETE",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
var __VLS_11;
const __VLS_28 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    ...{ 'onClick': {} },
    type: "info",
    plain: true,
}));
const __VLS_30 = __VLS_29({
    ...{ 'onClick': {} },
    type: "info",
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
let __VLS_32;
let __VLS_33;
let __VLS_34;
const __VLS_35 = {
    onClick: (__VLS_ctx.resetQuery)
};
__VLS_31.slots.default;
var __VLS_31;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "api-main-content" },
});
const __VLS_36 = {}.MYScrollbar;
/** @type {[typeof __VLS_components.MYScrollbar, typeof __VLS_components.MYScrollbar, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    height: "100%",
}));
const __VLS_38 = __VLS_37({
    height: "100%",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
__VLS_39.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "api-list-sidebar" },
});
const __VLS_40 = {}.MYText;
/** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    Tecolor: "var(--general)",
    ...{ class: "sidebar-header" },
}));
const __VLS_42 = __VLS_41({
    Tecolor: "var(--general)",
    ...{ class: "sidebar-header" },
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_43.slots.default;
var __VLS_43;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "api-items" },
});
for (const [api] of __VLS_getVForSourceType((__VLS_ctx.filteredApis))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.selectApi(api);
            } },
        key: (api.key),
        ...{ class: "api-item" },
        ...{ class: ({ active: __VLS_ctx.selectedApi?.key === api.key }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "api-method-tag" },
        ...{ class: (__VLS_ctx.getMethodType(api.method)) },
    });
    (api.method);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "api-info" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "api-url" },
    });
    (api.url);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "api-description" },
    });
    (api.description);
    if (api.requiresAuth) {
        const __VLS_44 = {}.MYButton;
        /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
        // @ts-ignore
        const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
            plain: true,
            type: "warning",
            size: "small",
            ...{ class: "auth-tag" },
        }));
        const __VLS_46 = __VLS_45({
            plain: true,
            type: "warning",
            size: "small",
            ...{ class: "auth-tag" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_45));
        __VLS_47.slots.default;
        var __VLS_47;
    }
}
var __VLS_39;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "api-detail-content" },
});
if (__VLS_ctx.selectedApi) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "api-detail" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "api-detail-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "method-tag-large" },
        ...{ class: (__VLS_ctx.getMethodType(__VLS_ctx.selectedApi.method)) },
    });
    (__VLS_ctx.selectedApi.method);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "api-main-info" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "api-url-large" },
    });
    (__VLS_ctx.selectedApi.url);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "api-description-large" },
    });
    (__VLS_ctx.selectedApi.description);
    if (__VLS_ctx.selectedApi.requiresAuth) {
        const __VLS_48 = {}.MYButton;
        /** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
        // @ts-ignore
        const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
            plain: true,
            type: "warning",
            size: "large",
        }));
        const __VLS_50 = __VLS_49({
            plain: true,
            type: "warning",
            size: "large",
        }, ...__VLS_functionalComponentArgsRest(__VLS_49));
        __VLS_51.slots.default;
        var __VLS_51;
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "detail-section" },
    });
    const __VLS_52 = {}.MYText;
    /** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        Tecolor: "var(--general)",
        size: "20px",
        ...{ class: "basic" },
    }));
    const __VLS_54 = __VLS_53({
        Tecolor: "var(--general)",
        size: "20px",
        ...{ class: "basic" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    __VLS_55.slots.default;
    var __VLS_55;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "custom-table" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-row header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-cell" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-cell-value" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-cell label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-cell value" },
    });
    (__VLS_ctx.selectedApi.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-cell label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-cell value" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "custom-tag method" },
        ...{ class: (__VLS_ctx.getMethodType(__VLS_ctx.selectedApi.method)) },
    });
    (__VLS_ctx.selectedApi.method);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-cell label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-cell value" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "api-path" },
    });
    (__VLS_ctx.selectedApi.url);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-cell label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-cell value" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "custom-tag auth" },
        ...{ class: (__VLS_ctx.selectedApi.requiresAuth ? 'required' : 'not-required') },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "tag-icon" },
    });
    (__VLS_ctx.selectedApi.requiresAuth ? '🔒' : '🔓');
    (__VLS_ctx.selectedApi.requiresAuth ? '需要登录认证' : '无需认证');
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "detail-section" },
    });
    const __VLS_56 = {}.MYText;
    /** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
    // @ts-ignore
    const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
        Tecolor: "var(--general)",
        size: "20px",
        ...{ class: "basic" },
    }));
    const __VLS_58 = __VLS_57({
        Tecolor: "var(--general)",
        size: "20px",
        ...{ class: "basic" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_57));
    __VLS_59.slots.default;
    var __VLS_59;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "code-block" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({
        ...{ class: "language-json" },
    });
    (__VLS_ctx.generateResponseExample(__VLS_ctx.selectedApi));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "detail-section" },
    });
    const __VLS_60 = {}.MYText;
    /** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
        Tecolor: "var(--general)",
        size: "20px",
        ...{ class: "basic" },
    }));
    const __VLS_62 = __VLS_61({
        Tecolor: "var(--general)",
        size: "20px",
        ...{ class: "basic" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    __VLS_63.slots.default;
    var __VLS_63;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "code-block" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({
        ...{ class: "language-javascript" },
    });
    (__VLS_ctx.selectedApi.codeExample || __VLS_ctx.generateRequestExample(__VLS_ctx.selectedApi));
    if (__VLS_ctx.selectedApi.errorResponse) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "detail-section" },
        });
        const __VLS_64 = {}.MYText;
        /** @type {[typeof __VLS_components.MYText, typeof __VLS_components.MYText, ]} */ ;
        // @ts-ignore
        const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
            Tecolor: "var(--general)",
            size: "20px",
            ...{ class: "basic" },
        }));
        const __VLS_66 = __VLS_65({
            Tecolor: "var(--general)",
            size: "20px",
            ...{ class: "basic" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_65));
        __VLS_67.slots.default;
        var __VLS_67;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "code-block" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.pre, __VLS_intrinsicElements.pre)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.code, __VLS_intrinsicElements.code)({
            ...{ class: "language-json" },
        });
        (JSON.stringify(__VLS_ctx.selectedApi.errorResponse, null, 2));
    }
}
/** @type {__VLS_StyleScopedClasses['api-reference-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-header']} */ ;
/** @type {__VLS_StyleScopedClasses['search-box']} */ ;
/** @type {__VLS_StyleScopedClasses['api-main-content']} */ ;
/** @type {__VLS_StyleScopedClasses['api-list-sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar-header']} */ ;
/** @type {__VLS_StyleScopedClasses['api-items']} */ ;
/** @type {__VLS_StyleScopedClasses['api-item']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['api-method-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['api-info']} */ ;
/** @type {__VLS_StyleScopedClasses['api-url']} */ ;
/** @type {__VLS_StyleScopedClasses['api-description']} */ ;
/** @type {__VLS_StyleScopedClasses['auth-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['api-detail-content']} */ ;
/** @type {__VLS_StyleScopedClasses['api-detail']} */ ;
/** @type {__VLS_StyleScopedClasses['api-detail-header']} */ ;
/** @type {__VLS_StyleScopedClasses['method-tag-large']} */ ;
/** @type {__VLS_StyleScopedClasses['api-main-info']} */ ;
/** @type {__VLS_StyleScopedClasses['api-url-large']} */ ;
/** @type {__VLS_StyleScopedClasses['api-description-large']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-section']} */ ;
/** @type {__VLS_StyleScopedClasses['basic']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-table']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['header']} */ ;
/** @type {__VLS_StyleScopedClasses['table-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['table-cell-value']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['table-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['table-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['table-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['table-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['method']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['table-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['table-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['api-path']} */ ;
/** @type {__VLS_StyleScopedClasses['table-row']} */ ;
/** @type {__VLS_StyleScopedClasses['table-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['table-cell']} */ ;
/** @type {__VLS_StyleScopedClasses['value']} */ ;
/** @type {__VLS_StyleScopedClasses['custom-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['auth']} */ ;
/** @type {__VLS_StyleScopedClasses['tag-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-section']} */ ;
/** @type {__VLS_StyleScopedClasses['basic']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['language-json']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-section']} */ ;
/** @type {__VLS_StyleScopedClasses['basic']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['language-javascript']} */ ;
/** @type {__VLS_StyleScopedClasses['detail-section']} */ ;
/** @type {__VLS_StyleScopedClasses['basic']} */ ;
/** @type {__VLS_StyleScopedClasses['code-block']} */ ;
/** @type {__VLS_StyleScopedClasses['language-json']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            searchKeyword: searchKeyword,
            filterMethod: filterMethod,
            selectedApi: selectedApi,
            filteredApis: filteredApis,
            getMethodType: getMethodType,
            selectApi: selectApi,
            resetQuery: resetQuery,
            generateRequestExample: generateRequestExample,
            generateResponseExample: generateResponseExample,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
