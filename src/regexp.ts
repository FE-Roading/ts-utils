 //手机号码
export const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/; 
 //座机
export const telReg = /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/; 
 //身份证
export const cardIDReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
//密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
export const pwdReg = /^[a-zA-Z]\w{5,17}$/
//邮政编码
export const postalReg = /[1-9]\d{5}(?!\d)/;
 //邮箱
export const emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
//IP
export const ipReg = /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/;
//英文
export const englishReg = /^[a-zA-Z]+$/;
//中文
export const chineseReg = /^[\u4E00-\u9FA5]+$/;
//小写
export const lowerWordReg = /^[a-z]+$/;
//大写
export const upperWordReg = /^[A-Z]+$/;
//HTML标记
export const htmlMarkerReg = /<("[^"]*"|'[^']*'|[^'">])*>/;
// URL地址
export const urlReg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
