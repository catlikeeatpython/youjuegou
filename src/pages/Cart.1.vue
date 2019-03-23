<template>
  <div class="container">
    <header class="header">
      购物车头部
    </header>
    <div class="content">
      购物车内容
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'cart',
  beforeRouteEnter (to, from, next) {
    console.log(11111)

    console.log(localStorage.getItem('isLogin'))
    if (localStorage.getItem('isLogin') === 'ok') {
      console.log(2222)
      next()
    } else {
      console.log(333333)
      next('/register')
    }
  },
  beforeRouteLeave (to, from, next) {
    console.log(111112)
    console.log(localStorage.getItem('pay'))
    if (localStorage.getItem('pay') === 'ok') {
      console.log(22223)
      next()
    } else {
      // next('/register')
      alert('想走?')
      console.log(3333334)
    }
  },
  created () {
    axios.get('/api/j/subject_suggest?q=肖').then(data => {
      console.log(data)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
