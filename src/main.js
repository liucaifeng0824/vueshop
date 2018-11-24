
//导入vue
import Vue from 'vue';
//导入app.vue
import app from './app.vue';
//导入vue-resource
import vueResource from 'vue-resource';
//挂载到vue上
Vue.use(vueResource);
//导入底部组件
// import home from './components/tabbar/home.vue';
// import member from './components/tabbar/member.vue';
// import search from './components/tabbar/search.vue';
// import shopcar from './components/tabbar/shopcar.vue';
// import newslist from './components/news/newslist.vue';
//路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// var router=new VueRouter({
//     routes: [
//         {path:'/',redirect:'/home'},
//         {path:'/home',component:home},
//         {path:'/member',component:member},
//         {path:'/search',component:search},
//         {path:'/shopcar',component:shopcar},
//         {path:'/home/newslist',component:newslist},
// ],
// 'linkActiveClass':'mui-active'
// });
//引入路由模块
import router from './router.js';
//导入mint-ui框架header部分
import { Header } from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.component(Header.name, Header);
//home组件轮播图
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);




//导入muitabbar部分
import mit from './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';



new Vue({
    el:"#app",
    render:(c)=>{
       return c(app);
    },
        router
})