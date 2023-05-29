import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Cart.css"; // Import the CSS file

const Cart = () => {
  const history = useNavigate();

  // Retrieve the data from localStorage
  const id = localStorage.getItem("id");
  const name = localStorage.getItem("name");
  const price = localStorage.getItem("price");
  const count = localStorage.getItem("count");
  const description = localStorage.getItem("description");

  // Implement cart functionality using the data
  const handleRemoveFromCart = () => {
    // Remove the item from the cart
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("price");
    localStorage.removeItem("count");
    localStorage.removeItem("description");
  };

  const handlePayNow = ({ id, name, price, count, description }) => {
    history("/payment")
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Cart</h2>
      <div className="cart-item">
        <div className="card">
          <img className="card-image" src={description} alt="Product Description" />
        </div>
        <div className="product-details">
          <p>ID: {id}</p>
          <p>Name: {name}</p>
          <p>Price: {price}</p>
          <p>Count: {count}</p>
        </div>
      </div>
      <button className="remove-button" onClick={handleRemoveFromCart}>
        Remove from Cart
      </button>
      <button className="blue-button" onClick={handlePayNow}>
        Pay Now
      </button>
    </div>
  );
};

export default Cart;