const fallBackHttpErrorMessage = "伺服器忙碌中"

export const errorCode = {
  internalServerError: "0000",
  unauthorized: "0401",
  validation: "0500"
}

const handleInternalServerError = (error) => fallBackHttpErrorMessage

const handleUnauthorizedError = (error) => "尚未登入"

const handleValidationError = (error) => {
  let message = ''
  if(error.data && error.data.data) {
    const keys = Object.keys(error.data.data)
    keys.forEach((key, index) => {
      if(index === errorKeys.length - 1) {
        message = error.data.data[key]
      }else {
        message = `${error.data.data[key]} \n`
      }
    })
  }
  if(!message) message = fallBackHttpErrorMessage
  return message
}

export const createHttpErrorModel = error => {
  let message = ''
  if(error && error.data && error.data.statusCode) {
    const { data: { statusCode } } = error
    if(statusCode === errorCode.internalServerError) {
      message = handleInternalServerError(error)
    }else if(statusCode === errorCode.unauthorized) {
      message = handleUnauthorizedError(error)
    }else if(statusCode === errorCode.validation) {
      message = handleValidationError(error)
    }
  }
  return {
    ...(error || {}),
    data: {
      message: message ? message : fallBackHttpErrorMessage
    }
  }
}