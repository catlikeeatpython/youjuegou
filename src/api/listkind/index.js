import axios from 'axios'

const api = {
  requestList () {
    return new Promise((resolve, reject) => {
      axios.get('http://47.94.88.61:3000/api/product').then(data => {
        console.log(data.data)
        resolve(data.data)
      }).catch(err => reject(err))
    })
  },
  requestData (type, num) {
    return new Promise((resolve, reject) => {
      axios.get('http://47.94.88.61:3000/api/product/sort?type=' + type + '&num=' + num).then(data => {
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
  }
}

export default api
