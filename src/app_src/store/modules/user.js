import { loginByUsername, logout, getUserInfo } from '@/app_src/api/login'
import { getToken, setToken, removeToken } from '@/app_src/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    orgList: null,
    setting: {
      articlePlatform: []
    },
    sysCode: '1',
    sysName: '大港油田软件研发平台',
    departCode: '',
    departName: '',
    userId: '',
    userSex: '',
    roleLevel: ''

  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ORG_LIST: (state, orgList) => {
      state.orgList = orgList
    },
    SET_SYS_CODE: (state, sysCode) => {
      state.sysCode = sysCode
    },
    SET_SYS_NAME: (state, sysName) => {
      state.sysName = sysName
    },
    SET_DEPART_CODE: (state, departCode) => {
      state.departCode = departCode
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    },
    SET_DEPART_NAME: (state, departName) => {
      state.departName = departName
    },
    SET_USER_SEX: (state, userSex) => {
      state.userSex = userSex
    },
    SET_ROLE_LEVEL: (state, roleLevel) => {
      state.roleLevel = roleLevel
    }
  },

  actions: {
    setSysCode({ commit }, sysCode) {
      commit('SET_SYS_CODE', sysCode)
    },
    setSysName({ commit }, sysName) {
      commit('SET_SYS_NAME', sysName)
    }, setDepartCode({ commit }, departCode) {
      commit('SET_DEPART_CODE', departCode)
    }, setDepartName({ commit }, departName) {
      commit('SET_DEPART_NAME', departName)
    }, setRoleLevel({ commit }, roleLevel) {
      commit('SET_ROLE_LEVEL', roleLevel)
    },

    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => { //, userDomain:userDomain
        loginByUsername(username, userInfo.password, userInfo.userDomain).then(response => {
          if (response.data.code === 2000) {
            const data = response.data
            commit('SET_ORG_LIST', data.orgList)
            commit('SET_TOKEN', data.token)
            setToken(response.data.token)
            resolve(response)
          } else {
            reject(response.data.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token, state.departCode).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }

          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)

          commit('SET_SYS_CODE', data.sysCode)// 设置当前系统编码
          commit('SET_SYS_NAME', data.sysName)// 设置当前系统名称
          commit('SET_DEPART_CODE', data.departCode)
          commit('SET_USER_ID', data.userId)
          commit('SET_USER_SEX', data.userSex)
          commit('SET_CODE', data.userCode)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
