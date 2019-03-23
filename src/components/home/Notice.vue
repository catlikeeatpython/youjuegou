<template>
  <van-notice-bar
  text="新品大减价--市面上有的这都有，没有的也有，不管盗版还是正版应有尽有！！！！"
  left-icon="volume-o"
/>
</template>
<script>
import Vue from 'vue'
import { NoticeBar } from 'vant'

Vue.use(NoticeBar)
export default {
  name: 'notice'
}
</script>
<style lang="scss">

</style>
