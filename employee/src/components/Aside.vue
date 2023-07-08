<template>
        <el-menu  style="min-height: 100%; overflow-x: hidden"
           background-color="rgb(48, 65, 86)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router
  >
        <el-menu-item index="/manager/home">
           <template slot="title">
             <i class="el-icon-s-home"></i>
             <span slot="title">首页</span>
           </template>
        </el-menu-item>
       <el-submenu index="2">
         <template slot="title">
           <i class="el-icon-menu"></i>
           <span slot="title">通用菜单</span>
         </template>
           <el-menu-item index="/manager/userinfo">
            <i class="el-icon-tickets"></i>
            <span slot="title"> 员工信息</span></el-menu-item>
       </el-submenu>
       <el-submenu index="3">
         <template slot="title">
           <i class="el-icon-setting"></i>
           <span slot="title">系统管理</span>
         </template>
           <el-menu-item index="/manager/user">
            <i class="el-icon-s-custom"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
           <el-menu-item index="/manager/salary">
            <i class="el-icon-money"></i>
            <span slot="title"> 薪资管理</span>
          </el-menu-item>
         <!-- <el-menu-item-group>
           <template slot="title">分组一</template>
           <el-menu-item index="3-1">选项1</el-menu-item>
           <el-menu-item index="3-2">选项2</el-menu-item>
         </el-menu-item-group>
         <el-menu-item-group title="分组2">
           <el-menu-item index="3-3">选项3</el-menu-item>
         </el-menu-item-group>
         <el-submenu index="3-4">
           <template slot="title">选项4</template>
           <el-menu-item index="3-4-1">选项4-1</el-menu-item>
         </el-submenu> -->
         </el-submenu>
        </el-menu>
  </template>

  <script>
  export default {
    name: "Aside",
    props: {
      isCollapse: Boolean,
    }
  }
  </script>

  <style scoped>

  </style>
