
//导入vue
import Vue from 'vue';
//导入app.vue
import app from './app.vue';

//导入vue-resource
import vueResource from 'vue-resource';
//挂载到vue上
Vue.use(vueResource);
//全局设置ajax请求的根域名
Vue.http.options.root="http://127.0.0.1:3000/";
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
//导入时间过滤器
import moment from 'moment';
//定义全局的时间过滤器
Vue.filter('formatTime',function(timedata,params="YYYY-MM-DD HH:mm:ss"){
    return moment(timedata).format(params);
})
//引入路由模块
import router from './router.js';
//导入mint-ui框架header部分
import { Header } from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.component(Header.name, Header);
import { Button } from 'mint-ui';
Vue.component(Button.name, Button);
//home组件轮播图
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
//懒加载
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);

//导入vant
import { Tab, Tabs } from 'vant';
import 'vant/lib/index.css';
Vue.use(Tab).use(Tabs);

//导入muitabbar部分
import mit from './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

//导入图片详情图片预览
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

new Vue({
    el:"#app",
    render:(c)=>{
       return c(app);
    },
        router
})