import React, { useEffect, useState } from 'react'
import './nutrition.css'
import axios from 'axios';
import NutriCard from '../../components/nutriCard/NutriCard';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';
import AddItem from '../../components/addItem/AddItem';

const Nutrition = () => {

  const [itemCart, setItemCart] = useState([])

  // ficntion for adding and removing item from cart 
  const addCart = (item) => {
    item.key=Date.now()
    setItemCart((prev) => [...prev, item])
  }
  const removeItem = (id) => {
    setItemCart((prev)=>prev.filter((v,i)=> v.key!==id))
  }


  const [totals, setTotals] = useState({
    protein: 0,
    fats: 0,
    carbs: 0,
    calories: 0,
  });


  const [keyword, setKeyword] = useState("");
  const [notify, setNotify] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([])

  const notification = (text) => {
    setNotify(text);
    setTimeout(() => {
      setNotify("")
    }, 2000)
  }

  const searchData = async () => {
    if (keyword == null || keyword == "") {
      notification("enter a keyword")
    } else {

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
        notification("Item Found")
        console.log(response.data)
      } catch (error) {
        console.error(error);
        notification("some internal error")
        setLoading(false);

      }
    }
  }

  useEffect(() => {
    if (itemCart.length === 0) {
      setTotals({ protein: 0, fats: 0, carbs: 0, calories: 0 });
      return;
    }

    const newTotals = itemCart.reduce(
      (acc, item) => {

        const parseNutrition = (value) => {
          if (typeof value === "string") {
            return parseInt(value.replace(/\D/g, ""), 10) || 0;
          }
        }

        const { Protein = 0, Fat = 0, Carbs = 0, Calories = 0 } = item.nutrition || {};
        acc.protein += parseNutrition(Protein);
        acc.fats += parseNutrition(Fat);
        acc.carbs += parseNutrition(Carbs);
        acc.calories += parseNutrition(Calories);
        return acc;
      },
      { protein: 0, fats: 0, carbs: 0, calories: 0 } // Initial accumulator values
    );

    setTotals(newTotals);
  }, [itemCart]);


  return (
    <div className='nutrition-block'>
      <p className='h-6 w-5/6 text-red-500 text-center'>{notify}</p>
      <main className='search-body'>
        <input value={keyword} onChange={(e) => {
          e.preventDefault()
          setKeyword(e.target.value)
        }} type='text' className='h-full w-4/6 pl-1 pr-1 text-black outline-none' placeholder='enter food or brand name '></input>
        <button onClick={() => searchData()} className='searchBtn bg-blue-500 w-2/6 h-full'>{loading ? "searching..." : "search"}</button>
      </main>

      <LoadingComponent value={loading} />

      <div className='nutrition-body w-full pl-1 pr-1 flex flex-col justify-start '>
        <section className='searchResult-body flex flex-col gap-1 flex-wrap h-2/5 w-full'>
          {
            data != [] ? data.map((item, i) => {
              return <NutriCard data={item} key={i} fn={addCart} />
            }) : <h1>search for an item</h1>
          }
        </section>


        <section className='calorieCounter-body h-2/5 p-2 bg-slate-300 flex gap-2 justify-evenly'>
          <div className='calorieItems w-4/6 h-full p-1  flex flex-wrap items-center justify-evenly gap-2'>
            {
              itemCart != null ? itemCart.map((item, i) => {
                return <AddItem data={item} key={i} fn={removeItem} />
              }) : <h1 className='text-black'>no item added</h1>
            }
          </div>

          <div className='calorieCart w-4/6 p-2 flex flex-col justify-evenly max-w-52 bg-orange-400 rounded-md select-none '>
            <div className=' flex justify-between'><em>FATS :</em> <b>{totals.fats} gm </b></div>
            <div className=' flex justify-between'><em>CARBS :</em> <b>{totals.carbs} gm</b></div>
            <div className=' flex justify-between'><em>PROTIEN :</em> <b>{totals.protein} gm </b></div>
            <hr></hr>
            <div className=' flex justify-between'><em className=' text-1xl'>CALORIES : </em> <b>{totals.calories} Kcal</b></div>
          </div>

        </section>
      </div>
    </div>
  )
}

export default Nutrition