<template>
  <div class="container">
    <header class="header">
      城市头部
    </header>
    <div class="content">
      <mt-index-list>
        <mt-index-section v-for="(item, index) of list" :key="index" :index="item.letter" >
          <mt-cell v-for="itm of item.cities" :key="itm.id" :title="itm.name"></mt-cell>
        </mt-index-section>
      </mt-index-list>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import api from '@/api/city'
import { IndexList, IndexSection } from 'mint-ui'

Vue.use(IndexList, IndexSection)
export default {
  name: 'city',
  data () {
    return {
      list: []
    }
  },
  created () {
    console.log(11111111111111)
    api.requestData().then(data => {
      console.log(data)
      this.list = data
    }).catch(err => console.log(err))
  }
}
</script>

<style lang="scss">

</style>
