import React from 'react'
import { NavLink } from 'react-router-dom'

const ProductList = ({
  title, 
  image, 
  price
}) => {
  return (
    <div className='mt-2 w-[25%]  mr-4 '>

      <div className=' border p-2 border-gray-300 h-full'>
        <NavLink to={`/singleProduct/${title}`} className='w-full  flex-col flex'>
          <img src={image} alt="product_image" className='pb-1 '/>
          <p>{title}</p>
          <p className='font-semibold'>${price}</p>
        </NavLink>
      </div>
    </div>
  )
}

export default ProductList