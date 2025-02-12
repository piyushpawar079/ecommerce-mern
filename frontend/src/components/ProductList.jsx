import React from 'react'
import { NavLink } from 'react-router-dom'

const ProductList = ({
  title, 
  image, 
  price
}) => {
  return (
    <div className='mt-2 w-full'>

      <div className='w-[20%] border p-1 '>
        <NavLink to={`/singleProduct/${title}`} className='w-full flex-col flex'>
          <img src={image} alt="" className=''/>
          <p>{title}</p>
          <p className='font-semibold'>${price}</p>
        </NavLink>
      </div>
    </div>
  )
}

export default ProductList