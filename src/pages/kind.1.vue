<template>
 <div class="container">
    <header class="header">
      <van-nav-bar
        title="标题"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click.native="onClickRight"
      />
    </header>
    <div class="content">
      <div class="cont">
        <van-tabs v-model="active">
          <van-tab title="升序">升序</van-tab>
          <van-tab title="降序">降序</van-tab>
        </van-tabs>
      </div>
      <!-- {{ msg }}
      {{ bannerdata }}
      {{ prolist }} -->
      <mt-popup
        v-model="popupVisible"
        position="left">
        <div class="r_container">
          <!-- <form action=" " target="frameFile"> -->
          <p>
            <mt-search
              autofocus
              v-model="value"
              :result="filterResult" @keyup.enter.native="search">
            </mt-search>
          </p>
          <!-- </form> -->
        </div>
        <div class="sear_login">
          <ul>
            <router-link to="/home" tag="li" >首页</router-link>
            <router-link to="/kind" tag="li">商品列表</router-link>
            <router-link to="/users" tag="li">母婴</router-link>
          </ul>
          <ul>
            <router-link to="/home1" tag="li">手机</router-link>
            <router-link to="/home2" tag="li">电脑</router-link>
            <router-link to="/home3" tag="li">耳机</router-link>
          </ul>
          <ul>
            <router-link to="/home4" tag="li">男装</router-link>
            <router-link to="/home5" tag="li">女装</router-link>
            <router-link to="/home6" tag="li">童装</router-link>
          </ul>
          <ul>
            <router-link to="/home7" tag="li">美妆</router-link>
            <router-link to="/home8" tag="li">居家</router-link>
            <router-link to="/home9" tag="li">家纺</router-link>
          </ul>
          <ul>
            <router-link to="/home10" tag="li">电器</router-link>
            <router-link to="/home11" tag="li">内衣</router-link>
            <router-link to="/home12" tag="li">配饰</router-link>
          </ul>
          <ul>
            <router-link to="/home13" tag="li">买家秀</router-link>
            <router-link to="/home14" tag="li">聚划算</router-link>
            <router-link to="/hom15" tag="li">积分商城</router-link>
          </ul>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import api from '@/api/kind'
import Vue from 'vue'
import {NavBar, Tab, Tabs} from 'vant'

Vue.use(NavBar).use(Tab).use(Tabs)
export default {
  name: 'kind',
  data () {
    return {
      active: 2,
      popupVisible: false
    }
  },
  computed: {
    msg () {
      return 'test'
    },
    // 通过计算属性传值
    // bannerdata () {
    //   console.log(1)
    //   return this.$store.state.KindStore.bannerdata
    // },
    // prolist () {
    //   return this.$store.state.KindStore.proList
    // }
    ...mapState({
      bannerdata: state => state.KindStore.bannerdata,
      prolist: state => state.KindStore.proList
    })
  },
  created () {
    // 通过this.$store.commit('mutationname', data)提交数据给/kind/index.js
    console.log(this)
    // api.requestData('https://www.daxunxun.com/banner').then(data => {
    //   this.$store.commit('changeBannerData', data)
    // }).catch(err => console.log(err))
    // api.requestData('https://www.daxunxun.com/douban').then(data => {
    //   this.$store.commit('changeproList', data)
    // }).catch(err => console.log(err))
    this.$store.dispatch('requestBanner')
    this.$store.dispatch('requestprolist')
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {
      this.popupVisible = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/qunar/reset.scss';
.container{
  .header{
    .van-nav-bar{
      @include background-color(rgb(44, 240, 247));
    }
  }
  .content{
    .cont{
    }
    .mint-popup{
      @include rect(70%,100%);
      .r_container{
        // @include position();
        @include rect(100%,0.5rem);
        @include background-color(red);
      }
      .sear_login{
        @include rect(100%,2rem);
        // @include background-color(blue);
        // @include flexbox();
        // @include flex-direction(column);
        ul{
          @include flexbox();
          @include rect(100%, 0.4rem);
          @include border(0 0 1px 0, #ccc solid);
          li{
            @include flex();
            @include text-align();
            @include flex-direction();
            @include justify-content();
            @include line-height(0.4rem);
            &.router-link-active.router-link-exact-active{
              @include color(red);
            }
            // @include align-items();
          }
        }
      }
    }
  }
}
</style>
