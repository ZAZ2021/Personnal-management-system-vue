<template>
    <div>
        <!-- <div style="margin-bottom: 30px">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>薪资管理</el-breadcrumb-item>
        </el-breadcrumb>
        </div> -->
        <el-table :data="tableData"  border stripe  :header-cell-class-name="'headerBg'"  @selection-change="'handleSelectionChange'">
        <el-table-column prop="num" sortable label="职位号" width="365">
        </el-table-column>
        <el-table-column prop="duty" label="职位名" width="400">
        </el-table-column>
        <el-table-column prop="price" sortable label="薪资" width="400">
        </el-table-column>
        <el-table-column label="操作"  width="300" align="center">
      <template slot-scope="scope">
        <el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
        <!-- <el-popconfirm
            class="ml-5"
            confirm-button-text='确定'
            cancel-button-text='我再想想'
            icon="el-icon-info"
            icon-color="red"
            title="您确定删除吗？"
            @confirm="del(scope.row.id)"
        >
        <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
        </el-popconfirm> -->
      </template>
    </el-table-column>
</el-table>
<el-dialog title="薪资信息" :visible.sync="dialogFormVisible" width="30%" >
            <el-form label-width="50px" size="small">
            <el-form-item label="职位号">
                <el-input v-model="form.num" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="职位名">
                <el-input v-model="form.duty"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="薪资">
                <el-input v-model="form.price"  autocomplete="off"></el-input>
            </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
            </div>
    </el-dialog>
    </div>
</template>

<script>
export default{
    name:"薪资页面",
    data(){
        return {
             tableData: [
            // {
            //     num:1,
            //     duty:"董事",
            //     price:10000000
            //  },

        ],
        form:{},
        num:"",
        duty:"",
        price:"",
        dialogFormVisible:false,
        }
    
},
created(){
     this.load()
    },
    methods:{
        load: function () {
        this.request.get("/rank/find",   
        {params: {
            num: this.num,
            duty:this.duty,
            price:this.price
          }
          
        }
        ).then(res => {
          console.log("!")
          console.log(res)
          this.tableData = res
        //   this.total = res.total
        })
      },
      handleEdit(row) {
       this.form = Object.assign({},row)
       this.dialogFormVisible = true
     },
     save(){
        this.request.post("/updateprice", this.form).then(res => {
         if (res) {
           this.$message.success("修改成功")
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

<style scoped>

</style>
