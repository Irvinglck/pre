<template>
  <div class="listData">
    <el-header style="width: 100%; background-color: #20A0FF"></el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">用户实名审核</span>
          </el-menu-item>
          <el-menu-item index="3">
            <!--          <el-menu-item index="3" disabled>-->
            <i class="el-icon-document"></i>
            <span slot="title">保留导航</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">保留导航</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main class="main-add">
          <el-form :inline="true" :model="formInline" class="demo-form-inline sl-form">
            <el-form-item label="姓名">
              <el-input v-model="formInline.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="用户类型">
              <el-select v-model="formInline.userType" placeholder="用户类型">
                <el-option label="" value=""></el-option>
                <el-option label="残障用户" value="1"></el-option>
                <el-option label="普通用户" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审核进度">
              <el-select v-model="formInline.exam" placeholder="审核进度">
                <el-option label="" value=""></el-option>
                <el-option label="通过" value="1"></el-option>
                <el-option label="未通过" value="0"></el-option>
                <el-option label="审核中" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
          <!--数据列表-->
          <el-table
            :data="examAuthList"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              label="审核进度"
              width="80">
              <template slot-scope="scope">
                <span class="examine" style="background-color:#909399;"
                      v-if="scope.row.realAthenNameSign === 0">审核中</span>
                <span class="examine" style="background-color:#84CE60;"
                      v-else-if="scope.row.realAthenNameSign === 1">通过</span>
                <span class="examine" style="background-color:red;" v-else>未通过</span>
              </template>
            </el-table-column>
            <el-table-column
              label="是否实名"
              width="80">
              <template slot-scope="scope">
                <span class="examine" style="background-color:red;"
                      v-if="scope.row.realAthenNameSign === 0">否</span>
                <span class="examine" style="background-color:#909399;"
                      v-else-if="scope.row.realAthenNameSign === 1">是</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="roleDes"
              label="用户类型">
            </el-table-column>
            <el-table-column
              prop="emerContact"
              label="紧急联系">
            </el-table-column>
            <el-table-column
              prop="emerTel"
              label="紧急电话">
            </el-table-column>
            <el-table-column
              label="家庭住址"
              prop="homeAddress"
              width="200">
            </el-table-column>
            <el-table-column
              size="mini"
              prop="tel"
              label="认证手机">
            </el-table-column>
            <el-table-column
              size="mini"
              prop="step"
              label="认证进度">
            </el-table-column>
            <el-table-column label="操作" width="350">
              <template slot-scope="scope">
                <el-button
                  size="medium"
                  type="success"
                  @click="handlPass(scope.$index, scope.row)">通过
                </el-button>
                <el-button
                  size="medium"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">不通过
                </el-button>
                <el-button @click="handleDrawerOpen(scope.row.userId)" type="primary" style="margin-left: 16px;">
                  查看
                </el-button>
              </template>

            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage3"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
          <!--抽屉-->
          <el-drawer
            title="我是标题"
            :visible.sync="drawer"
            direction="ltr"
            :before-close="handleDrawerClose"
            :with-header="false">
            <div class="warp-drawer">
              <p class="content" style="height: 20px">证件照片</p>
              <div>
                <img width="420px" v-for="(item,index) in pciList1" :src="'https://oss-jz.oss-cn-beijing.aliyuncs.com/'+item" :key="index">
                <p v-else-if="this.pciList1.length===0">lck</p>
              </div>
            </div>
          </el-drawer>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "ExamList",
    mounted() {
      let parms = {name: this.formInline.name, userType: this.formInline.userType, exam: this.formInline.exam}
      this.$api.get('/sign_technology/examAuthInfo', parms, response => {
        if (response.status >= 0 && response.status < 300) {
          console.log(response.data.data);//请求成功，response为成功信息参数
          this.examAuthList = response.data.data.data;
          this.pagesize = response.data.data.pageSize;
          this.total = response.data.data.totalCount;
        } else {
          console.log(response.message);//请求失败，response为失败信息
        }
      });

    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 === 0) {
          return 'warning-row';
        } else {
          return 'success-row';
        }
      },
      onSubmit() {
        console.log(this.formInline.user, this.formInline.region);
        let parms = {name: this.formInline.name, userType: this.formInline.userType, exam: this.formInline.exam}
        this.$api.get('/sign_technology/examAuthInfo', parms, response => {
          if (response.status >= 0 && response.status < 300) {
            console.log(response.data.data);//请求成功，response为成功信息参数
            this.examAuthList = response.data.data.data;
          } else {
            console.log(response.message);//请求失败，response为失败信息
          }
        });
      },
      //  分页
      handleSizeChange(val) {
        console.log(`每页size------ ${val} 条`);
      },
      handleCurrentChange(val) {
        let params = {
          name: this.formInline.name,
          userType: this.formInline.userType,
          exam: this.formInline.exam,
          pageNum: val,
          pageSize: 5
        };
        console.log(`当前页 前后: ${JSON.stringify(params)}`);
        this.$api.get('/sign_technology/examAuthInfo', params, response => {
          if (response.status >= 0 && response.status < 300) {
            console.log(response.data.data);//请求成功，response为成功信息参数
            this.examAuthList = response.data.data.data;
          } else {
            console.log(response.message);//请求失败，response为失败信息
          }
        });
      },
      //抽屉
      handleDrawerOpen(param) {
        this.$api.get('/sign_technology/getCertifPic', {userId: param}, response => {
          if (response.status >= 0 && response.status < 300) {
            console.log(response.data.data);//请求成功，response为成功信息参数
            this.pciList1 = response.data.data;
          } else {
            console.log(response.message);//请求失败，response为失败信息
          }
        })
        this.drawer = true;
      },
      handleDrawerClose(done) {
        done()
      }

    },
    data() {
      return {
        examAuthList: [],
        //搜索
        formInline: {
          name: '',
          userType: '',
          exam: ''
        },
        //抽屉默认隐藏
        drawer: false,
        //分页
        currentPage3: 1,//当前页
        pageSize: 5,//每页条数
        total: 0,//总记录数
        //图片地址
        // pciList1:['https://oss-jz.oss-cn-beijing.aliyuncs.com/001845.122b80e212684fd3b942b1d5c92d13f4.0553/Certificates_file/0/front','https://oss-jz.oss-cn-beijing.aliyuncs.com/001845.122b80e212684fd3b942b1d5c92d13f4.0553/Certificates_file/0/front','https://oss-jz.oss-cn-beijing.aliyuncs.com/001845.122b80e212684fd3b942b1d5c92d13f4.0553/Certificates_file/0/front']
        pciList1:[]
      }
    }
  }
</script>

<style>
  .listData .examine {
    color: white;
    display: block;
    width: 50px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 5px;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .main-add {
    margin-left: 4px;
    padding: 0px;
  }

  .sl-form {
    padding-top: 20px;
  }

  .warp-drawer .content {
    font-size: 16px;
    font-weight: 700;
    margin: 20px 0;
  }

  .el-drawer {
    overflow-y: scroll;
  }
</style>
