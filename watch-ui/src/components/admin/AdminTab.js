import React from 'react'
import { Tab } from 'semantic-ui-react'
import UserTable from './UserTable'
import ProductTable from './ProductTable'

function AdminTab(props) {
  const { handleInputChange } = props
  const { isUsersLoading, users, userUsernameSearch, handleDeleteUser, handleSearchUser } = props
 
  const { isProductsLoading, products, productId, productName,productPrice,productCount,productDescription, productTextSearch, handleAddProduct, handleUpdateProduct,handleDeleteProduct, handleSearchProduct } = props

  const panes = [
    {
      menuItem: { key: 'users', icon: 'users', content: 'Users' },
      render: () => (
        <Tab.Pane loading={isUsersLoading}>
          <UserTable
            users={users}
            userUsernameSearch={userUsernameSearch}
            handleInputChange={handleInputChange}
            handleDeleteUser={handleDeleteUser}
            handleSearchUser={handleSearchUser}
          />
        </Tab.Pane>
      )
    },
    // {
    //   menuItem: { key: 'books', icon: 'book', content: 'Books' },
    //   render: () => (
    //     <Tab.Pane loading={isBooksLoading}>
    //       <BookTable
    //         books={books}
    //         bookIsbn={bookIsbn}
    //         bookTitle={bookTitle}
    //         bookTextSearch={bookTextSearch}
    //         handleInputChange={handleInputChange}
    //         handleAddBook={handleAddBook}
    //         handleDeleteBook={handleDeleteBook}
    //         handleSearchBook={handleSearchBook}
    //       />
    //     </Tab.Pane>
    //   )
    // },
    {
      menuItem: { key: 'products', icon: 'book', content: 'Products' },
      render: () => (
        <Tab.Pane loading={isProductsLoading}>
          <ProductTable
            products={products}
            productId={productId}
            productName={productName}
            productPrice={productPrice}
            productCount={productCount}
            productDescription={productDescription}
            productTextSearch={productTextSearch}
            handleInputChange={handleInputChange}
            handleAddProduct={handleAddProduct}
            handleDeleteProduct={handleDeleteProduct}
            handleSearchProduct={handleSearchProduct}
            handleUpdateProduct={handleUpdateProduct}
          />
        </Tab.Pane>
      )
    }
  ]

  return (
    <Tab menu={{ attached: 'top' }} panes={panes} />
  )
}

export default AdminTab