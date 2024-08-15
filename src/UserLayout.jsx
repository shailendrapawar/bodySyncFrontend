import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import { SiHomebridge } from "react-icons/si";
import "./index.css"
import {} from "react-router-dom"
const UserLayout = () => {
  const navigate=useNavigate();

  return (

    <div className='relative'>
    <Navbar/>

    {<Outlet/>}
    
    <SiHomebridge onClick={()=>navigate("/user/")} className=' homeBtn w-14 h-14 absolute bg-[#FFA500] text-white p-2 ' />
    </div>
  )
}

export default UserLayout