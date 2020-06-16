<template>
  <div>
      <h1>{{id?"编辑":"新建"}}医生 </h1>
      <!-- native是在根组件监听元素时必须假的 -->
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="性别">
           <el-radio v-model="model.docGender" :label="0">女</el-radio>
            <el-radio v-model="model.docGender" :label="1">男</el-radio>  
        </el-form-item>
        <el-form-item label="所属科室">
            <el-col :span="8">
              <el-select v-model="model.docDepId">
                  <el-option v-for="item in depOptions"
                            :key="item.depId"
                            :label="item.depName"
                            :value="item.depId"></el-option>
             </el-select>
            </el-col>
         </el-form-item>
        <el-form-item label="医生名称">
            <el-col :span="8">
              <el-input v-model="model.docName" ></el-input>
            </el-col>
        </el-form-item>
       
        <el-form-item label="手机号">
            <el-col :span="8">
              <el-input v-model="model.docPhone"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="民族">
            <el-col :span="8">
                <el-input v-model="model.docNation"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="出生地">
            <el-col :span="8">
                <el-input v-model="model.docAddress"></el-input>
            </el-col>
        </el-form-item>
       <el-form-item label="国籍">
            <el-col :span="8">
                <el-input v-model="model.docCountry"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="年龄">
            <el-col :span="8">
                <el-input v-model="model.docAge"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="医生编号">
            <el-col :span="8">
                <el-input v-model="model.docNum"></el-input>
            </el-col>
        </el-form-item>
         
          <el-form-item>
              <el-button  type="primary" native-type="submit">
                  保存
              </el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
  export default {
       props:{
        id:{
            type:String
        }
       },
       data () {
        return {
        model:{
          "docPassword": "",
        },
        depOptions:[]
      }
    },
    created () {
      this.fetchDepOptions()
      this.id && this.fetch()
    },
    methods: {
      async save(){
        let res
        if(this.id){
          // 修改方法
           res = await this.$http.post('/doctor/update',this.model)
        }else{
           res= await this.$http.post('/doctor/save',this.model)
        }
        this.$router.push('/doctor/list')
                    this.$message({
                    type:'success',
                    message:'保存成功'
                })
      },
      async fetchDepOptions(){
        const res= await this.$http.get('/department/list')
        this.depOptions = res.data.data
      },
       
       async fetch(){
            // 查看编辑详情页面
            const res = await this.$http.get(`/doctor/detail?docId=${this.id}`)
            console.log(res);
            this.model= res.data.data;       
   }
    }
}
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 4rem;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>