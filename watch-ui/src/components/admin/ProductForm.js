import React from 'react'
import { Button, Form, Icon } from 'semantic-ui-react'
import '../../css/ProductForms.css'

function ProductForm({ productId, productName,productPrice,productCount,productDescription, handleInputChange, handleAddProduct,handleUpdateProduct }) {
  const createBtnDisabled = productId.trim() === '' || productName.trim() === '' || productPrice.trim() === '' || productCount.trim() === '' || productDescription.trim() === ''
  return (
    <Form onSubmit={handleAddProduct} className='border'>
      <Form.Group className='forms'>
      
        <Form.Input
          className='boxes'
          name='productId'
          placeholder='Product ID *'
          value={productId}
          onChange={handleInputChange}
        />
        <Form.Input
          className='boxes'
          name='productName'
          placeholder='Product Name *'
          value={productName}
          onChange={handleInputChange}
        />
        <Form.Input
          className='boxes'
          name='productPrice'
          placeholder='Product Price *'
          value={productPrice}
          onChange={handleInputChange}
        />
        <Form.Input
          className='boxes'
          name='productCount'
          placeholder='Product Count *'
          value={productCount}
          onChange={handleInputChange}
        />
        <Form.Input
          className='boxes'
          name='productDescription'
          placeholder='Product Image *'
          value={productDescription}
          onChange={handleInputChange}
        />
{/* <Button icon labelPosition='right' disabled={createBtnDisabled} positive ></Button> */}
        <Button icon labelPosition='right'  positive >
          Add <Icon name='add' />
        </Button>
      </Form.Group>
    </Form>
  )
}

export default ProductForm