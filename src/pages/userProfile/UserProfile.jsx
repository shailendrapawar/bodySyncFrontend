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
  const handleChangePhoto = () => {
    console.log(inputRef)
    inputRef.current.click()
  }

  //function for removing photo==========================
  const handleRemove = () => {

  }

  //========function for fettching user data=======================
  const loadUserData = async (userId) => {
    let resData = await axios.get(import.meta.env.VITE_API_URL + `/getUser/${userId}`)
   

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
            <textarea placeholder='bio of the user'></textarea>

            <div className='user-hits-posts'>

              <section className='user-posts relative'><b className='absolute top-0.5 left-1 '>Posts</b>{userPosts.length}</section>
              <section className='user-hits relative'><b className='absolute top-0.5 left-1'>Hits</b>78</section>

            </div>
            <button className=' bg-red-600 h-8 w-40 rounded-md '>sign-out</button>

          </section>

        </div>

      </section>

      <section className='lowerProfile-body'>

      </section>

    </main>
  )
}

export default UserProfile
