//统一设置一个token
const KEY = "token";


//保存token
export const setToken = (token) => {
    localStorage.setItem(KEY, token)
}
//获取token
export const getToken = () => {
    return localStorage.getItem(KEY)
}
//移出token
export const removeToken = () => {
     localStorage.removeItem(KEY)
}