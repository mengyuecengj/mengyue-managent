/**
 * sidebar.vue 路径相关函数
 * 这个函数确保了无论路由是如何定义的，最终都能得到格式正确的完整路径，避免了路径拼接错误导致的路由问题。
 */
export function pathJoin(parent: string, child: string): string {
    if (!child || child === '') return parent;
    if (child.startsWith('/')) return child;
    // 父是根路径
    if (parent === '/' || parent === '') return '/' + child.replace(/^\//, '');
    return `${parent.replace(/\/$/, '')}/${child.replace(/^\//, '')}`;
}