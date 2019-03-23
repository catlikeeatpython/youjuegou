<template>
  <button class="back" @click="back()">返回</button>
</template>
<script>
// import { Header } from 'mint-ui'
export default {
  name: 'back',
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">

</style>
