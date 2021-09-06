// 匹配整数
export const intReg = /(-?[1-9]\d*)|0$/

// 匹配正整数
export const positiveIntReg =  /[1-9]\d*$/

// 匹配负整数
export const negativeIntReg =  /-[1-9]\d*$/

// 匹配浮点数
export const floatReg = /-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/

// 匹配正浮点数
export const positiveFloatReg = /[1-9]\d*\.\d+|0\.\d+$/

// 匹配负浮点数
export const negativeFloatReg = /-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$/
