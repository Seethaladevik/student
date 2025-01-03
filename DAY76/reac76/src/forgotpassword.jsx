import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Forgotpassword = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    setLoading(true); // Set loading state to true

    try {
      // Send username and new password to the backend
      const response = await axios.post("http://127.0.0.1:8000/forgot_password", {
        username,
        new_password: newPassword,
      });

      if (response.data.status === "Success") {
        // If the username exists and password is updated successfully
        setError(""); // Clear any previous errors
        alert("Password updated successfully!"); // Show success message
        // navigate("/login"); // Redirect to the login page
      } else {
        // If the username is invalid or update failed
        setError(response.data.message || "Invalid username or operation failed.");
      }
    } catch (err) {
      if (err.response) {
        // Handle server errors
        setError(err.response.data.message || "Invalid username or operation failed.");
      } else {
        // Handle network or other errors
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false); // Reset loading state after request completion
    }
  };

  return (
    <div className="box">
        <div className="login">
            <h1>changepassword</h1>
          </div>
      <form onSubmit={handlePasswordReset}>
        <h5>
          Username:<input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)}required/>
        </h5>
        <h5>New Password:<input type="password" placeholder="Enter your new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}required/>
        </h5>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        <h3></h3>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Forgotpassword;
