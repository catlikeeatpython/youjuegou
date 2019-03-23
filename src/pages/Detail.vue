<template>
  <div class="container">
    <div class="header">
      <mt-header title="商品详情">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button slot="right" @click.native="right_btn"><img src="/static/images/daoh.png" /></mt-button>
      </mt-header>
    </div>

    <!-- <Back /> -->
    <!-- {{ pro.title }} -->
    <div class="content">
      <div class="cont_de">
        <div class="img_de"><img :src="image" /></div>
      </div>
    <p class="p_title" @click.native="showBase1">{{pro.title}}</p>
    <p class="p_price">售价：￥<span>{{pro.price}}</span></p>
    <div class="p_price_r">库存：<span>{{pro.kucun}}</span></div>
      <div class="tuijian">热门推荐</div>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
          <div>
            <List :list="list" />
          </div>
        </mt-loadmore>
      <div>
      </div>
    </div>
    <Footer1 :pro1="pro1" />
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
          <router-link to="/kind" tag="li">分类</router-link>
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
</template>

<script>
// import Vue from 'vue'
import Back from '@/components/common/Back'
import List from '@/components/home/List'
import Listkind from '@/components/home/Listkind'
import Footer1 from '@/components/Footer1'
import api from '@/api/detail'
import apihome from '@/api/home'
import Vue from 'vue'
import {Header, Loadmore, Toast} from 'mint-ui'

Vue.use(Header, Loadmore, Toast)
export default {
  name: 'detail',
  data () {
    return {
      pro: [],
      pro1: [],
      list: [],
      image: '',
      allLoaded: false,
      showBase: true,
      popupVisible: false,
      value: '', // 搜索
      defaultResult: [ // 搜索默认值
        'Apple', 'HUAWEI', '华为'
      ]
    }
  },
  components: {
    Back,
    Footer1,
    List,
    Listkind
  },
  created () {
    console.log(this)
    apihome.requestList().then(data => {
      this.list = data.data
      console.log(this, '1111111111')
      // console.log(data[0].title)
    }).catch(err => console.log(err))
    // console.log(this.$route.params.id)
    // 用query传的值
    // console.log(this.$route.query.id)
    // const routeid = this.$route.query.id
    const routeid = this.$route.params.id
    api.requestData(routeid).then(data => {
      console.log(data.data)
      this.pro = data.data[0]
      this.image = this.pro.image
      this.pro1 = data.data
      console.log(this.pro1)
      console.log(this.pro)
      // window.location.reload()
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    showBase1 () {
      this.showBase = true
    },
    right_btn () {
      this.popupVisible = true
    },
    search () {
      this.$router.push('/kind')
    },
    loadBottom () {
      api.loadmore().then(data => {
        if (data.length === 0) {
          this.allLoaded = true
          Toast({
            message: '加载完了',
            position: 'bottom',
            duration: 5000
          })
        } else {
          this.list = [...this.list, ...data.data]
          this.pageCode += 1
          Toast({
            message: '正在加载',
            position: 'bottom',
            duration: 3000
          })
        }
        this.$refs.loadmore.onBottomLoaded()
      })
    }
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
// html{
//   font-size: 20.625vw;
// }
.mint-header{
  @include font-size(.20rem);
  @include background-color(#ff5250);
}
.cont_de{
  @include font-size(.20rem);
  @include rect(100%,4rem);
  @include flexbox();
  // img {
  //   @include rect(100%, 100%);
  // }
  .img_de{
    @include flexbox();
    @include flex();
    img{
      @include flex();
      @include flex-direction();
      @include justify-content();
      @include align-items();
      @include rect(90%, 90%);
    }
  }
}
.p_title{
  @include margin;
  @include font-size(.16rem);
}
.p_price{
  @include rect(100%.16rem, 0.2rem);
  @include font-weight();
  @include color(rgb(202, 18, 18));
  span{
    @include color(rgb(105, 8, 29));
  }
}
.p_price_r{
  @include rect(100%,0.2rem);
  @include text-align(right);
}
.tuijian{
  @include rect(100%, 0.44rem);
  // @include border(1px 1px 1px 1px #ccc solid);
  @include text-align();
  @include line-height(0.44rem);
  @include color(rgb(235, 14, 51));
  @include font-size(0.20rem);
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

</style>
