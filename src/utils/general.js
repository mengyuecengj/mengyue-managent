/**
 * 日期格式化
 * @param time 日期输入，可以是 Date 对象、时间戳或字符串
 * @param pattern 格式化模板，默认为 '{y}-{m}-{d} {h}:{i}:{s}'
 * @returns 格式化后的日期字符串或 null
 */
export function parseTime(time, pattern = '{y}-{m}-{d} {h}:{i}:{s}') {
    if (arguments.length === 0 || !time) {
        return null;
    }
    const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time;
    }
    else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time);
        }
        else if (typeof time === 'string') {
            time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '');
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000;
        }
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay(),
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value];
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
    return time_str;
}
export function resetForm(ref) {
    let formRef;
    if (typeof ref === 'string') {
        if (!this || typeof this !== 'object') {
            console.warn('resetForm: this context is required when using ref name');
            return;
        }
        formRef = this.$refs[ref];
    }
    else {
        formRef = ref;
    }
    if (formRef) {
        if (typeof formRef.clearValidate === 'function') {
            formRef.clearValidate();
        }
    }
    else {
        console.warn('resetForm: ref is not found');
    }
}
/**
 * 添加日期范围
 * @param params 参数对象
 * @param dateRange 日期范围数组
 * @param propName 属性名称前缀
 * @returns 更新后的参数对象
 */
export function addDateRange(params, dateRange, propName) {
    const search = { ...params, params: params.params ?? {} };
    if (!Array.isArray(dateRange)) {
        dateRange = [];
    }
    if (typeof propName === 'undefined') {
        search.params['beginTime'] = dateRange[0] ?? '';
        search.params['endTime'] = dateRange[1] ?? '';
    }
    else {
        search.params[`begin${propName}`] = dateRange[0] ?? '';
        search.params[`end${propName}`] = dateRange[1] ?? '';
    }
    return search;
}
/**
 * 回显数据字典
 * @param datas 数据字典对象
 * @param value 值
 * @returns 对应的标签
 */
export function selectDictLabel(datas, value) {
    if (value === undefined) {
        return '';
    }
    const action = datas.find((item) => item.value === value);
    return action?.label ?? value;
}
/**
 * 回显数据字典（字符串、数组）
 * @param datas 数据字典对象
 * @param value 值（字符串或数组）
 * @param separator 分隔符
 * @returns 格式化后的标签字符串
 */
export function selectDictLabels(datas, value, separator = ',') {
    if (!value || (Array.isArray(value) && value.length === 0)) {
        return '';
    }
    const values = Array.isArray(value) ? value : value.split(separator);
    const actions = values.map((val) => {
        const match = datas.find((item) => item.value === val);
        return match ? match.label : val;
    });
    return actions.join(separator);
}
/**
 * 字符串格式化 (%s)
 * @param str 模板字符串
 * @param args 替换参数
 * @returns 格式化后的字符串
 */
export function sprintf(str, ...args) {
    let i = 0;
    return str.replace(/%s/g, () => {
        const arg = args[i++];
        return arg !== undefined ? String(arg) : '';
    });
}
/**
 * 转换字符串，undefined,null等转化为""
 * @param str 输入字符串
 * @returns 转换后的字符串
 */
export function parseStrEmpty(str) {
    if (!str || str === 'undefined' || str === 'null') {
        return '';
    }
    return String(str);
}
/**
 * 数据合并
 * @param source 源对象
 * @param target 目标对象
 * @returns 合并后的对象
 */
export function mergeRecursive(source, target) {
    const result = { ...source };
    for (const p in target) {
        if (Object.prototype.hasOwnProperty.call(target, p)) {
            try {
                if (target[p] && typeof target[p] === 'object' && !Array.isArray(target[p])) {
                    result[p] = mergeRecursive(result[p] ?? {}, target[p]);
                }
                else {
                    result[p] = target[p];
                }
            }
            catch {
                result[p] = target[p];
            }
        }
    }
    return result;
}
export function handleTree(data, id = 'id', parentId = 'parentId', children = 'children') {
    const config = { id, parentId, childrenList: children };
    const childrenListMap = {};
    const tree = [];
    for (const d of data) {
        const itemId = d[config.id];
        childrenListMap[itemId] = { ...d, [config.childrenList]: d[config.childrenList] ?? [] };
    }
    for (const d of data) {
        const parentIdValue = d[config.parentId];
        const parentObj = childrenListMap[parentIdValue];
        if (!parentObj) {
            tree.push(childrenListMap[d[config.id]]);
        }
        else {
            parentObj[config.childrenList].push(childrenListMap[d[config.id]]);
        }
    }
    return tree;
}
/**
 * 参数处理
 * @param params 参数对象
 * @returns 查询字符串
 */
export function tansParams(params) {
    let result = '';
    for (const propName of Object.keys(params)) {
        const value = params[propName];
        var part = encodeURIComponent(propName) + "=";
        if (value != null && value !== "" && typeof (value) !== "undefined") {
            if (typeof value === 'object') {
                for (const key of Object.keys(value)) {
                    if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
                        let params = propName + '[' + key + ']';
                        var subPart = encodeURIComponent(params) + '=';
                        result += subPart + encodeURIComponent(value[key]) + "&";
                    }
                }
            }
            else {
                result += part + encodeURIComponent(value) + "&";
            }
        }
    }
    return result;
}
/**
 * 返回项目路径
 * @param p 输入路径
 * @returns 规范化后的路径
 */
export function getNormalPath(p) {
    if (!p || p === 'undefined') {
        return '';
    }
    let res = p.replace(/\/+/g, '/');
    if (res.endsWith('/')) {
        res = res.slice(0, -1);
    }
    return res;
}
/**
 * 验证是否为blob格式
 * @param data Blob数据
 * @returns 是否为有效blob
 */
export function blobValidate(data) {
    return data.type !== 'application/json';
}
/**
 * 验证 tag 属性的有效性
 *
 * 该函数用于验证 Vue 组件中自定义的 tag 属性是否符合预期格式，确保可以被正确渲染
 * 支持两种形式的 tag 值：
 * 1. 直接字符串：如 'div', 'span' 等 HTML 标签名称
 * 2. 包含 value 和 props 的对象：允许更复杂的自定义配置
 *
 * @param tag - 要验证的 tag 属性，可以是字符串或包含 value 的对象
 * @returns boolean - 是否为有效的 tag 配置
 *
 * - 在组件接收外部传入的 tag 属性时进行验证
 * - 确保动态渲染的标签类型安全
 * - 防止传入不支持的 tag 类型导致渲
 */
export function validateTagProp(tag) {
    if (tag) {
        if (typeof tag === 'string')
            return true;
        if (typeof tag === 'object') {
            if (typeof tag.value === 'string' ||
                typeof tag.value === 'function' ||
                typeof tag.value === 'object') {
                return true;
            }
        }
        return false;
    }
    return true;
}
/**
 * 获取 tag 的渲染属性
 *
 * 该函数用于处理组件的 tag 属性，将其转换为可直接用于渲染的格式
 * 支持两种形式的 tag 配置：
 * 1. 简单字符串：直接作为 HTML 标签名称使用
 * 2. 配置对象：包含 value (标签名) 和 props (标签属性) 的对象
 *
 * @param ctx - 组件上下文，用于访问组件的 props
 * @param tagClass - 可选，要添加到标签上的额外 CSS 类名
 * @returns 包含 value (标签名) 和 props (标签属性) 的对象
 *
 * - 当传入 tagClass 时，会智能合并到现有 class 中（支持字符串、数组等多种格式）
 * - 对象形式的 tag 允许更细粒度的控制（如添加特定属性）
 * - 默认返回 'div' 作为安全回退值
 *
 * - 动态渲染不同类型的 HTML 元素
 * - 组件库中实现可定制的容器标签
 * - 在保持组件功能的同时允许样式定制
 */
export function getTagProps(ctx, tagClass) {
    const tag = ctx.$props.tag;
    if (tag) {
        if (typeof tag === 'string') {
            const result = { value: tag };
            if (tagClass) {
                result.props = { class: tagClass };
            }
            return result;
        }
        else if (typeof tag === 'object') {
            const result = { value: tag.value || 'div', props: tag.props || {} };
            if (tagClass) {
                if (result.props.class) {
                    if (Array.isArray(result.props.class)) {
                        result.props.class.push(tagClass);
                    }
                    else {
                        result.props.class = [result.props.class, tagClass];
                    }
                }
                else {
                    result.props.class = tagClass;
                }
            }
            return result;
        }
    }
    return { value: 'div' };
}
/**
 * 移动数组
 * @param arr 源数组
 */
export const moveArray = (arr, from, to) => {
    const newArr = arr.slice();
    newArr.splice(to < 0 ? newArr.length + to : to, 0, newArr.splice(from, 1)[0]);
    return newArr;
};
