<template>
    <div class="home-compains">
        <!-- <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbo" :key="item.img"><img :src="item.img" alt=""></mt-swipe-item>
        </mt-swipe> -->
        <swipe :lunbo='lunbo'></swipe>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/imglist">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodsbuy">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div>
                </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div>
                </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div>
                </a></li>

        </ul>
    </div>
</template>

<script>
//导入轮播图公共
import swipe from '../common/swipe.vue';
    export default {
        data() {
            return {
                lunbo: []
            }
        },

        
        created() {
            //当前组件实例的时候自动执行该方法
            this.getlunbo();
        },
        methods: {
            getlunbo() {
                this.$http.get('api/getlunbo').then(function (res) {
                    if (res.body.status == 0) {
                        this.lunbo = res.body.message;
                        // console.log(res.body.message)
                    }
                });
            }
        } ,components:{
            swipe
        }
       
    }
</script>

<style lang="scss" scoped>
    .home-compains {
        
        .mui-table-view{
            img{
                width: 50%;
            }
            // .mui-media-body{
            //     font-size: 343px;
            //     // font-style: italic;
            // }
        }

        .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
            font-size: 14px;
        }
        .mui-grid-view.mui-grid-9 .mui-table-view-cell{
            border: none;
        }
    }

</style>