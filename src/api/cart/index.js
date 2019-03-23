import axios from 'axios'

const api = {
  requestAllData () {
    // 查找
    return new Promise((resolve, reject) => {
      axios.get('http://47.94.88.61:3000/api/cart').then(data => {
        console.log(data.data)
        resolve(data.data)
      }).catch(err => reject(err))
    })
  },
  requestData (userId) {
    // 查找
    return new Promise((resolve, reject) => {
      axios.get('http://47.94.88.61:3000/api/cart/search?userid=' + userId).then(data => {
        console.log(data.data)
        resolve(data.data)
      }).catch(err => reject(err))
    })
  },
  requestInsert (userId, goods) {
    // 插入数据
    return new Promise((resolve, reject) => {
      axios.post('/apiCart/api/cart/insertAction', {
        userid: userId,
        goods: goods
      }).then(data => {
        console.log(data.data)
        resolve(data.data)
      }).catch(err => reject(err))
    })
  },
  requestUpdate (userid, goods) {
    // 插入数据
    return new Promise((resolve, reject) => {
      axios.post('/apiCart/api/cart/UpdateAction', {
        userid: userid,
        goods: goods
      }).then(data => {
        console.log(data.data)
        resolve(data.data)
      }).catch(err => reject(err))
    })
  }
}

export default api
