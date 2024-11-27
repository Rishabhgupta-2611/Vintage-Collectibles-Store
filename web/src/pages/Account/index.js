import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './style.css';

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      // Store a flag in localStorage or sessionStorage
      localStorage.setItem('isLoggedIn', 'true');
      
      // Show a success popup message
      alert("Login successful!");

      // Redirect to the dashboard or home page on successful login
      navigate('/'); // Assuming you have a dashboard page
    } else {
      setErrorMessage(data.message); // Show error message
    }
  };

  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to the Register page
  };

  return (
    <div className="account-container">
      <div className="account-header">
        <h1>Log In</h1>
        <nav>
          <a href="/">Home</a> &gt; <span>Account</span>
        </nav>
      </div>
      <div className="account-content">
        <div className="login-section">
          <h2>Log In</h2>
          <div className="social-login">
            <button className="facebook-btn">Facebook</button>
            <button className="google-btn">Google</button>
          </div>
          <p>Or login with</p>
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="/forgot-password" className="forgot-password">
              Forgot your password?
            </a>
            <button type="submit" className="sign-in-btn">
              Sign In
            </button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <div className="register-section">
          <h2>New Customer</h2>
          <p>
            Sign up for early Sale access plus tailored new arrivals, trends and
            promotions. To opt out, click unsubscribe in our emails.
          </p>
          <button
            className="register-btn"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
