import React, { useEffect } from 'react'
import { notify } from './Notification'
import { useSelector } from 'react-redux'

const Hero = () => {

  const userAuth = useSelector((state) => state.auth.userAuth)

  useEffect(() => {

    if (!userAuth) {
      notify('Please login/signUp before performing any actions', 'info')
    }

    
  }, [])
  

  return (
    <div className='h-full ml-[10%]'>
      <div className="border border-slate-400 h-[68%] w-[90%] flex  ">
        <div className='  flex flex-col items-center w-[50%]  '>
          <div className='w-[80%] h-[100%] flex items-center flex-col justify-center'>

            <div className='flex items-center gap-3 w-[80%]'>
              <p className='w-[20%] h-[2px] bg-[#414141]'></p>
              <p className='text-3xl font-serif text-[#414141]'>OUR BEST SELLER</p>
            </div >

              <h1 className='font-semibold font-serif  text-4xl  text-[#414141] '>Latest Arrival </h1>

            <div className='flex items-center gap-3 w-[80%]'>
              <p className='text-3xl font-serif text-[#414141]'>SHOP NOW </p>
              <p className='w-[20%] h-[2px] bg-[#414141]'></p>
            </div>
          </div>
        </div>
        <div className='w-[50%] h-[100%]'>
          <img src="https://foreverbuy.in/assets/hero_img-DOCOb6wn.png" alt="" className='h-[100%]' />
        </div>
      </div>
    </div>
  )
}

export default Hero