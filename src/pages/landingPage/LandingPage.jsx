import React from 'react'
import "./landingPage.css"

import { Link, useNavigate } from "react-router-dom"

const LandingPage = () => {
  const navigate=useNavigate()
  return (
    <div onClick={()=>navigate("/login")} className='h-40 grid content-center'>

      <button className='bg-yellow-400 h-10 w-24 ' to="/login">login</button>
    </div>
  )
}

export default LandingPage