<template>
  <div>
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
import Vue from 'vue'
import { Popup } from 'mint-ui'

Vue.use(Popup)
export default {
  name: 'listdet'
}
</script>
<style lang="scss">

</style>
