// 全局处理方法函数

const TokenKey = 'token'

export function setToken (token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function getToken () {
  return sessionStorage.getItem(TokenKey)
}

export function removeToken () {
  return sessionStorage.removeItem(TokenKey)
}
