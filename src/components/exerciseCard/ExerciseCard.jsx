import React from 'react'
import "./exerciseCard.css"
import { useNavigate } from "react-router-dom"




const ExerciseCard = ({data}) => {
  const navigate=useNavigate()
  const imgSrc=data.gifUrl
    return (
    <main onClick={()=>navigate(`/user/singleExercise/${data.id}`)}  className='exerciseCard-body flex flex-col justify-evenly bg-[#FFA500] rounded-md'>
        <h1 className=' text-center pl-2 text-white'>{data.name}</h1>
        <section className='exerciseCard-detail relative'>
          <div className='exercise-brief gap-1'>
            <p><label className='text-slate-300'>Target: </label> {data.target}</p>
            <p><label className='text-slate-300'>Body part: </label> {data.bodyPart}:</p>
            <p><label className='text-slate-300'>Equipment: </label> {data.equipment}</p>

          </div>

          <img className='exercise-img rounded-md bg-white' src={imgSrc} >

          </img>
        </section>
    </main>
  )
}

export default ExerciseCard