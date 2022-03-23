<template>
  <div>
    <el-container>
      <el-header>
        <h1 class="mlog">M y B l o g</h1>
      </el-header>
      <el-main>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>

      </el-main>
    </el-container>
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
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
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
            console.log(res)
            console.log(res.data.code)
            if(res.data.code==200){
            const token = res.data.data.token;
            const nickname = res.data.data.nickname;
            //将数据共享出去
            _this.$store.commit("SET_TOKEN",token);
            _this.$store.commit("SET_NICKNAME",nickname);
            _this.$router.push("/blogs");
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
          console.log('error submit!!');
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
.mlog{

  height: 60%;
  margin-top: 1px;

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
</style>