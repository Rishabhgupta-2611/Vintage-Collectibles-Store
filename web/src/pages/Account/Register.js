import React, { useState } from 'react';
import './Register.css'; // For custom styling

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      // Show success message (pop-up)
      alert("Registration successful! Please log in.");
      // Redirect to the login page
      window.location.href = '/login';
    } else {
      setErrorMessage(data.message);
    }
  };

  const handleLoginRedirect = () => {
    window.location.href = '/login'; // Redirect to login page when Log In button is clicked
  };

  return (
    <div className="register-page">
      <div className="breadcrumbs">
        <br />
        <h1>Register</h1>
        <nav>
          <a href="/">Home</a> &gt; <span>Account</span>
        </nav>
      </div>

      <div className="social-login">
        <h3 className="register-title">Register</h3>
        <button className="btn fb-btn">Facebook</button>
        <button className="btn google-btn">Google</button>
        <div className="or-divider">
          <hr /> <span>Or login with</span> <hr />
        </div>
      </div>

      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="text"
          className="form-control"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="terms">
          Sign up for early sale access plus tailored new arrivals, trends, and
          promotions. To opt out, click unsubscribe in our emails.
        </p>

        <button type="submit" className="btn register-btn">
          Register
        </button>
        <button
          type="button"
          className="btn login-btn"
          onClick={handleLoginRedirect} // Handle the Log In button click
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Register;
