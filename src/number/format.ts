/**
 * 第三方库： https://github.com/adamwdraper/Numeral-js
 * A javascript library for formatting and manipulating numbers.
 */

import { isNumber, isNullOrUnDef } from '../is';

function parseIntegerPart(numStr: string, numStrs: string[], unitStrs: string[]): string {
  if (!numStr) return ''
  if (numStr === '') return numStrs[0]

  let unitIndex = 0,
      resStr = '';
  
  for(let i = numStr.length - 1; i >= 0; i--) {
    switch (unitIndex) {
      case 0:
        resStr += unitStrs[7]
        break
      
      case 4:
        if (!new RegExp("0{4}\\d{" + (numStr.length - i - 1) + "}$").test(numStr)) {
          resStr += unitStrs[4]
        }
        break
      
      case 8:
        resStr += unitStrs[5]
        unitStrs[7] = unitStrs[5]
        unitIndex = 0
        break
      
    }

    if (unitIndex % 4 == 2 && numStr[i + 2] !== '0' && numStr[i + 1] == '0') {
      resStr += numStrs[0]
    }
    if (numStr[i] !== '0') {
      resStr = numStrs[parseInt(numStr[i])] + unitStrs[unitIndex % 4] + resStr;
    }
    unitIndex++;
  }

  return resStr
}

 /**
  * 将数字字符串转换为数值
  * @param num 
  * @returns 
  */
  function convertToNumStr(num: number | string): string {
    // 如果是数值，则直接返回
    if (isNumber(num)) {
      num = '' + num
    }
    
    if (isNullOrUnDef(num)) {
      num = ''
    }
    
    if (isNaN(Number(num))) {
      num = Number(num).toString()
    }
  
    return num
  }
 
export function num2RMB(num: number | string): string {
  const numStr = convertToNumStr(num)

  const [integerPart, decimalPart] = numStr.split('.')
  const numStrs = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const unitStrs = ["", "十", "百", "千", "万", "亿", "点", ""]

  let resStr: string = parseIntegerPart(integerPart, numStrs, unitStrs)

  if (!decimalPart || Number(decimalPart) < 0.01) {
    resStr += '元整'
  } else {
    resStr += '零'
    resStr += numStrs[parseInt(decimalPart[0])] + '角'
    if (decimalPart[1]) {
      resStr += numStrs[parseInt(decimalPart[1])] + '分'
    }
  }

  return resStr
}

export function num2Chinese(num: number | string): string {
  const numStr = convertToNumStr(num)

  const [integerPart, decimalPart] = numStr.split('.')
  const numStrs = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
  const unitStrs = ["", "十", "百", "千", "万", "亿", "点", ""]

  let resStr: string = parseIntegerPart(integerPart, numStrs, unitStrs)

  if (decimalPart) {
    resStr += unitStrs[6]
    for (var i = 0; i < decimalPart.length; i++) resStr += numStrs[parseInt(decimalPart[i])];
  }

  return resStr
}

type NumFillWithCharType = {
  decimals?: number;  // 小数点位数
  dot?: string; 
  separator?: string; 
  suffix?: string; 
  prefix?: string; 
}
const defaultNumFillWithCharOptions: NumFillWithCharType = { 
  decimals: 2, 
  dot: '.', 
  separator: ',', 
  suffix: '', 
  prefix: ''
}

export function numFillWithChar(num: number | string, options: NumFillWithCharType = {}): string {
  const { decimals, dot, separator, suffix, prefix  } = Object.assign(defaultNumFillWithCharOptions, options)

  num = Number(num).toFixed(decimals);
  num += '';
  const x = num.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? dot + x[1] : '';
  if (separator && !isNumber(separator)) {
    // 性能要差些，使用零宽断言优化
    // const rgx = /(\d+)(\d{3})/;
    // while (rgx.test(x1)) {
    //   x1 = x1.replace(rgx, '$1' + separator + '$2');
    // }
    x1 = x1.replace(/\B(?=(\d{3})+\b)/g, separator)
  }

  return prefix + x1 + x2 + suffix;
}
