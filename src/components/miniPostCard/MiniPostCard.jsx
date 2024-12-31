import React, { useEffect, useState } from 'react'
import "./miniPostCard.css"
import { TiDeleteOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom"

const MiniPostCard = ({data,deleteFn,userId}) => {

  const [isAllowed,setIsAllowed]=useState(false);

  useEffect(()=>{
    if(userId==data.postOwner){
      setIsAllowed(true);
    }else{
      setIsAllowed(false);
    }

  },[])
  return (
    <main className='miniPostCard-body relative shadow-md shadow-black' style={{backgroundImage:`url(${data.postImg})`,backgroundPosition:"center",backgroundSize:"cover"}}>
        {
          isAllowed?<TiDeleteOutline  onClick={()=>deleteFn(data._id)}  className='miniPost-delete-btn absolute left-1 top-1 w-6 h-6 '/>:""
        }
    </main>
  )
}

export default MiniPostCard