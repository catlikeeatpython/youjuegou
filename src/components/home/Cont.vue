<template>
  <div class="cont">
    <ul>
      <router-link to="/" tag="li" @click.native="Huawei" >
        <span><img src="/static/images/huawei.png"  /></span>
        <p>华为</p>
      </router-link>

      <router-link to="/" tag="li" class="li1" @click.native="Xiaomi">
        <span><img src="/static/images/xiaomi.png" /></span>
        <p>小米</p>
      </router-link>

      <router-link to="/" tag="li" @click="Sanxin">
        <span><img src="/static/images/sanxing.png" /></span>
        <p>三星</p>
      </router-link>

      <router-link to="/" tag="li" @click.native="PingGuo">
        <span><img src="/static/images/apple.png" /></span>
        <p>苹果</p>
      </router-link>

    </ul>
    <ul>
      <router-link to="/kind" tag="li" @click.native="Meizu">
        <span><img src="/static/images/meizu.png" /></span>
        <p>魅族</p>
      </router-link>
      <router-link to="/" tag="li" @click.native="Rongyao">
        <span><img src="/static/images/rongyao.png" /></span>
        <p>荣耀</p>
      </router-link>
      <router-link to="/" tag="li" @click.native="OPPO">
        <span><img src="/static/images/oppo.png" /></span>
        <p>OPPO</p>
      </router-link>
      <router-link to="/" tag="li" @click.native="ViVo">
        <span><img src="/static/images/vivo.png" /></span>
        <p>VIVO</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
// import api from '@/api/detail'
export default {
  name: 'conts',
  methods: {
    Huawei () {
      console.log('hua')
      let brands = 'HUAWEI'
      this.$router.push({path: '/phone', query: {'brands': brands}})
    },
    Xiaomi () {
      console.log('hua')
      let brands = '小米'
      this.$router.push({path: '/phone?1&', query: {'brands': brands}})
    },
    Sanxin () {
      console.log('hua')
      let brands = '三星'
      this.$router.push({path: '/phone', query: {'brands': brands}})
    },
    PingGuo () {
      console.log('hua')
      let brands = 'Apple'
      this.$router.push({path: '/phone', query: {'brands': brands}})
    },
    Meizu () {
      console.log('hua')
      let brands = 'MEIZU'
      this.$router.push({path: '/phone', query: {'brands': brands}})
    },
    Rongyao () {
      console.log('hua')
      let brands = 'Honor'
      this.$router.push({path: '/phone', query: {'brands': brands}})
    },
    OPPO () {
      console.log('hua')
      let brands = 'OPPO'
      this.$router.push({path: '/phone', query: {'brands': brands}})
    },
    ViVo () {
      console.log('hua')
      let brands = 'VIVO'
      this.$router.push({path: '/phone', query: {'brands': brands}})
    }
  }
}
</script>
<style lang="scss">
@import '@/qunar/reset.scss';
.cont{
  @include flexbox();
  @include rect(100%,1.6rem);
  @include flex-direction(column);
  // @include background-color(rgb(51, 87, 167));
  ul{
    @include flexbox();
    @include rect(100%,100%);
    li{
      @include flex();
      @include rect(2rem,50%);
      @include flexbox();
      @include align-items();
      @include flex-direction(column);
      span{
        @include margin;
        @include padding;
      }
    }
  }
}
</style>
