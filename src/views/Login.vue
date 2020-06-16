<template>
  <div class="login_container">
      <div class="login_box">
          <div class="avater">
              <img src="../assets/logo.png" alt="">
          </div>
         <!-- 表单区域 -->
          <el-form  ref="validateForm"  :rules="rules" :model="loginForm" label-width="0px" class="login_form">
              <!-- 用户名 -->
            <el-form-item prop="username">
                <el-input v-model="loginForm.username"  prefix-icon=" iconfont icon-mima-copy"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item  prop="password">
                <el-input v-model="loginForm.password" prefix-icon="iconfont icon-weibiaoti561" type="password"></el-input>
            </el-form-item>
            <!-- 按钮区域 -->
            <el-form-item class="btns">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
      </div>
       
  </div>
</template>

<script>

export default {
    data(){
        return{
            loginForm:{
                username:'admin',
                password:'123456'
            },
         rules: {
           username: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
           password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
          ]
            }
        }
    },
    methods: {
         resetForm() {
            this.$refs.validateForm.resetFields();
      },
      login(){
        //   登录前的预验证
          this.$refs.validateForm.validate( async valid=>{
              if(!valid) return;
            
              const res = await this.$http.post(`/admin/login?password=${this.loginForm.password}&username=${this.loginForm.username}`)
            //   if(res.data.meta.status!==200) 
            //   return this.$message.error('登录失败')
            // console.log(res);
            
              this.$message({
                    message: '恭喜成功',
                    type: 'success'
                    });
                window.sessionStorage.setItem('token',res.data.data)
                this.$router.push('/depart/list')
          })
      }
    }
}

</script>
<style lang="less"  scoped>
.login_container{
        height: 100%;
        background-color: #2b4b6b;
    .login_box{
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
         .avater{
                height: 130px;
                width: 130px;
                border: 1px solid #eee;
                border-radius: 50%;
                padding: 10px;
                background-color: #fff;
                box-shadow: 0 0 10px #ddd;
                position: absolute;
                left: 50%;
                transform: translate(-50%,-50%);
            img{    
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;             
            }
        }
        .login_form{
            position: absolute;
            bottom: 0;
            width: 100%;
            padding: 0 10px;
            box-sizing: border-box;
            .btns{
                display: flex;
                justify-content: flex-end;
            }
        }
    }
}



    
</style>