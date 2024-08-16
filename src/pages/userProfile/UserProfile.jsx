import React, { useEffect, useReducer, useRef, useState } from 'react'
import "./userProfile.css"
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import src from "./avatar.webp"


import { MdChangeCircle } from "react-icons/md";
import { TiDelete } from "react-icons/ti";


const UserProfile = () => {

  const navigate = useNavigate();
  const inputRef = useRef()
  const [userData, setUserData] = useState({});
  const [userPosts, setUsersPosts] = useState([]);



  //function for changing user photo=====================
  const handleChangePhoto = async() => {
    console.log(inputRef)
    inputRef.current.click()

    setTimeout(()=>{
      let ch=confirm("you want to change phtot");
      if(ch){
        console.log("submitted")
      }else{
        console.log("cancelled")
      }
    },3000)

  }

  //function for logout==========================================
  const handleLogout=async()=>{
    let choice=confirm("are you sure you want to logout");
      if(choice){
        localStorage.removeItem(import.meta.env.VITE_USER_KEY);
        navigate("/login")
        
      }else{
        console.log("logout-cancelled")
      }
    
  }

  //function for removing photo==========================
  const handleRemove = () => {

  }

  //========function for fettching user data=======================
  const loadUserData = async (userId) => {
    let resData = await axios.get(import.meta.env.VITE_API_URL + `/getUser/${userId}`)
    console.log(resData.data)
    if (resData.data.status == 200) {
      setUserData(resData.data.userData)
      setUsersPosts(resData.data.userData.posts)
    }

  }


  useEffect(() => {
    const userId = localStorage.getItem(import.meta.env.VITE_USER_KEY)
    if (userId == null || userId == undefined) {
      navigate("/login")
    } else {
      loadUserData(userId)
    }


  }, [])

  return (
    <main className='userProfile-block'>

      <section className='upperProfile-body'>
        <div className='userData relative'>
          <section className='userData-left'>
            <img className='userProfilePic' src={src}></img>
            <div className='h-10 flex justify-center gap-6'>
              <TiDelete onClick={() => handleRemove()} className='text-black h-full w-10' />
              <MdChangeCircle onClick={() => handleChangePhoto()} className='text-black h-full w-8' />
            </div>
            <input className=' hidden' type='file' ref={inputRef}></input>
          </section>
          <section className='userData-right'>
            <h1 className='text-black text-right pr-5'>{userData.name} </h1>
            <textarea className='outline-none text-black' placeholder='bio of the user'></textarea>
            <div className='user-hits-posts'>
              <section className='user-posts relative'><b className='absolute top-0.5 left-1 '>Posts</b>{userPosts.length}</section>
              <section className='user-hits relative'><b className='absolute top-0.5 left-1'>Hits</b>{userData.totalHits}</section>
            </div>
            <button onClick={()=>handleLogout()} className=' bg-red-600 h-8 w-40 rounded-md '>sign-out</button>
          </section>
        </div>
      </section>
      

      <section className='lowerProfile-block'>
        <div className='lowerProfile-body '>
          {/* qwdqwqjdwjkndjkqnwjkdnk */}

        </div>
      </section>

    </main>
  )
}

export default UserProfile
