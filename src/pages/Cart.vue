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
        <ul>
         <van-checkbox-group v-model="result">
          <li v-for="(item, index) of goods" :key="index">
            <van-checkbox  @click="Select" :name="item.cartid"></van-checkbox>
            <van-card
              :num="item.num"
              tag="标签"
              :price="item.price"
              :desc="item.shopname"
              :title="item.title"
              :thumb="item.image"
              origin-price="10.00"
              >
              <div slot="footer">
                <van-stepper v-model="item.num" @change="onChange(item.cartid, item.num)"/>
                <!-- <van-button size="mini">迷你按钮</van-button> -->
                <van-button size="mini" @click="ShanchuShop(item.cartid, index)">删除</van-button>
              </div>
            </van-card>
          </li>
          </van-checkbox-group>
        </ul>
      </div>
      <van-checkbox v-model="checked" @click="AllkSelect">全选</van-checkbox>
    </div>
    <p><span>{{totalNum}}</span></p>
    <van-submit-bar
      :price="totalPrice * 100"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import apiCart from '@/api/cart'
import {Checkbox, CheckboxGroup, Card, SubmitBar, Toast, NavBar, Stepper} from 'vant'
export default {
  inject: ['reload'],
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup,
    [NavBar.name]: NavBar,
    [Stepper.name]: Stepper
  },
  data () {
    // 从详情页将数据传递过来
    return {
      goods: [],
      goods2: [],
      allf: [],
      allflag: false,
      goodss: [],
      userIds: '',
      result: [],
      checked: false,
      order: [],
      userIdss: ''
      // value
    }
  },
  computed: {
    totalPrice () {
      if (this.result.length !== 0 && this.result.length !== this.goods.length && this.checked === false) {
        return this.goods.reduce((sum, item) => {
          this.result.forEach((item1, index) => {
            if (item1 === item.cartid) {
              // console.log(item,ite)
              sum += item.num * item.price
            }
          })
          console.log(sum)
          return sum
        }, 0)
      } else if (this.result.length === this.goods.length || this.checked === true) {
        return this.goods.reduce((sum, item) => {
          sum = sum + item.num * item.price
          return sum
        }, 0)
      } else {
        return 0
      }
    },
    totalNum () {
      if (this.result.length !== 0 && this.result.length !== this.goods.length && this.checked === false) {
        return this.goods.reduce((sum, item) => {
          this.result.forEach((item1, index) => {
            if (item1 === item.cartid) {
              sum = sum + item.num
              console.log(sum)
            }
          })
          return sum * 1
        }, 0)
      } else if (this.result.length === this.goods.length || this.checked === true) {
        return this.goods.reduce((sum, item) => {
          sum = sum + item.num
          // String(sum)
          return sum * 1
        }, 0)
      }
    }
  },
  methods: {
    AllkSelect () {
      if (this.checked === true) {
        this.goods.forEach((item, index) => {
          this.result.push(item.cartid)
        })
      } else {
        this.result = []
      }
    },
    Select () {
      if (this.result.length === this.goods.length && this.goods.length !== 0) {
        this.checked = true
      } else {
        this.checked = false
      }
    },
    onClickLeft () {
      this.$router.push('/')
    },
    onChange (val1, val2) {
      console.log(val1, val2)
      this.userIdss = localStorage.getItem('isLogin')
      // 找到指定的商品===通过cartid 将数据库中的数据调取出来
      apiCart.requestData(this.userIdss).then(data => {
        this.goods2 = data.data[0].goods
        this.goods2.forEach((item, index) => {
          if (item.cartid === val1) {
            item.num = val2
            // 截取字符串
            // this.goods2.slice(item, index)
            console.log(this.goods2)
            apiCart.requestUpdate(this.userIdss, this.goods2).then(data => {
              console.log(data)
              // this.reload()
            }).catch(err => console.log(err))
          }
        })
      })
    },
    onSubmit () {
      Toast.success('提交成功')
      localStorage.setItem('pay', 'ok')
      // if (this.result.goods !== this.goods.length && this.result.length !== 0 && this.checked === false) {
      //   this.goods.forEach((item, index) => {
      //     this.result.forEach((item1, index1) => {
      //       if (item1 === item.cartid) {
      //         this.order.push(item1)
      //       }
      //     })
      //   })
      // }
      this.$router.push({path: '/users', query: {order: this.result}})
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
          if (arr[i].cartid === id) {
            // this.goodss.push(arr[i])
            this.goods.splice(i, 1)
            console.log(arr[i])
          }
        }
        // console.log(this.goodss)

        apiCart.requestUpdate(this.userIds, this.goods).then(data => {
          console.log(data)
          // 当更新数据库的时候会引起二次渲染，将删除掉的数据          
          // this.$router.push('/cart')
        }).catch(err => console.log(err))
        // this.$router.push('/cart')
        // window.location.reload()
      }).catch(err => console.log(err))
      // this.reload()
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

</style>
