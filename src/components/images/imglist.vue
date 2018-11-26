<template>
    <div class="photo_contains">
        <van-tabs v-model="active" @click="imglist">
            <van-tab :title="item.title"  v-for="(item,index) in cats" :key="index">
                <div class="imglist">
                    <router-link tag="li" v-for="item in list" :key="item.id" :to="'/home/imginfo/'+item.id">
                        <img v-lazy="item.img_url" alt="">
                        <div class="content">
                            <div class="title">
                                {{ item.title }}
                            </div>
                            <div class="zhaiyao">
                                {{ item.zhaiyao }}
                            </div>
                        </div>
                    </router-link>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
                cats: [],
                list: []
            }
        },
        created() {
            this.getimgcat();
            this.imglist(0, '全部');
        },
        methods: {
            getimgcat() {
                this.$http.get('api/getimgcategory').then(function (res) {
                    console.log(res);
                    if (res.body.status == 0) {
                        this.cats = res.body.message;
                        this.cats.unshift({
                            id: 0,
                            title: '全部'
                        })
                    }
                })
            },
            imglist(index, title) {
                var id = (this.cats.length == 0 ? 0 : this.cats[index].id);
                this.$http.get('api/getcatimages/' + id).then(function (res) {
                    if (res.body.status == 0) {
                        this.list = res.body.message;;
                         console.log(this.list);
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .photo_contains {
        padding: 0 5px;

        img {
            width: 100%;
            height: 280px;

        }
       img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
        }

        .title {
            font-size: 16px;
        }

        .zhaiyao {
            font-size: 14px;
        }

        .imglist {
            li {
                list-style: none;
                position: relative;
            }

            .content {
                padding: 0 5px;
                color: white;
                position: absolute;
                bottom: 0px;
                background-color: rgba(0, 0, 0, 0.5);
            }
        }
    }
</style>