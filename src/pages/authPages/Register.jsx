import React from 'react'
import './auth.css'
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsGenderAmbiguous } from "react-icons/bs";

import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import {} from "react-router-dom"

const Register = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const navigate=useNavigate()

  const handleRegister = async (e) => {
    if (name == "" || email == "" || password == "" || gender == "") {
      e.preventDefault();
      setError("enter all fields");
      setTimeout(() => {
        setError("")
      }, 2000)
    } else {
      setLoading(true)
      const isRegister = await axios.post(import.meta.env.VITE_API_URL + `/register`, {
        name: name,
        email: email,
        password: password,
        gender: gender
      })

      if (isRegister.data.status == 201) {
        setError("user created");
        setLoading(false)
        setTimeout(() => {
          setError("")
          navigate("/login")
        }, 2000)
      }else{
        setError(isRegister.data.msg);
        setTimeout(() => {
          setError("")
        }, 2000)
      }
    }

  }

  return (
    <div className='register-block bg-white flex items-center justify-center '>
      <main className='register-body bg-[#ECF0F1] text-black flex flex-col justify-evenly '>

        <h1 className='text-center'>Register page</h1>
        <section className=' relative register-data pl-2 pr-2 flex flex-col gap-4'>
          <p className='text-red-600 text-center h-4'>{error}</p>

          <div className='name-body h-10 flex'>
            <FaUserAlt className='w-12 h-full p-2 bg-[#FFA500] text-white' />
            <input value={name} onChange={(e) => {
              e.preventDefault()
              setName(e.target.value);
            }} className=' w-full pl-1 pr-1 outline-none' type='text' placeholder='enter your name'></input>
          </div>

          <div className='email-body h-10 flex'>
            <MdEmail className='w-12 h-full p-2 bg-[#FFA500] text-white' />
            <input value={email} onChange={(e) => {
              e.preventDefault()
              setEmail(e.target.value)
            }} className=' w-full pl-1 pr-1 outline-none' type='text' placeholder='enter your email'></input>
          </div>

          <div className='password-body h-10 flex'>
            <RiLockPasswordFill className='w-12 h-full p-2 bg-[#FFA500] text-white' />
            <input value={password} onChange={(e) => {
              e.preventDefault()
              setPassword(e.target.value);
            }} className=' w-full pl-1 pr-1 outline-none' type='text' placeholder='enter your password'></input>
          </div>
          <div className='gender-body h-10 flex'>
            <BsGenderAmbiguous className='w-12 h-full p-2 bg-[#FFA500] text-white' />
            <select value={gender} onChange={(e) => {
              e.preventDefault()
              setGender(e.target.value);
            }} className='w-full outline-none'>
              <option value="">select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <Link className='absolute left-5 bottom-5' to="/login">already a user?<u className=' text-blue-600'>Login instead</u></Link>

          <button style={(email == "" || password == "" || name == "" || gender == "") ? { cursor: "not-allowed" } : { cursor: "pointer" }} onClick={(e) => {
            e.preventDefault();
            handleRegister(e);
          }} className='absolute bottom-5 right-5 rounded-md  w-24 h-7 bg-[#FFA500] text-white'>{loading ? "Submitting...." : "Register"}</button>

        </section>
      </main>


    </div>
  )
}

export default Register