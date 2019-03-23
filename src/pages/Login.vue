<template>
  <div class="container">
    <van-nav-bar
      class="login_header"
      title="会员登录"
      left-text="返回"
      left-arrow
      right-text="去注册"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      />
    <mt-field  placeholder="请输入用户名" type="text" v-model="username"></mt-field>
    <mt-field  placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <mt-button class="login_btn" type="primary" @click.native="loginin">登录</mt-button>
    <div>
      <span class="log_p_l">还没注册账号？<router-link to="/register">去注册</router-link></span>
      <span class="log_p_r"><router-link to='#'>忘记密码?</router-link></span>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar } from 'vant'
import { Field, Toast } from 'mint-ui'
import api from '@/api/login'

Vue.use(NavBar, Field)
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onClickRight () {
      this.$router.push('/register')
      window.location.reload()
    },
    onClickLeft () {
      this.$router.push('/users')
    },
    loginin () {
      api.requestList(this.username, this.password).then(data => {
        console.log(data)
        console.log(data.data)

        if (data.data === -1) {
          console.log('密码错误')
          let instance = Toast('密码错误')
          setTimeout(() => {
            instance.close()
          }, 2000)
        } else if (data.data === 0) {
          console.log('登录失败')
          let instance = Toast('登录失败')
          setTimeout(() => {
            instance.close()
          }, 2000)
        } else if (data.data === 2) {
          console.log('没有该用户')
          let instance = Toast('没有该用户')
          setTimeout(() => {
            instance.close()
          }, 2000)
        } else if (data.data === 1 && this.username === '15256544909' && this.password === '123456') {
          console.log('登陆成功')
          let instance = Toast('登陆成功')
          setTimeout(() => {
            instance.close()
            localStorage.setItem('isLogin', this.username)
            localStorage.setItem('Loging', 'ok')
            this.$router.push('/')
          }, 1000)
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import '@/qunar/reset.scss';
// html {
//   font-size: 15.625vw;
// }
.login_header {
  @include background-color(#ff5250);
  .van-nav-bar__title {
    // color: rgb(21, 21, 145);
    font-weight: bold;
    font-size: 0.28rem;
  }
  .van-nav-bar__right{
    .van-nav-bar__text{
      font-size: 0.18rem;
      color: red;
    }
  }
}
.mint-cell{
  margin-top: 0.2rem;
  border: 0.01rem solid #ccc;
}
.login_btn {
  margin-top: 0.3rem;
}
.log_p_l {
  float: left;
  margin-top: 0.1rem;
  width: 3rem;
}
.log_p_r {
  float: right;
  margin-top: 0.1rem;
}
</style>
