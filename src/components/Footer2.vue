<template>
  <div class="footer1">
    <ul class="ul_l">
      <router-link to="/home" tag="li">
        <span><img src="/static/images/home_1.png" /></span>
        <p>首页</p>
      </router-link>
      <router-link to="#" tag="li">
        <span><img src="/static/images/share.png" /></span>
        <p>分享</p>
      </router-link>
      <router-link to="#" tag="li">
        <span><img src="/static/images/collection.png" /></span>
        <p>收藏</p>
      </router-link>
    </ul>
    <ul class="ul_r">
      <router-link to="#" tag="li" @click.native="showBase">
        <span></span>
        <p>加入购物车</p>
      </router-link>
      <router-link to="#" tag="li">
        <span></span>
        <p>立即购买</p>
      </router-link>
    </ul>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <!-- <div class="van-sku-header van-hairline--bottom">
        <div class="van-sku-header__img-wrap">
          <img src="https://img.yzcdn.cn/upload_files/2017/03/16/Fs_OMbSFPa183sBwvG_94llUYiLa.jpeg?imageView2/2/w/100/h/100/q/75/format/jpg">
        </div>
        <div class="van-sku-header__goods-info">
          <div class="van-sku__goods-name van-ellipsis">测试商品</div>
          <div class="van-sku__goods-price">
            <span class="van-sku__price-symbol">￥</span><span class="van-sku__price-num">1.00</span>
          </div>
          <i class="van-icon van-icon-close van-sku__close-icon" @click.native="close_pup"><img src="/static/images/cha.png" /></i>
        </div>
      </div> -->
      <div class="foot_h">
        <div class="f_h"><img :src="pro1[0].image" /></div>
        <div class="f_cha" @click="close_pup"><img src="/static/images/cha.png" /></div>
      </div>
      <div class="foot_h1">
        <div class="f_nav">
          <p class="p_yanse">颜色:</p>
          <div class="btn_foot">
            <p  >天蓝色</p>
            <p >天蓝色</p>
          </div>

        </div>
      </div>
      <div class="foot_h1">
        <div class="f_nav">
          <p class="p_yanse">运行内存:</p>
          <div class="btn_foot">
            <p >4G</p>
            <p >6G</p>
          </div>
          <!-- <span>天蓝色</span>
          <span>天蓝色</span> -->
        </div>
      </div>
      <div class="foot_h1">
        <div class="f_nav">
          <p class="p_yanse">数量:</p>
          <div class="btn_foot1">
            <van-stepper
              v-model="value"
              integer
              :min="1"
              :max="40"
              :step="1"
            />
          </div>
        </div>
      </div>

      <van-goods-action>
        <van-goods-action-mini-btn
          icon="chat-o"
          text="客服"
        />
        <van-goods-action-mini-btn
          icon="cart-o"
          text="购物车"
          @click="GoCart"
        />
        <van-goods-action-big-btn
          text="加入购物车"
          @click="onClickBigBtn"
        />
        <van-goods-action-big-btn
          primary
          text="立即购买"
        />
      </van-goods-action>
    </mt-popup>
  </div>
</template>
<script>
import Vue from 'vue'
import {Stepper, GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn} from 'vant'
import {Popup, Button} from 'mint-ui'
import apiCart from '@/api/cart'

Vue.use(Stepper).use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn)
Vue.use(Popup, Button)
export default {
  name: 'footer1',
  props: {
    pro1: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      popupVisible: false,
      value: 1,
      good: {},
      cartid: '',
      num: '',
      image: '',
      title: '',
      brand: '',
      price: '',
      goods: [],
      userid: '',
      cart: {},
      images: '',
      flag: false
    }
  },
  created () {
    // this.images = this.pro1[0].image
    this.userid = localStorage.getItem('isLogin')
    // console.log(this.pro1)
  },
  methods: {
    showBase () {
      this.popupVisible = true
    },
    close_pup () {
      this.popupVisible = false
      // console.log('1212212')
    },
    onClickBigBtn () {
      this.good.cartid = this.pro1[0].id
      this.good.shopname = this.pro1[0].shopname
      this.good.title = this.pro1[0].title
      this.good.image = this.pro1[0].image
      this.good.price = this.pro1[0].price
      this.good.brand = this.pro1[0].brand
      this.good.num = this.value
      this.good.flag = this.flag
      this.goods.push(this.good)
      // console.log(this.good)
      apiCart.requestData(this.userid).then(data => {
        // console.log(data.data)
        if (data.data.length === 0) {
          apiCart.requestInsert(this.userid, this.goods).then(data => {
            // console.log(data)
            // console.log('执行194')
          }).catch(err => console.log(err))
        } else {
          // console.log(this.goods)
          // console.log(data.data[0].goods)
          // 如果商品的长度不为零则判断是否点击的是同一件商品，
          if (data.data[0].goods !== null) {
            // let shangpin = data.data[0].goods
            let result = data.data[0].goods.filter(item => {
              if (item.cartid === this.good.cartid) {
                item.num = this.value + item.num
              }
              return item.cartid === this.good.cartid
            })
            console.log('result ' + result)
            if (result.length === 0) {
              data.data[0].goods.push(this.good)
            }
            apiCart.requestUpdate(this.userid, data.data[0].goods).then(data => {
              // console.log('sunces')
              // console.log(data)
            }).catch(err => console.log(err))
            // data.data[0].goods.forEach((item, index) => {
            //   // console.log(item)
            //   // console.log('执行203')
            //   // 判断是否是同一个商品如果是就让商品的num = 当前的value + 商品的数量
            //   console.log(item.cartid, this.good.cartid)
            //   if (item.cartid === this.good.cartid) {
            //     item.num = this.value + item.num
            //     // console.log(data.data[0].goods)
            //     console.log('执行111111111111111111111111111')
            //     let shangpin = data.data[0].goods
            //     // 将data.data[0].goods 重新上传
            //     apiCart.requestUpdate(this.userid, shangpin).then(data => {
            //       // console.log('sunces')
            //       // console.log(data)
            //     }).catch(err => console.log(err))
            //   } else {
            //     console.log('执行2222222222222222222222222222')
            //     // 如果用户的id不同则修改
            //     this.good.num = this.value
            //     // 直接将商品push到data.data[0].goods
            //     let shangpin = data.data[0].goods
            //     shangpin.push(this.good)
            //     // console.log(shangpin)
            //     apiCart.requestUpdate(this.userid, shangpin).then(data => {
            //       // console.log(data.data)
            //     }).catch(err => console.log(err))
            //   }
            // })
          } else {
            // 如果当前的商品为零则直接插入
            apiCart.requestInsert(this.userid, this.goods).then(data => {
              console.log(data.data)
            }).catch(err => console.log(err))
          }
          // console.log(this.good)
          console.log('更新')
        }
      })
      // apiCart.requestInsert(this.userid, this.goods).then(data => {
      //   console.log(data)
      // }).catch(err => console.log(err))
      this.$router.push('/cart')
      window.location.reload()
    },
    GoCart () {
      this.$router.push('/cart')
      console.log('这是跳转的按钮')
    }
  }
}
</script>
<style lang="scss">
@import '@/qunar/reset.scss';
.footer1{
  @include rect(100%,.5rem);
  @include background-color(rgb(238, 229, 229));
  z-index: 100;
  // position: absolute;
  // bottom: 0;
  @include flexbox();
  @include flex-direction();
  .ul_l{
    img{
      @include square(0.20rem);
    }
    @include flex();
    @include flexbox();
    @include rect(50%,100%);
    @include flex-direction();
    li {
      @include flexbox();
      @include flex();
      @include rect(auto,100%);
      @include justify-content();
      @include align-items();
      @include flex-direction(column);
    }
  }
  .ul_r{
    @include flex();
    @include flexbox();
    @include rect(50%, 100%);
    @include flex-direction();
    li{
      @include flexbox();
      @include flex();
      @include justify-content();
      @include rect(auto,100%);
      @include align-items();
      @include flex-direction(column);
    }
  }
}
.mint-popup{
  @include rect(100%, 80%);
}
.foot_h{
  @include rect(100%, auto);
  // @include background-color(#ccc);
  @include flexbox();
  @include justify-content(space-between);
  .f_h{
    @include margin(0 0 0 5%);
    // @include rect(0.8rem,1rem);
    img {
      @include square(0.8rem);
    }
    // @include background-color(red);
  }
  .f_cha{
    img{
      @include square(0.2rem);
    }
  }
}
.foot_h1{
  // @include margin(5% 0 0 0);
  @include rect(100%, auto);
  // @include background-color(#ccc);
  @include flexbox();
  @include justify-content(space-between);
  .f_nav{
    @include rect(100%,1rem);
    // @include background-color(pink);
    .p_yanse{
      @include font-size(0.15rem);
      @include margin(3% 0 2% 5%)
    }
    .btn_foot {
      @include margin(0 0 0 5%);
      @include flexbox();
      @include flex-direction();
      @include rect(30%,0.24rem);
      p{
        @include flex();
        @include rect(0.2rem,auto);
        @include margin(0 0 0 0.1rem);
        @include background-color(white);
        @include line-height(0.24rem);
        @include text-align();
        @include border-radius(0.05rem);
        @include background-color(#ccc);
      }
    }
  }
}
</style>
// {userid:localStorage.getitem('isLogin'),goods:[{cartid:1122,num}]}
