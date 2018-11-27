<template>
    <div class="goodsbuy">
        <router-link tag="div" :to="'/home/goodsinfo/'+item.id" class="box" v-for="item in goods" :key="item.id">
            <img v-lazy="item.img_url" >
            <h3>{{ item.title }}</h3>
            <div class="fixed">
            <div class="price">
                <span class="new">￥{{ item.sell_price }}</span><span class="old">￥{{ item.market_price }}</span>
            </div>
            <div class="footer">
                <span class="hot">热卖中</span>
                <span class="stock">剩{{ item.stock_quantity }}件</span>
            </div>
            </div>
        </router-link>
          <mt-button type="danger" size="large" plain  @click="loadmore">加载更多</mt-button>
    </div>

</template>

<script>
import { Toast } from 'mint-ui';
    export default {
        data(){
            return{
                pageindex:1,
                goods:[]
            }
        },
        created(){
            this.getgoodslist();
        },
        methods:{
            getgoodslist(){
                this.$http.get("api/getgoods?pageindex="+this.pageindex).then(function(res){
                    if(res.body.status==0){
                        console.log(res)
                        this.goods=this.goods.concat(res.body.message);
                    }
                })
            },
            loadmore(){
                this.pageindex++;
               this.$http.get("api/getgoods?pageindex="+this.pageindex).then(function(res){
                   if(res.body.message.length==0){
                        Toast('没有更多了');
                        return;
                   }else{
                        console.log(res)
                        this.goods=this.goods.concat(res.body.message);
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goodsbuy {
        padding: 5px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content:space-between;
        .box{
            border: 1px solid #ccc;
            padding: 5px 5px;
            width: 49%;
            box-shadow:#ddd 0px 0px 0px 5px;
            display: flex;
            justify-content: space-between;
            flex-direction: column; 
            img{
                width: 100% ;
            }
            h3{
                font-size: 18px;
            }
            .price{
                .new{
                    color: red; 
                    font-size: 16px;
                    padding: 15px 20px 0 10px;
                }
                .old{
                    font-size: 14px;
                  
                    text-decoration: line-through;  
                }
            }
            .footer{
                display: flex;
                justify-content:space-between; 
                .hot{
                      color: #ccc;
                   padding: 10px 0 5px 5px;
                } 
                .stock{
                      color: #ccc;
                   padding: 10px 5px 0px 5px;
                }
            }
            .fixed{
                background-color:#ddd;
            }
        }
    }
</style>