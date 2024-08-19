import React from 'react'
import "./nutriCard.css"
const NutriCard = ({data}) => {
  return (
    <div className='nutriCard-body p-2'>
      <section className='item-name relative h-14'>
        <h1 className=' food-name text-center h-8'>{data.name}</h1>
        <b className='brand absolute bottom-0 left-0'>{data.brand}</b>
        <b className='serving absolute bottom-0 right-0'>Serving:{data.nutrition["Serving Size"]}</b>
      </section>

      <b className='calorie text-center'>{data.nutrition.Calories} Cal</b>

      <main className='nutrition flex'>
        <div className='fats bg-red-600'>
          <b>Fats</b>
          <p className='text-center'>{data.nutrition.Fat}</p>
        </div>
        <div className='carb bg-yellow-400'>
          <b>Carbs</b>
          <p className='text-center'>{data.nutrition.Carbs}</p>
        </div>
        <div className='protien bg-green-600'>
          <b>Protein</b>
          <p className='text-center'>{data.nutrition.Protein}</p>
        </div>

      </main>
    </div>
  )
}

export default NutriCard