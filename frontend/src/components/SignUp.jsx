import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userLogin, adminLogin } from '../store/authSlice'
import { notify } from '.'

const SignUp = ({role='user'}) => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignUp = () => {

    const data = {username, email, password, role }

    axios
    .post('http://localhost:8000/api/v1/user/register', data)
    .then((res) => {
      console.log('user created: ', res)

      if (role === 'user') {
        dispatch(userLogin(res.data.data._id))
        notify('User registered successfully', 'success')
        navigate('/')
      } else {
        dispatch(adminLogin())
        notify('Admin registered successfully', 'success')
        navigate('/admin')
      }

    })
    .catch((error) => {
      console.log(error)
      notify(error.msg, 'error')
    })
    }


  return (
    <div className='ml-[10%] my-[8%] pr-[10%] h-full'>
      <div className='h-full'>
        <div className='flex w-full justify-center gap-2 mb-5 '>
        {role === 'admin' ? <p className='text-3xl font-serif text-[#414141]'>Admin Sign Up</p> : <p className='text-3xl font-serif text-[#414141]'>Sign Up</p>}

          <p className='w-[5%] h-[2px] bg-[#414141] mt-5 '></p>
        </div>
        <div  className=' flex flex-col items-center h-full'>

          <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}
          className='border border-black w-[30%] h-[20%] py-3 pl-3 text-lg my-2'/>
          
          <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}
          className='border border-black w-[30%] h-[20%] py-3 pl-3 text-lg my-2'/>

          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}
          className='border border-black w-[30%] h-[20%] py-3 pl-3 text-lg my-2'/>
          
          <div className={`flex gap-32`}>
          <button className='' >Forgot your password?</button>
          {role === 'admin' ? <NavLink to='/admin/login'>
          <p className='' >Login Here</p>
            </NavLink> : <NavLink to='/login'>
          <p className='' >Login Here</p>
            </NavLink>}
          </div>
        <button onClick={handleSignUp} className='mt-5 border bg-black text-white w-[9%] py-[10px] rounded-3xl '>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default SignUp