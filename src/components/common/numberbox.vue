<template>
    <div>
        <div class="mui-numbox" data-numbox-min='1' data-numbox-max='200'>
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" ref="number" :value="number" @change="changeNumber" />
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
  import mui from "../../lib/mui/js/mui.js";


    export default {
        //在mounted生命周期中进行数字输入框的初始化操作
    mounted(){
      mui('.mui-numbox').numbox();
    },
    props:[
        'number',
        'id'
    ],
    methods:{
        changeNumber(){
            //获取输入框输入框输入的值
            var number=this.$refs.number.value;
            this.$store.commit('changeNumber',{number:number,id:this.id})
        }
    }
    }

</script>

<style scoped>

</style>