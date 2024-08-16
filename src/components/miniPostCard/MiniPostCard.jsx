import React from 'react'
import "./miniPostCard.css"
const MiniPostCard = ({data}) => {
    
  return (
    <main className='miniPostCard-body' style={{backgroundImage:`url(${data.postImg})`,backgroundPosition:"center",backgroundSize:"cover"}}>
        {/* MiniPostCard */}
    </main>
  )
}

export default MiniPostCard