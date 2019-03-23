<template>
  <footer class="footer">
    <ul>
      <!-- 必须写to 可以直接跳转页面-->
      <router-link to="/home" tag="li">
        <span class=""><img src="/static/images/home.png" /></span>
        <p>首页</p>
      </router-link>
      <router-link to="/kind" tag="li">
        <span><img src="/static/images/kind.png" /></span>
        <p>所有商品</p>
      </router-link>
      <router-link to="/cart" tag="li">
        <span><img src="/static/images/cart.png" /></span>
        <p>购物车</p>
      </router-link>
      <router-link to="users" tag="li">
        <span><img src="/static/images/users.png" /></span>
        <p>我的</p>
      </router-link>
    </ul>
  </footer>
</template>
<script>
export default {
  // 结合动态组件keep-alive
  name: 'footers'
}
</script>
<style lang="scss">
</style>
