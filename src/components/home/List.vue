<template>
  <ul class="movielist">
    <!-- 声明式 /detail/:id-->
    <!-- <router-link tag="li" :to="{name: 'detail',params: {id:item.id}}" v-for="item of list" :key="item.id">
      <div class="listimg">
        <img :src="item.images.small" :alt="item.alt"/>
      </div>
      <div class="info">
        <h3>{{item.title}}-----{{item.id}}</h3>
      </div>
    </router-link> -->
    <!-- 第二种声明式 route.js /detail -->
    <!-- <router-link tag="li" :to="{name: 'detail',query: {id:item.id}}" v-for="item of list" :key="item.id">
      <div class="listimg">
        <img :src="item.images.small" :alt="item.alt"/>
      </div>
      <div class="info">
        <h3>{{item.title}}-----{{item.id}}</h3>
      </div>
    </router-link> -->
    <!-- 第三种声明式 routes.js name==>path='/detail' route.js /detail -->
    <!-- <router-link tag="li" :to="{path: '/detail',query: {id:item.id}}" v-for="item of list" :key="item.id">
      <div class="listimg">
        <img :src="item.images.small" :alt="item.alt"/>
      </div>
      <div class="info">
        <h3>{{item.title}}-----{{item.id}}</h3>
      </div>
    </router-link> -->

    <!-- 编程式 /detail/:id--->
   <li  v-for="(item, index) of list" :key="index" @click="goDetail(item.id)">
      <div class="listimg">
        <img :src="item.image" :alt="item.alt"/>
         <p class="p_t">{{item.title}}</p>
      </div>
      <div class="spandiv">
        <p>售价:￥<i>{{item.price}}</i></p>
        <p class="p_sales">售:<i>{{item.sales}}</i></p>
      </div>
      <!-- <div class="info">
        <h3>{{item.title}}</h3>
      </div> -->
    </li>
  </ul>
</template>

<script>
// import api from '@/api/detail'
export default {
  name: 'homelist',
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  watch: {
    $route (newVal) {
      console.log(newVal)
    }
  },
  methods: {
    goDetail (id) {
      // 第一种 routes.js  path: '/detail/:id',
      // this.$router.push('/detail/' + id)
      this.$router.push({name: 'detail', params: {id}})
      // 第二种
      // this.$router.push('/detail?id=' + id)
      // this.$router.push({name: 'detail', query: {id}})
      // this.$router.push({path: '/detail', query: {id}})
      // console.log(id)
      // window.location.reload()
    }
  }
}
</script>
<style lang="scss">
@import '@/qunar/reset.scss';
// html {
//   font-size: 15.625vw;
// }
.movielist {
@include flexbox();
@include flex-flow(wrap);
@include background-color(#ececec);
  li {
    @include color(#767676);
    @include rect(50%, auto);
    @include flexbox();
    @include justify-content();
    @include align-items();
    @include flex-direction(column);
    position: relative;
    .listimg {
      @include padding(0.05rem);
      @include rect(2rem, 3rem);
      img {
        @include rect(100%, 2.4rem);
      }
      .p_t{
        @include font-size(0.13rem)
      }
    }
    .spandiv{
      @include rect(100%,0.3rem);
      @include flexbox();
      @include flex-direction();
      p{
        @include flex();
        @include justify-content(space-between);
        @include align-items();
        @include text-align();
      }
      .p_sales{
        @include text-align(center);
      }
    }
    @include border(0 0 1px 0,#ccc, solid);
  }
}
</style>
