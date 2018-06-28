<template>
  <div class="social-signup-container">
    
     <el-table :data="list" :header-cell-class-name="tableRowClassName"   @current-change="handleCurrentChange" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
      
       <el-table-column width="170px" align="center" :label="$t('userTable.orgName')">
        <template slot-scope="scope">
          <span>{{scope.row.orgName}}</span>
        </template>
      </el-table-column>
      
       <el-table-column width="170px" align="center" :label="$t('userTable.orgCode')">
        <template slot-scope="scope">
          <span>{{scope.row.orgCode}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'log-in-org',
  list: null,
  listLoading: true,
  methods: {
    getList() {
      this.listLoading = true
      // var token = this.$store.state.user.token // 获取登陆信息的 俩种方式
      // var status = this.$store.getters.token
      var orglist = this.$store.state.user.orgList
      this.list = orglist

      // this.total = response.data.total
      this.listLoading = false
    }, tableRowClassName({ row, rowIndex }) { // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
      if (rowIndex === 0) {
        return 'el-button--primary is-active'// 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return ''
    },
    handleCurrentChange(val) {
      this.$store.dispatch('setDepartCode', val.orgId)
      this.$store.dispatch('setDepartName', val.orgName)
      this.updateShowDialog(val.orgId)
    }

  }, created() {
    // var token = this.$store.state.user.name; 获取登陆信息的 俩种方式
    // var status = this.$store.getters.name;
    // alert(token+"ddd"+status);

    this.getList()
  }, props: ['updateShowDialog']
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .social-signup-container {
    margin: 0px 0px;
    .sign-btn {
      display: inline-block;
      cursor: pointer;
    }
  }
</style>
