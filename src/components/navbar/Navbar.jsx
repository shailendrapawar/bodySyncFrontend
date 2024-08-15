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

  const handleToggle=()=>{
    setToggle(!toggle)
        
  }
  return (
    <div className='navbar-block relative bg-[#FFA500]'>

      <nav className='nav-1 flex h-full justify-between items-center pl-10 pr-10 relative'>
        <img onClick={()=>navigate("/user")} className=' h-14 p-2 rounded-full' src={src}></img>
        <section className='nav1-center  flex justify-between'>
          <NavLink to='/user/workout' className={({isActive})=>isActive?" active1 w-20 grid place-content-center ":"w-20 grid place-content-center"}>Workout</NavLink>
          <NavLink to='/user/nutrition' className={({isActive})=>isActive?" active1 w-20 grid place-content-center ":"w-20 grid place-content-center"}>Nutrition</NavLink>
          <NavLink to='/user/addPost' className={({isActive})=>isActive?" active1 w-20 grid place-content-center ":"w-20 grid place-content-center"}>Add-post</NavLink>
        </section>
        <FaCircleUser onClick={()=>navigate("/user/userProfile")} className='h-10 w-10'/>
      </nav>

      <nav className=' nav-2 flex h-full justify-between items-center pl-4 pr-4 '>
        <img onClick={() => navigate("/user")} className=' h-14 p-2 rounded-full' src={src}></img>
        <section className={toggle?' nav2-center loadingAnim absolute top-16 right-0 bg-[#ECF0F1]':' nav2-center deLoadingAnim absolute top-16 right-0 bg-[#ECF0F1]'} style={toggle ? { display: "flex" } : { display: "none" }} >
          <NavLink to='/user/workout' onClick={()=>setToggle(!toggle)} className={({ isActive }) => isActive ? " active2 " : " text-black  "}>Workout</NavLink>
          <NavLink to='/user/nutrition' onClick={()=>setToggle(!toggle)} className={({ isActive }) => isActive ? " active2 " : " text-black  "}>Nutrition</NavLink>
          <NavLink to='/user/addPost' onClick={()=>setToggle(!toggle)} className={({ isActive }) => isActive ? " active2 " : " text-black  "}>Add-post</NavLink>
          <NavLink to='/user/userProfile' onClick={()=>setToggle(!toggle)} className={({ isActive }) => isActive ?" active2 " : " text-black  "}>User-Profile</NavLink>
        </section>

        {
          toggle ? <RxCross1 onClick={() =>handleToggle()} className='h-10 w-10 cursor-pointer' /> : <RiMenuFold2Fill onClick={() => setToggle(!toggle)} className='h-10 w-10 cursor-pointer' />
        }
      </nav>


    </div>
  )
}

export default Navbar