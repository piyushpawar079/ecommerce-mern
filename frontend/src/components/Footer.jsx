import React from 'react'

const Footer = () => {
  return (
    <div className='mb-5 text-slate-700 font-serif ml-[10%] '>
    <div className='flex  my-10 '>
      
      <div className='w-[50%]'>
        <h1 className='text-3xl font-semibold mb-5  '>MERNWare </h1>
        <p className='w-[49%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam libero, voluptatem ipsam illo eius necessitatibus quae vel sed ex dolore, maxime iure culpa ad praesentium quaerat, distinctio molestiae alias dolorum?</p>
      </div>
      <div className='w-[25%]'>
        <p className='font-semibold text-2xl mb-5'>COMPANY</p>
        <p>Home</p>
        <p>About Us</p>
        <p>Delivery</p>
        <p>Privacy Policy</p>

      </div>

      <div>
      <p className='font-semibold text-2xl mb-5'>GET IN TOUCH</p>
        <p>+1-000-000-0000</p>
        <p>piyushpawar079@gmail.com</p>
        <p>Instagram</p>
        <p>LinkedIn</p>
      </div>


    </div>
      <div className=' text-center pr-20'>
      <hr className='bg-black  w-[90%]  ' />
      <p className=''>Copyright 2024@ piyushpawar079 - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer