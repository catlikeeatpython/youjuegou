import axios from 'axios'
// 获取商品的详细信息
const api = {
  requestData () {
    return new Promise((resolve, reject) => {
      axios.get('https://www.daxunxun.com/city').then(data => {
        console.log(data.data)
        resolve(data.data)
      }).catch(err => reject(err))
    })
  }
}

export default api
