import { parseTime } from './general';
// 表格时间格式化
export function formatDate(cellValue) {
    if (cellValue == null || cellValue === "")
        return "";
    const date = new Date(cellValue);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    const day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    const hours = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
    const minutes = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    const seconds = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
/**
 * @param time - 时间戳或时间字符串
 * @param option - 格式化选项
 * @returns 格式化后的时间字符串
 */
export function formatTime(time, option) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000;
    }
    else {
        time = +time;
    }
    const d = new Date(time);
    const now = Date.now();
    const diff = (now - d.getTime()) / 1000;
    if (diff < 30) {
        return '刚刚';
    }
    else if (diff < 3600) {
        return Math.ceil(diff / 60) + '分钟前';
    }
    else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前';
    }
    else if (diff < 3600 * 24 * 2) {
        return '1天前';
    }
    if (option) {
        return parseTime(time, option);
    }
    else {
        return ((d.getMonth() + 1) +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分');
    }
}
/**
 * @param url - 要解析的 URL 字符串
 * @returns 解析后的查询参数对象
 */
export function getQueryObject(url) {
    url = url ?? window.location.href;
    const search = url.substring(url.lastIndexOf('?') + 1);
    const obj = {};
    const reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1);
        let val = decodeURIComponent($2);
        val = String(val);
        obj[name] = val;
        return rs;
    });
    return obj;
}
/**
 * @param str - 输入字符串
 * @returns 字符串的字节长度
 */
export function byteLength(str) {
    let s = str.length;
    for (let i = str.length - 1; i >= 0; i--) {
        const code = str.charCodeAt(i);
        if (code > 0x7f && code <= 0x7ff)
            s++;
        else if (code > 0x7ff && code <= 0xffff)
            s += 2;
        if (code >= 0xDC00 && code <= 0xDFFF)
            i--;
    }
    return s;
}
/**
 * @param actual - 输入数组
 * @returns 过滤后的数组
 */
export function cleanArray(actual) {
    return actual.filter(item => !!item);
}
/**
 * @param json - 参数对象
 * @returns URL 查询字符串
 */
export function param(json) {
    if (!json)
        return '';
    return cleanArray(Object.keys(json).map(key => {
        const value = json[key];
        if (value === undefined || value === null)
            return '';
        return encodeURIComponent(key) + '=' + encodeURIComponent(String(value));
    })).join('&');
}
/**
 * @param url - URL 字符串
 * @returns 解析后的对象
 */
export function param2Obj(url) {
    const search = decodeURIComponent(url.split('?')[1] ?? '').replace(/\+/g, ' ');
    if (!search) {
        return {};
    }
    const obj = {};
    const searchArr = search.split('&');
    searchArr.forEach(v => {
        const index = v.indexOf('=');
        if (index !== -1) {
            const name = v.substring(0, index);
            const val = v.substring(index + 1, v.length);
            obj[name] = val;
        }
    });
    return obj;
}
/**
 * @param val - HTML 字符串
 * @returns 纯文本内容
 */
export function html2Text(val) {
    const div = document.createElement('div');
    div.innerHTML = val;
    return div.textContent || div.innerText || '';
}
/**
 * @param target - 目标对象
 * @param source - 源对象或数组
 * @returns 合并后的对象
 */
export function objectMerge(target, source) {
    if (typeof target !== 'object') {
        target = {};
    }
    if (Array.isArray(source)) {
        return [...source];
    }
    Object.keys(source).forEach((property) => {
        const sourceProperty = source[property];
        if (typeof sourceProperty === 'object' && sourceProperty !== null) {
            target[property] = objectMerge(target[property] || {}, sourceProperty);
        }
        else {
            target[property] = sourceProperty;
        }
    });
    return target;
}
/**
 * @param element - HTML 元素
 * @param className - 要切换的类名
 */
export function toggleClass(element, className) {
    if (!element || !className) {
        return;
    }
    let classString = element.className;
    const nameIndex = classString.indexOf(className);
    if (nameIndex === -1) {
        classString += ' ' + className;
    }
    else {
        classString =
            classString.substring(0, nameIndex) +
                classString.substring(nameIndex + className.length);
    }
    element.className = classString;
}
/**
 * @param type - 时间类型
 * @returns 时间戳
 */
export function getTime(type) {
    if (type === 'start') {
        return new Date().getTime() - 3600 * 1000 * 24 * 90;
    }
    return new Date(new Date().toDateString()).getTime();
}
export function debounce(func, wait, immediate = false) {
    let timeout = null;
    let args = [];
    let context = null;
    let timestamp = 0;
    let result;
    const later = () => {
        const last = Date.now() - timestamp;
        if (last < wait && last > 0) {
            let timeout = null;
        }
        else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) {
                    context = null;
                    args = [];
                }
            }
        }
    };
    return function (...args) {
        context = this;
        timestamp = Date.now();
        const callNow = immediate && !timeout;
        if (!timeout) {
            let timeout;
            // 使用类型断言
            timeout = window.setTimeout(later, wait);
        }
        if (callNow) {
            result = func.apply(context, args);
            context = null;
            args = [];
        }
        return result;
    };
}
/**
 * @param source - 源对象
 * @returns 深拷贝后的对象
 */
export function deepClone(source) {
    if (!source || typeof source !== 'object') {
        throw new Error('error arguments');
    }
    const targetObj = (Array.isArray(source) ? [] : {});
    Object.keys(source).forEach((key) => {
        const value = source[key];
        if (value && typeof value === 'object') {
            targetObj[key] = deepClone(value);
        }
        else {
            targetObj[key] = value;
        }
    });
    return targetObj;
}
/**
 * @param arr - 输入数组
 * @returns 去重后的数组
 */
export function uniqueArr(arr) {
    return Array.from(new Set(arr));
}
/**
 * @returns 唯一字符串
 */
export function createUniqueString() {
    const timestamp = Date.now().toString();
    const randomNum = (Math.floor((1 + Math.random()) * 65536)).toString();
    return (+(randomNum + timestamp)).toString(32);
}
/**
 * @param ele - HTML 元素
 * @param cls - 类名
 * @returns 是否包含指定类
 */
export function hasClass(ele, cls) {
    return !!ele.className.match(new RegExp(`(\\s|^)${cls}(\\s|$)`));
}
/**
 * @param ele - HTML 元素
 * @param cls - 类名
 */
export function addClass(ele, cls) {
    if (!hasClass(ele, cls))
        ele.className += ' ' + cls;
}
/**
 * @param ele - HTML 元素
 * @param cls - 类名
 */
export function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp(`(\\s|^)${cls}(\\s|$)`);
        ele.className = ele.className.replace(reg, ' ');
    }
}
/**
 * @param str - 逗号分隔的字符串
 * @param expectsLowerCase - 是否忽略大小写
 * @returns 判断键是否存在的函数
 */
export function makeMap(str, expectsLowerCase) {
    const map = Object.create(null);
    const list = str.split(',');
    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true;
    }
    return expectsLowerCase
        ? (val) => !!map[val.toLowerCase()]
        : (val) => !!map[val];
}
export const exportDefault = 'export default ';
export const beautifierConf = {
    html: {
        indent_size: 2,
        indent_char: ' ',
        max_preserve_newlines: 5,
        preserve_newlines: true,
        keep_array_indentation: false,
        break_chained_methods: false,
        indent_scripts: 'normal',
        brace_style: 'collapse',
        space_before_conditional: true,
        unescape_strings: false,
        jslint_happy: false,
        end_with_newline: false,
        wrap_line_length: 0,
        indent_inner_html: false,
        comma_first: false,
        e4x: false,
        indent_empty_lines: false
    },
    js: {
        indent_size: '2',
        indent_char: ' ',
        max_preserve_newlines: '-1',
        preserve_newlines: false,
        keep_array_indentation: false,
        break_chained_methods: false,
        indent_scripts: 'normal',
        brace_style: 'end-expand',
        space_before_conditional: true,
        unescape_strings: false,
        jslint_happy: true,
        end_with_newline: true,
        wrap_line_length: '110',
        indent_inner_html: true,
        comma_first: false,
        e4x: true,
        indent_empty_lines: true
    }
};
/**
 * @param str - 输入字符串
 * @returns 首字母大写的字符串
 */
export function titleCase(str) {
    return str.replace(/( |^)[a-z]/g, L => L.toUpperCase());
}
/**
 * @param str - 输入字符串
 * @returns 驼峰格式的字符串
 */
export function camelCase(str) {
    return str.replace(/_[a-z]/g, str1 => str1.substr(-1).toUpperCase());
}
/**
 * @param str - 输入字符串
 * @returns 是否为数字字符串
 */
export function isNumberStr(str) {
    return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str);
}
