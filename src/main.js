//导入vue
import Vue from 'vue';
//导入app.vue
import app from './app.vue';
//导入vuex
import Vuex from 'vuex';
//安装到vue
Vue.use(Vuex);
var goodsData = JSON.parse(localStorage.getItem('goodsData')) || [];
var store = new Vuex.Store({

    //共享的数据
    state: {
        goodsData: goodsData
    },
    //更改数据专用方法
    mutations: {
        //数据保存到本地存储相关操作
        add(state, data) {
            var flag = false; //默认没有相同商品
            //如果有相同商品,需要加数量
            state.goodsData.forEach(function (item, index) {
                // console.log(item.id);
                //console.log(data.id);
                if (item.id == data.id) {
                    // console.log(2);
                    var number = parseInt(item.number);
                    //找到相同数量,需要加数量
                    number += parseInt(data.number);
                    item.number = number;
                    flag = true;
                }
            })
            //若走到这里说明没有相同商品

            if (flag == false) {
                state.goodsData.push(data);
            };
            localStorage.setItem('goodsData', JSON.stringify(state.goodsData));
        },
        //修改按钮
        changeSelected(state,data){
            // console.log(state);
            // console.log(data);
            state.goodsData.forEach(function(item,index){
                if(item.id==data.id){
                    item.selected=data.selected;
                }
            })
            //同步到本地
            localStorage.setItem('goodsData',JSON.stringify(state.goodsData));
        },
        //修改输入框数量
         changeNumber(state,data){
             state.goodsData.forEach(function(item,index){
                 if(item.id==data.id){
                    item.number=data.number;
                 }
             })
             //同步到本地
             localStorage.setItem('goodsData',JSON.stringify(state.goodsData));
         },
         del(state,data){
             console.log(state.goodsData);
             console.log(data)
             state.goodsData.forEach(function(item,index){
                 if(item.id==data){
                     state.goodsData.splice(index,1);
                 }
             })
             //同步到本地
            localStorage.setItem('goodsData',JSON.stringify(state.goodsData));
         }
    },
    //获取数据专用方法
    getters: {
        //商品总数量
        getTotalNumber(state) {
            var number = 0;
            state.goodsData.forEach(function (item, index) {
                if(item.selected==true){
                number += parseInt(item.number)
                }
            })
            return number;
        },
        getshopCarNumber(state) {
            var number = 0;
            state.goodsData.forEach(function (item, index) {
                number += parseInt(item.number)
            })
            return number;
        },
    
        //获得所有商品的id
        getgoodsid(state) {
            var ids = [];
            state.goodsData.forEach(function (item, index) {
                ids.push(item.id);
            })
            return ids.join(',');
        },
        //返回存储的数据
        getgoods(state){
            return state.goodsData
        },
        //返回总价
        getTotalPrice(state){
            var price=0;
            state.goodsData.forEach(function(item,index){
                if(item.selected==true){
                price+=parseInt(item.number)*parseInt(item.price); 
            }                  
            })
            
            return price;
        }
     
    }
})
//导入vue-resource
import vueResource from 'vue-resource';
//挂载到vue上
Vue.use(vueResource);
//全局设置ajax请求的根域名
Vue.http.options.root = "http://127.0.0.1:3000/";
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
Vue.filter('formatTime', function (timedata, params = "YYYY-MM-DD HH:mm:ss") {
    return moment(timedata).format(params);
})
//引入路由模块
import router from './router.js';
//导入mint-ui框架header部分
import {
    Header
} from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.component(Header.name, Header);
import {
    Button
} from 'mint-ui';
Vue.component(Button.name, Button);
//home组件轮播图
import {
    Swipe,
    SwipeItem
} from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
//懒加载
import {
    Lazyload
} from 'mint-ui';
Vue.use(Lazyload);
//开关按钮
import {
    Switch
} from 'mint-ui';
Vue.component(Switch.name, Switch);
//导入vant
import {
    Tab,
    Tabs
} from 'vant';
import 'vant/lib/index.css';
Vue.use(Tab).use(Tabs);

//导入muitabbar部分
import mit from './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

//导入图片详情图片预览
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

new Vue({
    el: "#app",
    render: (c) => {
        return c(app);
    },
    router,
    //把数据共享仓库vuex挂载到vue实例身上
    store
})