<template>
    <div class="article-contains">
        <h2>{{ article.title }}</h2>
        <div class="son_title">
            <span class="article-time">发表时间:{{ article.add_time|formatTime }}</span> <span class="click">点击:{{
                article.click }}</span>
        </div>
        <hr>
        <div class="content" v-html='article.content'>

        </div>
        <!-- <div class="commons">
            <h2>发布评论</h2>
            <textarea name="" placeholder="请输入要BB的内容(最多吐槽120个字)" v-model="comment"></textarea>
            <mt-button type="primary" size="large" @click='sendcomment'>发表评论</mt-button>
            <div class="common_contents" v-for="(item,index) in comments" :key="index">
                <div class="common_cotents_nav">
                    <span>第{{index+1 }}楼</span><span>用户:{{ item.user_name }}</span><span>发表时间:{{ item.add_time
                        |formatTime }}</span>
                </div>
                <div class="content">
                    {{ item.content }}
                </div>
            </div>
            <mt-button type="primary" size="large" plain class="mint-ui" @click="loadmore">加载更多</mt-button>
        </div> -->
        <comment :id="id"></comment>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import comment from '../common/comment.vue';
    export default {
        data() {
            return {
                //接受发送过来的ID
                id: this.$route.params.id,
                article: [],
                // pageindex: 1,
                // comment: '',
                // comments:[]
            }
        },
        created() {
            this.getarticle();
            this.getcomments();
        },
        methods: {
           
            getarticle() {
                this.$http.get('api/getnew/' + this.id).then(function (res) {
                    if (res.body.status == 0) {
                        this.article = res.body.message[0];
                    }
                })
            },
            // //获取评论数据
            // getcomments() {
            //     this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageindex).then(function (res) {
            //         //console.log(res);
            //         if (res.body.status == 0) {
            //             this.comments = res.body.message
            //         }
            //     })
            // },
            // //提交评论
            // sendcomment() {
            //     if (this.comment == '') {
            //         Toast('评论不能为空');
            //     }else{
            //     this.$http.post('api/postcomment/' + this.id,{content:this.comment},{emulateJSON:true}).then(function (res) {
            //         if(res.body.status==0){  
            //                this.comments=[];                  
            //             for(var i=1;i<=this.pageindex;i++){
            //                this.$http.get('api/getcomments/' + this.id + '?pageindex=' + i).then(function(res){
            //                    this.comments = this.comments.concat(res.body.message);
            //                })
            //             }    
                      
            //         }
            //            this.comment='';       
            //             Toast('添加评论成功');
            //     })
            // }
            // },
            // //加载更多
            // loadmore(){
            //     this.pageindex++;
            //     this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageindex).then(function (res) {
            //        // console.log(res.body.message.length);
            //         if(res.body.message.length==0){
            //             Toast('没有更多了');
            //             return;
            //         }else{
            //             this.comments = this.comments.concat(res.body.message);
            //         } 
            //     })
            // }
        },
        components:{
            comment
        }
    }
</script>

<style lang="scss" scoped>
    .article-contains {
        margin: 0px 5px;

        padding: 10px 0;

        h2 {
            font-size: 17px;
            text-align: center;
            color: red;
        }

        .son_title {
            padding: 0 5px;
            color: blue;

            .article-time {

                font-size: 14px;
            }

            .click {
                float: right;
            }
        }

        .content {
            padding: 0px 5px;
        }

        .commons {
            h2 {
                text-align: left;
                font-size: 18px;
                color: #000;
            }

            textarea {
                height: 150px;
            }

            .common_cotents_nav {
                margin: 5px;
                font-size: 14px;
                background-color: #ccc;

            }

        //     .content {
        //         font-size: 14px;
        //         padding: 6px 10px;
        //     }
         }

        .mint-ui {
            border-color: rgb(75, 12, 12);
            color: red;
        }
    }
</style>