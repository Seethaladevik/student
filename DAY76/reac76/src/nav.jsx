import React from 'react'
import {Link} from 'react-router-dom' 

const Nav = () => {
  return (
    <div>
      <Link to="/"></Link>
      <Link to="/login"></Link>
      <Link to="/signup">Signup</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/submit"></Link>
        <Link to="/forgot"></Link>
        <Link to="/register"></Link>
    </div>
  )
}

export default Nav
