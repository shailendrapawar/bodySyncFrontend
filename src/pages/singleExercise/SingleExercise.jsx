import React, { useEffect, useState } from 'react'
import "./singleExercise.css"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackCircleSharp } from "react-icons/io5";


const SingleExercise = () => {
  const navigate=useNavigate()

  const {id}=useParams()
  const[exerciseData,setExerciseData]=useState([]);
  const[instruction,setInstruction]=useState([])


  const loadExercise=async()=>{
    const options = {
      method: 'GET',
      url: `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
      headers: {
        'x-rapidapi-key': '3bd54973a0mshd4f4496d456703cp123660jsnc3f12322b690',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      setExerciseData(response.data);
      setInstruction(response.data.instructions)
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(()=>{
    loadExercise()
  },[])

  return (
    <div className='singleExercise-block relative'>
      <h1 className='text-black text-center mt-2 h-12'>{exerciseData.name}</h1>
      <IoArrowBackCircleSharp onClick={()=>navigate(-1)} className=' back-btn h-12 w-12 text-[#FFA500]  absolute  top-2 left-8' />

      <main className='singleExercise-body'>
        <section className='singleExercise-body-left'>
          <img className=' rounded-md' src={exerciseData.gifUrl} ></img>
          <div className=" exercise-brief rounded-md pl-2 bg-[#FFA500]">
          
            <p><label>Body part : </label> {exerciseData.bodyPart}</p>
            <p><label>Equipment : </label> {exerciseData.equipment}</p>
            <p><label>Target : </label> {exerciseData.target}</p>
       
          </div>
        </section>
        <section className='singleExercise-body-right flex flex-col justify-evenly'>
          {
            instruction?.map((ins,i)=>{
             return  <p key={i} className='text-black bg-orange-300 p-1 rounded-md'>{i+1}:--{ins}</p>
            })
            
          }
        </section>

      </main>

      
    </div>
  )
}

export default SingleExercise