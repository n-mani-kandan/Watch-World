import {React,useEffect,useState} from "react";
import { Button, Form, Grid, Image, Input, Table } from "semantic-ui-react";
import ProductForm from "./ProductForm";
// import UpdateProduct from "../home/UpdateProduct";
import '../../css/ProductForms.css'
import { useNavigate } from 'react-router-dom'

function ProductTable({
  products,
  productId,
  productName,
  productPrice,
  productCount,
  productDescription,
  productTextSearch,
  handleInputChange,
  handleAddProduct,
  handleDeleteProduct,
  handleSearchProduct,
  handleUpdateProduct
}) {
  let productList;
  if (products.length === 0) {
    productList = (
      <Table.Row key="no-product">
        <Table.Cell collapsing textAlign="center" colSpan="4">
          No product
        </Table.Cell>
      </Table.Row>
    );
  } else {
    productList = products.map((product) => {
      return (
        <Table.Row key={product.id}>
          <Table.Cell  >
            <Button
              circular
              color="red"
              size="small"
              icon="trash"
              onClick={() => handleDeleteProduct(product.id)}
            />
            <button
              className="editbutton"
              onClick={() => handleUpdateProduct1(product)}
              
            >Edit</button>
          </Table.Cell>
          <Table.Cell>
            <Image src={product.description} size="tiny" bordered rounded />
          </Table.Cell>
          <Table.Cell>{product.id}</Table.Cell>
          <Table.Cell>{product.name}</Table.Cell>
          <Table.Cell>{product.price}</Table.Cell>
          <Table.Cell>{product.count}</Table.Cell>
        </Table.Row>
      );
    });
  }

  const navigate = useNavigate();
  const handleUpdateProduct1 = ({id,name,price,count,description}) =>{
    localStorage.setItem("id",id);
    localStorage.setItem("name",name);
    localStorage.setItem("price",price);
    localStorage.setItem("count",count);
    localStorage.setItem("description",description);
    navigate('/updateproduct')
  }


  const [pid, setIDp] = useState([]);
  const [pname, setNamep] = useState([]);
  const [pprice, setPricep] = useState([]);
  const [pcount, setCountp] = useState([]);
  const [pdescription, setDescriptionp] = useState([]);

  useEffect(() => {
    setIDp(localStorage.getItem("pid"));
    setNamep(localStorage.getItem("pname"));
    setPricep(localStorage.getItem("pprice"));
    setCountp(localStorage.getItem("pcount"));
    setDescriptionp(localStorage.getItem("pdescription"));
  }, []);

  return (
    <>
      <Grid>
        <Grid.Row columns="1">
          <Grid.Column width="8">
            <Form onSubmit={handleSearchProduct}>
              <Input
                action={{ icon: "search" }}
                name="productTextSearch"
                placeholder="Search by ID or Name"
                value={productTextSearch}
                onChange={handleInputChange}
              />
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column className="boxes">
            <ProductForm
              productId={productId}
              productName={productName}
              productPrice={productPrice}
              productCount={productCount}
              productDescription={productDescription}
              handleInputChange={handleInputChange}
              handleAddProduct={handleAddProduct}
              handleUpdateProduct={handleUpdateProduct}
            />
          </Grid.Column>
          <Grid.Column className="boxes">
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} />
            <Table.HeaderCell width={3}>Cover</Table.HeaderCell>
            <Table.HeaderCell width={4}>ID</Table.HeaderCell>
            <Table.HeaderCell width={8}>Name</Table.HeaderCell>
            <Table.HeaderCell width={4}>Price</Table.HeaderCell>
            <Table.HeaderCell width={4}>Count</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{productList}</Table.Body>
      </Table>
    </>
  );
}

export default ProductTable