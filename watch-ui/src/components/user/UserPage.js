import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import BookList from './BookList'
import ProductList from './ProductList'
import AuthContext from '../context/AuthContext'
import { bookApi } from '../misc/BookApi'
import { productApi } from '../misc/Productapi'
import { handleLogError } from '../misc/Helpers'


class UserPage extends Component {
  static contextType = AuthContext

  state = {
    products: [],
    productTextSearch: '',
    isProductssLoading: false,
    
    books: [],
    bookTextSearch: '',
    isUser: true,
    isBooksLoading: false

    
  }

  componentDidMount() {
    const Auth = this.context
    const user = Auth.getUser()
    const isUser = user.role === 'USER'
    this.setState({ isUser })

    this.handleGetBooks()
    this.handleGetProducts()
  }

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleGetBooks = () => {
    const Auth = this.context
    const user = Auth.getUser()

    this.setState({ isBooksLoading: true })
    bookApi.getBooks(user)
      .then(response => {
        this.setState({ books: response.data })
      })
      .catch(error => {
        handleLogError(error)
      })
      .finally(() => {
        this.setState({ isBooksLoading: false })
      })
  }

  handleSearchBook = () => {
    const Auth = this.context
    const user = Auth.getUser()

    const text = this.state.bookTextSearch
    bookApi.getBooks(user, text)
      .then(response => {
        const books = response.data
        this.setState({ books })
      })
      .catch(error => {
        handleLogError(error)
        this.setState({ books: [] })
      })
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
        <Container>
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

export default UserPage