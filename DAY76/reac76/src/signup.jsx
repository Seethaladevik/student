import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const Navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    try {
      // Sending POST request to FastAPI backend
      const response = await axios.post('http://127.0.0.1:8000/insert', {
        username: username,
        password: password,
      });

      // If the request is successful, show success message and navigate to login
      setMessage(response.data.message || 'Signup successful!');
      setTimeout(() => {
        Navigate('/login');
      }, 2000); // Redirect to login after 2 seconds
    } catch (error) {
      // If the request fails, show error message
      setMessage('Error inserting data. Please try again.');
      console.error(error);
    }
  };

  function goToLogin() {
    Navigate('/login');
  }

  // function goToHome() {
  //   Navigate('/');
  // }

  return (
    <>
      <div className="signup">
        <div className="login">
          <h1>SIGNUP</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="content">
            <h4>Name<input type="text" placeholder="Name" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </h4>

            <h4>Password<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}required/></h4>

            <h4>Confirm Password <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}required/></h4>

        <button type="submit">Signup</button>
          </div>
        </form>
        <br />
        {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
        {/* <button onClick={goToHome}>Home</button> */}
        <div>
        <button onClick={goToLogin}>Login</button>
        </div>
      </div>
    </>
  );
};

export default Signup;
