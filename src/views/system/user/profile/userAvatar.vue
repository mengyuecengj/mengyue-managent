<template>
  <div class="user-info-head" @click="editCropper()">
    <img :src="options.img" title="点击上传头像" class="img-circle img-lg" />
    <MYDialog title="搜索" v-model="open" width="900px" height="540px" backgroundColor="#0F1115">
      <div class="dialog-avatar">
        <div class="cropper-wrapper" @mousedown.prevent="onDragStart" @mousemove="onMagnifierMove" @mouseup="onDragEnd"
          @mouseleave="onDragEnd" @mouseenter="magnifierVisible = true" @wheel="onWheel" ref="wrapper">
          <img :src="previewData || options.img" class="cropper-container" :style="imageStyle" alt="" />
          <div class="magnifier" v-show="magnifierVisible" :style="magnifierStyle">
            <div class="magnifier-border"></div>
          </div>
        </div>
        <div class="avatar-upload-preview">
          <img :src="magnifierCroppedData" />
        </div>
      </div>
      <br />
      <div class="footer">
        <div class="upload">
          <MYUpload action="#" :show-file-list="false" :before-upload="beforeUpload">
            <MYUploadminimalistic size="14px" />
            <span style="margin-left: 10px;">点击上传</span>
          </MYUpload>
        </div>
        <div class="action">
          <MYButton type="primary" icon="MYPlus" @click="changeScale(1)">放大</MYButton>
          <MYButton type="primary" icon="MYMinus" @click="changeScale(-1)">缩小</MYButton>
          <MYButton type="primary" icon="MYRefreshRight" @click="rotateRight()">右旋转</MYButton>
          <MYButton type="primary" icon="MYRefreshLeft" @click="rotateLeft()">左旋转</MYButton>
        </div>
        <MYButton type="primary" @click="uploadImg()">提 交</MYButton>

      </div>
    </MYDialog>
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, ComponentInternalInstance } from "vue";
import modal from "@/plugins/modal";
import { uploadAvatar } from "@/api/system/user";
import useUserStore from "@/store/modules/user";
import { Position, AvatarOptions, UploadResponse } from "@/types/views/userAvatar";

const userStore = useUserStore();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const wrapper = ref<HTMLElement>();

// 常量
const cropperSize = 400;
const magnifierSize = cropperSize / 2;
const scale = ref<number>(0.5); // 初始缩放倍数为 1（原始大小）
const rotation = ref<number>(0); // 0, 90, 180, 270

// 状态
const previewData = ref<string>('');
const magnifierCroppedData = ref<string>('');
const open = ref<boolean>(false);
const title = ref<string>("修改头像");
const magnifierVisible = ref<boolean>(false);
const dragging = ref<boolean>(false);
const magnifierPos = ref<Position>({ x: cropperSize / 2, y: cropperSize / 2 });

const options = reactive<AvatarOptions>({
  img: userStore.avatar,
  filename: 'avatar'
});

// 方法
function editCropper(): void {
  open.value = true;
}

function onDragStart(): void {
  dragging.value = true;
}

function onDragEnd(): void {
  dragging.value = false;
}

function onMagnifierMove(e: MouseEvent): void {
  if (!dragging.value) return;
  const rect = wrapper.value!.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  const half = magnifierSize / 2;
  x = Math.max(half, Math.min(cropperSize - half, x));
  y = Math.max(half, Math.min(cropperSize - half, y));
  magnifierPos.value = { x, y };
  updateMagnifierCropped();
}

function onWheel(e: WheelEvent): void {
  e.preventDefault();
  const next = scale.value - e.deltaY * 0.0015;
  scale.value = Math.min(3, Math.max(0.2, next));
  updateMagnifierCropped();
}

const imageStyle = computed<CSSProperties>(() => {
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

function updateMagnifierCropped(): void {
  const imgSrc = previewData.value || options.img;
  if (!imgSrc || !wrapper.value) return;

  const img = new Image();
  img.src = imgSrc;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = magnifierSize;
    canvas.height = magnifierSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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
      ctx.drawImage(
        img,
        sx, sy,
        magnifierSize * scaleX, magnifierSize * scaleY,
        0, 0,
        magnifierSize, magnifierSize
      );
    } else {
      ctx.drawImage(
        img,
        sx, sy,
        magnifierSize * scaleX, magnifierSize * scaleY,
        0, 0,
        magnifierSize, magnifierSize
      );
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

function modalOpened(): void {
  magnifierPos.value = { x: cropperSize / 2, y: cropperSize / 2 };
  updateMagnifierCropped();
}

function rotateLeft(): void {
  rotation.value = (rotation.value - 90 + 360) % 360;
  updateMagnifierCropped();
}

function rotateRight(): void {
  rotation.value = (rotation.value + 90) % 360;
  updateMagnifierCropped();
}

function changeScale(num: number): void {
  scale.value = Math.min(3, Math.max(0.2, scale.value + num * 0.05));
  updateMagnifierCropped();
}

function beforeUpload(file: File): boolean {
  if (!file.type.includes("image/")) {
    modal.msgError("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。");
    return false;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    options.img = reader.result as string;
    options.filename = file.name;
    previewData.value = reader.result as string;
    updateMagnifierCropped();
  };
  return true;
}

function dataURLtoBlob(dataurl: string): Blob {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

async function uploadImg(): Promise<void> {
  if (!magnifierCroppedData.value) {
    modal.msgError("请先选择图片");
    return;
  }

  const blob = dataURLtoBlob(magnifierCroppedData.value);
  const formData = new FormData();
  formData.append("avatarfile", blob, options.filename || "avatar.png");

  try {
    const res = await uploadAvatar(formData) as unknown as UploadResponse;
    open.value = false;
    const imgUrl = import.meta.env.VITE_APP_BASE_API + res.imgUrl;
    options.img = imgUrl;
    userStore.avatar = imgUrl;
    modal.msgSuccess("上传成功");
    proxy?.$emit("success", res);
  } catch (error) {
    modal.msgError("上传失败");
  }
}
</script>


<style lang="scss" scoped>
.user-info-head {
  .img-circle {
    border-radius: 50%;
    transition: background-color 0.3s ease, filter 0.3s ease;

    &:hover {
      filter: brightness(0.8);
    }
  }
}

.user-info-head:hover:after {
  content: '+';
  position: absolute;
  left: 65%;
  right: 0;
  top: 33%;
  bottom: 50%;
  color: #eee;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.cropper-wrapper {
  width: 400px;
  height: 400px;
  position: relative;
  overflow: hidden;
  background: repeating-conic-gradient(#bbb 0% 25%, #999 0% 50%) 0/20px 20px;
  cursor: pointer;
}

.cropper-container {
  position: relative;
  z-index: 1;
}

.magnifier {
  position: absolute;
  z-index: 10;
  pointer-events: none;
  border: 2px solid #409EFF;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background: transparent;
}

.magnifier-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid #409EFF;
  border-radius: 8px;
  pointer-events: none;
}

.avatar-upload-preview {
  display: flex;
  margin: 0 auto;
  margin-top: 10%;
  border-radius: 50%;
  overflow: hidden;
  width: 200px;
  height: 200px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.15);
}

.avatar-upload-preview img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
}

.dialog-avatar {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;


}
.footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
  
  .action {
    display: flex;
    gap: 10px;
  }
}
</style>
