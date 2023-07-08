<template>
    <div class="home">
        <template>
            <el-carousel height="800px" arrow="always">
                <el-carousel-item>
                    <img src="../assets/home1.jpg" class="carousel_image_type">
                </el-carousel-item>
                <el-carousel-item>
                    <img src="../assets/home2.jpg" class="carousel_image_type">
                </el-carousel-item>
                <el-carousel-item>
                    <img src="../assets/home3.jpg" class="carousel_image_type">
                </el-carousel-item>
                <el-carousel-item>
                    <img src="../assets/home4.jpg" class="carousel_image_type">
                </el-carousel-item>
            </el-carousel>
        </template>
    </div>
</template>

<script>
export default{
    name:"首页",
    
}
</script>

<style scoped>
 /* .home{
    width: 100%;
    height: 100%;
    font-size: 16px;
    background-size: 100% 100%;
 } */
 /* .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  } */
  .carousel_image_type{
     width: 100%;
  }
</style>
