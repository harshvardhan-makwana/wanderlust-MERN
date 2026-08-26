import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Navbar() {
  const navigate=useNavigate();
  const token = localStorage.getItem("token")
  const handleLogout=()=>{
   localStorage.removeItem("token")
   localStorage.removeItem("user")
   navigate('/login')
  }
  return (
    <nav className='p-5 sticky top-0 bg-white border-b flex justify-between'>
      <div className='flex gap-4 items-center'>
        <Link><i className="fa-regular fa-compass text-[#fe424d] text-3xl" to='/listings' /></Link>
        <Link to='/' className='text-[20px] text-black '>Home</Link>
        <Link to='/' className='text-[20px] text-black '>All Listings</Link>
        <Link to='/listings/new' className='text-[20px] text-black'>Add New Listings</Link>
      </div>
      <div className='flex items-center gap-4'>
        {token ? (
          <button onClick={handleLogout} className='text-[20px] text-black'>Logout</button>
        ) : (
          <>
            <Link to='/login' className='text-[20px] text-black'>Login</Link>
            <Link to='/Signup' className='text-[20px] text-black'>Signup</Link>
          </>
        )}
      </div>
    </nav>
  )
}
