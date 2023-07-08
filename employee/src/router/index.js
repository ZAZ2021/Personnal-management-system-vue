import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Manager from '../views/Manager.vue'
import User from '../views/User.vue'
import store from '../store'
Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
   {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path:'/manager',
    name:'Manager',
    component: Manager,
    redirect:'/manager/home',
    children:[
      {path: '/manager/home', name: '首页', component: () => import('../views/Home.vue')},
      {path:'/manager/user',name:'用户管理',component: User},
      {path:'/manager/salary',name:'薪资页面',component: () => import('../views/Salary.vue')},
      {path:'/manager/userinfo',name:'用户信息',component: () => import('../views/UserInfo.vue')},
      {path:'/manager/person',name:'个人信息',component: () => import('../views/Person.vue')},
    ]
  },
  {
    path:'/normal',
    name:'Normal',
    // redirect
    component: ()=> import('../views/Normal.vue'),
    children:[
        {path: '/normal/home', name: '首页', component: () => import('../views/Home.vue')},
        {path:'/normal/userinfo',name:'用户信息',component: () => import('../views/UserInfo.vue')},
        {path:'/normal/person',name:'个人信息',component: () => import('../views/Person.vue')},
      
    ]
  }
 
]
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  localStorage.setItem("currentPathName", to.name)  // 设置当前的路由名称，为了在Header组件中去使用
  store.commit("setPath")  // 触发store的数据更新
  next()  // 放行路由
})

export default router
