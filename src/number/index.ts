import { isNumber } from '../is';

export { formatMoney2Zh } from './money'

export function randomInt(max = Number.MAX_SAFE_INTEGER - 1, min = 0) {
  return Math.floor(min + Math.random() * ((max + 1) - min))
}

export function numFillWithChar(num: number, splitLen: number = 3, splitChar: string = ','): string {
  if(!isNumber(num)) return ''

  const numStrArr = num.toString().split(".");
  const numIntArr = numStrArr[0].split("").reverse();
  let res = [];
  for (var i = 0, len = numIntArr.length; i < len; i++) {
    if (i % splitLen === 0 && i !== 0) {
      res.push(splitChar);
    }
    res.push(numIntArr[i]);
  }
  res.reverse();
  if (numStrArr[1]) {
    return res.join("").concat("." + numStrArr[1]);
  }

  return res.join("");
}
