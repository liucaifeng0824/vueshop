<template>
    <div class="imginfo">
        <h2>{{ imginfo.title }}</h2>
        <div class="title_nav"><span>发表时间:{{ imginfo.add_time|formatTime }}</span><span class="click">点击:{{imginfo.click }}</span></div>
        <hr>
        <!-- <div class="images" v-for="item in img" :key="item.src">
          <img :src="item.src" alt="">
      </div> -->
        <vue-preview  :slides = "img" > </vue-preview >
        <div class="content" v-html="imginfo.content"></div>
        <comment :id="id"></comment>
    </div>
</template>

<script>
    //引入评论模块
    import comment from '../common/comment.vue';
    export default {
        data(){
            return{
                id:this.$route.params.id,
                imginfo:[],
                img:[]
            }
        },
        created(){
            this.getimginfo();
            this.gethumbimg();
        },
        methods:{
            getimginfo(){
                this.$http.get('api/getimageInfo/'+this.id).then(function(res){
                    if(res.body.status==0){
                        this.imginfo=res.body.message[0];
                    }
                })
            },
            gethumbimg(){
                this.$http.get('api/getthumbimages/'+this.id).then(function(res){
                    console.log(res);
                    if(res.body.message.length==0){
                        this.img.push(
                        {h:400,w:600,src:'../../images/photo.png',msrc:'../../images/photo.png'})
                    }else{
                        //需要给插件设置msrc w 和h属性
                        res.body.message.forEach(ele => {
                            ele.w='100%';
                            ele.h=400;
                            ele.msrc=ele.src;
                        });  
                                         
                   this.img=res.body.message;     
                    }
                })
            }
        },
        components:{
            comment 
        }
    }
</script>

<style lang="scss" scoped>
    .imginfo{
        padding: 0 5px;
        h2{
            padding-top: 20px;
            font-size:16px;
            color:blue;
            text-align: center;
        }
       /deep/ img{
            width: 100%;
            text-align: center;
        }
        .title_nav{
            font-size: 16px;
        }
        .click{
           float: right;
        }
        .content{
            font-size: 16px;
            line-height: 30px;
        }
    }

</style>