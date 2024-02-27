import React, { useState } from 'react';
import '../css/register.css';
import axios from 'axios';

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: e => setValue(e.target.value)
  };
};

const Register = () => {
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const confirmPasswordInput = useInput('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    if (passwordInput.value !== confirmPasswordInput.value) {
      setErrorMessage('Passwords do not match');
      return;
    }
else{


  const url = 'http://localhost/php_codes/register.php';
  let fData = new FormData();
  fData.append('email', emailInput.value);
  fData.append('password',passwordInput.value );
  axios.post(url, fData).then(response=> alert(response.data)).catch(error=> alert(error));

}
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <div className="form-group">
        <input type="email" className="form-control" placeholder="Email" {...emailInput} />
      </div>
      <div className="form-group">
        <input type="password" className="form-control" placeholder="Password" {...passwordInput} />
      </div>
      <div className="form-group">
        <input type="password" className="form-control" placeholder="Confirm Password" {...confirmPasswordInput} />
      </div>
      {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
      <button className="btn btn-primary" onClick={handleRegister}>Register</button>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Register;
