<template>
    <div class="contains-app"> 

        <!-- header -->
       <mt-header fixed title="vue shop">
		   <span slot="left" v-show="flag">
        <mt-button icon="back" @click='back'>返回</mt-button>
      </span>
	   </mt-header>
        <!-- contains -->
        <!-- tabbal -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item " to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{ $store.getters.getshopCarNumber }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
            
		</nav>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
		data(){
			return{
				//控制返回按钮显示和隐藏,默认隐藏
				flag:false
			}
		},
        methods:{
			back(){
				 this.$router.go(-1);
			}
		},
		//监听路由对象
		 watch:{
      '$route':function(newValue,oldValue){
        console.log(newValue,oldValue);
        //如果newValue.path == /home，把flag设置为false,否则为true
        if(newValue.path == '/home'){
          this.flag = false;
        }else{
          this.flag = true;
        }
      }
    }
    }   
</script>

<style scoped>
    .contains-app{
        margin-top: 40px;
		padding-bottom: 50px;
    }
</style>