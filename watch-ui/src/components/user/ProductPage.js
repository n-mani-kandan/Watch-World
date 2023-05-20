import { productApi } from '../misc/Productapi'
import ProductList from '../user/ProductList'
import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import AuthContext from '../context/AuthContext'
import { handleLogError } from '../misc/Helpers'
import '../../css/ProductPage.css'

class ProductPage extends Component {
    static contextType = AuthContext
  
    state = {
      products: [],
      productTextSearch: '',
      isUser: true,
      isProductsLoading: false
    }
  
    componentDidMount() {
      const Auth = this.context
      const user = Auth.getUser()
      const isUser = user.role === 'USER'
      this.setState({ isUser })
  
      this.handleGetProducts()
    }
  
    handleInputChange = (e, { name, value }) => {
      this.setState({ [name]: value })
    }
  
    handleGetProducts = () => {
      const Auth = this.context
      const user = Auth.getUser()
  
      this.setState({ isProductsLoading: true })
      productApi.getProducts(user)
        .then(response => {
          this.setState({ products: response.data })
        })
        .catch(error => {
          handleLogError(error)
        })
        .finally(() => {
          this.setState({ isProductsLoading: false })
        })
    }
  
    handleSearchProduct = () => {
      const Auth = this.context
      const user = Auth.getUser()
  
      const text = this.state.productTextSearch
      productApi.getProducts(user, text)
        .then(response => {
          const products = response.data
          this.setState({ products })
        })
        .catch(error => {
          handleLogError(error)
          this.setState({ products: [] })
        })
    }
  
    render() {
      if (!this.state.isUser) {
        return <Navigate to='/' />
      } else {
        const { isProductsLoading, products, productTextSearch } = this.state
        return (
          <Container className='productpage'> 
            <ProductList 
              isProductsLoading={isProductsLoading}
              productTextSearch={productTextSearch}
              products={products}
              handleInputChange={this.handleInputChange}
              handleSearchBook={this.handleSearchBook}
            />
          </Container>
        )
      }
    }
  }

  export default ProductPage