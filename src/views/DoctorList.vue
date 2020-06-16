<template>
  <div>
      <h1>医生列表</h1>
       <el-table :data="doclist">
        <el-table-column label="医生编号" prop="docNum"></el-table-column>
        <el-table-column label="医生名称" prop="docName"></el-table-column>
        <el-table-column label="所属科室" prop="depName"></el-table-column>
        <el-table-column label="联系方式" prop="createdAt"></el-table-column>
       <el-table-column fixed="right" label="操作"  width="180">
     <template slot-scope="scope">
        <el-button type="text" size="small"
         @click="$router.push(`/doctor/edit/${scope.row.docId}`)">编辑</el-button>
        <el-button type="text" size="small" 
        @click="remove(scope.row)">删除</el-button>
 </template>
    </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
    data(){
        return{
            doclist:[]
        }
    },
    created () {
        this.fetch()      
    },
    methods: {
        //async返回的是promise对象
        async fetch(){
          const res= await this.$http.get('/doctor/list')
          this.doclist = res.data.data.rows
        },
        async remove(row){
          this.$confirm(`是否确定要删除医生列表 "${row.docName}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
            // 用id请求删除操作
          const res = await this.$http.get(`/doctor/delete?docId=${row.docId}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        //   重新获取数据
          this.fetch()
        })
        }
    }
}

</script>
