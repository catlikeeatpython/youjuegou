<template>
 <div class="container">
    <header class="header">
      <mt-header title="优劵购" class="kind_header">
        <router-link to="/" slot="left">
          <mt-button icon="back" @click.native="onClickLeft"></mt-button>
        </router-link>
        <mt-button icon="search" slot="right" @click.native="onClickRight"></mt-button>
      </mt-header>
    </header>
    <div class="content content_cont">
      <div class="cont1">
        <ul>
          <router-link to="/kind?s" tag="li" @click.native="JGSheng">
            <span><img src="/static/images/up.png" /></span>
            <p>价格</p>
          </router-link>
          <router-link to="/kind?j" tag="li" @click.native="JGJiang">
            <span><img src="/static/images/down.png" /></span>
            <p>价格</p>
          </router-link>
          <router-link to="/kind?s1" tag="li" @click.native="XLSheng">
            <span><img src="/static/images/up.png" /></span>
            <p>销量</p>
          </router-link>
          <router-link to="/kind?s2" tag="li" @click.native="XLJiang">
            <span><img src="/static/images/down.png" /></span>
            <p>销量</p>
          </router-link>
        </ul>
      </div>
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <Listkind :list="list" />
      </mt-loadmore>
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
// import { mapState } from 'vuex'
// import api from '@/api/kind'
import Listkind from '@/components/home/Listkind'
import apikind from '@/api/listkind'
import Vue from 'vue'
// import {NavBar, Tab, Tabs} from 'vant'
import {Popup, Header, Loadmore, Toast} from 'mint-ui'
Vue.use(Popup, Header, Loadmore, Toast)

// Vue.use(NavBar).use(Tab).use(Tabs)
export default {
  name: 'kind',
  data () {
    return {
      active: 2,
      popupVisible: false,
      defaultResult: ['apple', 'xiaomi'],
      value: '',
      list: [],
      allLoaded: false,
      pageCode: 1
    }
  },
  components: {
    Listkind
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {
      this.popupVisible = true
    },
    search () {
      this.$router.push('/kind')
      this.$router.push({path: 'search', query: {'name': this.value}})
    },
    loadTop () {
      apikind.requestList().then(data => {
        console.log(data.data)
        this.list = data.data
        this.pageCode = 1
        this.$refs.loadmore.onTopLoaded()
      })
    },
    loadBottom () {
      apikind.loadmore(this.pageCode).then(data => {
        // this.list = [...this.]
        if (data.length === 0) {
          this.allLoaded = true
          Toast({
            message: '加载结束',
            position: 'bottom',
            duration: 5000
          })
        } else {
          this.list = [...this.list, ...data.data]
          Toast({
            message: '正在加载',
            position: 'bottom',
            duration: 5000
          })
          this.pageCode += 1
        }
        this.$refs.loadmore.onBottomLoaded()
      })
    },
    JGSheng () {
      apikind.requestData('price', 1).then(data => {
        console.log(data.data)
        this.list = data.data
      })
    },
    JGJiang () {
      apikind.requestData('price', -1).then(data => {
        console.log(data.data)
        this.list = data.data
      })
    },
    XLSheng () {
      apikind.requestData('sales', 1).then(data => {
        console.log(data.data)
        this.list = data.data
      })
    },
    XLJiang () {
      apikind.requestData('sales', -1).then(data => {
        console.log(data.data)
        this.list = data.data
      })
    }
  },
  computed: {
    filterResult () {
      return this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value))
    }
  },
  created () {
    apikind.requestList().then(data => {
      console.log(data)
      this.list = data.data
    }).catch(err => console.log(err))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/qunar/reset.scss';
// html {
//   font-size: 10.625vw;
// }
.container{
  // @include overflow();
  .header{
    .kind_header{
      @include background-color(#ff5250);
    }
  }
  .content_cont{
    position: relative;
    .cont1{
      @include rect(100%,0.3rem);
      @include flexbox();
      @include margin(0.4rem 0 0 0);
      ul{
        img{
          @include square(0.12rem)
        }
        @include flexbox();
        @include rect(100%,100%);
        @include flex();
        @include flex-direction();
        li{
          @include rect(auto,100%);
          @include flex();
          @include flex-direction();
          @include justify-content();
          @include align-items();
          @include font-size(0.12rem);
          @include flexbox();
          &.router-link-active.router-link-exact-active{
            @include color(red);
            img{
              @include color(red);
            }
          }
        }
      }
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
