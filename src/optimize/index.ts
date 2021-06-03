import { urlToBase64, PictureCompressOptionsType } from '../file/base64Conver'

export function deepClone<T>(obj: T): T {
  return obj
}

/**
   * 防抖动
   * @param  {Function} fn        [执行的函数]
   * @param  {[type]}   delay     [多少秒之后执行]
   * @param  {[type]}   immediate [是否立即执行]
   * @return {[type]}             []
   */
export function debounce(fn: () => void, delay: number, immediate: boolean) {
  let timeout: undefined | number;
  return (...args: unknown[]) => {
    const later = () => {
      timeout = undefined;
      if (!immediate) fn.apply(null, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
    if (callNow) fn.apply(null, args);
  };
}

/**
* 节流
* @param  {[type]} func  [执行的函数]
* @param  {[type]} delay [多少秒之内执行一次]
* @return {[type]}       [description]
*/
export function throttle(func: () => void, delay: number) {
  let prev = Date.now();
  return (...args: unknown[]) => {
    const now = Date.now();
    if (now - prev >= delay) {
      func.apply(null, args);
      prev = Date.now();
    }
  }
}

/**
   * 图片压缩
   * @param  {[type]}   url [压缩文件]
   * @param  {[type]}   obj  [压缩参数]
   * @param  {Function} cb   [回调函数]
   * @return {[type]}        [返回压缩前和压缩后的格式]
   */
/**
 * 图拍呢压缩
 * @param url 图片地址
 * @param options 配置选项
 */
export function compressPic(url: string | File | Blob, options: PictureCompressOptionsType): Promise<string> {
  return new Promise(async (resolve, reject) => {
    if (typeof url !== 'string') {
      const reader = new FileReader();
      reader.readAsDataURL(url);
      reader.onload = (event) => {
        if (event.target?.result) {
          return urlToBase64(event.target.result as string, options).then(res => resolve(res)).catch(err => reject(err))
        }
      }

      return reject()
    }

    return urlToBase64(url, options).then(res => resolve(res)).catch(err => reject(err))
  })
}
