import React from 'react'
import "./postCard.css"

import { GoHeart } from "react-icons/go";

const PostCard = ({ data }) => {

  return (
    <main className='postCard-body overflow-hidden cursor-pointer bg-[#ECF0F1]'>
      <section className='userName-body'>
        <div className='flex gap-2 items-center h-full pl-3'>
          <img src={data.postOwner.profileImg} className='h-9 w-9 rounded-full'></img>
          <p className='text-black'>{data.postOwner.name}</p>
        </div>
      </section>
      <img src={data.postImg} className='postImg h-4/6 w-full bg-white'></img>
      <section className='like-caption-body flex   text-black'>
        <div className='w-52 postCaption'>{data.postCaption}</div>
        <div className=' p-2 flex post-like justify-center'><GoHeart className='h-full w-auto flex mr-1' /><p>{data.postHits.length} hits</p></div>
      </section>
    </main>
  )
}

export default PostCard