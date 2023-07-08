<template>
    <div>
    <!-- <div style="margin-bottom: 30px">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
    </div> -->
    <div style="padding:10px 0">
    <el-input style="width:200px" placeholder="请输入名字" suffix-icon="el-icon-search" v-model="name"></el-input>
    <el-input style="width:200px" placeholder="请输入员工号" suffix-icon="el-icon-s-custom" v-model="id"></el-input>
    <el-select v-model="duty" placeholder="请选择对应的职位" @change="selectduty">
                <el-option
                  v-for="item in dutys"
                  :key="item.num"
                  :label="item.duty"
                  :value="item.num">
                </el-option>
    </el-select>
    <el-button class="ml-5" type="primary" @click="search()">搜索</el-button>
    <el-button type="warning" @click="reset">重置</el-button>
    </div>
    <div style="margin-top: 10px;"></div>
<el-table :data="tableData"  border stripe  :header-cell-class-name="'headerBg'"  @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="60">
        </el-table-column> -->
        <el-table-column prop="id" sortable label="员工号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="123">
        </el-table-column>
        <el-table-column prop="age" sortable label="年龄" width="123">
        </el-table-column>
        <el-table-column prop="tel" label="电话号码" width="200">
        </el-table-column>
        <el-table-column prop="duty" label="职位" width="200">
        </el-table-column>
        <el-table-column prop="dename" label="部门" width="200">
        </el-table-column>
        <el-table-column prop="address" label="地址" width="200">
        </el-table-column>
</el-table>
    <div style="padding:10px 0">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
    </div>

  </div>
</template>
<script>
export default {
    name: "用户信息",
    data() {
      return {
        tableData: [
       
        ],
        id:"",
        name: "",
        sex:"",
        age:"",
        tel:"",
        duty:"",
        dename:"",
        address: "",
        total: 0,
        pageNum: 1,
        pageSize: 5,
        form: {},
        dialogFormVisible: false,
        multipleSelection: [],
        dutys:[],
      }
    },
    created() {
      this.load()
       this.request.get("/rank/find").then(res=>{
          this.dutys=res
       })
    },
    methods: {
       load(){
       this.request.get("/find", {
         params: {
           pageNum: this.pageNum,
           pageSize: this.pageSize,
           id:this.id,
           name: this.name,
           sex:this.sex,
           age:this.age,
           tel:this.tel,
           duty:this.duty,
           dename:this.dename,
           address: this.address,
         }
       }).then(res => {
         console.log(res)
         this.tableData = res.data
         this.total = res.total

       })
     },
     search() {
      if(this.name){
        this.request.get("/findbyname", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name:this.name,
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.data
        this.total = res.total
        this.name=''
      })
      }
      else if(this.id){
        this.request.get("/findbyId", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          id:this.id,
        } 
      }).then(res => {
        console.log(res)
        this.tableData = res.data
        this.total = res.total
        this.id=''
      })
  }else if(this.duty){
          this.request.get("/findbyDuty", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            duty:this.duty,
          }
        }).then(res => {
          // console.log(res)
          this.tableData = res.data
          this.total = res.total
          this.duty=''
        })
        }

},
  selectduty(e){
      // console.log(e)
        for(var a=1;a<=this.dutys.length;a++)
        {

          if(e==this.dutys[a].num)
          {
            this.duty=this.dutys[a].duty
          }
        }
          this.duty = Object.assign({},row)
     },
     collapse(){
         this.isCollapse = !this.isCollapse
         if(this.isCollapse){
           this.sideWidth = 64
           this.collapseBtnClass='el-icon-s-unfold'
         }
         else{
           this.sideWidth = 200
         }
     },
     handleSelectionChange(val) {
       console.log(val)
       this.multipleSelection = val
     },
     reset() {
       this.name = ""
       this.id=""
       this.sex=""
       this.age=""
       this.duty=""
       this.tel = ""
       this.address = ""
       this.dename = ""
       this.load()
     },
     handleSizeChange(pageSize) {
       console.log(pageSize)
       this.pageSize = pageSize
       this.load()
     },
     handleCurrentChange(pageNum) {
       console.log(pageNum)
       this.pageNum = pageNum
       this.load()
     }
    }
  }
  </script>


  <style>
  .headerBg {
    background: #eee!important;
  }
  </style>
