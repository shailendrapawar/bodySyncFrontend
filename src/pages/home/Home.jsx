import React, { useEffect, useState } from 'react'
import './home.css'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from "react-router-dom"
import PostCard from '../../components/postCard/PostCard'
import axios from "axios";

import io from 'socket.io-client';
const socket = io(import.meta.env.VITE_API_URL);
function Home() {

  const navigate = useNavigate()

  const[allPost,setAllPost]=useState(null)

//function for loading all post==================
  const loadAllpost=async()=>{
    const fetchedPost=await axios.get(import.meta.env.VITE_API_URL+`/getAllPosts`)
    setAllPost(fetchedPost.data.data);
  }

  //function for like unlike=====================
  const handleLike=async(postId,userId,value)=>{
    socket.emit("handleLike",{
      userId,postId,value
    })
    loadAllpost()
  }

  useEffect(()=>{
    const userId=localStorage.getItem(import.meta.env.VITE_USER_KEY);
    if(userId!=null||userId!=undefined){
      loadAllpost();
    }else{
      navigate("/login")
    }
  },[])

  
useEffect(()=>{
  socket.on("changes",(data)=>{
    if(data){
      loadAllpost()
    }
  })
},[])
  return (
    <div className='home-block bg-[#ECF0F1] '>
      <h1 className='text-blue-600 mt-10 text-center mb-5'>HOME</h1>
      <section className='home-body'>
        {
          allPost?.map((post,i)=>{
            return <PostCard key={post._id} handleLike={handleLike} data={post}/>
          })
        }
      </section>
    </div>
  )

  
}

export default Home