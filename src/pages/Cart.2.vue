<template>
  <div class="container">
    <div class="header">
      <van-nav-bar
      title= "购物车"
      left-arrow
      class="cart_header"
      @click-left="onClickLeft"
    />
    </div>
    <div class="content">
      <div class="cart_list">
        <ul class="cart_ul">
          <li v-for="(item, index) of goods" :key="index">
            <div class="div_1"><input type="checkbox" v-model="item.flag"></div>
            <div class="div_2"><img :src="item.image" /></div>
            <div class="div_3">
              <p>{{item.shopname}}</p>
              <p class="p_1">{{item.title}}</p>
            </div>
            <div class="div_4">
              <p>￥{{item.price}}</p>
              <p class="p_2">x&nbsp;{{item.num}}</p>
              <p class="shanchu" @click="ShanchuShop(item.cartid, index)"><img src="/static/images/shanchu.png" /></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <van-submit-bar
      :price="totalPrice * 100"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import apiCart from '@/api/cart'
import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast, NavBar } from 'vant'
export default {
  inject: ['reload'],
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup,
    [NavBar.name]: NavBar
  },
  data () {
    // 从详情页将数据传递过来
    return {
      goods: [],
      allf: [],
      allflag: false,
      goodss: [],
      userIds: ''
    }
  },
  computed: {
    totalPrice () {
      return this.goods.reduce((sum, item) => {
        if (item.flag) {
          return sum + item.num * item.price
        } else {
          return sum
        }
      }, 0)
    },
    totalNum () {
      return this.goods.reduce((sum, item) => {
        if (item.flag) {
          return sum + item.num
        } else {
          return sum
        }
      }, 0)
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push('/')
    },
    onSubmit () {
      Toast.success('提交成功')
      localStorage.setItem('pay', 'ok')
      this.$router.push('/users')
    },
    ShanchuShop (id, index) {
      // this.$router.push('/')
      this.userid = localStorage.getItem('isLogin')
      apiCart.requestData(this.userid).then(data => {
        console.log(data.data[0].goods)
        let arr = data.data[0].goods
        console.log(id)
        this.userIds = data.data[0].userid
        console.log(this.userId)
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].cartid !== id) {
            this.goodss.push(arr[i])
            console.log(arr[i])
          }
        }
        console.log(this.goodss)

        apiCart.requestUpdate(this.userIds, this.goodss).then(data => {
          console.log(data)
          this.reload()
          // 当更新数据库的时候会引起二次渲染，将删除掉的数据
          this.goods.splice(index, 1)
          // this.$router.push('/cart')
        }).catch(err => console.log(err))
        // this.$router.push('/cart')
        // window.location.reload()
      }).catch(err => console.log(err))
      console.log(id)
      // window.location.reload()
    }
  },
  created () {
    apiCart.requestAllData().then(data => {
      console.log(data.data)
      this.goods = data.data[0].goods
      // this.goods = this.goodss
      console.log(this.goods)
      console.log(this.goodss)
    }).catch(err => console.log(err))
  },
  beforeRouteEnter (to, from, next) {
    console.log(11111)

    console.log(localStorage.getItem('isLogin'))
    if (localStorage.getItem('isLogin') === '15256544909') {
      console.log(2222)
      next()
    } else {
      console.log(333333)
      next('/login')
    }
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
