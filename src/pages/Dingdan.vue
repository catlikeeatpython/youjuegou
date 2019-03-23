<template>
  <div class="container">
    <div class="header">
      <van-nav-bar
      title= "订单详情"
      left-arrow
      class="cart_header"
      @click-left="onClickLeft"
    />
    </div>
    <div class="content">
      <div class="cart_list">
        <ul class="cart_ul">
          <li v-for="(item, index) of good" :key="index">
            <div class="div_2"><img :src="item.image" /></div>
            <div class="div_3">
              <p>{{item.shopname}}</p>
              <p class="p_1">{{item.title}}</p>
            </div>
            <div class="div_4">
              <p>￥{{item.price}}</p>
              <p class="p_2">x&nbsp;{{item.num}}</p>
              <p class="shanchu" @click="ShanchuShop(item.cartid)"><img src="/static/images/shanchu.png" /></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- <van-submit-bar
      :price="totalPrice * 100"
      button-text=""
      @submit="onSubmit"
    /> -->
  </div>
</template>

<script>
import apiCart from '@/api/cart'
import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast, NavBar } from 'vant'

export default {
  name: 'dingdan',
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup,
    [NavBar.name]: NavBar,
    [NavBar.Toast]: Toast
  },
  data () {
    return {
      good: [],
      userid: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  },
  created () {
    this.userid = localStorage.getItem('isLogin')
    apiCart.requestData(this.userid).then(data => {
      console.log(data.data)
      this.good = data.data[0].goods
    }).catch(err => console.log(err))
  }
}
</script>

<style lang="scss">
@import '@/qunar/reset.scss';
.cart_header{
  @include background-color(#ff5250);
}
.cart_list {
  @include rect(100%,100%);
  @include background-color(white);
  .cart_ul {
    @include rect(100%, auto);
    @include background-color(#fafafa);
    li {
      @include rect(100%, auto);
      @include flexbox();
      @include padding(0.1rem 0 0 0);
      @include border(0 0 0.01rem white solid);
      img {
        @include square(100%);
      }
      .div_1{
        @include rect(15%, 1.2rem);
        input{
          @include margin(45%)
        }
      }
      .div_2 {
        @include rect(30%,1.2rem);
      }
      .div_3{
        @include rect(40%,1.2rem);
        .p_1{
          @include font-size(0.12rem);
        }
      }
      .div_4{
        @include flex();
        // @include text-align(right);
        .p_2{
          @include padding(0 0 0 50%);
        }
        .shanchu{
          // @include square(0.3rem);
          @include text-align(right);
          img {
            @include square(0.2rem);
            @include margin(1% 5% 0 0);
          }
        }
      }
    }
  }
}
</style>
