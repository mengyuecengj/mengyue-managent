import { parseTime } from './general';

// 表格时间格式化
export function formatDate(cellValue: string | number | Date | null | undefined): string {
  if (cellValue == null || cellValue === "") return "";
  const date = new Date(cellValue);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) as string;
  const day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) as string;
  const hours = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) as string;
  const minutes = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) as string;
  const seconds = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()) as string;
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * @param time - 时间戳或时间字符串
 * @param option - 格式化选项
 * @returns 格式化后的时间字符串
 */
export function formatTime(time: number | string, option?: string): string {
  if (('' + time).length === 10) {
    time = parseInt(time as string) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d.getTime()) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option) as string;
  } else {
    return (
      (d.getMonth() + 1) +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    );
  }
}

/**
 * @param url - 要解析的 URL 字符串
 * @returns 解析后的查询参数对象
 */
export function getQueryObject(url?: string): Record<string, string> {
  url = url ?? window.location.href;
  const search = url.substring(url.lastIndexOf('?') + 1);
  const obj: Record<string, string> = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1: string, $2: string) => {
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
export function byteLength(str: string): number {
  let s = str.length;
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xDC00 && code <= 0xDFFF) i--;
  }
  return s;
}

/**
 * @param actual - 输入数组
 * @returns 过滤后的数组
 */
export function cleanArray<T>(actual: T[]): T[] {
  return actual.filter(item => !!item);
}

/**
 * @param json - 参数对象
 * @returns URL 查询字符串
 */
export function param(json: Record<string, string | number | boolean | null | undefined>): string {
  if (!json) return '';
  return cleanArray(
    Object.keys(json).map(key => {
      const value = json[key];
      if (value === undefined || value === null) return '';
      return encodeURIComponent(key) + '=' + encodeURIComponent(String(value));
    })
  ).join('&');
}

/**
 * @param url - URL 字符串
 * @returns 解析后的对象
 */
export function param2Obj(url: string): Record<string, string> {
  const search = decodeURIComponent(url.split('?')[1] ?? '').replace(/\+/g, ' ');
  if (!search) {
    return {};
  }
  const obj: Record<string, string> = {};
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
export function html2Text(val: string): string {
  const div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText || '';
}

/**
 * @param target - 目标对象
 * @param source - 源对象或数组
 * @returns 合并后的对象
 */
export function objectMerge<T extends object, U extends object>(target: T, source: U): T & U {
  if (typeof target !== 'object') {
    target = {} as T;
  }
  if (Array.isArray(source)) {
    return [...source] as unknown as T & U;
  }
  (Object.keys(source) as Array<keyof U>).forEach((property) => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === 'object' && sourceProperty !== null) {
      target[property as unknown as keyof T] = objectMerge(
        target[property as unknown as keyof T] || ({} as Record<string, unknown>),
        sourceProperty
      ) as T[keyof T] & U[keyof U];
    } else {
      (target as T)[property as unknown as keyof T] = sourceProperty as T[keyof T] & U[keyof U];
    }
  });
  return target as T & U;
}

/**
 * @param element - HTML 元素
 * @param className - 要切换的类名
 */
export function toggleClass(element: HTMLElement, className: string): void {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += ' ' + className;
  } else {
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
export function getTime(type: 'start' | 'end'): number {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90;
  }
  return new Date(new Date().toDateString()).getTime();
}

/**
 * @param func - 要防抖的函数
 * @param wait - 等待时间
 * @param immediate - 是否立即执行
 * @returns 防抖后的函数
 */
type DebouncedFunction<T extends any[] = any[], R = unknown> = (...args: T) => R;
export function debounce<F extends DebouncedFunction>(
  func: F,
  wait: number,
  immediate: boolean = false
): F {
  let timeout: number | null = null;
  let args: Parameters<F> = [] as unknown as Parameters<F>;
  let context: any = null;
  let timestamp: number = 0;
  let result: ReturnType<F> | undefined;

  const later = () => {
    const last = Date.now() - timestamp;
    if (last < wait && last > 0) {
      let timeout: number | null = null;
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args as Parameters<F>) as ReturnType<F>;
        if (!timeout) {
          context = null;
          args = [] as unknown as Parameters<F>;
        }
      }
    }
  };

  return function (this: any, ...args: Parameters<F>) {
    context = this;
    timestamp = Date.now();
    const callNow = immediate && !timeout;
    if (!timeout) {
      let timeout: number;
      // 使用类型断言
      timeout = window.setTimeout(later, wait) as unknown as number;
    }
    if (callNow) {
      result = func.apply(context, args) as ReturnType<F>;
      context = null;
      args = [] as unknown as Parameters<F>;
    }
    return result;
  } as F;
}

/**
 * @param source - 源对象
 * @returns 深拷贝后的对象
 */
export function deepClone<T>(source: T): T {
  if (!source || typeof source !== 'object') {
    throw new Error('error arguments');
  }
  const targetObj = (Array.isArray(source) ? [] : {}) as T;
  Object.keys(source as object).forEach((key: string) => {
    const value = (source as any)[key];
    if (value && typeof value === 'object') {
      (targetObj as any)[key] = deepClone(value);
    } else {
      (targetObj as any)[key] = value;
    }
  });
  return targetObj;
}

/**
 * @param arr - 输入数组
 * @returns 去重后的数组
 */
export function uniqueArr<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * @returns 唯一字符串
 */
export function createUniqueString(): string {
  const timestamp = Date.now().toString();
  const randomNum = (Math.floor((1 + Math.random()) * 65536)).toString();
  return (+(randomNum + timestamp)).toString(32);
}

/**
 * @param ele - HTML 元素
 * @param cls - 类名
 * @returns 是否包含指定类
 */
export function hasClass(ele: HTMLElement, cls: string): boolean {
  return !!ele.className.match(new RegExp(`(\\s|^)${cls}(\\s|$)`));
}

/**
 * @param ele - HTML 元素
 * @param cls - 类名
 */
export function addClass(ele: HTMLElement, cls: string): void {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls;
}

/**
 * @param ele - HTML 元素
 * @param cls - 类名
 */
export function removeClass(ele: HTMLElement, cls: string): void {
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
export function makeMap(str: string, expectsLowerCase?: boolean): (key: string) => boolean {
  const map: Record<string, boolean> = Object.create(null);
  const list = str.split(',');
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? (val: string) => !!map[val.toLowerCase()]
    : (val: string) => !!map[val];
}

export const exportDefault: string = 'export default ';

export const beautifierConf: {
  html: {
    indent_size: number;
    indent_char: string;
    max_preserve_newlines: number;
    preserve_newlines: boolean;
    keep_array_indentation: boolean;
    break_chained_methods: boolean;
    indent_scripts: 'keep' | 'separate' | 'normal';
    brace_style: string;
    space_before_conditional: boolean;
    unescape_strings: boolean;
    jslint_happy: boolean;
    end_with_newline: boolean;
    wrap_line_length: number;
    indent_inner_html: boolean;
    comma_first: boolean;
    e4x: boolean;
    indent_empty_lines: boolean;
  };
  js: {
    indent_size: string;
    indent_char: string;
    max_preserve_newlines: string;
    preserve_newlines: boolean;
    keep_array_indentation: boolean;
    break_chained_methods: boolean;
    indent_scripts: string;
    brace_style: string;
    space_before_conditional: boolean;
    unescape_strings: boolean;
    jslint_happy: boolean;
    end_with_newline: boolean;
    wrap_line_length: string;
    indent_inner_html: boolean;
    comma_first: boolean;
    e4x: boolean;
    indent_empty_lines: boolean;
  };
} = {
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
export function titleCase(str: string): string {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase());
}

/**
 * @param str - 输入字符串
 * @returns 驼峰格式的字符串
 */
export function camelCase(str: string): string {
  return str.replace(/_[a-z]/g, str1 => str1.substr(-1).toUpperCase());
}

/**
 * @param str - 输入字符串
 * @returns 是否为数字字符串
 */
export function isNumberStr(str: string): boolean {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str);
}