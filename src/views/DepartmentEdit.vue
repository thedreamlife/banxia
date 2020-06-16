<template>
  <div>
      <h1>{{id?"编辑":"添加"}}科室</h1>
      <el-form label-width="80px" @submit.native.prevent="save">
          <el-form-item label="科室名称">
              <el-col :span='8'>
                   <el-input placeholder="科室名称" v-model="model.depName"></el-input>
              </el-col>
          </el-form-item>
           <el-form-item label="科室编号" >
               <el-col :span="8">
                    <el-input placeholder="科室编号" v-model="model.depNum" ></el-input>
               </el-col>
            </el-form-item>
           <el-form-item label="科室描述" >
               <el-col :span="8">
                   <el-input type="textarea" placeholder="科室描述" rows="6" v-model="model.depIntro"></el-input>
               </el-col>
                
          </el-form-item>
           <el-form-item label="备注" >
               <el-col :span="8">
                    <el-input  type="textarea" placeholder="备注" rows="6" v-model="model.depExtra"></el-input>
               </el-col>
            </el-form-item>
             <el-form-item>
                    <el-button  type="primary" native-type="submit">保存</el-button>
            </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    // 接收id
     props:{
        id:{
            type:String
    }
},
    data () {
        return {
            model:{
                "depName":'',
                "depNum":'',
                "depIntro":'',
                "depExtra":''
            }
            
        }
    },
    created () {
        // 获取编辑页面的数据
        this.id && this.fetch()
    },
    methods: {
       async save(){
           let res 
           if(this.id){
               res = await this.$http.post('/department/update',this.model)
            }else{
               //执行新增方法
                res = await this.$http.post('/department/save',this.model)
           }
           const msg = res.data.msg
                if(res.data.status === 500){
                    this.$message({
                        message: msg,
                        type: 'error'
                    });
                }else{
                    this.$router.push('/depart/list')
                    this.$message({
                    type:'success',
                    message:'保存成功'
                })
                }
},
        async fetch(){
            // 查看编辑详情页面
            const res = await this.$http.get(`/department/detail?depId=${this.id}`)
            // console.log(res);
            this.model= res.data.data;       
        }

}
}

</script>
<style>
</style>