<template>
    <div style="font-size:12px;line-height: 60px;display: flex;">
      <div style="flex: 1; font-size: 20px;">
        <span
          :class="collapseBtnClass"
          style="cursor: pointer"
          @click="collapse"
        ></span>
        <!-- <el-breadcrumb separator="/" style="display: inline-block; margin-left: 10px">
          <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
        </el-breadcrumb> -->
      </div>
      <div style="margin-right: 500px">
        <img src="../assets/logo.png" style="position: relative; top: 8px;" />
  
        <b style="font-size:20px;line-height: 20px;">人力资源管理系统</b>
      </div >
      <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link" >
      {{username}}  <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown" class="drop">
      <el-dropdown-item command="a">个人信息</el-dropdown-item>
      <el-dropdown-item command="b">退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
    </div>
  </template>
  
  <script>
  export default {
    name: "Header",
    props: {
      collapseBtnClass: String,
      collapse: ""
    },
    data() {
      return {
        username: sessionStorage.getItem("username") ? sessionStorage.getItem("username") : {}
      }
    },
    // computed: {
    //   currentPathName() {
    //     return this.$store.state.currentPathName; //需要监听的数据
    //   }
    // },
    // watch: {
    //   currentPathName(newVal, oldVal) {
    //     console.log(newVal);
    //   }
    // },
    methods:{
      handleCommand(command) {
          if(command==="a"){
            // console.log(command);
            this.$router.push("/normal/person")
          }else if(command==="b"){
            this.$message.success("退出成功")
            this.$router.push("/login")
          }
        }
    }
  
  };
  </script>
  
  <style scoped>
  .drop{
  top: 50px !important;
}

  </style>
  