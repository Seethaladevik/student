import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Submit from './submit'
import Login from './login'
import Home from './home'
import Signup from './signup'
import Forgotpassword from './forgotpassword'
import Register from './register'

const Router = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/submit" element={<Submit/>}/>
            {/* <Route path="/submit" element={<Api/>}/> */}
            <Route path="/forgot" element={<Forgotpassword/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
             <Route path="/register" element={<Register/>}/>
        </Routes>
      
    </div>
  )
}

export default Router
