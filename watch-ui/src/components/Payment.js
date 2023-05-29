// import React, { useState } from 'react';
// import '../css/Payment.css';

// const Payment = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     // Handle form submission logic here
//     // You can access the entered values using the `firstName`, `lastName`, and `email` state variables
//     // For simplicity, we'll just log the values to the console
//     console.log('First Name:', firstName);
//     console.log('Last Name:', lastName);
//     console.log('Email:', email);

//     // Clear the form inputs
//     setFirstName('');
//     setLastName('');
//     setEmail('');
//   };

//   return (
//     <div className="payment-container ">
//       <h2 className="payment-title pays" >Payment</h2>
//       <form className="payment-form" onSubmit={handleFormSubmit}>
//         <div className="form-field">
//           <label htmlFor="firstName ">First Name</label>
//           <input
//             type="text"
//             id="firstName"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-field">
//           <label htmlFor="lastName">Last Name</label>
//           <input
//             type="text"
//             id="lastName"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-field">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="payment-button">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Payment;

import React, { useState } from 'react';
import '../css/Payment.css';
import { useNavigate } from "react-router-dom";
const Payment = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
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
        window.alert("Thank you for your order! Your purchase has been successfully placed.");

        navigate("/")
      } else {
        window.alert('Failed to place the order.Check Your Email');
      }
    } catch (error) {
        window.alert('An error occurred while sending the data:', error);
    }
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Payment</h2>
      <form className="payment-form" onSubmit={handleFormSubmit}>
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
    </div>
  );
};

export default Payment;
