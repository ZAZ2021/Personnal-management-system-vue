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
<div style="margin: 10px 0">
    <el-button type="primary"  @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
    <el-popconfirm
        class="ml-5"
        confirm-button-text='确定'
        cancel-button-text='我再想想'
        icon="el-icon-info"
        icon-color="red"
        title="您确定批量删除这些数据吗？"
        @confirm="delBatch()"
    >
    <el-button type="danger" slot="reference">批量删除 <i class="el-icon-remove-outline"></i></el-button>
    </el-popconfirm>
    <!-- <el-button type="primary">导入 <i class="el-icon-bottom"></i></el-button>
    <el-button type="primary">导出 <i class="el-icon-top"></i></el-button> -->
</div>
<el-table :data="tableData"  border stripe  :header-cell-class-name="'headerBg'"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="60">
        </el-table-column>
        <el-table-column prop="id" sortable label="员工号" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="100">
        </el-table-column>
        <el-table-column prop="age" sortable label="年龄" width="100">
        </el-table-column>
        <el-table-column prop="tel" label="电话号码" width="200">
        </el-table-column>
        <el-table-column prop="duty" label="职位" width="150">
        </el-table-column>
        <el-table-column prop="dename" label="部门" width="150">
        </el-table-column>
        <el-table-column prop="address" label="地址" width="195">
        </el-table-column>
        <el-table-column label="操作"  width="250" align="center">
      <template slot-scope="scope">
        <el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
        <el-popconfirm
            class="ml-5"
            confirm-button-text='确定'
            cancel-button-text='我再想想'
            icon="el-icon-info"
            icon-color="red"
            title="您确定删除吗？"
            @confirm="del(scope.row.id)"
        >
        <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
        </el-popconfirm>
      </template>
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

    <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%" >
            <el-form label-width="100px" size="small">
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
                <el-input v-model="form.age" disabled autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
                <el-input v-model="form.tel" disabled autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="职位">
              <el-select v-model="form.duty" placeholder="请选择对应的职位" @change="editchangeduty">
                <el-option
                  v-for="item in dutys"
                  :key="item.num"
                  :label="item.duty"
                  :value="item.num">
                </el-option>
              </el-select>
           </el-form-item>
            <!-- <el-form-item label="职位">
                <el-input v-model="form.duty" autocomplete="off"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="部门">
                <el-input v-model="form.dename" autocomplete="off"></el-input>
            </el-form-item> -->
            <el-form-item label="部门">
              <el-select v-model="form.dename" placeholder="请选择对应的部门" @change="editchangdename">
                <el-option
                  v-for="item in departments"
                  :key="item.deid"
                  :label="item.dename"
                  :value="item.deid">
                </el-option>
              </el-select>
           </el-form-item>

            <el-form-item label="地址">
                <el-input v-model="form.address" disabled autocomplete="off"></el-input>
            </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
            </div>
    </el-dialog>

    <el-dialog title="用户信息" :visible.sync="addVisible" width="30%" >
            <el-form label-width="50px" size="small">
            <el-form-item label="姓名">
                <el-input v-model="add.name"  autocomplete="off"></el-input>
            </el-form-item>

            <!-- <el-form-item label="职位">
                <el-input v-model="add.duty" autocomplete="off"></el-input>
            </el-form-item> -->
            <el-form-item label="职位">
              <el-select v-model="add.duty" placeholder="请选择对应的职位" @change="addchangeduty">
                <el-option
                  v-for="item in dutys"
                  :key="item.num"
                  :label="item.duty"
                  :value="item.num">
                </el-option>
              </el-select>
           </el-form-item>

            <el-form-item label="部门">
              <el-select v-model="add.dename" placeholder="请选择对应的部门" @change="addchangdename">
                <el-option
                  v-for="item in departments"
                  :key="item.deid"
                  :label="item.dename"
                  :value="item.deid">
                </el-option>
              </el-select>
           </el-form-item>

            <!-- <el-form-item label="部门">
                <el-input v-model="add.dename" autocomplete="off"></el-input>
            </el-form-item>-->
            </el-form> 
            <div slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveadd">确 定</el-button>
            </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
    name: "用户管理",
    data() {
      return {
        tableData: [
        ],
        total: 0,
        pageNum: 1,
        pageSize: 5,
        id:"",
        name: "",
        sex:"",
        age:"",
        tel:"",
        duty:"",
        dename:"",
        address: "",
        form: {},
        add:{},
        dialogFormVisible: false,
        addVisible: false,
        multipleSelection: [],
        departments: [
      ],
      dutys:[],
      value: ''
      }
    },
    created() {
      this.load()
      this.request.get("/rank/find").then(res=>{
          this.dutys=res
       })
       this.request.get("/department").then(res=>{
          this.departments=res
       })
    },
    methods: {
      load: function () {
        this.request.get("/find",   
        {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            name: this.name,
            duty:this.duty,
            dename:this.dename
          }
        }
        ).then(res => {
          // console.log(res)
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
          // console.log(res)
          this.tableData = res.data
          this.total = res.total
          this.id=''

        })
        }
        else if(this.duty){
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
     editchangdename(e){
      // console.log(e)
     
        for(var a=1;a<=this.departments.length;a++)
        {
          if(e==this.departments[a].deid)
          {
            this.form.dename=this.departments[a].dename
          }
        }
         this.form = Object.assign({},row)
     },
     editchangeduty(e){
      // console.log(e)
        for(var a=1;a<=this.dutys.length;a++)
        {

          if(e==this.dutys[a].num)
          {
            this.form.duty=this.dutys[a].duty
          }
        }
          this.form = Object.assign({},row)
     },
     addchangdename(e){
      // console.log(e)
     
        for(var a=1;a<=this.departments.length;a++)
        {
          if(e==this.departments[a].deid)
          {
            this.add.dename=this.departments[a].dename
          }
        }
         this.add = Object.assign({},row)
     },
     addchangeduty(e){
      // console.log(e)
        for(var a=1;a<=this.dutys.length;a++)
        {

          if(e==this.dutys[a].num)
          {
            this.add.duty=this.dutys[a].duty
          }
        }
          this.add = Object.assign({},row)
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
    save() {
      this.request.post("/updatedepartment", this.form).then(res => {
          if (res) {
          this.$message.success("修改成功")
          this.dialogFormVisible = false
          this.load()
        } else {
          this.$message.error("修改失败")
        }
      })
    },
     saveadd() {
       this.request.post("/create", this.add).then(res => {
         if (res) {
           this.$message.success("增加成功")
           this.addVisible = false
           this.load()
         } else {
           this.$message.error("保存失败")
         }
       })
     },
     handleAdd() {
       this.addVisible = true
      //  this.request.get("/rank/find").then(res=>{
      //     this.dutys=res
      //  })
      //  this.request.get("/department").then(res=>{
      //     this.departments=res
      //  })
       this.add = {}
     },
     
     handleEdit(row) {
       this.form = Object.assign({},row)
      //  this.request.get("/rank/find").then(res=>{
      //     this.dutys=res
      //  })
      //  this.request.get("/department").then(res=>{
      //     this.departments=res
      //  })
       this.dialogFormVisible = true
     },
     del(id) {
       this.request.delete("/delete/"+id).then(res => {
         if (res) {
          // console.log(id)
           this.$message.success("删除成功")

           this.load()
         } else {
           this.$message.error("删除失败")
         }
       })
     },
     handleSelectionChange(val) {
      //  console.log(val)
       this.multipleSelection = val
     },

     delBatch() {
       let ids = this.multipleSelection.map(v => v.id)  // [{}, {}, {}] => [1,2,3]
      //  console.log(ids)
       this.request.post("/del", ids).then(res => {
         if (res) {
           this.$message.success("批量删除成功")
           this.load()
         } else {
           this.$message.error("批量删除失败")
         }
       })
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
      //  console.log(pageSize)
      this.pageSize = pageSize
       this.load()
     },
     handleCurrentChange(pageNum) {
      //  console.log(pageNum)
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
