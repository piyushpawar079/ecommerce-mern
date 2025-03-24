import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLogin, adminLogin } from '../store/authSlice.js'
import { notify } from '.'

const Login = ({flag=false}) => {                     

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = () => {
    
    if (flag) {
      const role = 'admin'
      const data = { email, password, role }
      axios
    .post('https://mernwear-backend.onrender.com/api/v1/admin/login', data)
    .then((res) => {
      dispatch(adminLogin())
      notify('Admin Login Successfull', 'success')
      navigate('/admin')
    })
    .catch((error) => {
      notify(error.response.data.error, 'error')
    })
    } else{
      const role = 'user'
      const data = { email, password, role }
      axios
    .post('https://mernwear-backend.onrender.com/api/v1/user/login', data)
    .then((res) => {
      const userId = res.data.data._id
      dispatch(userLogin(userId))
      notify('User Logged In successfully')
      navigate('/')
    })
    .catch((error) => {
      notify(error.response.data.error, 'error')
    })
    }
  }
  

  return (
    <div className='my-[8%] pr-[10%] h-full ml-[10%]'>
      <div className='h-full'>
        <div className='flex w-full justify-center gap-2 mb-5 '>
          {flag ? <p className='text-3xl font-serif text-[#414141]'>Admin Login</p> : <p className='text-3xl font-serif text-[#414141]'>Login</p>}
          <p className='w-[5%] h-[2px] bg-[#414141] mt-5 '></p>
        </div>
        <div  className=' flex flex-col items-center h-full'>
          <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}  className='border border-black w-[30%] h-[20%] py-3 pl-3 text-lg my-2'/>
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='border border-black w-[30%] h-[20%] py-3 pl-3 text-lg my-2'/>
          <div className={`flex gap-24`}>
          <button className='' >Forgot your password?</button>
            {flag ? <NavLink to='/admin/signUp'>
          <p className='' >Create Account</p>
            </NavLink> : <NavLink to='/signUp'>
          <p className='' >Create Account</p>
            </NavLink>}
          </div>
        <button onClick={handleLogin} className='mt-5 border bg-black text-white w-[9%] py-[10px] rounded-3xl '>Sign In</button>
        </div>
      </div>
    </div>
  )
}

export default Login