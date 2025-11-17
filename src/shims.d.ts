declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component
}

declare module '@element-plus/icons-vue' {
    import { DefineComponent } from 'vue';
    const icons: Record<string, DefineComponent<{}, {}, any>>;
    export default icons;
}

declare module '@/api/menu' {
  export const getRouters: () => Promise<any>;
}

declare module 'splitpanes';
declare module 'vue-cropper';
declare module '@riophae/vue-treeselect';

// declare module 'vue-draggable-plus' {
//   import { DefineComponent } from 'vue';
//   export const Draggable: DefineComponent;
// }

// src/shims-echarts-gl.d.ts
declare module 'echarts-gl' {
  import * as echarts from 'echarts';
  // 声明 echarts-gl 会扩展 echarts 的类型
  export default echarts;
}


//
// src/shims-datav.d.ts
declare module '@jiaminghi/data-view' {
  import { Plugin } from 'vue';
  const DataV: Plugin;
  export default DataV;
}

// smooth-dnd
declare module 'vue-smooth-dnd' {
    import { Component } from 'vue';
    export const Container: Component;
    export const Draggable: Component;
}