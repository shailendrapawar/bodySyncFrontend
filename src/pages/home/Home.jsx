import React, { useEffect } from 'react'
import './home.css'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()


  return (
    <div className='home-block bg-[#ECF0F1] '>
      Home
      
    </div>
  )
}

export default Home