import React, { useEffect } from 'react'
import "./postCard.css"
import { useNavigate } from "react-router-dom"
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";

const PostCard = ({ data, handleLike }) => {


  const navigate = useNavigate();
  // console.log(data);
  const [like, setLike] = React.useState(true);


  //handling click in child
  const handleClick = () => {
    const userId=localStorage.getItem(import.meta.env.VITE_USER_KEY);
    handleLike(data._id,userId,like)
    setLike(!like);
  }

  useEffect(() => {
    const userId = localStorage.getItem(import.meta.env.VITE_USER_KEY);
    if (userId) {
      if (data.postHits.includes(userId)) {
        setLike(true)
      } else {
        setLike(false)
      }
    } else {
      navigate("/login")
    }
  }, [])


  return (
    <main className='postCard-body overflow-hidden cursor-pointer bg-[#ECF0F1]'>
      <section className='userName-body'>
        <div className='flex gap-2 items-center h-full pl-3'>
          <img src={data.postOwner.profileImg} className='h-9 w-9 rounded-full'></img>
          <p className='text-black'>{data.postOwner.name}</p>
        </div>
      </section>
      <img src={data.postImg} className='postImg h-4/6 w-full bg-white'></img>
      <section onClick={(e) => {
        e.preventDefault()
        handleClick()
      }} className='like-caption-body flex   text-black'>
        <div className='w-52 postCaption'>{data.postCaption}</div>
        <div className=' p-2 flex post-like justify-center'>{like ? <GoHeartFill className='h-full w-auto flex mr-1 text-[#FF0000]' /> : <GoHeart className='h-full w-auto flex mr-1' />}<p>{data.postHits.length} hits</p></div>
      </section>
    </main>
  )
}

export default PostCard