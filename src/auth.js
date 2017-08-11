import axios from 'axios'
import jwtDecode from 'jwt-decode'

class AuthClient {

  constructor() {
    this.request = axios.create({
      baseURL: 'http://localhost:3001/',
      headers: {
        common: {
          token: this.getToken()
        }
      }
    })
  }

  signUp(userInfo) {
    return this.request({method: 'Post', url: "/users", data: userInfo})
      .then(response => response.data.success)
  }

  addBook(bookInfo) {
    return this.request({method: 'POST', url: "/books", data: bookInfo})
      .then(response => response.data.success)
  }

  logIn(credentials) {
    return this.request({method: 'POST', url: '/authenticate', data: credentials})
      .then((response) => {
        if(response.data.success) {
          const token = response.data.token
          this.setToken(token)
          return jwtDecode(token)
        } else {
          return false
        }
      })
  }

  getCurrentUser() {
    const token = this.getToken()
    return token ? jwtDecode(token) : null
  }

  getToken() {
    // retrieve the token from localStorage
    return localStorage.getItem('token')
  }

  setToken(token) {
    // save the token to localStorage
    localStorage.setItem('token', token)
    // tell axios to always include the token in headers:
    this.request.defaults.headers.common.token = token
    return token
  }

  clearToken() {
    // remove the token from localStorage
    localStorage.removeItem('token')
    // tell axios to stop sending requests with the token
    delete this.request.defaults.headers.common.token
  }

}

export default new AuthClient()
