<template>
  <el-container class="home">
     <el-header>
      <div >预约挂号后台管理</div>
      <el-button type="primary" @click="logout">退出</el-button>
    </el-header>
     <el-container style="height: 100vh;">
      <el-aside width="200px"  background-color="#333744">
       <el-menu router  unique-opened default-active="$route.path" background-color="#333744"
        text-color="#fff"  active-text-color="#409EEF" >
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>科室管理</template>
        <el-menu-item-group>
          <el-menu-item index="/depart/create">添加科室</el-menu-item>
          <el-menu-item index="/depart/list">科室列表</el-menu-item>
        </el-menu-item-group>
     </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>医生管理</template>
        <el-menu-item-group>
          <el-menu-item index="/doctor/create">添加医生</el-menu-item>
          <el-menu-item index="/doctor/list">医生列表</el-menu-item>
        </el-menu-item-group>
     </el-submenu>
     <el-submenu index="3">
        <template slot="title"><i class="el-icon-message"></i>值班管理</template>
        <el-menu-item-group>
          <el-menu-item index="/duty/list">值班列表</el-menu-item>
        </el-menu-item-group>
     </el-submenu>
    </el-menu>
  </el-aside>
   <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
  export default {
    data () {
      return {
        
      }
    },
   methods: {
      logout(){
        console.log('111');
        
        //  window.sessionStorage.clear()
          this.$router.push('/login')
      }
   }
  }
</script>
<style scoped>
  .home{
     height: 100%;
}
.el-header{
    background-color: #373d41;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding-left: 0;
   
}
div{
       color: #fff;
       font-size: 22px;
   }
  
  .el-aside{
    background-color: #333744;
    
}
.el-menu{
        border-right: none;
    }
  .title{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }
</style>








