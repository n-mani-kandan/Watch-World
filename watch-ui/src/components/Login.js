// import React from 'react'
// import '../css/Login.css'
// import { Link } from 'react-router-dom'

// const Login = () => {
//   return (
//     <div className="login-form">
//     <form action="/examples/actions/confirmation.php" method="post">
//       <p className="text-center heading">Watch World</p>
//       <h2 className="pull-left">Welcome Back</h2>
//       <p className="pull-left">
//         Sign in with your email address or mobile number.
//       </p>

//       <div className="form-group">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Email or mobile number"
        
//           required="required"
//         />
//       </div>
//       <div className="form-group pass">
//         <input
//           type="password"
//           className="form-control"
//           placeholder="Password"
          
//           required="required"
//         />
//       </div>
//       <div className="form-group pass">
//         <button
//           type="submit"
//           className="btn btn-block btn-cust"
         
//         >
//           Log in
//         </button>
//       </div>
//       {/* <div className="clearfix">
//           <label className="pull-left checkbox-inline"><input type="checkbox"/> Remember me</label>
//           <a href="#" className="pull-right">Forgot Password?</a> 
//       </div>         */}
//       <p className="text-center linktofruitbasket">
//         <Link className='linktofruitbasket' to="/signup">  New to Fruit Basket ? Sign Up</Link>
      
        
//       </p>
//     </form>
//   </div>
//   )
// }

// export default Login


import React, { useState } from 'react';
import '../css/Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/users');
      const data = await response.json();

      const user = data.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        // Successful login, navigate to /home
        window.location.href = '/home';
      } else {
        // Invalid email or password
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container border">
      <form onSubmit={handleLogin} className="login-form">
        <h1 className="heading">Watch World</h1>
        <h2 className="sub-heading">Welcome Back</h2>
        <p className="description">Sign in with your email address or mobile number.</p>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Email or mobile number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-cust">
            Log in
          </button>
        </div>

        <p className="signup-link">
          New to Fruit Basket? <Link to="/signup">Sign Up</Link>
        </p>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
