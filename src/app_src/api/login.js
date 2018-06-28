import request from '@/app_src/utils/request'

export function loginByUsername(username, password, userDomain) {
  const data = {
    username,
    password,
    userDomain
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}
export function getUserInfo(token, departCode) {
  const data = {
    token,
    departCode
  }
  return request({
    url: '/user/info',
    method: 'post',
    data
    // params: { data }
  })
}
export function fetchPermission(query) {
  return request({
    url: '/menu/fetchPermission',
    method: 'get',
    params: query
  })
}
export function fetchLogInfoList(query) { // 日志查询
  return request({
    url: '/logInfo/fetchLogInfoList',
    method: 'get',
    params: query
  })
}
