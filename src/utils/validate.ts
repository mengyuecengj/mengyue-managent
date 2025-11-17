/**
 * 路径匹配器
 * @param {string} pattern
 * @param {string} path
 * @returns {Boolean}
 */
export function isPathMatch(pattern: string, path: string) {
  const regexPattern = pattern.replace(/\//g, '\\/').replace(/\*\*/g, '.*').replace(/\*/g, '[^\\/]*')
  const regex = new RegExp(`^${regexPattern}$`)
  return regex.test(path)
}

/**
* 判断value字符是否为空
* @param {string} value
* @returns {Boolean}
*/
export function isEmpty(value: string | null) {
  if (value == null || value == "" || value == undefined || value == "undefined") {
    return true
  }
  return false
}

/**
 * 判断path是否为外链
 * @param {string} path
 * @returns {Boolean}
 */
/**
 * Checks if a given path is an external URL.
 * @param path - The path to check (can be any type, but typically a string).
 * @returns {boolean} True if the path matches external URL patterns (https, mailto, tel), false otherwise.
 */
export function isExternal(path: string ) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
* 判断是否是http或者https
* @param {string} value
* @returns {Boolean}
*/
export function isHttp(url: string) {
  return url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1;
}