import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Admin/Login'
import Blogs from "@/views/Blogs";
import BlogDetail from "@/views/BlogDetail";
import ArticleList from "@/views/Admin/ArticleList";
import ArticleRecycle from "@/views/Admin/ArticleRecycle";
import ArticleDetail from "@/views/Admin/ArticleDetail";
import ArticleEdit from "@/views/Admin/ArticleEdit";
import TagsList from "@/views/Admin/TagsList";
import AdminIndex from "@/views/Admin/AdminIndex";


Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Index',
    redirect : {name : "Blogs"}
  },
  {
    path:'/index',
    name: 'AdminIndex',
    component: AdminIndex,
    children:[
      {
        path:'/articleList',
        name:'ArticleList',
        component: ArticleList
      },
      {
        path:'/articleRecycle',
        name:'ArticleRecycle',
        component: ArticleRecycle
      },
      {
        path:'/articleDetail',
        name:'ArticleDetail',
        component: ArticleDetail
      },
      {
        path:'/articleEdit',
        name:'ArticleEdit',
        component: ArticleEdit
      },
      {
        path:'/tagsList',
        name:'TagsList',
        component: TagsList
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  // {
  //   path: '/blog/recycle',
  //   name: 'BlogRecycle',
  //   component: BlogRecycle
  // },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
