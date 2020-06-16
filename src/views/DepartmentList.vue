<template>
  <div>
      <h1>科室列表</h1>
       <el-table :data="deplist">
        <el-table-column label="科室编号" prop="depNum" > </el-table-column>
        <el-table-column label="科室名称" prop="depName"></el-table-column>
        <el-table-column label="科室描述" prop="depIntro"></el-table-column>
        <el-table-column label="备注" prop="depExtra"></el-table-column>
        <el-table-column label="创建时间" prop="createdAt"></el-table-column>
       <el-table-column fixed="right" label="操作"  width="180">
     <template slot-scope="scope">
        <el-button type="text" size="small"
         @click="$router.push(`/depart/edit/${scope.row.depId}`)">编辑</el-button>
        <el-button type="text" size="small" 
        @click="remove(scope.row)" disabled>删除</el-button>
 </template>
    </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
    data(){
        return{
            deplist:[]
        }
    },
    created () {
        this.fetch()      
    },
    methods: {
        //async返回的是promise对象
        async fetch(){
           const res= await this.$http.get('/department/list')
          //  console.log(res);
          this.deplist = res.data.data
          // console.log(deplist);
          
        }

    }
}

</script>
