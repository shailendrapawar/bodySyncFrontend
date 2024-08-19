import React from 'react'
import "./landingPage.css"
import landingSrc from "./landing-image.jpg"
import { Link, useNavigate } from "react-router-dom"

const LandingPage = () => {
  const navigate=useNavigate()
  return (
    <div  className=' landing-body h-full grid place-content-center relative ' style={{backgroundImage:`url(${landingSrc})`,backgroundSize:"cover",backgroundPosition:"center"}} >
      <button className='bg-white text-black h-16 w-40 absolute bottom-40 right-40 ' onClick={()=>navigate("/login")}>Get-Started</button>
    </div>
  )
}

export default LandingPage