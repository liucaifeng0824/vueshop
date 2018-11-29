<template>
  <div class="goodsdetailcontainer">
    <!-- 卡片card：商品轮播图 -->
    <div class="mui-card">
      <!-- <div class="mui-card-header">页眉</div> -->
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- 引用轮播图子组件 -->
          <swipe :lunbo="lunbo"></swipe>
        </div>
      </div>
      <!-- <div class="mui-card-footer">页脚</div> -->
    </div>

    <!-- 卡片card:商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">
        {{ goodsinfo.title }}
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>
            <span class="market">市场价：¥{{ goodsinfo.market_price }}</span>
            <span class="now">本店价：¥{{ goodsinfo.sell_price }}</span>
          </p>
          <div class="nums">
            <span class="number">购买数量： </span>
            <div class="mui-numbox" data-numbox-min='1' data-numbox-max='200'>
              <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
              <input id="test" class="mui-input-numbox" type="number" ref="number" value="5" />
              <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
            </div>
          </div>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" class="mai">立即购买</mt-button>
        <mt-button type="danger" @click="addGoodsCar">加入购物车</mt-button>
      </div>
    </div>

    <!-- 卡片card:商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>
            商品货号：{{ goodsinfo.goods_no }}
          </p>
          <p>
            库存情况：{{ goodsinfo.stock_quantity }}件
          </p>
          <p>
            上架时间：{{ goodsinfo.add_time|formatTime }}
          </p>
        </div>
      </div>
      <div class="mui-card-footer btn">
        <mt-button plain type="primary" size="large" class="text" @click="getgoodsdesc">图文介绍</mt-button>
        <mt-button plain type="danger" size="large" @click="getcomment">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  //导入轮播公共组件
  import swipe from '../common/swipe.vue';
  import mui from "../../lib/mui/js/mui.js";
  import numberbox from '../common/numberbox.vue';
  export default {
    components: {
      swipe,
      numberbox
    },
    data() {
      return {
        id: this.$route.params.id,
        lunbo: [],
        goodsinfo: []
      }
    },
    created() {
      this.getlunbo()
      this.getgoodsinfo();
    },
    mounted() {
      //执行这里，说明虚拟dom已经挂载到真实dom中，这时候，可以用js去操作页面中的dom元素
      //初始化我们的number-box组件
      mui('.mui-numbox').numbox()
    },
    methods: {
      //轮播图
      getlunbo() {
        this.$http.get('api/getthumbimages/' + this.id).then(function (res) {
          console.log(res.body);
          if (res.body.message.length == 0) {
            //设置默认图片,追加一个对象
            res.body.message.push({
              img: "http://phvbk3pna.bkt.clouddn.com/huawei.png",
              url: "http://phvbk3pna.bkt.clouddn.com/huawei.png",
            });
          } else {
            //有图片
            //由于轮播图子组件swipe中每个对象需要img和url属性，所以，需要构造这两个数据
            res.body.message.forEach(ele => {
              ele.img = ele.src;
              ele.url = ele.src;
            });
          }
          //赋值给当前data的lunbo属性
          this.lunbo = res.body.message;
        });
      },
      //商品信息
      getgoodsinfo() {
        this.$http.get("api/getgoodsinfo/" + this.id).then(function (res) {
          console.log(res)
          if (res.body.status == 0) {
            this.goodsinfo = res.body.message[0];
          }
        })
      }, 
      //图文介绍相关
      getgoodsdesc() {
        this.$router.push('/home/goodsdesc/' + this.id);
      },
      //评论相关
      getcomment() {
        this.$router.push('/home/goodscomment/' + this.id);
      },
      //加入购物车
     addGoodsCar(){
       
       var data={
         id:this.id,
          number:this.$refs.number.value,
         price:this.goodsinfo.sell_price,
         selected:true,
       };
       //把数据存储到vuex中
      this.$store.commit('add',data);
     }
    }
  }
</script>

<style lang='scss' scoped>
  .goodsdetailcontainer {
    .nums{
      display: flex;
      align-items: center;
    }
    p {
      font-size: 16px;
    }

    .number {
      color: #888;
    }

    .market {
      text-decoration: line-through;
    }

    .now {
      color: red;
      font-weight: bold;
      margin-left: 5px;
    }

    .mui-card-footer {
      display: flex;
      justify-content: flex-start;

      .mai {
        margin-right: 5px;
      }

    }

    .btn {
      display: flex;
      flex-direction: column;
    }

    .text {
      margin-bottom: 5px;
    }
  }
</style>