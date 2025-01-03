import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'

const Browse = () => {
  return (
    <div>
      <BrowserRouter>
      <Router/>
      </BrowserRouter>
    </div>
  )
}

export default Browse
