<template>
    <el-container style="min-height: 100vh">
      <el-aside :width="sideWidth+'px'" style="background-color: rgb(238, 241, 246) ; box-shadow: 2px 0 6px rgb(0 21 41 / 35%)">
       <NormalAside :isCollapse="isCollapse" />
      </el-aside>
   <el-container>
 
     <el-header style="border-bottom: 1px solid #ccc;">
        <NormalHeader :collapseBtnClass="collapseBtnClass"  :collapse="collapse" />
     </el-header>
     
     <el-main>
      <router-view/>
     </el-main>

   </el-container>
 </el-container>
 </template>

 <script>
import NormalAside from "../components/NormalAside"
import NormalHeader from "../components/NormalHeader.vue"
 export default {
   name: 'Normal',
   data () {
       return {
        collapseBtnClass: 'el-icon-s-fold',
        isCollapse: false,
        sideWidth: 200,
    }
  },
      components:{
        NormalAside,
        NormalHeader,
     },
   
   methods:{
     collapse(){
         this.isCollapse = !this.isCollapse
         if(this.isCollapse){
           this.sideWidth = 64
           this.collapseBtnClass='el-icon-s-unfold'
         }
         else{
           this.sideWidth = 200,
           this.collapseBtnClass = 'el-icon-s-fold'
         }
     },
   }
   }
 
 </script>
 <style >
   .headerBg {
   background: #eee!important;
 }
  
 </style>