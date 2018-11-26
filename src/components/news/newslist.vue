<template>
    <div class="newslist-contains">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in news" :key="item.id">
                <router-link :to="'/home/newsarticle/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        {{ item.title }}
                        <p class='mui-ellipsis'>发布:{{item.add_time | formatTime }} <span class="dianji">点击 {{item.click }}</span></p>
                    </div>
                </router-link>

            </li>

        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                news: []
            }
        },
        created() {
            this.getnewslist();
        },
        methods: {
            getnewslist() {
                this.$http.get('api/getnewslist').then(function (res) {
                    if (res.body.status == 0) {
                        this.news = res.body.message;
                    }

                })
            }
        }
    }
</script>

<style scoped>
    .dianji{
        float: right;
    }
</style>