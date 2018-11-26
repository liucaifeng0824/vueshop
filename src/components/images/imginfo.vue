<template>
    <div class="imginfo">
        <h2>{{ imginfo.title }}</h2>
        <div class="title_nav"><span>发表时间:{{ imginfo.add_time|formatTime }}</span><span class="click">点击:{{imginfo.click }}</span></div>
        <hr>
        <div class="images">
          <img src="http://phvbk3pna.bkt.clouddn.com/xibanya.jpg" alt="">
      </div>
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
                imginfo:[]
            }
        },
        created(){
            this.getimginfo();
        },
        methods:{
            getimginfo(){
                this.$http.get('api/getimageInfo/'+this.id).then(function(res){
                    if(res.body.status==0){
                        console.log(res);
                        this.imginfo=res.body.message[0];
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
        h2{
            padding-top: 20px;
            font-size:16px;
            color:blue;
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