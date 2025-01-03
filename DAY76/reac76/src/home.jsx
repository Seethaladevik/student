import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const Navigate=useNavigate();
    function Log(){
        Navigate("/login")
    }
    function Sign(){
        Navigate("/signup")
    }
  return (
    <div className="succ">
      <h1>WELCOME </h1>
      <button onClick={Log}>login</button><br></br>
      <button onClick={Sign}>signup</button>
    </div>
  )
}

export default Home
