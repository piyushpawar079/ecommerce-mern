import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../store/authSlice';

const Header = () => {

  const loggedIn = useSelector(state => state.auth.userAuth)
  const productCount = useSelector(state => state.product.productCount)
  const dispatch = useDispatch()

  return (
    <div className='ml-[10%]'>
    <div className='flex justify-between py-5  font-medium  mr-[10%]'>

        <NavLink to='/'>
        <div className='text-3xl '>
        <h1 className='text-3xl font-semibold text-gray-600 mt-1  '>MERNWare </h1>
        </div>
        </NavLink>

        <ul className='justify-between flex gap-8 mt-2 '>

            <NavLink to='/' className={({isActive}) => `flex flex-col items-center ${isActive ? 'text-gray-900'  : 'text-gray-500'} `} >
            {({ isActive }) => (
            <div className="flex flex-col items-center gap-1">
              <p className={isActive ? 'text-black' : 'text-gray-500'}>HOME</p>
              {isActive && <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />}
            </div>)}
            </NavLink>

            <NavLink to='/collection' className={({isActive}) => `flex flex-col items-center ${isActive ? 'text-gray-900'  : 'text-gray-500'} `} >
            {({ isActive }) => (
            <div className="flex flex-col items-center gap-1">
              <p className={isActive ? 'text-black' : 'text-gray-500'}>COLLECTION</p>
              {isActive && <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />}
            </div>)}
            </NavLink>

            <NavLink to='/about' className={({isActive}) => `flex flex-col items-center ${isActive ? 'text-gray-900'  : 'text-gray-500'} `} >
            {({ isActive }) => (
            <div className="flex flex-col items-center gap-1">
              <p className={isActive ? 'text-black' : 'text-gray-500'}>ABOUT</p>
              {isActive && <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />}
            </div>)}
            </NavLink>

            <NavLink to='/contact' className={({isActive}) => `flex flex-col items-center ${isActive ? 'text-gray-900'  : 'text-gray-500'} `} >
            {({ isActive }) => (
            <div className="flex flex-col items-center gap-1">
              <p className={isActive ? 'text-black' : 'text-gray-500'}>CONTACT</p>
              {isActive && <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />}
            </div>)}
            </NavLink>

            <NavLink  to='/admin/signUp' className={({isActive}) => `flex flex-col items-center ${isActive ? 'text-gray-900'  : 'text-gray-500'} `}  >
            {({ isActive }) => (
            <div className="flex flex-col items-center gap-1">
              <p className={isActive ? 'text-black' : 'text-gray-500'}>ADMIN</p>
              {isActive && <hr className="w-2/4 border-none h-[1.5px] bg-gray-700" />}
            </div>)}
            </NavLink>

        </ul>

        <div className='flex  gap-5 '>
            {loggedIn ?
              <div className='group relative'>
                    <img
                    src="https://imgs.search.brave.com/aeF6TVyQT6vItarLYcAlcZBJwDaXKhdGqmjIpEOCDcw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzQyLzMwLzEx/LzM2MF9GXzU0MjMw/MTE5Nl9BeTJFazM0/M2V6RzkxZG96bTFK/bTQycnR6RExzb2Vk/VS5qcGc"
                    alt="profile" className='w-8 h-8 mt-1 cursor-pointer' />
        
                    <div className='group-hover:block hidden absolute dropdown-menu right-0  dropdown-menu '>
                        <div className='flex flex-col gap-2 bg-slate-100 p-2 w-24 mt-2'>
                        <NavLink to='/allOrders'>
                          <p className='cursor-pointer hover:text-black text-gray-500'>Orders</p>
                        </NavLink>
                        <NavLink to='/login' onClick={() => dispatch(userLogout()) }>
                          <p className='cursor-pointer hover:text-black text-gray-500'>Logout</p>
                        </NavLink>
                        </div>
                    </div>
              </div>  : 

              <div className='group relative'>
                <NavLink to='/login'>
                  <img
                  src="https://imgs.search.brave.com/aeF6TVyQT6vItarLYcAlcZBJwDaXKhdGqmjIpEOCDcw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzQyLzMwLzEx/LzM2MF9GXzU0MjMw/MTE5Nl9BeTJFazM0/M2V6RzkxZG96bTFK/bTQycnR6RExzb2Vk/VS5qcGc"
                  alt="profile" className='w-8 h-8 mt-1 cursor-pointer' />
                </NavLink>
              </div>
            }

        <Link to='/cart' className='relative'>
            <img
            src="https://imgs.search.brave.com/tIdAPukZd8vXqHe1MN3C44z8RC9qHuUrThT5aFXENE8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzM0LzI2LzYx/LzM2MF9GXzkzNDI2/NjE5NF9Nc3JuaHBh/cWRVS0xZQVNZNG9i/UW1LZkpWTVBnYVc4/MS5qcGc"
            alt="profile" className='w-8 h-6 mt-2 ' />
            <p className='absolute right-[-5px] bottom-[15px] text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] w-4'>{productCount}</p>
        </Link>
        </div>

    </div>
        <hr className='bg-slate-400   w-[90%]  mt-1  ' />
    </div>
  );
};

export default Header;
