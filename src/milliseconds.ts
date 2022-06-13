// https://github.com/HenrikJoreteg/milliseconds/blob/master/milliseconds.js
function calc(m: number) {
  return function(n: number) { return Math.round(n * m); };
}

export const seconds = calc(1e3)
export const minutes = calc(6e4)
export const hours = calc(36e5)
export const days = calc(864e5)
export const weeks = calc(6048e5)
export const months = calc(26298e5)
export const years = calc(315576e5)
