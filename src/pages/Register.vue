<template>
  <div class="container">
    <mt-header title="注册" class="reg_header">
      <router-link to="/login" slot="left">
        <mt-button icon="back" ></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <mt-field  placeholder="请输入手机号" type="tel" :state="phoneState" v-model="phone"></mt-field>
    <mt-field v-model="code" placeholder="获取验证码" :state="codeState">
     <mt-button size="normal" :disabled="btnflag" @click.native="sendCode">{{msg}}</mt-button>
    </mt-field>
    <mt-field  placeholder="请输入密码" :state="passwordState" type="password" v-model="password"></mt-field>
    <mt-button class="zhuce" :type="type" :disabled="flag" @click.native="register">注册</mt-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Header, Field, Toast } from 'mint-ui'
import api from '@/api/register'

Vue.use(Header, Field)
export default {
  name: 'register',
  data () {
    return {
      msg: '发送验证码',
      btnflag: false,
      phone: '', // 15956652531
      password: '',
      code: '123456',
      admin: '123456'
      // type: 'default'
    }
  },
  methods: {
    sendCode () {
      console.log('msg')
      // 调用接口获取验证码
      api.requestList(this.phone).then(data => {
        console.log(data)
        // 判断验证码是否注册
        if (data.data === 1) {
          Toast('该用户已注册')
        } else if (data.data === 0) {
          Toast('获取验证码失败')
        } else {
          // 没有注册则向自定义属性admin传值
          this.admin = data.data.code
        }
      }).catch(err => console.log(err))
      // 规定重新发送的时间定义一个计时器，在发送过程中改变验证码的按钮 通过btnflag
      let timer = null
      let time = 5
      timer = setInterval(() => {
        time--
        // console.log(time)
        this.btnflag = true
        this.msg = time + '后重新发送'
        if (time === 0) {
          this.msg = '发送验证码'
          this.btnflag = false
          clearInterval(timer)
        }
      }, 1000)
    },
    register () {
      // 注册按钮方法post请求
      api.requestZhuce(this.phone, this.password).then(data => {
        console.log(data)
        // 判读请求的数据是否已经注册，如果注册跳转到登录
        // 注册失败 如果注册成功跳转到登录
        if (data.data === 2) {
          Toast('该用户已注册')
        } else if (data.data === 0) {
          Toast('注册失败')
        } else {
          Toast('注册成功')
          this.admin = data.data.code
          this.$router.push('/login')
        }
      }).catch(err => console.log(err))
    },
    back () {
      this.$router.push('/login')
    }
  },
  computed: {
    phoneState () {
      if (this.phone === '') {
        return ''
      } else {
        if (/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.test(this.phone)) {
          return 'success'
        } else {
          return 'error'
        }
      }
    },
    passwordState () {
      if (this.password === '') {
        return ''
      } else {
        if (this.password.length > 5) {
          return 'success'
        } else {
          return 'error'
        }
      }
    },
    codeState () {
      if (this.code === '') {
        return ''
      } else {
        if (this.code !== this.admin) {
          return 'error'
        } else {
          return 'success'
        }
      }
    },
    flag () {
      if (this.phoneState === 'success' && this.passwordState === 'success' && this.codeState === 'success') {
        return false
      } else {
        return true
      }
    },
    type () {
      if (this.phoneState === 'success' && this.passwordState === 'success' && this.codeState === 'success') {
        return 'primary'
      } else {
        return 'default'
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/qunar/reset.scss';
// html {
//   font-size: 15.625vw;
// }
.mint-header{
  @include background-color(#ff5250);
}
.reg_header{
  @include font-size(0.28rem);
}
.mint-field {
  border: 1px solid #ccc;
  margin-top: 10px ;
  margin-left:0 auto;
  width: 90% ;
  height: 24px;
  .mint-cell-left {
    display: none;
  }
}
.zhuce {
  margin-top: 30px;
  }

</style>
