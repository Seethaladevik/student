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
      const response = await axios.post('https://studentdatabase-6.onrender.com/insert', {
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
      <div className="header2">
        <div className='box1'>
        <div className="login">
          <h1>SIGNUP</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="content">
            <h4>Name<input type="text" className='mail' placeholder="Name" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </h4>

            <h4>Password<input type="password" className='pass' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}required/></h4>

            <h4>Confirm Password <input type="password" className='pass1' placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}required/></h4>
</div>
        <button type="submit" className='button11'>Signup</button>
          
        </form>
        <br />
        {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
        {/* <button onClick={goToHome}>Home</button> */}
        <div>
        <button className="button21"onClick={goToLogin}>Login</button>
        </div>
      </div>
      </div>
    </>
  );
};

export default Signup;
