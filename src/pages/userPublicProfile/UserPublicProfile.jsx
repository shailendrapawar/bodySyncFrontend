import React, { useEffect, useState } from 'react'
import "./userPublicProfile.css"
import { useLocation } from 'react-router-dom'
import axios from "axios"
import MiniPostCard from '../../components/miniPostCard/MiniPostCard'

import { IoIosFemale } from "react-icons/io";
import { IoIosMale } from "react-icons/io";


const UserPublicProfile = () => {

  const location = useLocation();
  const postOwnerid = location.state
  


  const [userData, setUserdata] = useState({});
  const [userPost, setUserPost] = useState([])
  const[gender,setGender]=useState(true)
  // console.log(userData)


  const loadUserData = async (userId) => {
    let resData = await axios.get(import.meta.env.VITE_API_URL + `/getPublicUser/${userId}`)
    if (resData.data.status == 200) {
      // console.log(resData)

      setUserdata(resData.data.data);
      setUserPost(resData.data.data.posts)
      if(userData.gender=="female"){
        setGender(true)
      }else{
        setGender(false)
      }

      // console.log(gender)
    } else {
      navigate("/login")
    }
  }

  useEffect(() => {
    loadUserData(postOwnerid.ownerId)

  }, [])

  // console.log(userPost)
  return (
    <div className='userPublicProfile-body h-screen flex items-center flex-col '>

      <section className='w-4/5 h-2/6 flex justify-center items-center flex-col text-black gap-2 mt-2'>
        <img src={userData.profileImg} className='h-36 w-36 rounded-full object-cover'></img>
        <div className=''>
          <p className='text-center text-5xl w-auto flex gap-2 mb-1  justify-center'>{userData.name} {gender?<IoIosFemale className='text-pink-600 '/>:<IoIosMale className='text-blue-600 '/>}</p>
          <p className='text-center text-1xl text-slate-600'>{userData.email}</p>
        </div>
      </section>

     <div className='w-5/6 h-1 bg-orange-400'></div>

     <p className='text-orange-600 text-2xl'>Total Posts: {userPost.length}</p>
      <section className='w-4/5 h-2/6 flex justify-center gap-2 items-start pt-2 flex-wrap'>
      
        {
          userPost.map((v,i)=>{
            return <MiniPostCard data={v} key={i}/>
          })
          
        }
      </section>
    </div>
  )
}

export default UserPublicProfile