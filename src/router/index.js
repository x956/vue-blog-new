import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Blogs from "@/views/Blogs";
import BlogDetail from "@/views/BlogDetail";
import BlogEdit from "@/views/BlogEdit";
import BlogRecycle from "@/views/BlogRecycle";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect : {name : "Blogs"}
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
  {
    path: '/blog/recycle',
    name: 'BlogRecycle',
    component: BlogRecycle
  },
  {
    path: '/blog/add',
    name: 'BlogAdd',
    component: BlogEdit
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    component: BlogEdit
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
