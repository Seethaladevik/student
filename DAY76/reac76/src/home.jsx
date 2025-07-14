import React from 'react';
import useUserStore from "../src/store/useUserStore";
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../src/api'; // ✅ Correct import

const Home = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  async function Log() {
    try {
      const user = await loginUser("Seetha"); // Replace with real form value later
      setUser(user);
      navigate("/login"); // Go to dashboard or wherever after login
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  }
 function Log() {
    navigate("/login");
  }
  function Sign() {
    navigate("/signup");
  }

  return (
    <div className="header50">
      <div className='box1'>
        <div className='skylog-title'>
          <h1>SKYLOG ACADEMY</h1>
        </div>
        <button className="button1" onClick={Log}>login</button><br />
        <button className="button1" onClick={Sign}>signup</button>
      </div>
    </div>
  );
};

export default Home;
