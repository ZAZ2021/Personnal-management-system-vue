<template>
    <el-menu :default-openeds="opens" style="min-height: 100%; overflow-x: hidden"
       background-color="rgb(48, 65, 86)"
       text-color="#fff"
       active-text-color="#ffd04b"
       :collapse-transition="false"
       :collapse="isCollapse"
       router
>
    <el-menu-item index="/normal/home">
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
       <el-menu-item index="/normal/userinfo">
        <i class="el-icon-tickets"></i>
        <span slot="title"> 员工信息</span></el-menu-item>
   </el-submenu>
   <!-- <el-submenu index="3">
     <template slot="title">
       <i class="el-icon-setting"></i>
       <span slot="title">系统管理</span>  
     </template>
       <el-menu-item index="/user">
        <i class="el-icon-s-custom"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
       <el-menu-item index="/salary">
        <i class="el-icon-money"></i>
        <span slot="title"> 薪资管理</span>
      </el-menu-item>
     </el-submenu> -->
    </el-menu>
</template>

<script>
export default {
name: "NormalAside",
props: {
  isCollapse: Boolean,
},

}
</script>

<style scoped>

</style>