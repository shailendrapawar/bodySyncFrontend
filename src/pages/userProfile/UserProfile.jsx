import React, { useEffect, useReducer, useRef, useState } from 'react'
import "./userProfile.css"
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import maleAvatar from "./male-avatar.png"
import femaleAvatar from "./female-avatar.png"

import MiniPostCard from '../../components/miniPostCard/MiniPostCard'


const UserProfile = () => {

  const navigate = useNavigate();
  const inputRef = useRef()
  const [userData, setUserData] = useState({});
  const [userPosts, setUsersPosts] = useState([]);


  const [profileImg, setProfileImg] = useState(null)
  const [loading, setLoading] = useState(false);




  //function for changing user photo=====================
  const handleChangePhoto = async () => {

    const constraint = ["image/jpeg", "image/jpg", "image/png"]
    if (profileImg == null) {
      alert("please click on the image to select")
    } else {

      if (constraint.includes(profileImg.type)) {
        setLoading(true)
        const userId = localStorage.getItem(import.meta.env.VITE_USER_KEY)
        const formData = new FormData();
        
        formData.append("profileImg", profileImg)
        formData.append("userId", userId);


        let isUploaded = await axios.post(import.meta.env.VITE_API_URL + `/uploadProfileImg`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        if (isUploaded.data.status == 200) {
          setLoading(false)
          loadUserData(userId);
          setProfileImg(null);
        }
      } else {
        alert("please select image format, i.e- .jpg/.png/.jpeg")
      }

    }
  }

  //function for logout==========================================
  const handleLogout = async () => {
    let choice = confirm("are you sure you want to logout");
    if (choice) {
      localStorage.removeItem(import.meta.env.VITE_USER_KEY);
      navigate("/login")
    } else {
      console.log("logout-cancelled")
    }
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

    } else {
      navigate("/login")
    }
  }

  //function for deleting a single post=================================
  const handleDelete = async (postId) => {
    const userId = localStorage.getItem(import.meta.env.VITE_USER_KEY)
    let isDeleted = await axios.post(import.meta.env.VITE_API_URL + `/deletePost/${postId}`, {
      userId: userId
    })
    if (isDeleted.data.status == 200) {
      loadUserData(userId);
    } else {
      console.log("post not deleted")
    }
  }

  //function for slecting avatar============================
  function selectAvatar() {
    if (userData.gender == "male") {
      return maleAvatar
    } else {
      return femaleAvatar
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
            <img className='userProfilePic' onClick={() => inputRef.current.click()} src={userData.profileImg == null ? selectAvatar() : userData.profileImg}></img>
            <div className='h-10 w-auto pl-2 pr-2 flex justify-center items-center gap-6'>
              <button className='bg-red-500 w-20 h-7 rounded-md'>delete </button>
              <button onClick={() => handleChangePhoto()} className='bg-green-500 w-20 h-7 rounded-md'>{loading ? "changing..." : "change"}</button>

            </div>
            <input hidden type='file' ref={inputRef} onChange={(e) => {
              e.preventDefault()
              setProfileImg("")
              setProfileImg(e.target.files[0])

            }}  ></input>
          </section>
          <section className='userData-right'>
            <h1 className='text-black text-right pr-5'>{userData.name} </h1>
            <textarea className='outline-none text-black' placeholder='bio of the user'></textarea>
            <div className='user-hits-posts'>
              <section className='user-posts relative'><b className='absolute top-0.5 left-1 '>Posts</b>{userPosts.length}</section>
              <section className='user-hits relative'><b className='absolute top-0.5 left-1'>Hits</b>{userData.totalHits}</section>
            </div>
            <button onClick={() => handleLogout()} className=' bg-red-600 h-8 w-40 rounded-md '>sign-out</button>
          </section>
        </div>
      </section>


      <section className='lowerProfile-block'>
        <div className='lowerProfile-body '>
          {userPosts == null ? <h1>Nothing to show</h1> : userPosts.map((post, i) => {
            // console.log(post)
            return <MiniPostCard deleteFn={handleDelete} data={post} key={i} />

          })}

        </div>
      </section>

    </main>
  )
}

export default UserProfile
