<template>
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
</template>
<script>
export default {
  name: 'right_nav'
}
</script>
<style lang="scss">
@import '@/qunar/reset.scss';
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
