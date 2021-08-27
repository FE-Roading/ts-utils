// 默认缓存期限为7天
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

export class Cookie{
  private prefixKey: string;

  constructor(prefixKey: string = "") {
    this.prefixKey = prefixKey
  }

  private getKey(key: string) {
    return `${this.prefixKey}${key}`.toUpperCase();
  }

  set(name: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
    document.cookie = `${this.getKey(name)}=${value}; Max-Age=${expire}`;
  }

  get(name: string): string {
    const cookieArr = document.cookie.split('; ');
    for (let i = 0, length = cookieArr.length; i < length; i++) {
      const kv = cookieArr[i].split('=');
      if (kv[0] === this.getKey(name)) {
        return kv[1];
      }
    }
    return '';
  }

  remove(key: string) {
    this.set(key, 1, -1);
  }

  /**
   * 清空cookie，使所有cookie失效
   */
  clear(): void {
    const keys = document.cookie.match(/[^ =;]+(?==)/g);
    if (keys) {
      for (let i = keys.length; i--; ) {
        document.cookie = keys[i] + '=0;expire=' + new Date(0).toUTCString();
      }
    }
  }
}
