<template>
  <el-row style="height: 100%;">
    <el-col :span="6" style="height: 100%;background: #545c64">
      <el-menu
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
        <el-form :model="params" style="font: 12px/1.5 Tahoma,Helvetica,Arial,'宋体',sans-serif;">
          <el-select v-model="params.siteName" size="small" plach>
            <el-option
              v-for="item in siteList"
              :key="item.siteId"
              :label="item.siteName"
              :value="item.siteId"
            >
            </el-option>
          </el-select>
          页面别名: <el-input v-model="params.pageAlias" style="width: 10%" size="small"></el-input>
          <el-button @click="queryAllCmsPageList" size="small">查询</el-button>
          <el-button @click="dialogFormVisible11=true" size="small">新增页面</el-button>
        </el-form>
        <el-table
          :data="tableData"
          style="width: 100%;border: 1px solid cyan"
          height="90%"
          :stripe="true"
          size="small"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="pageName"
            label="页面名称"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="pageAlias"
            label="页面别名"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="pageType"
            label="页面类型"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="pageWebPath"
            label="访问路径"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="pagePhysicalPath"
            label="物理路径"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClickForUpdate(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="handleClickForDelete(scope.row)" type="text" size="small">删除</el-button>
            </template>
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
        <el-dialog title="添加页面" :visible.sync="dialogFormVisible11" size="small" @close="dialogFormClose()">
          <el-form :model="dialogForm11" size="small">
            <el-form-item label="所属站点" :label-width="dialogFormLabelWidth11">
              <el-select v-model="dialogForm11.siteId" placeholder="请选择活动区域">
                <el-option
                  v-for="item in siteList"
                  :key="item.siteId"
                  :label="item.siteName"
                  :value="item.siteId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择模板" :label-width="dialogFormLabelWidth11">
              <el-select v-model="dialogForm11.templateId" placeholder="请选择活动区域">
                <el-option
                  v-for="item in templateList"
                  :key="item.templateId"
                  :label="item.templateName"
                  :value="item.templateId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="页面名称" :label-width="dialogFormLabelWidth11">
              <el-input v-model="dialogForm11.pageName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="别名" :label-width="dialogFormLabelWidth11">
              <el-input v-model="dialogForm11.pageAlias" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="访问路径" :label-width="dialogFormLabelWidth11">
              <el-input v-model="dialogForm11.pageWebPath" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="物理路径" :label-width="dialogFormLabelWidth11">
              <el-input v-model="dialogForm11.pagePhysicalPath" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类型" :label-width="dialogFormLabelWidth11">
              <el-radio-group v-model="dialogForm11.pageType">
                <el-radio :label="0">静态</el-radio>
                <el-radio :label="1">动态</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="创建时间" :label-width="dialogFormLabelWidth11">
              <el-date-picker
                v-model="dialogForm11.pageCreateTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormClose()" size="small">返 回</el-button>
            <el-button type="primary" @click="dialogFormSubmit()" size="small">提 交</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改页面" :visible.sync="dialogFormVisible111" size="small" @close="dialogForm111Close()">
          <el-form :model="dialogForm111" size="small">
            <el-form-item label="所属站点" :label-width="dialogFormLabelWidth111">
              <el-select v-model="dialogForm111.siteId" placeholder="请选择活动区域">
                <el-option
                  v-for="item in siteList"
                  :key="item.siteId"
                  :label="item.siteName"
                  :value="item.siteId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择模板" :label-width="dialogFormLabelWidth111">
              <el-select v-model="dialogForm111.templateId" placeholder="请选择活动区域">
                <el-option
                  v-for="item in templateList"
                  :key="item.templateId"
                  :label="item.templateName"
                  :value="item.templateId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="页面名称" :label-width="dialogFormLabelWidth111">
              <el-input v-model="dialogForm111.pageName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="别名" :label-width="dialogFormLabelWidth111">
              <el-input v-model="dialogForm111.pageAlias" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="访问路径" :label-width="dialogFormLabelWidth111">
              <el-input v-model="dialogForm111.pageWebPath" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="物理路径" :label-width="dialogFormLabelWidth111">
              <el-input v-model="dialogForm111.pagePhysicalPath" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类型" :label-width="dialogFormLabelWidth111">
              <el-radio-group v-model="dialogForm111.pageType">
                <el-radio label="0">静态</el-radio>
                <el-radio label="1">动态</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="创建时间" :label-width="dialogFormLabelWidth111">
              <el-date-picker
                v-model="dialogForm111.pageCreateTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogForm111Close()" size="small">返 回</el-button>
            <el-button type="primary" @click="dialogForm111Submit()" size="small">提 交</el-button>
          </div>
        </el-dialog>
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
      siteList: [],
      templateList: [],
      params: {
        'siteId': '',
        'pageAlias': ''
      },
      isShow11: false,
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 100,
      dialogFormVisible11: false,
      dialogFormVisible111: false,
      dialogForm11: {
        'siteId': '',
        'pageName': '',
        'pageAlias': '',
        'pageWebPath': '',
        'pagePhysicalPath': '',
        'pageType': '',
        'pageCreateTime': null,
        'templateId': '',
        'htmlFileId': ''
      },
      dialogForm111: {
        'siteId': '',
        'pageName': '',
        'pageAlias': '',
        'pageWebPath': '',
        'pagePhysicalPath': '',
        'pageType': '',
        'pageCreateTime': null,
        'templateId': '',
        'htmlFileId': ''
      },
      dialogFormLabelWidth11: '120px',
      dialogFormLabelWidth111: '120px'
    }
  },
  created () {
    this.queryAllCmsSiteList()
    this.queryAllCmsTemplateList()
    this.queryAllCmsPageList()
  },
  methods: {
    dialogFormSubmit () {
      const _this = this
      axios.post('/api/cms/page/insertCmsPage/', _this.dialogForm11
      ).then(function (response) {
        console.log(JSON.stringify(response))
        if (response.data.success) {
          _this.$message.success('添加成功')
        } else {
          _this.$message.warning('该页面已存在')
        }
      }).catch(function (error) {
        _this.$message.error(error.toString())
      })
      this.dialogFormClose()
    },
    dialogFormClose () {
      this.dialogForm11 = {'siteId': '', 'pageName': '', 'pageAlias': '', 'pageWebPath': '', 'pagePhysicalPath': '', 'pageType': '', 'pageCreateTime': null, 'templateId': '', 'htmlFileId': ''}
      this.dialogFormVisible11 = false
      this.queryAllCmsPageList()
    },
    /** 主页面触发修改页面的函数 */
    async handleClickForDelete (row) {
      const _this = this
      await axios.post('/api/cms/page/deleteCmsPageById/', row
      ).then(function (response) {
        console.log(JSON.stringify(response))
        if (response.data.success) {
          _this.$message.success('删除成功')
        }
      }).catch(function (error) {
        _this.$message.error(error.toString())
      })
      this.queryAllCmsPageList()
    },
    /** 主页面触发修改页面的函数 */
    handleClickForUpdate (row) {
      this.dialogFormVisible111 = true
      this.dialogForm111 = row
    },
    /** 修改页面的提交方法 */
    dialogForm111Submit () {
      const _this = this
      axios.post('/api/cms/page/updateCmsPage/', _this.dialogForm111
      ).then(function (response) {
        console.log(JSON.stringify(response))
        if (response.data.success) {
          _this.$message.success('修改成功')
        } else {
          _this.$message.warning('该页面已存在')
        }
      }).catch(function (error) {
        _this.$message.error(error.toString())
      })
      this.dialogForm111Close()
    },
    dialogForm111Close () {
      this.dialogForm111 = {'siteId': '', 'pageName': '', 'pageAlias': '', 'pageWebPath': '', 'pagePhysicalPath': '', 'pageType': '', 'pageCreateTime': null, 'templateId': '', 'htmlFileId': ''}
      this.dialogFormVisible111 = false
      this.queryAllCmsPageList()
    },
    queryAllCmsPageList () {
      const _this = this
      axios.get('/api/cms/page/queryAllCmsPageList/' + _this.pageNum + '/' + _this.pageSize,
        {
          params: {
            siteId: _this.params.siteId,
            pageAlias: _this.params.pageAlias
          }
        })
        .then(function (response) {
          _this.tableData = response.data.queryResult.list
          _this.total = response.data.queryResult.total
        })
        .catch(function (error) {
          _this.$message.error(error.toString())
        })
    },
    async queryAllCmsSiteList () {
      const _this = this
      await axios.get('/api/cms/site/queryAllCmsSiteList/')
        .then(function (response) {
          _this.siteList = response.data.queryResult.list
          console.log(JSON.stringify(_this.siteList))
        })
        .catch(function (error) {
          _this.$message.error(error.toString())
        })
    },
    async queryAllCmsTemplateList () {
      const _this = this
      await axios.get('/api/cms/template/queryAllCmsTemplateList/')
        .then(function (response) {
          _this.templateList = response.data.queryResult.list
          console.log(JSON.stringify(_this.templateList))
        })
        .catch(function (error) {
          _this.$message.error(error.toString())
        })
    },
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
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
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.queryAllCmsPageList()
    },
    handleCurrentChange (val) {
      this.pageNum = val
      this.queryAllCmsPageList()
    }
  }
}
</script>

<style scoped>
  .el-table .warning-row {
    background: red;
  }

  .el-table .success-row {
    background: powderblue;
  }
</style>
