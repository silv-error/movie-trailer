import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthUser } from '../store/authUser';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {login} = useAuthUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  }

  const handleOnChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  return (
    <div className='h-screen w-full hero-bg'>
      <header className='max-w-7xl mx-auto flex justify-between items-center p-4'>
        <Link to={"/"}>
          <img src='/netflix-logo.png' alt='netflix-logo' className='w-52' />
        </Link>
      </header>

      <div className='flex justify-center items-center mt-20 mx-3d'>
        <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
          <h1 className='text-center text-white text-2xl font-bold mb-4'>
            Sign Up
          </h1>

          <form 
            onSubmit={handleSubmit}
            className='space-y-4'>
            <div>
              <label htmlFor='email' className='text-sm font-medium text-gray-300 block'>
                Email
              </label>
              <input 
                type="email" 
                className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' 
                placeholder='you@example.com'
                id='email'
                onChange={handleOnChange}
              />
            </div>

            <div>
              <label htmlFor='password' className='text-sm font-medium text-gray-300 block'>
                Password
              </label>
              <input 
                type="password" 
                className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' 
                placeholder='********'
                id='password'
                onChange={handleOnChange}
              />
            </div>

            <button className='btn w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700'>
              Login
            </button>
          </form>
          <div className='text-center text-gray-400'>
            Don't have an account?{" "} 
            <Link to={"/signup"} className='text-white hover:underline'>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage