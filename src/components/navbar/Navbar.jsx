import React from 'react'
import "./navbar.css"
import src from "./bodySync-icon.png"
import { NavLink, useNavigate } from "react-router-dom"
import { FaCircleUser } from "react-icons/fa6";

import { RxCross1 } from "react-icons/rx";

import { RiMenuFold2Fill } from "react-icons/ri";


const Navbar = () => {

  const [toggle, setToggle] = React.useState(false);

  const navigate = useNavigate()
  return (
    <div className='navbar-block relative'>

      {/* <nav className='nav-1 flex h-full justify-between items-center pl-10 pr-10 relative'>
        <img onClick={()=>navigate("/user")} className=' h-14 p-2 rounded-full' src={src}></img>
        <section className='nav1-middle w-2/5 flex justify-between'>
          <NavLink to='/user/workout' className={({isActive})=>isActive?" active w-20 grid place-content-center ":"w-20 grid place-content-center"}>Workout</NavLink>
          <NavLink to='/user/nutrition' className={({isActive})=>isActive?" active w-20 grid place-content-center ":"w-20 grid place-content-center"}>Nutrition</NavLink>
          <NavLink to='/user/addPost' className={({isActive})=>isActive?" active w-20 grid place-content-center ":"w-20 grid place-content-center"}>Add-post</NavLink>
        </section>
        <FaCircleUser className='h-10 w-10'/>
      </nav> */}

      <nav className=' nav-2 flex h-full justify-between items-center pl-4 pr-4 '>
        <img onClick={() => navigate("/user")} className=' h-14 p-2 rounded-full' src={src}></img>
        <section className=' nav2-center absolute top-16 right-0' style={toggle ? { display: "flex" } : { display: "none" }}>
          <NavLink to='/user/workout' onClick={()=>setToggle(!toggle)} className={({ isActive }) => isActive ? " active w-20 grid place-content-center " : "w-20 grid place-content-center"}>Workout</NavLink>
          <NavLink to='/user/nutrition' onClick={()=>setToggle(!toggle)} className={({ isActive }) => isActive ? " active w-20 grid place-content-center " : "w-20 grid place-content-center"}>Nutrition</NavLink>
          <NavLink to='/user/addPost' onClick={()=>setToggle(!toggle)} className={({ isActive }) => isActive ? " active w-20 grid place-content-center " : "w-20 grid place-content-center"}>Add-post</NavLink>
        </section>

        {
          toggle ? <RxCross1 onClick={() => setToggle(!toggle)} className='h-10 w-10 cursor-pointer' /> : <RiMenuFold2Fill onClick={() => setToggle(!toggle)} className='h-10 w-10 cursor-pointer' />
        }
      </nav>


    </div>
  )
}

export default Navbar