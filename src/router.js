//引入vue-router路由
import VueRouter from 'vue-router';
//引入路由匹配对应的组件
import home from './components/tabbar/home.vue';
import member from './components/tabbar/member.vue';
import search from './components/tabbar/search.vue';
import shopcar from './components/tabbar/shopcar.vue';
import newslist from './components/news/newslist.vue';
//定义路由
var router=new VueRouter({
    routes: [
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/member',component:member},
        {path:'/search',component:search},
        {path:'/shopcar',component:shopcar},
        {path:'/home/newslist',component:newslist},
],
'linkActiveClass':'mui-active'
});
export default router;