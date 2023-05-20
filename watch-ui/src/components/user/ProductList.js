import React from "react";
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
import "../../css/ProductList.css";
import { useNavigate } from "react-router-dom";

function ProductList({
  isProductsLoading,
  productTextSearch,
  products,
  handleInputChange,
  handleSearchProduct,
}) {
  let productList;
  if (products.length === 0) {
    productList = <Item key="no-product">No product</Item>;
  } else {
    productList = products.map((product) => {
      return (
          <div className="cards container parent" key={product.id}>
            <div className="image_box">
              <Image src={product.description} alt="Image" />
            </div>
            <div className="details">
              <p>{product.name}</p>
              <p>1KG - ₹{product.price}Rs</p>
              <button onClick={() => handleCartProduct(product)}>Add to Cart</button>
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
  }

  return (
    <Segment loading={isProductsLoading} color="blue">
      <Grid stackable divided>
        <Grid.Row columns="2">
          <Grid.Column>
            <Form onSubmit={handleSearchProduct}>
              <Input
                action={{ icon: "search" }}
                name="productTextSearch"
                placeholder="Search by ID or Name od Vegetable"
                value={productTextSearch}
                onChange={handleInputChange}
              />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Item.Group  className="items">
        {productList}
      </Item.Group>
    </Segment>
  );
}

export default ProductList;
