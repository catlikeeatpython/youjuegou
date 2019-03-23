import axios from 'axios'

const api = {
  requestList (tel) {
    return new Promise((resolve, reject) => {
      axios.get('https://www.daxunxun.com/users/sendCode?tel=' + tel).then(data => {
        // console.log(data)
        resolve(data)
      }).catch(err => reject(err))
    })
  },
  requestZhuce (val1, val2) {
    return new Promise((resolve, reject) => {
      axios.post('https://www.daxunxun.com/users/register', {
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
