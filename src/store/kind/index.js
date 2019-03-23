import api from '@/api/kind'

const store = {
  state: { // 存放当前页面的状态  类似于kind.vue中 data() {}
    bannerdata: [1, 2, 3, 4],
    proList: [4, 5, 6, 7]
  },
  getter: { // 状态的衍生值，其实就是state中的计算属性

  },
  actions: { // 处理组件中的异步操作
    requestBanner (context) {
      api.requestData('https://www.daxunxun.com/banner').then(data => {
        console.log(data)
        context.commit('changeBannerData', data)
      })
    },
    requestprolist (context) {
      api.requestData('https://www.daxunxun.com/douban').then(data => {
        console.log(data)
        context.commit('changeproList', data)
      })
    }
  },
  mutations: { // 唯一改变当前页面的状态的地方
    changeBannerData (state, data) { // state指的就是第二行的state集合
      state.bannerdata = data
    },
    changeproList (state, data) {
      state.proList = data
    }
  }

}
export default store
