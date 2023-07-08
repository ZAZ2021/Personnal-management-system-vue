<template>
    <el-card style="width: 500px;margin-left: 400px;margin-top: 100px;">
      <el-form label-width="80px" size="small">
        <!-- <el-upload
            class="avatar-uploader"
            :action="'http://' + serverIp +':9090/file/upload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
        >
          <img v-if="form.avatarUrl" :src="form.avatarUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->
        <el-form-item label="用户名">
          <el-input v-model="form.username"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="员工号">
          <el-input v-model="form.id" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.sex" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="form.duty" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </template>
  
  <script>
//   import {serverIp} from "../../../public/config";
  
  export default {
    name: "个人信息",
    data() {
      return {
        // serverIp: serverIp,
        form: {},
        username:"",
        id:"",
        name:"",
        sex:"",
        duty:"",
        address:"",
        tel:"",
        age:""
      }
    },
    created() {
      this.load()
    },
    methods: {
     load(){
      console.log(sessionStorage.getItem("username"))
      this.request.get("/username",   
        {
          params:{
            // password:sessionStorage.getItem("password")
            username:sessionStorage.getItem("username")
          }  
        }
        ).then(res => {
          this.form=res
          console.log(res)
        })
     },
     save(){
      this.request.post("/update", this.form).then(res => {
         if (res) {
           let changeusername=this.form.username
           this.$message.success("修改成功")
           if(changeusername!=sessionStorage.getItem("username"))
           {
              sessionStorage.removeItem("username")
              sessionStorage.setItem("username",changeusername)
           }
           
          //  console.log(this.form.username)
           this.dialogFormVisible = false
           this.load()
         } else {
           this.$message.error("修改失败")
         }
       })
     }
    }
  }
  </script>
  
  <style>
  .avatar-uploader {
    text-align: center;
    padding-bottom: 10px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 138px;
    height: 138px;
    line-height: 138px;
    text-align: center;
  }
  .avatar {
    width: 138px;
    height: 138px;
    display: block;
  }
  </style>
  