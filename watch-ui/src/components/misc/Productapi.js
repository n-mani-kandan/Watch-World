
import axios from 'axios'
import { config } from '../../Constants'

export const productApi = {
    authenticate,
    signup,
    numberOfUsers,
    numberOfProducts,
    getUsers,
    deleteUser,
    getProducts,
    updateProduct,
    deleteProduct,
    addProduct
  }
  
  function authenticate(username, password) {
    return instance.post('/auth/authenticate', { username, password }, {
      headers: { 'Content-type': 'application/json' }
    })
  }
  
  function signup(user) {
    return instance.post('/auth/signup', user, {
      headers: { 'Content-type': 'application/json' }
    })
  }
  
  function numberOfUsers() {
    return instance.get('/public/numberOfUsers')
  }
  
  function numberOfProducts() {
    
    return instance.get('/public/numberOfProducts')
  }
  
  function getUsers(user, username) {
    const url = username ? `/api/users/${username}` : '/api/users'
    return instance.get(url, {
      headers: { 'Authorization': basicAuth(user) }
    })
  }
  
  function deleteUser(user, username) {
    return instance.delete(`/api/users/${username}`, {
      headers: { 'Authorization': basicAuth(user) }
    })
  }
  
  function getProducts(user, text) {
    const url = text ? `/api/products?text=${text}` : '/api/products'
    return instance.get(url, {
      headers: { 'Authorization': basicAuth(user) }
    })
  }
  
  function deleteProduct(user, id) {
    return instance.delete(`/api/products/${id}`, {
      headers: { 'Authorization': basicAuth(user) }
    })
  }
  
  function addProduct(user, product) {
    console.log("Add Product"+product.id)
    return instance.post('/api/products', product, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': basicAuth(user)
      }
    })
  }
  
  function updateProduct(user, product,id) {
    console.log("Add Product"+id)
    return instance.put(`/api/products/${id}`, product, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': basicAuth(user)
      }
      })
  }
  
  // -- Axios
  
  const instance = axios.create({
    baseURL: config.url.API_BASE_URL
  })
  
  // -- Helper functions
  
  function basicAuth(user) {
    return `Basic ${user.authdata}`
  }