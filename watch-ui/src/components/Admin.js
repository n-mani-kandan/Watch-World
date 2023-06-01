import React, { useState } from 'react';
import '../css/Admin.css';

const Admin = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    count: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform the API POST request here
    fetch('http://localhost:8083/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the API if needed
        console.log(data);
        setIsSubmitted(true);
      })
      .catch((error) => {
        // Handle any errors that occurred during the API request
        console.error(error);
      });
  };

  return (
    <div className="admin-container">
      <h1 className="admin-heading">ADD WATCH DETAILS</h1>
      {isSubmitted ? (
        <div className="admin-response">
          The Product Is Added Successfully.{' '}
          <a href="/products">Go to Products</a>
        </div>
      ) : (
        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="admin-label">
            Name:
            <input
              className="admin-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="admin-label">
            Price:
            <input
              className="admin-input"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="admin-label">
            Image Link:
            <textarea
              className="admin-input admin-textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="admin-label">
            Count:
            <input
              className="admin-input"
              type="number"
              name="count"
              value={formData.count}
              onChange={handleChange}
            />
          </label>
          <br />
          <button className="admin-submit" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Admin;
