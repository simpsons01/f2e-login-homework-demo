export const messages = {
  required: "必填",
  email: "email格式不符合",
  confirmPassword: "密碼不一致",
  between: (min, max) => `至少${min}字元，至多${max}字元`,
}


export const getFirstVuelidateErrorMessage = field => {
  let message = ''
  if(field.$errors[0]) {
    message = field.$errors[0].$message
  }
  return message
}