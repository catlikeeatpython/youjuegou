<template>
 <div class="container">
    <header class="header">
      <van-nav-bar
        class="user_header"
        title="用户中心"
        left-text="返回"
        right-text="设置"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </header>
    <div class="content cont01">
      <div class="logoing">
        <div class="logo_img">
          <div class="logo_zhen">
            <img :src="images" />
          </div>
        </div>
      </div>
      <div>
        <div class="dingdan">
          <router-link to="#" tag="p" @click.native="GoDingDan">我的订单</router-link>
          <router-link to="#" tag="p">全部订单</router-link>
        </div>
        <hr />
        <div class="user_nav">
          <ul>
            <li>
              <span><img src="/static/images/fukuan.png" /></span>
              <p>待付款</p>
            </li>
            <li>
              <span><img src="/static/images/fahuo.png" /></span>
              <p>待发货</p>
            </li>
            <li>
              <span><img src="/static/images/shouhuo.png" /></span>
              <p>待收货</p>
            </li>
            <li>
              <span><img src="/static/images/pingjia.png" /></span>
              <p>评价</p>
            </li>
            <li>
              <span><img src="/static/images/shouhou.png" /></span>
              <p>付款/售后</p>
            </li>
            </ul>
          </div>
        </div>
        <div class="listnav">
          <p><router-link to="#">我的优惠券</router-link></p>
          <!-- <hr> -->
          <p><router-link to="#">我的收藏</router-link></p>
          <!-- <hr> -->
          <p><router-link to="#">我的拼团</router-link></p>
          <!-- <hr> -->
          <p><router-link to="#">我的免单卷</router-link></p>
           <!-- <hr> -->
          <p><router-link to="#">借钱</router-link></p>
        </div>
        <div class="listnav1">
          <p><router-link to="#">我的优惠券</router-link></p>
          <!-- <hr> -->
          <p><router-link to="#">我的收藏</router-link></p>
        </div>
      </div>
      <mt-popup
        v-if="isShow"
        v-model="popupVisible"
        class="shezhi"
        position="bottom">
        <div class="exit" @click="shangchuan">
          <p class="p_ex1">重新登录</p>
        </div>
        <div class="exit" @click="loginOut">
          <p class="p_ex1">退出登录</p>
        </div>
      </mt-popup>
      <mt-popup
        v-model="popupVisible1"
        position=""
        class="touxiang"
        >
        <img :src="images" @click="Touxiang1"/>
        <!-- <img :src="images" @click="Touxiang2"/> -->
      </mt-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import { Actionsheet, Popup } from 'mint-ui'
import { NavBar } from 'vant'

Vue.use(NavBar)
Vue.use(Actionsheet, Popup)
export default {
  name: 'users',
  data () {
    return {
      actions: [
        {
          // name是表单上显示的文本
          name: '退出登录',
          // 可选）是单击时的回调
          method: this.fn1
        },
        {
          name: '放弃退出',
          method: this.fn2
        }
      ],
      sheetVisible: false,
      popupVisible: false,
      popupVisible1: false,
      isShow: true,
      isShow1: true,
      images: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=750938708,3668637938&fm=15&gp=0.jpg'
    }
  },
  methods: {
    outuser () {
      this.sheetVisible = true
    },
    fn1 () {
      console.log('退出登录')
    },
    fn2 () {
      console.log('放弃退出')
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {
      // this.$router.push('/login')
      this.popupVisible = true
      console.log('///')
      // this.$router.push('/')
    },
    loginOut () {
      localStorage.setItem('isLogin', 'no')
      localStorage.setItem('Loging', 'no')
      // this.popupVisible = false
      // window.location.reload()
      console.log('///')
      this.isShow = false
      this.$router.push('/login')
      // this.$router.push('/')
    },
    shangchuan () {
      this.$router.push('/login')
      localStorage.setItem('isLogin', 'no')
    },
    Touxiang1 () {
      this.images = this.images1
      this.isShow1 = false
      this.popupVisible1 = false
    },
    GoDingDan () {
      this.$router.push('/dingdan')
    }
    // Touxiang2 () {
    //   this.images = this.images2
    //   this.popupVisible1 = false
    //   this.isShow1 = false
    // }
    // selecActive () {
    //   this.sheetVisible = true
    // }
  },
  created () {
    if (localStorage.getItem('Loging') === 'ok') {
      this.images = 'http://img3.imgtn.bdimg.com/it/u=528576959,2055568600&fm=26&gp=0.jpg'
    } else if (localStorage.getItem('Loging') === 'no') {
      this.images = 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=750938708,3668637938&fm=15&gp=0.jpg'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/qunar/reset.scss';
.header{
  // .btn{
  //   float: right;
  // }
}
hr{
  @include rect(90%,0.01rem);
}
.cont01{
  @include background-color(#eee);
}
.user_header{
  @include background-color(#ff5250);
}
.dingdan{
  @include border-radius(0.1rem);
  @include margin(0.3rem 0 0 0);
  @include rect(100%,0.4rem);
  @include background-color(white);
  @include flexbox();
  @include flex-direction();
  @include justify-content(space-between);
  @include align-items();
  p{
    @include margin();
  }
}
.user_nav {
  @include rect(100%,0.8rem);
  @include background-color(white);
  @include border-radius(0.1rem);
  // @include flexbox();
  ul{
    @include flexbox();
    @include flex-direction();
    @include rect(100%, 100%);
    li {
      @include rect(auto, 100%);
      @include flex();
      @include flex-direction(column);
      @include justify-content();
      @include align-items();
      @include text-align();
      @include flexbox();
    }
  }
}
.listnav{
  @include margin(0.1rem 0 0 0);
  @include rect(100%, 2.7rem);
  @include border-radius(0.1rem);
  @include background-color(white);
  @include text-align(left);
  p{
    @include rect(90%, 0.5rem);
    @include line-height(0.5rem);
    @include border(0 0 0.01rem 0);
     @include margin(0 5% 0 5%);
    // @include background-color(red);
    a{
      @include margin(0 0 0 0.2rem);
      @include color(black);
    }
  }
  // @include
}
.listnav1{
  @include margin(0.1rem 0 0 0);
  @include rect(100%, 1rem);
  @include border-radius(0.1rem);
  @include background-color(white);
  @include text-align(left);
  p{
    @include rect(90%, 0.5rem);
    @include line-height(0.5rem);
    @include border(0 0 0.01rem 0);
     @include margin(0 5% 0 5%);
    // @include background-color(red);
    a{
      @include margin(0 0 0 0.2rem);
      @include color(black);
    }
  }
  // @include
}
.shezhi{
  @include rect(100%, 1.5rem);
  .exit{
    @include rect(50%,30%);
    @include background-color(#ccc);
    @include margin(5% 0 0 25%);
    @include border-radius(0.3rem);
    .p_ex1{
      @include padding(5% 0 0 36%);
    }
  }
}
.logoing {
  @include rect(100%, 0.8rem);
  .logo_img {
    @include rect(0.8rem, 0.8rem);
    @include background-color(#ff5250);
    @include padding(10% 40% 10% 40%);
    @include margin(5% 10% );
    @include border-radius(50%);
    .logo_zhen {
      @include rect(0.6rem,0.6rem);
      // @include background-color(white);
      @include margin(-0.26rem 0 0 -0.24rem);
      @include border-radius(50%);
      img {
        @include square(0.6rem);
        @include border-radius(50%);
      }
    }
  }
}
.touxiang{
  @include rect(2rem,2rem);
  @include background-color(white);
  img {
    @include square(0.8rem);
  }
}
</style>
