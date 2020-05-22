<template>
  <el-row style="height: 100%;background: red">
    <el-col :span="6">
<!--      <h5>自定义颜色</h5>-->
      <!--  default-active="2"  -->
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>Content Management System</span>
          </template>
          <el-menu-item-group>
            <template slot="title">内容管理系统</template>
            <el-menu-item index="1-1">页面列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="18"  style="height: 100%">
      <div v-show="isShow11" style="height: 100%">
        <el-table
          :data="tableData"
          style="width: 100%;border: 1px solid cyan"
          height="90%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="pageName"
            label="页面名称">
          </el-table-column>
          <el-table-column
            prop="pageAlias"
            label="页面别名">
          </el-table-column>
          <el-table-column
            prop="pageType"
            label="页面类型">
          </el-table-column>
          <el-table-column
            prop="pageWebPath"
            label="访问路径">
          </el-table-column>
          <el-table-column
            prop="pagePhysicalPath"
            label="物理路径">
          </el-table-column>
          <el-table-column
            prop="pageCreateTime"
            label="创建时间">
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SystemManagementCenter',
  data () {
    return {
      isShow11: false,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      pageNum: 1,
      pageSize: 10,
      total: 100
    }
  },
  created () {
    this.queryAllCmsPageList()
  },
  methods: {
    queryAllCmsPageList () {
      const _this = this
      axios.get('/api/cms/page/queryAllCmsPageList/' + _this.pageNum + '/' + _this.pageSize)
        .then(function (response) {
          _this.console.log(JSON.stringify(response))
        })
        .catch(function (error) {
          _this.$message.error(error.toString())
        })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    handleSelect (key, keyPath) {
      if (JSON.stringify(key) === JSON.stringify('1-1')) {
        this.isShow11 = true
      }
      console.log(this.isShow11)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
