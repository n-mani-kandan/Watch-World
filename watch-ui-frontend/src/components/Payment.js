
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Payment.css';

const Payment = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the API
    const data = {
      firstName,
      lastName,
      email,
      productId: localStorage.getItem('id'),
    };

    try {
      // Send the data to the API
      const response = await fetch('http://localhost:8084/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Order placed successfully!');
        // Clear the form inputs
        setFirstName('');
        setLastName('');
        setEmail('');
        localStorage.removeItem('id');
        setOrderPlaced(true);
      } else {
        window.alert('Failed to place the order. Check your Email');
      }
    } catch (error) {
      window.alert('An error occurred while sending the data:', error);
    }
  };

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <div className="payss">
      <h2 className="payment-title">Payment</h2>
      {!orderPlaced ? (
        <form className="payment-form payment-container" onSubmit={handleFormSubmit}>
          <div className="form-field">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="payment-button">
            Submit
          </button>
        </form>
      ) : (
        <div className="payment-success payment-container">
          <h3>Thank you for your order!</h3>
          <p>Your purchase has been successfully placed.</p>
          <button className="go-home-button" onClick={handleGoHome}>
            Go to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Payment;
