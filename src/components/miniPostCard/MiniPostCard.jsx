import React from 'react'
import "./miniPostCard.css"
import { TiDeleteOutline } from "react-icons/ti";

const MiniPostCard = ({data,deleteFn}) => {
    

    
  return (
    <main className='miniPostCard-body relative' style={{backgroundImage:`url(${data.postImg})`,backgroundPosition:"center",backgroundSize:"cover"}}>
        <TiDeleteOutline onClick={()=>deleteFn(data._id)}  className='absolute left-1 top-1 w-6 h-6 '/>
    </main>
  )
}

export default MiniPostCard