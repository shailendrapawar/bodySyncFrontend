import React from 'react'

const AddItem = ({data,fn}) => {
  // console.log(data.key);
  return (
    <div className='w-40 bg-red-500 h-16 rounded-md grid place-content-center pl-1 pr-1 relative cursor-pointer select-none'
    onClick={()=>{
      fn(data.key);
    }}
    >
      <b className=' absolute top-1 right-2'>X</b>
      <p className=' truncate text-center w-28'>{data.name}</p>
      <p className='text-center'>{data.nutrition.Calories} Cal</p>
    </div>
  )
}

export default AddItem