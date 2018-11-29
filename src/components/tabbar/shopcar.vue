<template>
    <div class="shopcar">
        <div class="mui-card" v-for="(item,index) in shoplist" :key="index">
            <div class="mui-card-content">
                <div class="mui-card-content-inner box">
                    <div>
                        <mt-switch @change="changeSelected(item.id,$store.getters.getgoods[index].selected)" v-model="$store.getters.getgoods[index].selected"></mt-switch>
                    </div>
                    <div class="img"><img :src="item.thumb_path" alt=""></div>
                    <div class="title">
                        <div>{{ item.title }}</div>
                        <div class="price">
                            <span class="sell">¥{{ item.sell_price }}</span>
                            <span class="numberbox">
                                <numberbox :number="$store.getters.getgoods[index].number" :id="item.id"></numberbox>
                            </span>
                            <a href="#"  @click.prevent="del(item.id,index)">删除</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card" >
            <div class="mui-card-content">
                <div class="mui-card-content-inner ">
                    <div class="total">
                        <div class="price">
                             <div>总计(不含运费)</div>
                             <div>已勾选商品<span class="number">{{$store.getters.getTotalNumber}}</span>件,总价<span class="number">¥{{$store.getters.getTotalPrice}}</span></div> 
                         </div>
                    <div class="btn">
                         <mt-button type="danger" >去结算</mt-button>
                     </div> 
                    </div>    
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import numberbox from '../common/numberbox.vue';
    // import mui from "../../lib/mui/js/mui.js";

    export default {
        components: {
            numberbox
        },
        data() {
            return {
                shoplist: []
            }
        },
        created() {
            this.getshopcarlist()
        },

        methods: {
            getshopcarlist() {
                var ids = this.$store.getters.getgoodsid;
                if (ids == '') {
                    return;
                }
                this.$http.get('api/getshopcarlist/' + ids).then(function (res) {
                    if (res.body.status == 0) {
                        this.shoplist = res.body.message;
                    }
                })
            },
            //切换按钮
            changeSelected(id,selected){
                this.$store.commit('changeSelected',{id:id,selected:selected});
            },
            del(id,index){
                this.shoplist.splice(index,1);
                //同步到本地
                this.$store.commit('del',id);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .shopcar {

        .box {
            display: flex;
            height: 120px;
            align-items: center;

            .img {
                width: 60px;
                margin: 0 10px;

                img {
                    width: 100%;
                }
            }

            .title {
                width: 70%;
                font-weight: bold;

                .price {
                    display: flex;
                    align-items: center;

                    .sell {
                        color: red;
                    }

                    .numberbox {
                        padding: 0 5px;
                    }
                }
            }
        }
        .total{
            display: flex;
            justify-content:space-between;
            color: #ccc;
            font-size: 15px;
            .price{
                display: flex;
                flex-direction: column;
                .number{
                    color: red;
                }
            }
        }
    }
</style>