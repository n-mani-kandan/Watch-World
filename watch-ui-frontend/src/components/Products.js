import React, { useEffect, useState } from "react";
import { API_URL } from "../Constant";
import axios from "axios";
import {
  Grid,
  Header,
  Form,
  Icon,
  Image,
  Input,
  Item,
  Segment,
} from "semantic-ui-react";
import "../css/ProductList.css";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [apidata, setApidata] = useState([]);

  const apiUseEffect = async () => {
    const resp = await axios.get(API_URL);
    setApidata(resp.data);
    console.log(resp.data);
  };

  useEffect(() => {
    apiUseEffect();
  }, []);

  let productList;
  console.log(apidata.length);
  if (apidata.length === 0) {
    productList = <Item key="no-product">No product</Item>;
  } else {
    productList = apidata.map((product) => {
      return (
        <div className="cards container" key={product.id}>
          <div className="image_box">
            <Image src={product.description} alt="Image" />
          </div>
          <div className="details">
            <p>{product.name}</p>
            <p>1 Unit - ₹{product.price}Rs</p>
            <button onClick={() => handleCartProduct(product)}>
             Buy Now
            </button>
          </div>
        </div>
      );
    });
  }

  const navigate = useNavigate();
  const handleCartProduct = ({ id, name, price, count, description }) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("price", price);
    localStorage.setItem("count", count);
    localStorage.setItem("description", description);
    navigate("/cart");
  };

  return (
    <Segment color="blue" className="itesmsdd">
      <Grid stackable divided className="searchboxb">
        <Grid.Row columns="2" className="searchboxb">
          <Grid.Column className="searchboxb">
            <Form className="searchboxb">
              <Input
                className="searchbox"
                action={{ icon: "search" }}
                name="productTextSearch"
                placeholder="Search by ID or Name of Watch"
              />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Item.Group className="items">{productList}</Item.Group>
    </Segment>
  );
};

export default Products;


