import axios from 'axios'
// 获取商品的详细信息
const api = {
  requestData (id) {
    return new Promise((resolve, reject) => {
      axios.get('http://47.94.88.61:3000/api/product/search?id=' + id).then(data => {
        console.log(data.data)
        resolve(data.data)
      }).catch(err => reject(err))
    })
  },
  requestDataName (shopname) {
    return new Promise((resolve, reject) => {
      axios.get('http://47.94.88.61:3000/api/product/search_s?shopname=' + shopname).then(data => {
        console.log(data.data)
        resolve(data.data)
      }).catch(err => reject(err))
    })
  },
  requestDataBrand (brand) {
    return new Promise((resolve, reject) => {
      axios.get('http://47.94.88.61:3000/api/product/search_b?brand=' + brand).then(data => {
        console.log(data.data)
        resolve(data.data)
      }).catch(err => reject(err))
    })
  },
  loadmore (pageCode) {
    return new Promise((resolve, reject) => {
      axios.get('http://47.94.88.61:3000/api/product?pageCode=' + pageCode + '&pageNumber=8').then(data => {
        console.log(data.data)
        resolve(data.data)
      }).catch(err => reject(err))
    })
  },
  requestInsert (userId, goods) {
    // 插入数据
    return new Promise((resolve, reject) => {
      axios.post('/apiCart/api/cart/InsertAction', {
        userid: userId,
        goods: goods
      }).then(data => {
        console.log(data.data)
        resolve(data.data)
      }).catch(err => reject(err))
    })
  }
}

export default api
