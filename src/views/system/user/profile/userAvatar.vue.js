import modal from "@/plugins/modal";
import { uploadAvatar } from "@/api/system/user";
import useUserStore from "@/store/modules/user";
const userStore = useUserStore();
const { proxy } = getCurrentInstance();
const wrapper = ref();
// 常量
const cropperSize = 400;
const magnifierSize = cropperSize / 2;
const scale = ref(0.5); // 初始缩放倍数为 1（原始大小）
const rotation = ref(0); // 0, 90, 180, 270
// 状态
const previewData = ref('');
const magnifierCroppedData = ref('');
const open = ref(false);
const title = ref("修改头像");
const magnifierVisible = ref(false);
const dragging = ref(false);
const magnifierPos = ref({ x: cropperSize / 2, y: cropperSize / 2 });
const options = reactive({
    img: userStore.avatar,
    filename: 'avatar'
});
// 方法
function editCropper() {
    open.value = true;
}
function onDragStart() {
    dragging.value = true;
}
function onDragEnd() {
    dragging.value = false;
}
function onMagnifierMove(e) {
    if (!dragging.value)
        return;
    const rect = wrapper.value.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    const half = magnifierSize / 2;
    x = Math.max(half, Math.min(cropperSize - half, x));
    y = Math.max(half, Math.min(cropperSize - half, y));
    magnifierPos.value = { x, y };
    updateMagnifierCropped();
}
function onWheel(e) {
    e.preventDefault();
    const next = scale.value - e.deltaY * 0.0015;
    scale.value = Math.min(3, Math.max(0.2, next));
    updateMagnifierCropped();
}
const imageStyle = computed(() => {
    const width = cropperSize * scale.value;
    const height = cropperSize * scale.value;
    const left = (cropperSize - width) / 2;
    const top = (cropperSize - height) / 2;
    return {
        width: `${width}px`,
        height: `${height}px`,
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        transform: `rotate(${rotation.value}deg)`,
        transition: 'transform 0.2s'
    };
});
function updateMagnifierCropped() {
    const imgSrc = previewData.value || options.img;
    if (!imgSrc || !wrapper.value)
        return;
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = magnifierSize;
        canvas.height = magnifierSize;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        // 计算缩放和裁剪区域
        const originalWidth = img.width;
        const originalHeight = img.height;
        const displayWidth = cropperSize * scale.value;
        const displayHeight = cropperSize * scale.value;
        const scaleX = originalWidth / displayWidth;
        const scaleY = originalHeight / displayHeight;
        const half = magnifierSize / 2;
        const offsetX = (cropperSize - displayWidth) / 2;
        const offsetY = (cropperSize - displayHeight) / 2;
        const sx = (magnifierPos.value.x - offsetX - half) * scaleX;
        const sy = (magnifierPos.value.y - offsetY - half) * scaleY;
        // 旋转画布
        ctx.save();
        ctx.translate(magnifierSize / 2, magnifierSize / 2);
        ctx.rotate((rotation.value * Math.PI) / 180);
        ctx.translate(-magnifierSize / 2, -magnifierSize / 2);
        if (rotation.value % 180 === 0) {
            ctx.drawImage(img, sx, sy, magnifierSize * scaleX, magnifierSize * scaleY, 0, 0, magnifierSize, magnifierSize);
        }
        else {
            ctx.drawImage(img, sx, sy, magnifierSize * scaleX, magnifierSize * scaleY, 0, 0, magnifierSize, magnifierSize);
        }
        ctx.restore();
        magnifierCroppedData.value = canvas.toDataURL();
    };
}
const magnifierStyle = computed(() => ({
    left: `${magnifierPos.value.x - magnifierSize / 2}px`,
    top: `${magnifierPos.value.y - magnifierSize / 2}px`,
    width: `${magnifierSize}px`,
    height: `${magnifierSize}px`
}));
function modalOpened() {
    magnifierPos.value = { x: cropperSize / 2, y: cropperSize / 2 };
    updateMagnifierCropped();
}
function rotateLeft() {
    rotation.value = (rotation.value - 90 + 360) % 360;
    updateMagnifierCropped();
}
function rotateRight() {
    rotation.value = (rotation.value + 90) % 360;
    updateMagnifierCropped();
}
function changeScale(num) {
    scale.value = Math.min(3, Math.max(0.2, scale.value + num * 0.05));
    updateMagnifierCropped();
}
function beforeUpload(file) {
    if (!file.type.includes("image/")) {
        modal.msgError("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。");
        return false;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        options.img = reader.result;
        options.filename = file.name;
        previewData.value = reader.result;
        updateMagnifierCropped();
    };
    return true;
}
function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
async function uploadImg() {
    if (!magnifierCroppedData.value) {
        modal.msgError("请先选择图片");
        return;
    }
    const blob = dataURLtoBlob(magnifierCroppedData.value);
    const formData = new FormData();
    formData.append("avatarfile", blob, options.filename || "avatar.png");
    try {
        const res = await uploadAvatar(formData);
        open.value = false;
        const imgUrl = import.meta.env.VITE_APP_BASE_API + res.imgUrl;
        options.img = imgUrl;
        userStore.avatar = imgUrl;
        modal.msgSuccess("上传成功");
        proxy?.$emit("success", res);
    }
    catch (error) {
        modal.msgError("上传失败");
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['user-info-head']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar-upload-preview']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.editCropper();
        } },
    ...{ class: "user-info-head" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.options.img),
    title: "点击上传头像",
    ...{ class: "img-circle img-lg" },
});
const __VLS_0 = {}.MYDialog;
/** @type {[typeof __VLS_components.MYDialog, typeof __VLS_components.MYDialog, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    title: "搜索",
    modelValue: (__VLS_ctx.open),
    width: "900px",
    height: "540px",
    backgroundColor: "#0F1115",
}));
const __VLS_2 = __VLS_1({
    title: "搜索",
    modelValue: (__VLS_ctx.open),
    width: "900px",
    height: "540px",
    backgroundColor: "#0F1115",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "dialog-avatar" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ onMousedown: (__VLS_ctx.onDragStart) },
    ...{ onMousemove: (__VLS_ctx.onMagnifierMove) },
    ...{ onMouseup: (__VLS_ctx.onDragEnd) },
    ...{ onMouseleave: (__VLS_ctx.onDragEnd) },
    ...{ onMouseenter: (...[$event]) => {
            __VLS_ctx.magnifierVisible = true;
        } },
    ...{ onWheel: (__VLS_ctx.onWheel) },
    ...{ class: "cropper-wrapper" },
    ref: "wrapper",
});
/** @type {typeof __VLS_ctx.wrapper} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.previewData || __VLS_ctx.options.img),
    ...{ class: "cropper-container" },
    ...{ style: (__VLS_ctx.imageStyle) },
    alt: "",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "magnifier" },
    ...{ style: (__VLS_ctx.magnifierStyle) },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.magnifierVisible) }, null, null);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "magnifier-border" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "avatar-upload-preview" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.magnifierCroppedData),
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "footer" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "upload" },
});
const __VLS_4 = {}.MYUpload;
/** @type {[typeof __VLS_components.MYUpload, typeof __VLS_components.MYUpload, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    action: "#",
    showFileList: (false),
    beforeUpload: (__VLS_ctx.beforeUpload),
}));
const __VLS_6 = __VLS_5({
    action: "#",
    showFileList: (false),
    beforeUpload: (__VLS_ctx.beforeUpload),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
const __VLS_8 = {}.MYUploadminimalistic;
/** @type {[typeof __VLS_components.MYUploadminimalistic, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    size: "14px",
}));
const __VLS_10 = __VLS_9({
    size: "14px",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ style: {} },
});
var __VLS_7;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "action" },
});
const __VLS_12 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYPlus",
}));
const __VLS_14 = __VLS_13({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYPlus",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_16;
let __VLS_17;
let __VLS_18;
const __VLS_19 = {
    onClick: (...[$event]) => {
        __VLS_ctx.changeScale(1);
    }
};
__VLS_15.slots.default;
var __VLS_15;
const __VLS_20 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYMinus",
}));
const __VLS_22 = __VLS_21({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYMinus",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
let __VLS_24;
let __VLS_25;
let __VLS_26;
const __VLS_27 = {
    onClick: (...[$event]) => {
        __VLS_ctx.changeScale(-1);
    }
};
__VLS_23.slots.default;
var __VLS_23;
const __VLS_28 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYRefreshRight",
}));
const __VLS_30 = __VLS_29({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYRefreshRight",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
let __VLS_32;
let __VLS_33;
let __VLS_34;
const __VLS_35 = {
    onClick: (...[$event]) => {
        __VLS_ctx.rotateRight();
    }
};
__VLS_31.slots.default;
var __VLS_31;
const __VLS_36 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYRefreshLeft",
}));
const __VLS_38 = __VLS_37({
    ...{ 'onClick': {} },
    type: "primary",
    icon: "MYRefreshLeft",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
let __VLS_40;
let __VLS_41;
let __VLS_42;
const __VLS_43 = {
    onClick: (...[$event]) => {
        __VLS_ctx.rotateLeft();
    }
};
__VLS_39.slots.default;
var __VLS_39;
const __VLS_44 = {}.MYButton;
/** @type {[typeof __VLS_components.MYButton, typeof __VLS_components.MYButton, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_46 = __VLS_45({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
let __VLS_48;
let __VLS_49;
let __VLS_50;
const __VLS_51 = {
    onClick: (...[$event]) => {
        __VLS_ctx.uploadImg();
    }
};
__VLS_47.slots.default;
var __VLS_47;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['user-info-head']} */ ;
/** @type {__VLS_StyleScopedClasses['img-circle']} */ ;
/** @type {__VLS_StyleScopedClasses['img-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-avatar']} */ ;
/** @type {__VLS_StyleScopedClasses['cropper-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['cropper-container']} */ ;
/** @type {__VLS_StyleScopedClasses['magnifier']} */ ;
/** @type {__VLS_StyleScopedClasses['magnifier-border']} */ ;
/** @type {__VLS_StyleScopedClasses['avatar-upload-preview']} */ ;
/** @type {__VLS_StyleScopedClasses['footer']} */ ;
/** @type {__VLS_StyleScopedClasses['upload']} */ ;
/** @type {__VLS_StyleScopedClasses['action']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            wrapper: wrapper,
            previewData: previewData,
            magnifierCroppedData: magnifierCroppedData,
            open: open,
            magnifierVisible: magnifierVisible,
            options: options,
            editCropper: editCropper,
            onDragStart: onDragStart,
            onDragEnd: onDragEnd,
            onMagnifierMove: onMagnifierMove,
            onWheel: onWheel,
            imageStyle: imageStyle,
            magnifierStyle: magnifierStyle,
            rotateLeft: rotateLeft,
            rotateRight: rotateRight,
            changeScale: changeScale,
            beforeUpload: beforeUpload,
            uploadImg: uploadImg,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
