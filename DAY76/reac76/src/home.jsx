import React from 'react';
import useUserStore from "../src/store/useUserStore";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser); // ✅ moved inside component

  function Log() {
    setUser("Seetha");
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
