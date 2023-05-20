import React, {useState } from "react";
import { useEffect} from 'react';
import { Label,Form,FormField } from "semantic-ui-react";


const Cart = (product) => {
  const[id,setID]=useState([])
  const[name,setName]=useState([])
  const[price,setPrice]=useState([])
  const[count,setCount]=useState([])
  const[description,setDescription]=useState([])

  useEffect(() =>{
    setID(localStorage.getItem('id'))
    setName(localStorage.getItem('name'))
    setPrice(localStorage.getItem('price'))
    setCount(localStorage.getItem('count'))
    setDescription(localStorage.getItem('description'))
  },[])


  return(
    <Form>
      <FormField className='labels'>
            <Label className='label'>First Name </Label>
            <input  value={name} onChange={event => setName(event.target.value)} placeholder='Enter Your First Name '/>
          </FormField><br/>
    </Form>
  );
};

export default Cart;
