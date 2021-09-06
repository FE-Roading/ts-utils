// 长度在6~18之间，只能包含字母、数字和下划线
export const pwdReg = /^\w{5,17}$/

// 验证规则是：密码中必须包含字母、数字、特称字符，至少6个字符，最多30个字符。
export const pwdWith3CharactersReg = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,30}/
