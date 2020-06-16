<template>
  <div>
     <el-card>
       
     </el-card>
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
