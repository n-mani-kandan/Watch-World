import React, { useState } from 'react';
import '../css/Signup.css'
import { Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
  
      const userData = {
        name,
        email,
        username,
        password,
        role: 'ADMIN',
        productId: '1'
      };
  
      try {
        const response = await fetch('http://localhost:8080/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
  
        if (response.ok) {
          setSuccess(true);
          setName('');
          setEmail('');
          setUsername('');
          setPassword('');
        } else {
          setError('Failed to create user. Please try again.');
        }
      } catch (error) {
        setError('An error occurred. Please try again later.');
      }
    };
  
    return (
      <div className="signup-container">
        <div className="signup-form">
          <h2>Create an Account</h2>
          {success ? (
            <p className="success-message">User created successfully! <Link to="/">Login!!</Link></p>
            
            ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Sign Up</button>
              {error && <p className="error-message">{error}</p>}
            </form>
          )}
        </div>
      </div>
    );
  };
  
  export default Signup;