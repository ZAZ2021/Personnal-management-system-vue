<template>
    <div class="wrapper">
      <div style="margin: 100px auto; background-color: #fff; width: 350px; height: 650px; padding: 20px; border-radius: 10px">
        <div style="margin: 20px 0; text-align: center; font-size: 24px"><b>注 册</b></div>
        <el-form :model="user" :rules="rules" ref="userForm">
       
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" size="medium" style="margin: 5px 0" prefix-icon="el-icon-s-custom" v-model="user.username"></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input placeholder="请输入密码" size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock" show-password v-model="user.password"></el-input>
          </el-form-item>

          <el-form-item prop="confirmPassword">
            <el-input placeholder="请确认密码" size="medium" style="margin: 5px 0" prefix-icon="el-icon-lock" show-password v-model="user.confirmPassword"></el-input>
          </el-form-item>
          <el-form-item prop="name">
            <el-input placeholder="请输入姓名" size="medium" style="margin: 5px 0" prefix-icon="el-icon-user" v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item prop="sex">
            <el-input placeholder="请输入性别" size="medium" style="margin: 5px 0" prefix-icon="el-icon-set-up" v-model="user.sex"></el-input>
          </el-form-item>
          <el-form-item prop="age">
            <el-input placeholder="请输入年龄" size="medium" style="margin: 5px 0" prefix-icon="el-icon-star-on" v-model="user.age"></el-input>
          </el-form-item>
          <el-form-item prop="tel">
            <el-input placeholder="请输入联系电话" size="medium" style="margin: 5px 0" prefix-icon="el-icon-phone-outline" v-model="user.tel"></el-input>
          </el-form-item>
          <el-form-item prop="address">
            <el-input placeholder="请输入地址" size="medium" style="margin: 5px 0" prefix-icon="el-icon-s-home" v-model="user.address"></el-input>
          </el-form-item>
          <el-form-item style="margin: 5px 0; text-align: right">
            <el-button type="primary" size="small"  autocomplete="off" @click="login">注册</el-button>
            <el-button type="warning" size="small"  autocomplete="off" @click="$router.push('/login')">返回登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Register",
    data() {
      return {
        user: {},
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          name:[
          { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          sex:[
          { required: true, message: '请输入性别', trigger: 'blur' },
          ],
          age:[
          { required: true, message: '请输入年龄', trigger: 'blur' },
          ],
          tel:[
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          ],
          address:[
          { required: true, message: '请输入地址', trigger: 'blur' },
          ],
        }
      }
    },
    methods: {
      login() {
        this.$refs['userForm'].validate((valid) => {
          if (valid) {  // 表单校验合法
            if (this.user.password !== this.user.confirmPassword) {
              this.$message.error("两次输入的密码不一致")
              return false
            }
            this.request.post("/register", this.user).then(res => {
              if(res) {
                console.log(this.user)
                this.$message.success("注册成功")
              } else {
                this.$message.error("注册失败，您未分配账号")
              }
            })
          }
        });
      }
    }
  }
  </script>
  
  <style>
    .wrapper {
      height: 100vh;
      /* background-image: linear-gradient(to bottom right, #FC466B , #3F5EFB); */
      background: url("../assets/company.jpg");
      width: 100%;
      height: 100%;
      position: fixed;
      background-size: 100% 100%;
    }
  </style>