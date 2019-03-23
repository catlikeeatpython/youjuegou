import axios from 'axios'

const api = {
  requestslide () {
    return new Promise((resolve, reject) => {
      axios.get('http://47.94.88.61:3000/api/slideshow').then(data => {
        // http://47.94.88.61:3000/api/slideshow
        console.log(data.data.data)
        resolve(data.data.data)
      }).catch(err => reject(err))
    })
  }
}
export default api
