import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import { SiHomebridge } from "react-icons/si";
import "./index.css"
import { } from "react-router-dom"
const UserLayout = () => {
  const navigate = useNavigate();

  return (

    <div className='relative'>
      <Navbar />

      {<Outlet />}

      <section className=' homeBtn-cover w-full sticky bottom-12 grid place-content-center'>
        <SiHomebridge onClick={() => navigate("/user/")} className=' homeBtn w-14 h-14 bg-[#FFA500] text-white p-2 ' />
      </section>
    </div>
  )
}

export default UserLayout