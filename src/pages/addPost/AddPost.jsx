import React, { useEffect, useRef, useState } from 'react'
import "./addPost.css"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import altSrc from "./upload-icon1.png"


const AddPost = () => {
  const inputRef = useRef()
  const navigate = useNavigate();


  const [postImg, setPostImg] = useState([]);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState("");
  const [imageSet, setImageSet] = useState(false);

  const [loading, setLoading] = useState(false)



  //function for posting=======================
  const handlePost = async () => {
    const constraint = ["image/jpeg", "image/jpg", "image/png"]
    if (postImg.length == 0 || caption == "") {
      alert("fill all fields")
    } else {
      if (constraint.includes(postImg.type)) {
        setLoading(true)

        const formData = new FormData()
        const userId = localStorage.getItem(import.meta.env.VITE_USER_KEY)

        formData.append("userId", userId)
        formData.append("postCaption", caption)
        formData.append("postImg", postImg)



        let isUploaded = await axios.post(import.meta.env.VITE_API_URL + `/createPost`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        if (isUploaded.data.status == 201) {
          setLoading(false)
          setCaption("")
          setPreview(altSrc)
          setTimeout(() => {
            navigate("/user/userProfile")
          }, 1000)
        } else {
          console.log("post not created")
        }
      }else{
        alert("please select image format, i.e- .jpg/.png/.jpeg")
        setPostImg("")
            }

    }
  }

  useEffect(()=>{
    const userId=localStorage.getItem(import.meta.env.VITE_USER_KEY);
    if(userId==null||userId==undefined){
      navigate("/login")
    }
  },[])


  return (
    <div className='addPost-block '>
      <div className='addPost-body'>
        <input onChange={(e) => {
          e.preventDefault()
          setPreview("")
          setPostImg("")
          setImageSet(false)
          setPostImg(e.target.files[0])
          
          const constraint = ["image/jpeg", "image/jpg", "image/png"]
          if(constraint.includes(e.target.files[0].type)){
            setPreview(URL.createObjectURL(e.target.files[0]))
            setImageSet(true)
          }

        }} ref={inputRef} className=' hidden' type='file'></input>
        <img src={imageSet ? preview : altSrc} onClick={() => inputRef.current.click()}></img>
        <input value={caption} onChange={(e) => setCaption(e.target.value)} className=' outline-none text-black pl-1 pr-1' type='text'></input>
        <button onClick={(e) => {
          e.preventDefault()
          handlePost();
        }} className='bg-[#FFA500] rounded-md mt-1 bottom-0 right-0'>{loading ? "Posting..." : "Post"}</button>
      </div>
    </div>
  )
}

export default AddPost