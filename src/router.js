//引入vue-router路由
import VueRouter from 'vue-router';
//引入路由匹配对应的组件
import home from './components/tabbar/home.vue';
import member from './components/tabbar/member.vue';
import search from './components/tabbar/search.vue';
import shopcar from './components/tabbar/shopcar.vue';
import newslist from './components/news/newslist.vue';
import newsarticle from './components/news/newsarticle.vue';
import imglist from './components/images/imglist.vue';
import imginfo from './components/images/imginfo.vue';

//定义路由
var router=new VueRouter({
    routes: [
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/member',component:member},
        {path:'/search',component:search},
        {path:'/shopcar',component:shopcar},
        {path:'/home/newslist',component:newslist},
        {path:'/home/newsarticle/:id',component:newsarticle},
        {path:'/home/imglist',component:imglist},
        {path:'/home/imginfo/:id',component:imginfo},  
],
'linkActiveClass':'mui-active'
});
export default router;