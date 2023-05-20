import {React,useState,useEffect, useContext} from 'react'
import { Button, Form, Icon } from 'semantic-ui-react'
import '../../css/ProductForms.css'
import { productApi } from '../misc/Productapi';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function UpdateProduct({  products,productId, productName,productPrice,productCount,productDescription, handleInputChange  }) {
  const [id, setID] = useState([]);
  const [name, setName] = useState([]);
  const [price, setPrice] = useState([]);
  const [count, setCount] = useState([] );
  const [description, setDescription] = useState([]);
  const Auth=useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    setID(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setPrice(localStorage.getItem("price"));
    setCount(localStorage.getItem("count"));
    setDescription(localStorage.getItem("description"));
  }, []);
  const handleUpdateProduct= ()=>{
    const user = Auth.getUser()
    const product = { id: id, name: name ,price:price,count:count,description:description}
    console.log(product)
    productApi.updateProduct(user,product,id)
    links()
  }

  const links = () => {
    navigate('/adminpage')
  }
  return (
    <Form onSubmit={handleUpdateProduct}>
      <Form.Group className='forms'>
      
        <Form.Input
          className='boxes'
          name='productId'
          placeholder={id}
          value={productId}
          onChange={(e)=>setID(e.target.value)}
        />
        <Form.Input
          className='boxes'
          name='productName'
          placeholder={name}
          value={productName}
          onChange={(e)=>setName(e.target.value)}
        />
        <Form.Input
          className='boxes'
          name='productPrice'
         placeholder={price}
          value={productPrice}
          onChange={(e)=>setPrice(e.target.value)}

        />
        <Form.Input
          className='boxes'
          name='productCount'
          placeholder={count}
          value={productCount}
          onChange={(e)=>setCount(e.target.value)}

        />
        <Form.Input
          className='boxes'
          name='productDescription'
          placeholder={description}
          value={productDescription}
          onChange={(e)=>setDescription(e.target.value)}

        />
{/* <Button icon labelPosition='right' disabled={createBtnDisabled} positive ></Button> */}
        <Button icon labelPosition='right'  positive >
          Add <Icon name='add' />
        </Button>
      </Form.Group>
    </Form>
  )
}

export default UpdateProduct