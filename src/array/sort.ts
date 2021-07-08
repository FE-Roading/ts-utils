import { randomInt } from '../number'

/**
 * https://github.com/ccforward/cc/issues/44
 * 最经典的 Fisher-Yates 的洗牌算法: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 * 原理： 从原始数组中随机抽取一个新的元素到新数组中
 * 可视化实现链接：https://bost.ocks.org/mike/shuffle/
 * 总体复杂度：O(n^2)
 * 
 */
export function shuffle(arr: unknown[]): unknown[]{
  const result: unknown[] = []
  let arrLen = arr.length

  while(arrLen > 0) {
    const index = randomInt(arrLen - 1)

    result.push(arr[index])
    arr.splice(index, 1)
    arrLen = arr.length
  }

  return result
}

/**
 * https://github.com/ccforward/cc/issues/44
 * Fisher-Yates 洗牌算法的一个变种是 Knuth-Durstenfeld Shuffle
 * 原理： 每次从未处理的数组中随机取一个元素，然后把该元素放到数组的尾部，即数组的尾部放的就是已经处理过的元素，这是一种原地打乱的算法，
 * 每个元素随机概率也相等，时间复杂度从 Fisher 算法的 O(n2)提升到了 O(n)
 * 
 */
 export function shuffleKD(arr: unknown[]): unknown[]{
  const result: unknown[] = []
  const totalLen = arr.length
  let activeLen = totalLen

  while(activeLen > 0) {
    const index = randomInt(activeLen - 1)
    [arr[totalLen], arr[index]] = [arr[index], arr[totalLen]]

    activeLen--
  }

  return result
}


