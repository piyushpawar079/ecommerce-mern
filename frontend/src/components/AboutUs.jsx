import React from 'react'

const AboutUs = ({
    image,
    t1,
    t2,
    desc 
}) => {
  return (
    <div className=' ml-[10%]'>
        <div className='flex text-3xl pl-[35%] w-full my-10 '>
            <p className='text-slate-500'>{t1} <span className='text-slate-700'>{t2}</span> </p>
            <p className='w-[7%] h-[3px] bg-[#414141] mt-4 ml-2 '></p>
        </div>
        <div className=' m-5 flex'>
            <div className='w-[45%]'>
                <img src={image} alt="" className='w-[70%]'/>
            </div>
            <div className='w-[35%] '>   
                <p className='mr-10 '>{desc}</p>
            </div>
        </div>
    </div>
  )
}

export default AboutUs