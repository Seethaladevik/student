import React from 'react'
import useUserStore from '../store/useUserStore'
import { useNavigate } from 'react-router-dom'
const setUser = useUserStore((state) => state.setUser);
const Home = () => {
    const Navigate=useNavigate();
    function Log(){
        setUser("Seetha");
        Navigate("/login")
    }
    function Sign(){
        Navigate("/signup")
    }
  return (
    <div className="header50">
      <div className='box1'>
      <div className='skylog-title'>
      <h1>SKYLOG ACADEMY</h1>
      </div>
      <button className="button1"onClick={Log}>login</button><br></br>
      <button className="button1"onClick={Sign}>signup</button>
      </div>
    </div>
  )
}

export default Home
