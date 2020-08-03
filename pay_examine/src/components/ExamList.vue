<template>
  <div class="listData">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="用户姓名 ">
        <el-input v-model="formInline.user" placeholder="用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="formInline.region" placeholder="用户类型">
          <el-option label="已认证" value="1"></el-option>
          <el-option label="未认证" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
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
        label="学习进度"
        width="80">
        <template slot-scope="scope">
          <span class="examine" style="background-color:#909399;" v-if="scope.row.realAthenNameSign === 0">审核中</span>
          <span class="examine" style="background-color:#84CE60;" v-else-if="scope.row.realAthenNameSign === 1">通过</span>
          <span class="examine" style="background-color:red;" v-else>未通过</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="roleDes"
        label="用户类型">
      </el-table-column>
      <el-table-column
        prop="emerContact"
        label="紧急联系方式">
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
          <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
            查看证件照
          </el-button>
        </template>

      </el-table-column>
    </el-table>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      direction="ltr"
      :with-header="false">
      <div>
        <img style="height: 30%" src="https://oss-jz.oss-cn-beijing.aliyuncs.com/bn2c/video/h5img/h5img1/70.jpg">
        <img style="height: 30%" src="https://oss-jz.oss-cn-beijing.aliyuncs.com/bn2c/video/h5img/h5img1/70.jpg">
      </div>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: "ExamList",
    mounted() {
      this.$api.get('/sign_technology/examAuthInfo', {}, response => {
        if (response.status >= 0 && response.status < 300) {
          console.log(response.data.data);//请求成功，response为成功信息参数
          this.examAuthList = response.data.data;
        } else {
          console.log(response.message);//请求失败，response为失败信息
        }
      });

    },
    methods:{
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 === 0) {
          return 'warning-row';
        } else {
          return 'success-row';
        }
      },
      onSubmit() {
        console.log(this.formInline.user);
      },

    },
    data(){
      return {
        examAuthList:[],
        formInline: {
          user: '',
          region: ''
        },
        drawer: false,
      }
    }
  }
</script>

<style>
  .listData .examine{
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
</style>
