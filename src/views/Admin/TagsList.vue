<template>
  <div>

    <div class="search_blog_input">
      <el-row>
        <el-col :span="5"><div class="grid-content bg-purple">
          <el-input class="content_for_search"
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="search_content">
          </el-input></div>
        </el-col>
        <el-col :span="5"><div class="grid-content ">
          <el-button class="search_button" type="primary" icon="el-icon-search" @click="submitSearch()">搜索</el-button>
          <el-button class="reset_button" type="info"  @click="resetSearch()">重置</el-button>
        </div></el-col>
      </el-row>
    </div>

    <div class="edit_button">
      <el-button type="primary" icon="el-icon-edit" @click="addTags">新增</el-button>
    </div>




    <template>
      <el-table
          :data=this.tags
          border
          style="width: 100%">
        <el-table-column
            fixed
            prop="id"
            label="ID"
            width="250">
        </el-table-column>
        <el-table-column
            fixed
            prop="category"
            label="类别名称"
            width="250">
        </el-table-column>
        <el-table-column
            prop="description"
            label="描述"
            width="250">
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态"
            width="150">
        </el-table-column>
        <el-table-column
            prop="updateTime"
            label="更新时间"
            width="180">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="250">
          <template slot-scope="scope">
            <el-button @click="editTags(scope.row)" type="warning" size="small">编辑</el-button>
            <el-button @click="tagsStop(scope.row.id)" type="danger" size="small">停用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!--    <div class="block">-->
    <!--      <el-timeline class="m_bloglist">-->
    <!--        <el-timeline-item :timestamp=blog.updateTime placement="top" v-for="blog in blogs">-->
    <!--          <el-card>-->
    <!--            <h4>-->
    <!--              <router-link :underline="false" :to="{name :'BlogDetail', params :{blogId:blog.id}}">-->
    <!--                {{ blog.title }}-->
    <!--              </router-link>-->
    <!--            </h4>-->
    <!--            <p>{{ blog.description }}</p>-->
    <!--            <el-button type="text" @click="blogRecycle(blog.id)">删除</el-button>-->
    <!--          </el-card>-->
    <!--        </el-timeline-item>-->
    <!--      </el-timeline>-->
    <!--    </div>-->

    <el-pagination class="mpage"
                   background
                   layout="prev, pager, next"
                   :current-page="currentPage"
                   :page-size="pageSize"
                   :total="total"
                   @current-change="page"
    >
    </el-pagination>


    <el-dialog title="编辑标签" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标签名称">
          <el-input v-model="form.category" placeholder="新建标签名称" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" placeholder="标签描述" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="form.status" label="0" >启用</el-radio>
          <el-radio v-model="form.status" label="1" >停用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDialogForm()">确 定</el-button>
      </div>
    </el-dialog>

  </div>


</template>

<script>

export default {
  name: "TagList",
  data(){
    return {
      tags: [],
      currentPage: 1,
      total: 0,
      pageSize: 5,
      search_content: '',
      form: {
        id:'',
        category:'',
        description: '',
        status: '0'
      },
      dialogFormVisible:false
    }
  },
  created() {
    console.log(this.$route.query.search_content)
    this.search_content = this.$route.query.search_content
    this.page(this.currentPage)
  },
  methods:{
    page(currentPage){
      const _this= this
      // console.log("/blogs?currentPage="+currentPage+"&searchContent="+this.search_content)
      _this.$axios.get("/tags?currentPage="+currentPage).then(res=>{
        _this.tags = res.data.data.records
        _this.currentPage=res.data.data.current
        _this.total=res.data.data.total
        _this.pageSize=res.data.data.size
      })
    },

    submitDialogForm(){
      const _this = this
      this.$axios.post("/tags/edit",this.form).then(res=>{
        _this.dialogFormVisible = false
        _this.$message({
          showClose: true,
          message: res.data.msg,
          type: 'success'
        });
        _this.$router.go(0)
      })
    },

    submitSearch(){
      this.page(1);
    },

    resetSearch(){
      this.search_content='';
      this.page(1);
    },

    editTags(scope){
      this.form.id = scope.id
      this.form.category = scope.category
      this.form.description = scope.description
      this.form.status= scope.status.toString()
      this.dialogFormVisible = true
      // this.$router.push({name:'ArticleEdit',params:{blogId:blogId}})
    },

    addTags(){
      this.dialogFormVisible=true
    },

    tagsStop(tagsId){
      const _this= this
      this.$axios.post("/tags/stop/"+tagsId).then(res =>{
        console.log(res)
        const code = res.data.code
        const msg =res.data.msg
        if(code == 200){
          _this.$message({
            showClose: true,
            message: msg,
            type: 'success'
          });
          _this.$router.go(0)
        }
        else{
          _this.$message({
            showClose: true,
            message:msg,
            type: 'error'
          })
        }

      })
    }
  }
}
</script>

<style scoped>


.mpage{
  text-align: center;
}

.edit_button{
  text-align: left;
  margin-bottom: 10px;
  margin-top: 10px;
}

</style>