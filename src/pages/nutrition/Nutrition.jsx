import React, { useState } from 'react'
import './nutrition.css'
import axios from 'axios';
import NutriCard from '../../components/nutriCard/NutriCard';

const Nutrition = () => {

  const [keyword,setKeyword]=useState("");
  const[notify,setNotify]=useState("");
  const[loading,setLoading]=useState(false);

  const [data,setData]=useState([])

  const searchData = async() => {

    if(keyword==null || keyword==""){
      setNotify("please eneter a detail first");
    }else{

      setLoading(true)

      const options = {
        method: 'GET',
        url: 'https://myfitnesspal2.p.rapidapi.com/searchByKeyword',
        params: {
          keyword: `${keyword}`,
          page: '1'
        },
        headers: {
          'x-rapidapi-key': '3bd54973a0mshd4f4496d456703cp123660jsnc3f12322b690',
          'x-rapidapi-host': 'myfitnesspal2.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.request(options);
        setData(response.data)
        setKeyword("")
        setLoading(false);

        setNotify("data found")
      } catch (error) {
        console.error(error);
      }
    }  
  }

  

  return (
    <div className='nutrition-block'>
      <p className='h-6 w-5/6 text-red-500 text-center'>{notify}</p>
      <main className='search-body'>
        <input value={keyword} onChange={(e)=>{
          e.preventDefault()
          setKeyword(e.target.value)}} type='text' className='h-full w-4/6 pl-1 pr-1 text-black outline-none' placeholder='enter food or brand name '></input>
        <button onClick={()=>searchData()} className='bg-blue-500 w-2/6 h-full'>{loading?"searching...":"search"}</button>
      </main>
      

      <section className='searchResult-body flex gap-1 flex-wrap'>
        {
          data!=[]?data.map((item,i)=>{
            return <NutriCard data={item} key={i}/>
          }) :<h1>loading....</h1>
        }

      </section>


    </div>
  )
}

export default Nutrition