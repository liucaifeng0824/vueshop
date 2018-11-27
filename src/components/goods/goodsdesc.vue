<template>
    <div>
       <h3>{{ goodsdesc.title }}</h3>
       <hr>
       <div v-html="goodsdesc.content">

       </div>
    </div>
</template>

<script>
    import mui from "../../lib/mui/js/mui.js";
    export default {
        data(){
            return{
                id:this.$route.params.id,
                goodsdesc:[]
            }
        },created(){
            this.getgoodsdesc()
        },
        methods:{
            getgoodsdesc(){
                this.$http.get("api/getgoodsdesc/"+this.id).then(function(res){
                    console.log(res)
                    if(res.body.status==0){
                        this.goodsdesc=res.body.message[0];
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
/deep/ img{
        width: 100%;
}
</style>