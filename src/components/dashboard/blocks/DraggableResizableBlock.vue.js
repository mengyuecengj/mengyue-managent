import BarChartRenderer from '@/components/dashboard/renderers/BarChartRenderer.vue';
import BorderRenderer from '@/components/dashboard/renderers/BorderRenderer.vue';
import TextRenderer from '@/components/dashboard/renderers/TextRenderer.vue';
import MapChartRenderer from '@/components/dashboard/renderers/MapChartRenderer.vue';
import DecorateRenderer from '@/components/dashboard/renderers/DecorateRenderer.vue';
import { useDashboardStore } from '@/store/modules/dashboard';
const props = defineProps();
const store = useDashboardStore();
const isSelected = computed(() => store.selectedId === props.block.id);
const previewMode = computed(() => store.previewMode);
// 拖拽
const startDrag = (e) => {
    if (previewMode.value)
        return;
    store.selectBlock(props.block.id);
    if (e.target.closest('.resize-handle'))
        return;
    const startX = e.clientX - props.block.x;
    const startY = e.clientY - props.block.y;
    let newX = props.block.x;
    let newY = props.block.y;
    const move = (e) => {
        newX = e.clientX - startX;
        newY = e.clientY - startY;
    };
    const up = () => {
        store.updateBlock(props.block.id, {
            x: newX,
            y: newY
        });
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
};
// 缩放
const startResize = (e) => {
    if (previewMode.value)
        return;
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = parseInt(props.block.width);
    const startH = parseInt(props.block.height);
    let newWidth = startW;
    let newHeight = startH;
    const move = (e) => {
        const w = startW + (e.clientX - startX);
        const h = startH + (e.clientY - startY);
        newWidth = Math.max(200, w);
        newHeight = Math.max(100, h);
    };
    const up = () => {
        store.updateBlock(props.block.id, {
            width: newWidth.toString(),
            height: newHeight.toString()
        });
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['chart-block']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-block']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-block']} */ ;
/** @type {__VLS_StyleScopedClasses['border-type']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['resize-handle']} */ ;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.block.visible) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onMousedown: (__VLS_ctx.startDrag) },
        ...{ class: "chart-block" },
        ...{ style: ({
                position: 'absolute',
                left: __VLS_ctx.block.x + 'px',
                top: __VLS_ctx.block.y + 'px',
                width: __VLS_ctx.block.width + 'px',
                height: __VLS_ctx.block.height + 'px',
                zIndex: __VLS_ctx.block.zIndex,
            }) },
        ...{ class: ({
                active: __VLS_ctx.isSelected,
                'border-type': __VLS_ctx.block.rendererType === 'border'
            }) },
    });
    if (__VLS_ctx.block.rendererType === 'text') {
        /** @type {[typeof TextRenderer, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(TextRenderer, new TextRenderer({
            config: (__VLS_ctx.block.config),
            width: (parseInt(__VLS_ctx.block.width)),
            height: (parseInt(__VLS_ctx.block.height)),
        }));
        const __VLS_1 = __VLS_0({
            config: (__VLS_ctx.block.config),
            width: (parseInt(__VLS_ctx.block.width)),
            height: (parseInt(__VLS_ctx.block.height)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    }
    else if (__VLS_ctx.block.rendererType === 'chart') {
        /** @type {[typeof BarChartRenderer, ]} */ ;
        // @ts-ignore
        const __VLS_3 = __VLS_asFunctionalComponent(BarChartRenderer, new BarChartRenderer({
            config: (__VLS_ctx.block.config),
            color: (__VLS_ctx.block.color),
        }));
        const __VLS_4 = __VLS_3({
            config: (__VLS_ctx.block.config),
            color: (__VLS_ctx.block.color),
        }, ...__VLS_functionalComponentArgsRest(__VLS_3));
    }
    else if (__VLS_ctx.block.rendererType === 'border') {
        /** @type {[typeof BorderRenderer, ]} */ ;
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(BorderRenderer, new BorderRenderer({
            component: (__VLS_ctx.block.component),
            config: (__VLS_ctx.block.config),
            width: (parseInt(__VLS_ctx.block.width)),
            height: (parseInt(__VLS_ctx.block.height)),
            color: (__VLS_ctx.block.config.color),
            backgroundColor: (__VLS_ctx.block.backgroundColor),
        }));
        const __VLS_7 = __VLS_6({
            component: (__VLS_ctx.block.component),
            config: (__VLS_ctx.block.config),
            width: (parseInt(__VLS_ctx.block.width)),
            height: (parseInt(__VLS_ctx.block.height)),
            color: (__VLS_ctx.block.config.color),
            backgroundColor: (__VLS_ctx.block.backgroundColor),
        }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    }
    else if (__VLS_ctx.block.rendererType === 'map') {
        /** @type {[typeof MapChartRenderer, ]} */ ;
        // @ts-ignore
        const __VLS_9 = __VLS_asFunctionalComponent(MapChartRenderer, new MapChartRenderer({
            config: (__VLS_ctx.block.config),
            width: (parseInt(__VLS_ctx.block.width)),
            height: (parseInt(__VLS_ctx.block.height)),
            component: (__VLS_ctx.block.component),
        }));
        const __VLS_10 = __VLS_9({
            config: (__VLS_ctx.block.config),
            width: (parseInt(__VLS_ctx.block.width)),
            height: (parseInt(__VLS_ctx.block.height)),
            component: (__VLS_ctx.block.component),
        }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    }
    else if (__VLS_ctx.block.rendererType === 'decoration') {
        /** @type {[typeof DecorateRenderer, ]} */ ;
        // @ts-ignore
        const __VLS_12 = __VLS_asFunctionalComponent(DecorateRenderer, new DecorateRenderer({
            config: (__VLS_ctx.block.config),
            component: (__VLS_ctx.block.component),
            width: (parseInt(__VLS_ctx.block.width)),
            height: (parseInt(__VLS_ctx.block.height)),
        }));
        const __VLS_13 = __VLS_12({
            config: (__VLS_ctx.block.config),
            component: (__VLS_ctx.block.component),
            width: (parseInt(__VLS_ctx.block.width)),
            height: (parseInt(__VLS_ctx.block.height)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
        ...{ onMousedown: (__VLS_ctx.startResize) },
        ...{ class: "resize-handle" },
    });
}
/** @type {__VLS_StyleScopedClasses['chart-block']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['border-type']} */ ;
/** @type {__VLS_StyleScopedClasses['resize-handle']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            BarChartRenderer: BarChartRenderer,
            BorderRenderer: BorderRenderer,
            TextRenderer: TextRenderer,
            MapChartRenderer: MapChartRenderer,
            DecorateRenderer: DecorateRenderer,
            isSelected: isSelected,
            startDrag: startDrag,
            startResize: startResize,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
