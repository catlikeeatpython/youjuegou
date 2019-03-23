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
   <li  v-for="item of list" :key="item.id" @click="goDetail(item.id)">
      <div class="listimg">
        <img :src="item.images.small" :alt="item.alt"/>
         <p>{{item.title}}</p>
         <span class="span1">售价:<i>100</i></span>
         <span class="span2">售:<i>100</i></span>
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
  methods: {
    goDetail (id) {
      // 第一种 routes.js  path: '/detail/:id',
      // this.$router.push('/detail/' + id)
      this.$router.push({name: 'detail', params: {id}})
      // 第二种
      // this.$router.push('/detail?id=' + id)
      // this.$router.push({name: 'detail', query: {id}})
      // this.$router.push({path: '/detail', query: {id}})
      console.log(id)
    }
  }
}
</script>
<style lang="scss">
@import '@/qunar/reset.scss';
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
    .listimg {
      @include padding(0.05rem);
      @include rect(1.5rem, 2.5rem);
      img {
        @include rect(1.6rem, 2rem);
      }
      span{
        @include rect(50%,0.3rem)
      }
      .span1{
        float: left;
      }
      .span2{
        float: right;
        text-align: right;
      }
    }
    @include border(0 0 1px 0,#ccc, solid);
  }
}
</style>
