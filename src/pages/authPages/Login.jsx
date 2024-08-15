import React, { useEffect, useState } from 'react'
import "./auth.css"
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
const Login = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  //=======functionality for login===========================//
  const handleLogin = async (e) => {
    if (email == "" || password == "") {
      e.preventDefault()
      setErrorMsg("enter all fields")
      setTimeout(() => {
        setErrorMsg("")
      }, 2000)
    } else {
      setLoading(true)
      let isUser = await axios.post(import.meta.env.VITE_API_URL + `/login`, {
        email: email,
        password: password
      })
      setLoading(false);
   

      if (isUser.data.status == 200) {
        setErrorMsg("Welcome back...!!!")
        let userId=isUser.data.userId;
        localStorage.setItem(import.meta.env.VITE_USER_KEY,userId);
        setTimeout(() => {
          navigate("/user/")
        }, 2000)
      } else {
        setErrorMsg(isUser.data.msg)
        setPassword("");
        setTimeout(() => {
          setErrorMsg("")
        }, 2000)
      }
    }

  }

  useEffect(()=>{
    localStorage.removeItem(import.meta.env.VITE_LOCAL_KEY);
  })


  return (
    <div className='login-block flex items-center justify-center'>
      <main className='login-body text-black bg-[#ECF0F1] flex justify-evenly flex-col '>

        <h1 className='text-center '>Login-in</h1>

        <section className='login-data flex flex-col gap-5 pl-3 pr-3 relative'>
          <p className='h-5 text-red-600 text-center'>{errorMsg}</p>
          <div className='email-body flex h-10 '>
            <MdEmail className=' h-full w-12 p-1.5 bg-[#FFA500] text-white '></MdEmail>
            <input value={email} onChange={(e) => {
              e.preventDefault()
              setEmail(e.target.value)
            }} className='w-full pl-2 pr-2 outline-none' type='text' placeholder='enter your email'></input>
          </div>
          <div className='email-body flex h-10 '>
            <RiLockPasswordFill className=' h-full  w-12 p-1.5 bg-[#FFA500] text-white outline-none border-none' />
            <input value={password} onChange={(e) => {
              e.preventDefault()
              setPassword(e.target.value);
            }} className='w-full pl-2 pr-2 outline-none' type='text' placeholder='enter your password'></input>
          </div>
          <Link to="/register" className=' absolute left-5 bottom-5'>new user? <u className='text-blue-600'>Register here</u></Link>
          <button style={(email==""||password=="")?{cursor:"not-allowed"}:{cursor:"pointer"}} onClick={(e) => {
            e.preventDefault()
            handleLogin(e);
          }} className='absolute bottom-5 right-5 rounded-md  w-24 h-7 bg-[#FFA500] text-white'>{loading ? "Loging in...." : "log-in"}</button>
        </section>
      </main>
    </div>
  )
}

export default Login