import axios from 'axios'

const api = {
  requestList (val1, val2) {
    return new Promise((resolve, reject) => {
      axios.post('https://www.daxunxun.com/users/login', {
        username: val1,
        password: val2
      }).then(data => {
        // console.log(data)
        resolve(data)
      }).catch(err => reject(err))
    })
  }
}
export default api
