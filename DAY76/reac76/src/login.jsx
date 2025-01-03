import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error message
  const [loading, setLoading] = useState(false); // State to handle loading status

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setLoading(true); 

    try {
      const response = await axios.post("http://127.0.0.1:8000/data", { username, password });

      if (response.data.status === "Success") {
        // Successful login
        setError(""); // Clear any previous errors
        navigate("/submit"); // Navigate to the submit page
      } else {
        // If login fails
        setError("Invalid username or password");
      }
    } catch (err) {
      // Handle any errors that occur during the request
      console.error(err);
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false); // Reset loading state after request is completed
    }
  };

  return (
    <>
      <div className="back">
        <div className="box">
          <div className="login">
            <h1>Login</h1>
          </div>
          <div className="icon">
            {/* <AccountCircleIcon /> */}
          </div>
          <div className="content">
            <form onSubmit={handleLogin}>
              <h4>
                Username
                <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
              </h4>
              <h4>
                Password
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </h4>
              <p onClick={()=>navigate("/forgot")}>forgotpassword</p>
              <button type="submit" disabled={loading}>{loading ? "Loading..." : "Submit"}
              </button>
              <br />
              <button type="button" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
              <br />
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

