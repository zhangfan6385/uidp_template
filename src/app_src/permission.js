import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'// 进度条样式
import { getToken } from '@/app_src/utils/auth' // 从cookie中获取Token

import { fetchPermission } from '@/app_src/api/login'
const _import = require('@/app_src/router/_import_' + process.env.NODE_ENV)
import Layout from '@/app_src/views/layout/Layout'

NProgress.configure({ showSpinner: false })// NProgress 配置

// permissiom judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // 如果是admin，直接拥有所有权限
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login']//  在免登录白名单，直接进入

function generateRouteStruc(menus) {
  var asyncRouterMap = []
  for (const menu of menus) {
    const permission = {}
    permission.path = menu.path
    permission.hidden = !menu.isShow
    permission.component = Layout
    permission.redirect = 'noredirect'
    permission.name = menu.path
    permission.meta = { title: menu.name, icon: menu.icon, roles: menu.roleId }
    permission.children = []
    if (menu.children.length) {
      generateRouteStrucChildren(permission.children, menu.children)
    }
    asyncRouterMap.push(permission)
  }
  return asyncRouterMap
}

function generateRouteStrucChildren(asyncRouterMap, menusChildren) {
  for (const menu of menusChildren) {
    const permission = {}
    permission.path = menu.path
    permission.hidden = !menu.isShow
    permission.component = _import(menu.href)
    // permission.redirect = 'noredirect'
    permission.name = menu.path
    permission.meta = { title: menu.name, icon: menu.icon, roles: menu.roleId }
    permission.children = []
    if (menu.children.length) {
      const childMenu = generateRouteStrucChildren(asyncRouterMap, menu.children)
      permission.children.push(childMenu)
    }
    asyncRouterMap.push(permission)
  }
}

router.beforeEach((to, from, next) => {
  console.log(to)
  NProgress.start() // 开始进度条
  const query = { sysCode: '1' }

  if (getToken()) { // 判断是否有token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      /* console.log('getUserInfo')
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        console.log('getUserInfoSuccess')
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          const roles = res.data.roles // note: roles 必须是一个数组 array! 像这样: ['editor','develop']
          fetchPermission(query).then(response => {
            const menus = response.data.items
            var currentRoute
            var localRouteString = localStorage.getItem('PERMISSION')
            var localRouteArray = []
            if (localRouteString) {
              localRouteArray = JSON.parse(localRouteString)
              currentRoute = localRouteArray
              console.log('local')
            } else {
              currentRoute = menus
              console.log('remote')
            }
            const routeStru = generateRouteStruc(currentRoute)
            if (routeStru) {
              routeStru.push({ path: '*', redirect: '/404', hidden: true })
            }
            store.dispatch('GenerateRoutes', { 'roles': roles, 'routeMap': routeStru }).then(() => { // 根据roles权限生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()//
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      } */

      next()
    }
  } else {
    console.log('notoken')
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束进度条
})
