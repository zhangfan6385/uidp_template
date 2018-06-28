<template>
    <div class="app-container calendar-list-container"> 
    
    <el-card class="box-card">
      <el-table :key='tableKey' :header-cell-class-name="tableRowClassName" :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
        <el-table-column width="160px"  class="filter-item"  align="center" label="时间">
        <template slot-scope="scope">
          <span>{{scope.row.ACCESS_TIME}}</span>
        </template>
      </el-table-column>
       <el-table-column width="140px" class="link-type"  align="center" label="用户id">
        <template slot-scope="scope">
          <span>{{scope.row.USER_ID}}</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{scope.row.USER_NAME}}</span>
        </template>
      </el-table-column>
   <el-table-column width="270px" align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.REMARK}}</span>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
      <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    </div>
</template>
<script>
import {
  fetchLogInfoList
} from '@/app_src/api/login'

export default {
  name: 'uidpConfigManager',
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        USER_NAME: undefined,
        LOG_TYPE: undefined,
        ACCESS_TIME: undefined,
        page: 1,
        limit: 15
      },
      editConfig: false,
      dialogFormVisible: false,
      dialogStatus: '',
      dialogPvVisible: false,
      pvData: [],
      downloadLoading: false
    }
  }, filters: {
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchLogInfoList(this.listQuery).then(response => {
        if (response.data.code === 2000) {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
        } else {
          this.listLoading = false
          this.$notify({
            title: '失败',
            message: response.data.message,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }, tableRowClassName({ row, rowIndex }) {
      // 可以通过指定 Table 组件的 :header-cell-class-name 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className属性来为 Table 中的某一行添加 class，表明该行处于某种状态
      if (rowIndex === 0) {
        return 'el-button--primary is-active'// 'warning-row'
      } // 'el-button--primary is-plain'// 'warning-row'
      return ''
    }

  },
  created() {
    this.getList()
  }
}
</script>
<style lang="scss" >
 

 

</style>