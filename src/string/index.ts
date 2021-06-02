export function upperFirst(str: string, isLetter: boolean = true) {
  const reg = isLetter ? /\b\w+\b/ : /\b\w+\b/g
  return str.replace(reg, (word) => {
    return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
  }); 
}

export function lowerFirst(str: string, isLetter: boolean = true) {
  const reg = isLetter ? /\b\w+\b/ : /\b\w+\b/g
  return str.replace(reg, (word) => {
    return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
});
}
