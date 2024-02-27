import React, { useState } from 'react';
import '../css/login.css';
import axios from 'axios';

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: e => setValue(e.target.value)
  };
};

const Login = () => {
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Define setLoading for managing loading state

  const handleLogin = async () => {
    // Clear previous error messages
    setErrorMessage('');

    // Basic client-side validation
    if (!emailInput.value || !passwordInput.value) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    // Display loading indicator
    setLoading(true);

    // Send login request
    try {
      const url = 'http://localhost/php_codes/login.php';
      const formData = new FormData();
      formData.append('email', emailInput.value);
      formData.append('password', passwordInput.value);
      const response = await axios.post(url, formData);
      const userData = response.data;

      if (userData.status === "success") {
        // Redirect to profile page
        window.location.href = '/profile';
      } else {
        setErrorMessage(userData.message); // Display server-side error message
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      // Hide loading indicator
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <div className="form-group">
        <input type="email" className="form-control" placeholder="Email" {...emailInput} />
      </div>
      <div className="form-group">
        <input type="password" className="form-control" placeholder="Password" {...passwordInput} />
      </div>
      {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
      <p>Don't have an account? <a href="/">Register</a></p>
    </div>
  );
};

export default Login;
