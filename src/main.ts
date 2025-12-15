// ========== 屏蔽 geo3D exists 警告 ==========
// 保存原始 console.warn
const _originalConsoleWarn = console.warn;
// 重写 console.warn，过滤掉包含 “geo3D exists” 的警告
console.warn = (...args: any[]) => {
  if (
    args.length > 0 &&
    typeof args[0] === 'string' &&
    args[0].includes('geo3D exists')
  ) {
    // 屏蔽该警告
    return;
  }
  // 其他情况正常输出
  _originalConsoleWarn.apply(console, args);
};

// ========== 现有 main.ts 内容 ==========
import 'default-passive-events';
import { createApp } from 'vue'

// import '@/assets/styles/index.scss'
import '@/scss/index.scss'

// UI组件库
// import ElementPlus from 'element-plus'
import MengyuePlus from 'mengyue-plus'
import 'mengyue-plus/style.css'

import { PiniaUndo } from 'pinia-undo';

import App from './App.vue'
import pinia from '@/store'
import router from '@/router'

import SvgIcon from '@/components/SvgIcon/index.vue';

import DataVVue3 from '@kjgl77/datav-vue3'

import '@/permission'

import { useDict } from './utils/dict';
import { parseTime, resetForm, addDateRange, handleTree, selectDictLabel, selectDictLabels } from '@/utils/general';

import Pagination from '@/components/Pagination/index.vue';
import RightToolbar from '@/components/RightToolbar/index.vue';
// import FileUpload from '@/components/FileUpload/index.vue';
// import ImagePreview from '@/components/ImagePreview/index.vue';
// import DictTag from '@/components/DictTag/index.vue';
import directive from '@/directive';

import plugins from './plugins'
pinia.use(PiniaUndo);

const app = createApp(App);

// 全局挂载工具函数
app.config.globalProperties.useDict = useDict;
app.config.globalProperties.parseTime = parseTime;
app.config.globalProperties.resetForm = resetForm;
app.config.globalProperties.handleTree = handleTree;
app.config.globalProperties.addDateRange = addDateRange;
app.config.globalProperties.selectDictLabel = selectDictLabel;
app.config.globalProperties.selectDictLabels = selectDictLabels;

// 全局组件注册
app.component('Pagination', Pagination);
// app.component('FileUpload', FileUpload);
// app.component('ImagePreview', ImagePreview);
app.component('RightToolbar', RightToolbar);
// app.component('DictTag', DictTag)

app.use(router);
app.use(pinia);
app.use(plugins);
app.use(MengyuePlus);
app.use(DataVVue3)
// app.use(ElementPlus);
app.component('SvgIcon', SvgIcon);

directive(app);
app.mount('#app');
