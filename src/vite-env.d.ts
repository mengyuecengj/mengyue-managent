/// <reference types="vite/client" />
interface ImportMeta {
    /** 
     * 同步导入所有匹配的模块，eager 模式下直接返回模块对象 
     * 默认写法：import.meta.glob<T>(pattern, { eager: true })
     */
    glob<T = any>(
        pattern: string,
        options: { eager: true }
    ): Record<string, { default: T }>
}
