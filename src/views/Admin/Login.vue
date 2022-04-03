<template>

  <div class="login-container">
    <el-form :model="ruleForm" :rules="rules"
             status-icon
             ref="ruleForm"
             label-position="left"
             label-width="0px"
             class="demo-ruleForm login-page">
      <h3 class="title">后台管理系统</h3>
      <el-form-item prop="userName">
        <el-input type="text"
                  v-model="ruleForm.userName"
                  auto-complete="off"
                  placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  v-model="ruleForm.password"
                  auto-complete="off"
                  placeholder="密码"
        ></el-input>
      </el-form-item>

      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>


</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        userName: 'xy',
        password: '123456',
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this =this
          this.$axios.post("/user/login",this.ruleForm).then(res=>{
            if(res.data.code==200){
            const token = res.data.data.token;
            const nickname = res.data.data.nickname;
            //将数据共享出去
            _this.$store.commit("SET_TOKEN",token);
            _this.$store.commit("SET_NICKNAME",nickname);
            _this.$router.push("/index");
            _this.$message({
                showClose: true,
                message: '登录成功',
                type: 'success'
              });
            }
            else {
              _this.$message.error(res.data.msg)
            }

          })
        } else {
          this.$message({
            showClose: true,
            message: "请按要求输入",
            type: 'error'
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /*background-color: #E9EEF3;*/
  color: #333;
  text-align: center;
  line-height: 160px;
}

.demo-ruleForm{
  max-width: 500px;
  margin: 0 auto;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.login-container {
  width: 100%;
  height: 100%;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>