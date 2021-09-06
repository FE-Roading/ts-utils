// 匹配长度为 3 的字符串：
export const strLen3Reg = /^.{3}$/

// 匹配由数字和 26 个英文字母组成的字符串：
export const strLetterNumberReg = /^[A-Za-z0-9]+$/

// 匹配由 26 个英文字母组成的字符串：
export const englishReg = /^[A-Za-z]+$/

// 匹配由 26 个大写英文字母组成的字符串
export const upperWordReg = /^[A-Z]+$/

// 匹配由 26 个小写英文字母组成的字符串：
export const lowerWordReg = /^[a-z]+$/

// 匹配由数字、26 个英文字母或者下划线组成的字符串：
export const wordReg = /^\w+$/

//中文
export const chineseReg = /^[\u4E00-\u9FA5]+$/;
