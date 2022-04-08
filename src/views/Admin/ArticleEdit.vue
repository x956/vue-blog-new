<template>
  <div>
    <div class="m-content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="摘要" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>

        <!--引入md编辑器-->
        <el-form-item label="内容" prop="content">
          <mavon-editor v-model="ruleForm.content"
                        ref="md"
                        @change="change"
                        @imgAdd="imgAdd"
          ></mavon-editor>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              类别：
              <el-select v-model="selectValue" clearable placeholder="请选择类别">
                <el-option
                    v-for="item in tags"
                    :value="item.id"
                    :label="item.category"
                    @click.native="setCategoryId">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

      </el-form>

    </div>

  </div>

</template>

<script>
export default {
  name: "ArticleEdit",
  data() {
    return{
      ruleForm: {
        id :'',
        title: '',
        description:'',
        content:'',
        category: '',
        categoryId:''
      },
      tags: [],
      selectValue:'',   //标签选择
      html : '',
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入摘要', trigger: 'blur' }
        ],
        content: [
          { trequired: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    const blogId=this.$route.params.blogId
    const _this = this

    if(blogId){
      this.$axios.get("/blogs/"+blogId).then(res =>{
        const blog = res.data.data
        _this.ruleForm.id=blog.id
        _this.ruleForm.title = blog.title
        _this.ruleForm.description = blog.description
        _this.ruleForm.content = blog.content
        _this.ruleForm.category=blog.category
        _this.selectValue=blog.category
      })
    }

    this.$axios.get("/tagsList").then(res=>{
      _this.tags=res.data.data
    })
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          this.$axios.post("/blog/edit",_this.ruleForm).then(res =>{
            if (res.data.code==200) {

              _this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'success'
              });

              _this.$router.push("/articleList")
            }
            else{
              _this.$message({
                showClose: true,
                message: "你没有权限编辑",
                type: 'error'
              });
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
    },

    imgAdd(pos,$file){
      let formdata = new FormData();
      formdata.append('image',$file);
      const _this = this
      this.$axios.post("/blogs/addImage",formdata).then(res =>{

        if(res.data.code == 200){
          this.$refs.md.$img2Url(pos, res.data.data.url);
        }else{
          this.$message.error(res.data.msg)
        }

      }).catch(err =>{
        console.log(err)
      })
    },
    change(value, render) {
      this.html = render;
    },
    setCategoryId(){
      this.ruleForm.categoryId=this.selectValue
    }
  }


}

</script>

<style scoped>

</style>