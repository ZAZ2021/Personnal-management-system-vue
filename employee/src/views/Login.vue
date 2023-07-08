<template>
    <div class="login">
      <div class="mylogin" align="center">
        <h3>登 录</h3>
        <el-form
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          label-width="0px"
        >
          <el-form-item label="" prop="username" style="margin-top: 30px;margin-bottom: 30px;">
            <el-row>
              <el-col :span="2">
                <span class="el-icon-s-custom"></span>
              </el-col>
              <el-col :span="22">
                <el-input
                  class="inps"
                  placeholder="账号"
                  v-model="loginForm.username"
                >
                </el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-row>
              <el-col :span="2">
                <span class="el-icon-lock"></span>
              </el-col>
              <el-col :span="22">
                <el-input
                  class="inps"
                  type="password"
                  show-password
                  placeholder="密码"
                  v-model="loginForm.password"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item style="margin-top: 30px;margin-bottom: 30px;">
            <el-button type="primary" round class="submitBtn" @click="submitForm"
            >登录
            </el-button>
          </el-form-item>
          <div class="unlogin">
            <!-- <router-link :to="{ path: '/forgetpwd' }"> 忘记密码? </router-link>
            | -->
            <router-link :to="{ path: '/register' }">
              <a href="register.vue" target="_blank" align="right">注册新账号</a>
            </router-link>
          </div>
        </el-form>
      </div>
    </div>
  </template>
  <script>
  import { mapMutations } from 'vuex'
  // import  request  from "../network/request"
  export default {
    name: 'Login',
    data: function () {
      return {
        loginForm: {
          // account: '',
          // passWord: ''
        },
        loginRules: {
          account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
          passWord: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        }
      }
    },
    methods: {
      ...mapMutations(['changeLogin']),
      send() {
        this.request.post("/login", {
            username:this.loginForm.username,
            password:this.loginForm.password,
        }).then(res => {
          console.log(res)
          if(!res) {
            this.$message.error("用户名或密码错误")
          }
          else
            {
              sessionStorage.setItem("username",this.loginForm.username);
              sessionStorage.setItem("password",this.loginForm.password);
              // console.log(this.loginForm.username)
              console.log(res);
              if(res==2)
              {
                this.$router.push("/manager")
              }
              else
              {
                this.$router.push("/normal")
              }

            }
          }
        ).catch(function (err) {
          console.log(err);
        })
      },
      submitForm(){
        const username = this.loginForm.username
        const password = this.loginForm.password
        if (!username) {
          return this.$message({
            type: 'error',
            message: '账号不能为空！'
          })
        }
        if (!password) {
          return this.$message({
            type: 'error',
            message: '密码不能为空！'
          })
        }
        console.log('用户输入的账号为：', username)
        console.log('用户输入的密码为：', password)
        this.send()
      },
    }
  }
  </script>
  <style>
  .login {
    background: url("../assets/company.jpg");
    width: 100%;
    height: 100%;
    font-size: 16px;
    position: fixed;
    background-size: 100% 100%;
  }
  
  .mylogin {
    width: 240px;
    height: 250px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 50px 40px 40px 40px;
    box-shadow: -15px 15px 15px rgba(24, 27, 36, 0.7);
    opacity: 1;
    /* background: linear-gradient(
        120deg,
        rgba(57, 59, 86, 0) 20%,
        rgb(0, 0, 0) 100%
      ); */
    background: aliceblue;
  }
  
  .inps input {
    border: none;
    color: #1a1515;
    /* background-color: transparent; */
    font-size: 12px;
  }
  
  .submitBtn {
    background-color: transparent;
    color: rgb(41, 128, 235);
    width: 200px;
  }
  
  a {
    text-decoration: none;
    color: rgb(30, 32, 32);
  }
  
  .router-link-active {
    text-decoration: none;
  }
  </style>