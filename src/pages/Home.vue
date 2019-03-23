<template>
 <div class="container">
    <header class="header">
      <mt-header title="优劵购" class="home_head">
        <router-link to="/" slot="left">
          <mt-button @click.native="right_btn"><img src="/static/images/search1.png" /></mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </header>
    <div class="content">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <mt-swipe :auto="4000" class="mit-swipe">
          <mt-swipe-item v-for="(item, index) of Slide" :key="index">
            <img :src="item" alt="item">
          </mt-swipe-item>
        <!-- <mt-swipe-item>1</mt-swipe-item>
        <mt-swipe-item>1</mt-swipe-item>
        <mt-swipe-item>1</mt-swipe-item> -->
        </mt-swipe>
        <!-- 向List传数据-->
        <Cont />
        <Notice />
        <Listkind :list="list" />
      </mt-loadmore>
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
            <router-link to="/kind" tag="li">手机</router-link>
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
import Vue from 'vue'
import Listkind from '@/components/home/Listkind'
import Cont from '@/components/home/Cont'
import Notice from '@/components/home/Notice'
import api from '@/api/home'
import slideapi from '@/api/slide'
import { Swipe, SwipeItem, Loadmore, Toast, Header, Popup, Search } from 'mint-ui'

// 使用ui库中的组件
Vue.use(Swipe, SwipeItem, Loadmore, Header, Popup, Search)
export default {
  name: 'home',
  components: {
    Listkind,
    Cont,
    Notice
  },
  data () {
    return {
      list: [],
      Slide: [],
      allLoaded: false, // 判断是否全部加载完毕
      pageCode: 1,
      popupVisible: false,
      value: '', // 搜索
      defaultResult: [ // 搜索默认值
        'Apple', 'HUAWEI', '华为'
      ]
    }
  },
  methods: {
    loadTop () { // 下拉刷新的函数实际上是请求列表第一页的数据
      api.requestList().then(data => {
        this.list = data.data
        console.log(this.list)
        this.pageCode = 1
        // console.log(this)
        this.$refs.loadmore.onTopLoaded() // 更新列表的高度
        // console.log(data[0].title)
      }).catch(err => console.log(err))
    },
    loadBottom () {
      api.loadmore(this.pageCode).then(data => {
        if (data.length === 0) {
          this.allLoaded = true
          Toast({
            message: '加载完毕',
            position: 'bottom',
            duration: 5000
          })
        } else {
          // this.allLoaded = false
          this.list = [...this.list, ...data.data]
          this.pageCode += 1
        }
        this.$refs.loadmore.onBottomLoaded()
      })
      // this.allLoaded = true
    },
    right_btn () {
      this.popupVisible = true
    },
    // 搜索跳转
    search () {
      // this.$router.push('/kind')
      this.$router.push({path: '/search', query: {'name': this.value}})
      console.log(this.value)
    }
  },
  created () {
    api.requestList().then(data => {
      this.list = data.data
      console.log(this)
      // console.log(data[0].title)
    }).catch(err => console.log(err))
    slideapi.requestslide().then(data => {
      let arr = []
      for (var item of data) {
        arr.push('http:' + item.image)
        console.log('https:' + item.image)
      }
      this.Slide = arr
      console.log(this.Slide)
    }).catch(err => console.log(err))
  },
  computed: {
    filterResult () {
      return this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/qunar/reset.scss';
.home_head{
  @include background-color(#ff5250);
}
.mit-swipe{
  @include rect(100%,1.7rem);
  img{
    @include rect(100%, auto);
  }
}
.content{
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

</style>
