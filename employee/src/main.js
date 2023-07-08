// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/global.css'
import request from './network/request'
import store from './store'
// import axios from 'axios'
// import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(Element,{size:"mini"});
Vue.prototype.request=request
// Vue.use(VueAxios, axios)
// // 给axios对象配置一个baseUrl
// axios.defaults.baseURL = "http://localhost:8080"
 
// // 将axios作为全局的自定义数学，每个组件可以在内部直接调用$http进行调用axios
// app.config.globalProperties.$http = axios  

new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})
