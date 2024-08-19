import React, { useEffect, useState } from 'react'
import './home.css'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from "react-router-dom"
import PostCard from '../../components/postCard/PostCard'
import axios from "axios";

function Home() {
  const navigate = useNavigate()
  const sample=[1,2,3,4,5,6]

  const[allPost,setAllPost]=useState(null)


  const loadAllpost=async()=>{
    const fetchedPost=await axios.get(import.meta.env.VITE_API_URL+`/getAllPosts`)
    setAllPost(fetchedPost.data.data);
  }

  useEffect(()=>{
    loadAllpost();

  },[])

  return (
    <div className='home-block bg-[#ECF0F1] '>
      <h1 className='text-blue-600 mt-10 text-center mb-5'>Today's motivation</h1>
      <section className='home-body'>
        {
          allPost?.map((post,i)=>{
            return <PostCard key={post._id} data={post}/>
          })
        }
      </section>
    </div>
  )

  
}

export default Home