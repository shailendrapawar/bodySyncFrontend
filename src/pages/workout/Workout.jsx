import React, { useState } from 'react'
import "./workout.css"
import ExerciseCard from '../../components/exerciseCard/ExerciseCard';
import axios from "axios"


const Workout = () => {


  const[workouts,setWorkout]=useState();

  const[keyword,setKeyword]=useState("")
  const[loading,setLoading]=useState(false)

  const[option,setOption]=useState()

  const bodyPartlist=["back","cardio","chest","lower arms","lower legs","neck","shoulders","upper arms","upper legs","waist"];
  const filterResult=bodyPartlist.filter((bodyPart)=>{
   return  bodyPart.includes(keyword)
  })



  const searchExerciseByPart=async()=>{
    setLoading(true);
    const options = {
      method: 'GET',
      url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${keyword}`,
      params: {
        limit: '10',
        offset: '0'
      },
      headers: {
        'x-rapidapi-key': '3bd54973a0mshd4f4496d456703cp123660jsnc3f12322b690',
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setWorkout(response.data);
      setLoading(false);
      setKeyword("")

    } catch (error) {
      console.error(error);
    }
  }



  return (
    <div className='workout-block'>
      <main className='workout-body flex flex-col items-center'> 

        <section className='workoutSearch-body'>
          <input value={keyword} onChange={(e)=>{
            e.preventDefault()
            setKeyword(e.target.value)
          }} className='w-4/6 h-full outline-none pl-1 pr-1 text-black' type='text' placeholder='enter target'></input>
          <button onClick={()=>searchExerciseByPart()} className='w-2/6 h-full bg-[#5DADE2]'>{loading?"searching....":"search"}</button>
        </section>

        <select onChange={(e)=>setKeyword(e.target.value)} className='search-list mt-2 text-black outline-none'>
          <option>or select body part</option>

        {filterResult.map((v,i)=>{
           return   <option className='bg-black text-white h-6 list-none' key={i}>{v}</option>
          })}
        </select>


        <section className='workout-result flex flex-wrap gap-2 p-2 mt-2'>
          {
            workouts.map((exercise,i)=>{
              return <ExerciseCard data={exercise} key={i}/>
            })
          }
        </section>

      </main>
    </div>
  )
}

export default Workout