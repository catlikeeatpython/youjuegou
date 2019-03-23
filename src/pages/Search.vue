<template>
  <div class="container">
  <header class="header">
      <mt-header :title="brand" class="home_head">
        <router-link to="/" slot="left">
          <mt-button @click.native="right_btn"><img src="/static/images/fanhui.png" /></mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </header>
    <div class="content">
      <List :list = "list"/>
    </div>
  </div>
</template>

<script>
import api from '@/api/detail'
import List from '@/components/home/List'
import Vue from 'vue'
import { NavBar } from 'Vant'

Vue.use(NavBar)
export default {
  name: 'search',
  data () {
    return {
      list: [],
      brand: ''
    }
  },
  components: {
    List
  },
  created () {
    const name = this.$route.query.name
    console.log(Vue)
    console.log(name)
    api.requestDataName(name).then(data => {
      console.log(data.data)
      this.list = data.data
      this.brand = data.data[0].brand
    }).catch(err => console.log(err))
    api.requestDataBrand(name).then(data => {
      console.log(data.data)
      // this.list2 = data.data
      this.brand = data.data[0].brand
      this.list = [...this.list, ...data.data]
    }).catch(err => console.log(err))
  },
  methods: {
    right_btn () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/qunar/reset.scss';
</style>
