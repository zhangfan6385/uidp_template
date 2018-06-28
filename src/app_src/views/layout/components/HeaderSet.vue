<template>
  <el-menu class="navbar-set" mode="horizontal">

    <div class="right-menu">
      <div class="logo">
        <span>Admin</span>
        <span style="margin-left:15px;">单位：大港油田信息中心</span>
      </div>

      <el-tooltip effect="dark" content='全屏' placement="bottom">
        <screenfull class="screenfull right-menu-item" style="vertical-align: middle;"></screenfull>
      </el-tooltip>

      <el-tooltip effect="dark" content='换肤' placement="bottom">
        <!-- <theme-picker class="theme-switch right-menu-item"></theme-picker> -->
        <theme-picker class="right-menu-item noborder" style="vertical-align: middle;"></theme-picker>
      </el-tooltip>

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
            <img class='user-avatar' src="../../../../app_src/imgs/avatar.png">
            <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>

          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'

import Screenfull from '@/app_src/components/Screenfull'
import ThemePicker from '@/app_src/components/ThemePicker'

export default {
  components: {
    Screenfull,
    ThemePicker
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.noborder{
  .el-color-picker__trigger{
    border: none;
  }
}

.theme-picker .el-color-picker__trigger{
  border: none;
}

.el-menu--horizontal{
  border-right: none;
  border-bottom: none;
}

.logo {
    float: left;
    margin: 0 20px;
    span {
      margin-left: 8px;
      font-size: 15px;
      font-weight: bold;
      color: #ffffff;
    }

    img {
      vertical-align: top;
      margin-top: 10px;
      height: 30px;
      width: 30px;
    }
  }

.navbar-set {
  background-color: transparent;
  margin-top: 2px;
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    // .theme-switch {
    //   vertical-align: 15px;
    // }
    .avatar-container {
      height: 55px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        // margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 10px;
          vertical-align: middle;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
          color: #fff;
        }
      }
    }
  }
}
</style>
