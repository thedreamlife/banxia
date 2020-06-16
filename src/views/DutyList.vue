<template>
  <div>
      <h1>排班记录</h1>
      <el-card>
        <el-row>
          <el-form>
          <el-form-item label="所属科室">
            <el-col :span="8">
              <el-select v-model="model"  @change="dutyList">
                  <el-option v-for="item in depOptions"
                            :key="item.depId"
                            :label="item.depName"
                            :value="item.depId" ></el-option>
             </el-select>
            </el-col>
         </el-form-item>
         </el-form>
        </el-row>

         <el-table :data="tabList" border stripe >
                
                <el-table-column v-for="item in time" :key="item.key" :prop="item.key" :label="item.label" >
                     
                     <template slot-scope="scope">
                            
                            <el-button type="primary" plain v-for="(item,i) in scope.row[scope.column.property]" :key="i" @click="removeName(item)">
                            {{item.docName}}
                            </el-button>  
                            <el-button type="danger" icon="el-icon-edit" size="mini" circle 
                            @click="editInfo(item.label)" class="btn"></el-button>

                    </template>
                  
                </el-table-column>
                
        </el-table>

      </el-card>

      <!-- 弹框 -->
      <el-dialog
        title="添加"
        :visible.sync="editdialogVisible"
        width="50%">
       <el-row >
           <el-col :span="5">
               选择医生
           </el-col>
           <el-col>
                <el-select v-model="list" @change="editdoc">
                  <el-option v-for="item in doctorList"
                            :key="item.docId"
                            :label="item.docName"
                            :value="item.docId" ></el-option>
              </el-select>
           </el-col>
       </el-row>   
        <span slot="footer" class="dialog-footer">
            <el-button @click="editdialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addDoctor">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return{
            time:[],
            depOptions:[],
            model:[],
            tabList:[
               {
                  'one':[],
                  'two':[],
                  'three': [],
                  'four': [],
                  'five': [],
                  'six': [],
                  'seven': []
              }
           ],
           editdialogVisible:false,
           doctorList:[],
           list:[],
           currDepiId: 0,
           editduty:{
               datetime:'',
               depId:0,
               docId:0,
              
           },
        
        }
    },
    created () {
        this.fetch() 
         this.fetchDepOptions() 
        
          
    },
    methods: {
        //async返回的是promise对象
        async fetch(){
           const res= await this.$http.get('/time')
           this.time.push({'label':res.data.data['one'], 'key':'one'})
           this.time.push({'label':res.data.data['two'], 'key':'two'})
           this.time.push({'label':res.data.data['three'], 'key':'three'})
           this.time.push({'label':res.data.data['four'], 'key':'four'})
           this.time.push({'label':res.data.data['five'], 'key':'five'})
           this.time.push({'label':res.data.data['six'], 'key':'six'})
           this.time.push({'label':res.data.data['seven'], 'key':'seven'})

        },
       
    async fetchDepOptions(){
        const res= await this.$http.get('/department/list')
        this.depOptions = res.data.data
      },
      async dutyList(id){
          const res = await this.$http.get(`/duty/list?depId=${id}`)
          this.currDepiId = id
          this.editduty.depId=id.toString()
          
        this.tabList = [
            {
                'one':res.data.data['one'],
                'two':res.data.data['two'],
                'three':res.data.data['three'],
                'four':res.data.data['four'],
                'five':res.data.data['five'],
                'six':res.data.data['six'],
                'seven':res.data.data['seven'],
            }]
        ;
           console.log(this.tabList);
          
      },
     async  removeName(item){
        //  console.log(item.dutyId);
         
         const res =  await this.$confirm('此操作将永久删除该医生, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch((err) => err)
        if(res !=='confirm'){
                return this.$message.info('取消删除')
            }
        const result = await this.$http.get(`/duty/delete?dutyId=${item.dutyId}`)
        // console.log(result);
        this.fetch() 
        
      },
        async editInfo(i){
            // console.log(i);
            this.editduty.datetime = i;
            
        
        const res =  await this.$http.get(`/doctor/list?depId=${this.currDepiId}`)
        //    console.log(res);
        this.doctorList=res.data.data.rows
        this.editdialogVisible=true
    },
    async addDoctor(){
        console.log(this.editduty);
        
        const res = await this.$http.post(`/duty/save?datetime=${this.editduty.datetime}&depId=${this.editduty.depId}&docId=${this.editduty.docId}`)
        console.log(res);
       window.location.reload();
        this.editdialogVisible=false
    },
    editdoc(docid){
        this.editduty.docId = docid.toString();

        // console.log(this.editInfo.depId);
        // console.log(this.editInfo.docId);
        // console.log(this.editInfo.datetime);
        
        
        
    }

    }

    
    
}

</script>
<style scoped>
.el-button{
    margin: 5px;
}
/* .el-table-column{
    position: relative;
} */
.btn{
    position: absolute;
    right: 0;
    bottom:0
}

</style>